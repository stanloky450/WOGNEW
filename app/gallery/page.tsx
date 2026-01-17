"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import GalleryCard from "@/components/gallery/GalleryCard"

interface GalleryImage {
  id: string
  url: string
  caption: string | null
}

interface Gallery {
  id: string
  title: string
  description: string | null
  eventDate: string
  published: boolean
  images: GalleryImage[]
  createdAt: string
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      const response = await fetch("/api/gallery")
      const data = await response.json()
      if (data.success) {
        setGalleries(data.data.filter((g: Gallery) => g.published))
      }
    } catch (error) {
      console.error("Error fetching galleries:", error)
    } finally {
      setLoading(false)
    }
  }

  // Group galleries by date
  const groupedByDate = galleries.reduce((acc, gallery) => {
    const date = new Date(gallery.eventDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(gallery)
    return acc
  }, {} as Record<string, Gallery[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Memories from our services, events, and fellowship moments
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : Object.keys(groupedByDate).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No galleries available yet.</p>
            </div>
          ) : (
            Object.entries(groupedByDate)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, items], index) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-primary pl-4">
                    {date}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((gallery, idx) => (
                      <GalleryCard key={gallery.id} gallery={gallery} index={idx} />
                    ))}
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
