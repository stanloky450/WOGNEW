"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

interface MemberBio {
  id: string
  fullName: string
  profilePhoto: string | null
  phoneNumber: string
  email: string | null
  department: string | null
  occupation: string | null
  isActiveMember: boolean
  createdAt: string
}

export default function MemberBiosDashboardPage() {
  const { data: session, status } = useSession()
  const [records, setRecords] = useState<MemberBio[]>([])
  const [loading, setLoading] = useState(true)

  const role = (session?.user as { role?: string } | undefined)?.role
  const canView = role === "SUPERADMIN" || role === "ADMIN"

  useEffect(() => {
    if (status === "authenticated" && canView) {
      fetchMemberBios()
    } else if (status !== "loading") {
      setLoading(false)
    }
  }, [status, canView])

  const fetchMemberBios = async () => {
    try {
      const response = await fetch("/api/member-bio")
      const data = await response.json()
      if (data.success) {
        setRecords(data.data)
      }
    } catch (error) {
      console.error("Error fetching member bios:", error)
    } finally {
      setLoading(false)
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

  const getUniquePhones = () =>
    Array.from(
      new Set(
        records
          .map((item) => item.phoneNumber?.trim())
          .filter((phone): phone is string => Boolean(phone))
      )
    )

  const handleExportFullCsv = () => {
    if (records.length === 0) {
      alert("No membership bios to export.")
      return
    }

    const rows: string[][] = [
      [
        "Full Name",
        "Phone Number",
        "Email",
        "Department",
        "Occupation",
        "Member Status",
        "Submitted At",
      ],
      ...records.map((item) => [
        item.fullName || "",
        item.phoneNumber || "",
        item.email || "",
        item.department || "",
        item.occupation || "",
        item.isActiveMember ? "Active" : "Inactive",
        new Date(item.createdAt).toISOString(),
      ]),
    ]

    downloadCsv("membership-bios-full.csv", rows)
  }

  const handleExportPhoneCsv = () => {
    const phones = getUniquePhones()
    if (phones.length === 0) {
      alert("No phone numbers to export.")
      return
    }
    downloadCsv("membership-bio-phone-numbers.csv", [["Phone Number"], ...phones.map((p) => [p])])
  }

  const handleExportFullTxt = () => {
    if (records.length === 0) {
      alert("No membership bios to export.")
      return
    }

    const content = records
      .map((item, index) =>
        [
          `Record ${index + 1}`,
          `Name: ${item.fullName || "-"}`,
          `Phone: ${item.phoneNumber || "-"}`,
          `Email: ${item.email || "-"}`,
          `Department: ${item.department || "-"}`,
          `Occupation: ${item.occupation || "-"}`,
          `Status: ${item.isActiveMember ? "Active" : "Inactive"}`,
          `Submitted: ${formatDate(item.createdAt)}`,
        ].join("\n")
      )
      .join("\n\n--------------------------\n\n")

    downloadTxt("membership-bios-full.txt", content)
  }

  const handleExportPhoneTxt = () => {
    const phones = getUniquePhones()
    if (phones.length === 0) {
      alert("No phone numbers to export.")
      return
    }
    downloadTxt("membership-bio-phone-numbers.txt", phones.join("\n"))
  }

  if (!loading && !canView) {
    return (
      <div className="py-16 text-center text-gray-700">
        You do not have access to this page.
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Membership Bio Submissions</h1>
        <p className="text-gray-600 mt-2">Admin and Superadmin view of submitted member bios.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportFullCsv}>Export Full CSV</Button>
          <Button variant="outline" onClick={handleExportPhoneCsv}>Export Phones CSV</Button>
          <Button variant="outline" onClick={handleExportFullTxt}>Export Full TXT</Button>
          <Button variant="outline" onClick={handleExportPhoneTxt}>Export Phones TXT</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : records.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No membership bio submissions yet.</div>
      ) : (
        <div className="grid gap-6">
          {records.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link href={`/dashboard/member-bios/${item.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-start gap-3">
                        <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                          {item.profilePhoto ? (
                            <img src={item.profilePhoto} alt={item.fullName} className="h-full w-full object-cover" />
                          ) : (
                            (item.fullName?.[0] || "M").toUpperCase()
                          )}
                        </div>
                        <div>
                        <CardTitle className="text-xl">{item.fullName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-2">Submitted: {formatDate(item.createdAt)}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.isActiveMember ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {item.isActiveMember ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                      <div>
                        <span className="font-semibold">Phone:</span> {item.phoneNumber}
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span> {item.email || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Department:</span> {item.department || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Occupation:</span> {item.occupation || "-"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
