"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">First Timers & New Converts</h1>
        <p className="text-gray-600 mt-2">Manage and follow up with visitors</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {firstTimers.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{person.fullName}</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">
                        Submitted: {formatDate(person.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
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
                        <p className="text-sm text-gray-600">{person.prayerRequest}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
