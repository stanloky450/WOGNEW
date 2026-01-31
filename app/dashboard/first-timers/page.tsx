"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  createdAt: string
}

export default function FirstTimersPage() {
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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">First Timers & New Converts</h1>
          <p className="text-gray-600 mt-2">Manage and follow up with visitors</p>
        </div>
        <div className="flex items-center gap-2">
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
                <Link href={`/dashboard/first-timers/${person.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{person.fullName}</CardTitle>
                          <p className="text-sm text-gray-600 mt-2">
                            Submitted: {formatDate(person.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            person.isFirstTime
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {person.isFirstTime ? "First Timer" : "Returning"}
                        </span>
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
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
