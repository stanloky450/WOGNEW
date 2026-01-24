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
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    published: false,
  })
  const [images, setImages] = useState<string[]>([])

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

  const handleEdit = (gallery: Gallery) => {
    setFormData({
      title: gallery.title,
      description: gallery.description || "",
      eventDate: new Date(gallery.eventDate).toISOString().split('T')[0],
      published: gallery.published,
    })
    setImages(gallery.images.map(img => img.url))
    setEditingId(gallery.id)
    setIsEditing(true)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditingId(null)
    setFormData({ title: "", description: "", eventDate: "", published: false })
    setImages([])
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const galleryImages = images.map((url) => ({ url, caption: "" }))
      const url = "/api/gallery"
      const method = isEditing ? "PUT" : "POST"
      
      const bodyPayload = {
        ...formData,
        images: galleryImages,
        authorId: (session?.user as any)?.id,
        ...(isEditing && { id: editingId }),
      }

      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      })

      cancelEdit()
      fetchGalleries()
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} gallery:`, error)
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
        <Button onClick={() => {
            if (showForm) cancelEdit()
            else setShowForm(true)
        }}>
          <Plus className="mr-2" size={18} />
          {showForm ? "Cancel" : "New Gallery"}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card>
            <CardHeader><CardTitle>{isEditing ? "Edit Gallery" : "Create Gallery"}</CardTitle></CardHeader>
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
                  <Label>Images</Label>
                  <ImageUpload 
                    value={images}
                    onChange={(url) => setImages((prev) => [...prev, url])}
                    onRemove={(url) => setImages((prev) => prev.filter((item) => item !== url))}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Upload multiple images for this gallery.
                  </p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="mr-2" />
                  <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
                </div>
                <div className="flex gap-2">
                    <Button type="submit">{isEditing ? "Update Gallery" : "Create Gallery"}</Button>
                    {isEditing && <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>}
                </div>
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(gallery)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(gallery.id)}>
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
