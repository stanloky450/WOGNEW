"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Upload } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Gallery {
  id: string
  title: string
  description: string | null
  eventDate: string
  published: boolean
  images: { id: string; url: string }[]
}

export default function GalleryManagementPage() {
  const { data: session } = useSession()
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    published: false,
  })
  const [imageUrls, setImageUrls] = useState<string>("")

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      const response = await fetch("/api/gallery")
      const data = await response.json()
      if (data.success) {
        setGalleries(data.data)
      }
    } catch (error) {
      console.error("Error fetching galleries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const urls = imageUrls.split("\n").filter((url) => url.trim())
      const images = urls.map((url) => ({ url: url.trim(), caption: "" }))

      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images,
          authorId: (session?.user as any)?.id,
        }),
      })

      setFormData({ title: "", description: "", eventDate: "", published: false })
      setImageUrls("")
      setShowForm(false)
      fetchGalleries()
    } catch (error) {
      console.error("Error creating gallery:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      await fetch(`/api/gallery?id=${id}`, { method: "DELETE" })
      fetchGalleries()
    } catch (error) {
      console.error("Error deleting gallery:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2" size={18} />
          {showForm ? "Cancel" : "New Gallery"}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card>
            <CardHeader><CardTitle>Create Gallery</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
                </div>
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input id="eventDate" type="date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="images">Image URLs (one per line)</Label>
                  <Textarea id="images" value={imageUrls} onChange={(e) => setImageUrls(e.target.value)} rows={6} placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" />
                  <p className="text-sm text-gray-600 mt-1">
                    <Upload size={14} className="inline mr-1" />
                    Paste image URLs, one per line. For bulk upload, use image hosting services.
                  </p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="mr-2" />
                  <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
                </div>
                <Button type="submit">Create Gallery</Button>
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
          {galleries.map((gallery, index) => (
            <motion.div key={gallery.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{gallery.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">{formatDate(gallery.eventDate)} • {gallery.images.length} photos</p>
                      {gallery.description && <p className="text-sm text-gray-700 mt-2">{gallery.description}</p>}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${gallery.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {gallery.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-2 mb-4">
                    {gallery.images.slice(0, 6).map((img) => (
                      <img key={img.id} src={img.url} alt="" className="w-full h-16 object-cover rounded" />
                    ))}
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(gallery.id)}>
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
