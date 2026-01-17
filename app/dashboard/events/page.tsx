"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"
import { formatDate } from "@/lib/utils"
import ImageUpload from "@/components/ui/image-upload"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string | null
  location: string | null
  published: boolean
  coverImage: string | null
  author: {
    name: string | null
  }
}

export default function EventsPage() {
  const { data: session } = useSession()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    coverImage: "",
    published: false,
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      if (data.success) {
        setEvents(data.data)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && editingId) {
        const response = await fetch("/api/events", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              id: editingId,
              coverImage: formData.coverImage,
            }),
          })
        if (!response.ok) throw new Error("Failed to update event")
      } else {
        await fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              coverImage: formData.coverImage,
              authorId: (session?.user as any)?.id,
            }),
          })
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        coverImage: "",
        published: false,
      })
      setShowForm(false)
      setIsEditing(false)
      setEditingId(null)
      fetchEvents()
    } catch (error) {
      console.error("Error creating/updating event:", error)
    }
  }

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0], // Format date for input
      time: event.time || "",
      location: event.location || "",
      coverImage: event.coverImage || "",
      published: event.published,
    })
    setEditingId(event.id)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      await fetch(`/api/events?id=${id}`, { method: "DELETE" })
      fetchEvents()
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2" size={18} />
          {showForm ? "Cancel" : "New Event"}
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Event" : "Create New Event"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cover Image</Label>
                  <ImageUpload 
                    value={formData.coverImage ? [formData.coverImage] : []}
                    disabled={loading}
                    onChange={(url) => setFormData({ ...formData, coverImage: url })}
                    onRemove={() => setFormData({ ...formData, coverImage: "" })}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="mr-2"
                  />
                  <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
                </div>
                <Button type="submit">{isEditing ? "Update Event" : "Create Event"}</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <Link href={`/events/${event.id}`} className="block cursor-pointer">
                    {event.coverImage && (
                        <div className="h-48 w-full overflow-hidden">
                            <img 
                                src={event.coverImage} 
                                alt={event.title} 
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                        </div>
                    )}
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                        <CardTitle className="hover:text-primary transition-colors">{event.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-2">
                            {formatDate(event.date)} {event.time && `• ${event.time}`}
                        </p>
                        {event.location && <p className="text-sm text-gray-700 mt-1">📍 {event.location}</p>}
                        </div>
                        <span
                        className={`px-3 py-1 rounded-full text-sm ${
                            event.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                        >
                        {event.published ? "Published" : "Draft"}
                        </span>
                    </div>
                    </CardHeader>
                </Link>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleEdit(event);
                        }}>
                        <Edit size={16} className="mr-2" />
                        Edit
                    </Button>
                    <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDelete(event.id);
                        }}>
                        <Trash2 size={16} className="mr-2" />
                        Delete
                    </Button>
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
