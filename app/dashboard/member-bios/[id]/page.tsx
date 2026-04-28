"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Trash2 } from "lucide-react"

interface MemberBio {
  id: string
  fullName: string
  profilePhoto: string | null
  phoneNumber: string
  email: string | null
  gender: string | null
  maritalStatus: string | null
  occupation: string | null
  department: string | null
  address: string | null
  shortBio: string
  salvationStory: string | null
  prayerRequest: string | null
  isActiveMember: boolean
  createdAt: string
}

export default function MemberBioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [record, setRecord] = useState<MemberBio | null>(null)
  const [loading, setLoading] = useState(true)

  const role = (session?.user as { role?: string } | undefined)?.role
  const canView = role === "SUPERADMIN" || role === "ADMIN"

  useEffect(() => {
    if (params.id && status === "authenticated" && canView) {
      fetchDetails(params.id as string)
    } else if (status !== "loading") {
      setLoading(false)
    }
  }, [params.id, status, canView])

  const fetchDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/member-bio/${id}`)
      const data = await response.json()
      if (data.success) {
        setRecord(data.data)
      }
    } catch (error) {
      console.error("Error fetching member bio details:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!record) return
    if (!confirm("Delete this membership bio record?")) return

    try {
      const response = await fetch(`/api/member-bio/${record.id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Delete failed")
      }
      router.push("/dashboard/member-bios")
    } catch (error) {
      console.error("Delete failed:", error)
      alert("Failed to delete record.")
    }
  }

  if (!loading && !canView) {
    return (
      <div className="py-16 text-center text-gray-700">
        You do not have access to this page.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!record) {
    return (
      <div className="text-center py-12 text-gray-700">
        Member bio record not found.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 gap-3">
        <Button variant="outline" onClick={() => router.push("/dashboard/member-bios")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </div>

      <Card className="border-t-4 border-t-primary shadow-lg text-black">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-xl">
              {record.profilePhoto ? (
                <img src={record.profilePhoto} alt={record.fullName} className="h-full w-full object-cover" />
              ) : (
                (record.fullName?.[0] || "M").toUpperCase()
              )}
            </div>
            <CardTitle className="text-3xl">{record.fullName}</CardTitle>
          </div>
          <p className="text-sm text-gray-600">Submitted on {formatDate(record.createdAt)}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold">Phone:</span> {record.phoneNumber}</div>
            <div><span className="font-semibold">Email:</span> {record.email || "-"}</div>
            <div><span className="font-semibold">Gender:</span> {record.gender || "-"}</div>
            <div><span className="font-semibold">Marital Status:</span> {record.maritalStatus || "-"}</div>
            <div><span className="font-semibold">Occupation:</span> {record.occupation || "-"}</div>
            <div><span className="font-semibold">Department:</span> {record.department || "-"}</div>
            <div><span className="font-semibold">Address:</span> {record.address || "-"}</div>
            <div>
              <span className="font-semibold">Membership:</span>{" "}
              {record.isActiveMember ? "Active member" : "Inactive member"}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Short Bio</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{record.shortBio}</p>
          </div>

          {record.salvationStory && (
            <div>
              <h3 className="font-semibold mb-2">Salvation/Testimony Story</h3>
              <p className="text-gray-800 whitespace-pre-wrap">{record.salvationStory}</p>
            </div>
          )}

          {record.prayerRequest && (
            <div>
              <h3 className="font-semibold mb-2">Prayer Request</h3>
              <p className="text-gray-800 whitespace-pre-wrap">{record.prayerRequest}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
