"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/ui/image-upload"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MembershipBioPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    profilePhoto: "",
    phoneNumber: "",
    email: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    department: "",
    address: "",
    shortBio: "",
    salvationStory: "",
    prayerRequest: "",
    isActiveMember: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const resetForm = () => {
    setFormData({
      fullName: "",
      profilePhoto: "",
      phoneNumber: "",
      email: "",
      gender: "",
      maritalStatus: "",
      occupation: "",
      department: "",
      address: "",
      shortBio: "",
      salvationStory: "",
      prayerRequest: "",
      isActiveMember: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/member-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit membership bio")
      }

      setIsSubmitted(true)
      resetForm()
    } catch (error) {
      console.error("Membership bio submission failed:", error)
      alert("Failed to submit your membership bio. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-3xl">Membership Bio Form</CardTitle>
              <CardDescription>
                Share your membership profile and testimony with the church office.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted && (
                <div className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                  Membership bio submitted successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender || "none"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value === "none" ? "" : value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Not specified</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      value={formData.maritalStatus || "none"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, maritalStatus: value === "none" ? "" : value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Not specified</SelectItem>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department / Unit</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Profile Photo</Label>
                  <div className="mt-1">
                    <ImageUpload
                      value={formData.profilePhoto ? [formData.profilePhoto] : []}
                      disabled={isSubmitting}
                      onChange={(url) => setFormData({ ...formData, profilePhoto: url })}
                      onRemove={() => setFormData({ ...formData, profilePhoto: "" })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shortBio">Short Bio *</Label>
                  <Textarea
                    id="shortBio"
                    value={formData.shortBio}
                    onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="salvationStory">Salvation/Testimony Story</Label>
                  <Textarea
                    id="salvationStory"
                    value={formData.salvationStory}
                    onChange={(e) => setFormData({ ...formData, salvationStory: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="prayerRequest">Prayer Request</Label>
                  <Textarea
                    id="prayerRequest"
                    value={formData.prayerRequest}
                    onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="isActiveMember"
                    type="checkbox"
                    checked={formData.isActiveMember}
                    onChange={(e) => setFormData({ ...formData, isActiveMember: e.target.checked })}
                  />
                  <Label htmlFor="isActiveMember">I am an active member</Label>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Membership Bio"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
