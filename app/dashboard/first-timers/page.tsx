"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDate } from "@/lib/utils"

interface FirstTimer {
  id: string
  fullName: string
  phoneNumber: string
  email: string | null
  isFirstTime: boolean
  prayerRequest: string | null
  ageGroup: string | null
  attendingDuration: string | null
  servicesAttended: string | null
  departmentsInterest: string | null
  needsCounseling: boolean
  updatePreferences: string | null
  serviceFeedback: string | null
  suggestions: string | null
  createdAt: string
}

export default function FirstTimersPage() {
  const { data: session } = useSession()
  const [firstTimers, setFirstTimers] = useState<FirstTimer[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  useEffect(() => {
    fetchFirstTimers()
  }, [])

  const fetchFirstTimers = async () => {
    try {
      const response = await fetch("/api/first-timer")
      const data = await response.json()
      if (data.success) {
        setFirstTimers(data.data)
      }
    } catch (error) {
      console.error("Error fetching first timers:", error)
    } finally {
      setLoading(false)
    }
  }

  const sortedFirstTimers = [...firstTimers].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  const role = (session?.user as { role?: string } | undefined)?.role
  const canDelete = role === "SUPERADMIN" || role === "ADMIN"

  const handleDelete = async (id: string) => {
    if (!canDelete) return
    if (!confirm("Delete this first timer entry?")) return

    try {
      const response = await fetch(`/api/first-timer/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete")
      }

      setFirstTimers((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting first timer:", error)
      alert("Failed to delete this record.")
    }
  }

  const parseJsonArray = (value: string | null) => {
    if (!value) return []

    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const escapeCsvCell = (value: string) => `"${value.replace(/"/g, '""')}"`

  const downloadCsv = (filename: string, rows: string[][]) => {
    const csv = rows.map((row) => row.map((cell) => escapeCsvCell(cell)).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadTxt = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExportFullCsv = () => {
    if (sortedFirstTimers.length === 0) {
      alert("No records to export.")
      return
    }

    const rows: string[][] = [
      [
        "Full Name",
        "Phone Number",
        "Email",
        "Age Group",
        "First Time",
        "Attending Duration",
        "Services Attended",
        "Departments Interest",
        "Needs Counseling",
        "Prayer Request",
        "Update Preferences",
        "Service Feedback",
        "Suggestions",
        "Submitted At",
      ],
      ...sortedFirstTimers.map((person) => [
        person.fullName || "",
        person.phoneNumber || "",
        person.email || "",
        person.ageGroup || "",
        person.isFirstTime ? "Yes" : "No",
        person.attendingDuration || "",
        parseJsonArray(person.servicesAttended).join("; "),
        parseJsonArray(person.departmentsInterest).join("; "),
        person.needsCounseling ? "Yes" : "No",
        person.prayerRequest || "",
        parseJsonArray(person.updatePreferences).join("; "),
        person.serviceFeedback || "",
        person.suggestions || "",
        new Date(person.createdAt).toISOString(),
      ]),
    ]

    downloadCsv("first-timers-full.csv", rows)
  }

  const handleExportPhoneCsv = () => {
    const phoneNumbers = Array.from(
      new Set(
        sortedFirstTimers
          .map((person) => person.phoneNumber?.trim())
          .filter((phone): phone is string => Boolean(phone))
      )
    )

    if (phoneNumbers.length === 0) {
      alert("No phone numbers to export.")
      return
    }

    const rows: string[][] = [["Phone Number"], ...phoneNumbers.map((phone) => [phone])]
    downloadCsv("first-timer-phone-numbers.csv", rows)
  }

  const handleExportFullTxt = () => {
    if (sortedFirstTimers.length === 0) {
      alert("No records to export.")
      return
    }

    const content = sortedFirstTimers
      .map((person, index) => {
        const services = parseJsonArray(person.servicesAttended).join(", ") || "-"
        const interests = parseJsonArray(person.departmentsInterest).join(", ") || "-"
        const preferences = parseJsonArray(person.updatePreferences).join(", ") || "-"
        return [
          `Record ${index + 1}`,
          `Name: ${person.fullName || "-"}`,
          `Phone: ${person.phoneNumber || "-"}`,
          `Email: ${person.email || "-"}`,
          `Age Group: ${person.ageGroup || "-"}`,
          `First Time: ${person.isFirstTime ? "Yes" : "No"}`,
          `Attending Duration: ${person.attendingDuration || "-"}`,
          `Services Attended: ${services}`,
          `Departments Interest: ${interests}`,
          `Needs Counseling: ${person.needsCounseling ? "Yes" : "No"}`,
          `Prayer Request: ${person.prayerRequest || "-"}`,
          `Update Preferences: ${preferences}`,
          `Service Feedback: ${person.serviceFeedback || "-"}`,
          `Suggestions: ${person.suggestions || "-"}`,
          `Submitted At: ${formatDate(person.createdAt)}`,
        ].join("\n")
      })
      .join("\n\n--------------------------\n\n")

    downloadTxt("first-timers-full.txt", content)
  }

  const handleExportPhoneTxt = () => {
    const phoneNumbers = Array.from(
      new Set(
        sortedFirstTimers
          .map((person) => person.phoneNumber?.trim())
          .filter((phone): phone is string => Boolean(phone))
      )
    )

    if (phoneNumbers.length === 0) {
      alert("No phone numbers to export.")
      return
    }

    downloadTxt("first-timer-phone-numbers.txt", phoneNumbers.join("\n"))
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">First Timers & New Converts</h1>
          <p className="text-gray-600 mt-2">Manage and follow up with visitors</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handleExportFullCsv}>
            Export Full CSV
          </Button>
          <Button variant="outline" onClick={handleExportPhoneCsv}>
            Export Phones CSV
          </Button>
          <Button variant="outline" onClick={handleExportFullTxt}>
            Export Full TXT
          </Button>
          <Button variant="outline" onClick={handleExportPhoneTxt}>
            Export Phones TXT
          </Button>
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <Select
            value={sortOrder}
            onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {sortedFirstTimers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No first timer submissions found.
            </div>
          ) : (
            sortedFirstTimers.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow border-l-4 border-l-transparent hover:border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <CardTitle className="text-xl">{person.fullName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-2">
                          Submitted: {formatDate(person.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            person.isFirstTime
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {person.isFirstTime ? "First Timer" : "Returning"}
                        </span>
                        {canDelete && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(person.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Contact</p>
                        <p className="text-sm text-gray-600">{person.phoneNumber}</p>
                        {person.email && <p className="text-sm text-gray-600">{person.email}</p>}
                      </div>
                      {person.prayerRequest && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Prayer Request</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{person.prayerRequest}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <Link href={`/dashboard/first-timers/${person.id}`} className="text-primary text-sm font-medium hover:underline">
                        View full details
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
