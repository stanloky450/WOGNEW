"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import ImageModal from "./ImageModal"

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
  images: GalleryImage[]
}

interface GalleryCardProps {
  gallery: Gallery
  index: number
}

export default function GalleryCard({ gallery, index }: GalleryCardProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openImageModal = (image: GalleryImage, imageIndex: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(imageIndex)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % gallery.images.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(gallery.images[nextIndex])
  }

  const showPrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + gallery.images.length) % gallery.images.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(gallery.images[prevIndex])
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
      >
        <Card className="overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer h-full">
          <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
            {gallery.images.length > 0 ? (
              <motion.img
                src={gallery.images[0].url || "/placeholder-image.jpg"}
                alt={gallery.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onClick={() => openImageModal(gallery.images[0], 0)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-white/50" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center text-white/90 text-sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                {gallery.images.length} {gallery.images.length === 1 ? "photo" : "photos"}
              </div>
            </div>
          </div>

          <CardHeader>
            <CardTitle className="text-xl">{gallery.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(gallery.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>

          {gallery.description && (
            <CardContent>
              <p className="text-gray-600">{gallery.description}</p>
            </CardContent>
          )}

          {gallery.images.length > 0 && (
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 gap-2">
                {gallery.images.slice(1, 5).map((image, idx) => (
                  <motion.div
                    key={image.id}
                    className="relative aspect-square rounded overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => openImageModal(image, idx + 1)}
                  >
                    <img
                      src={image.url || "/placeholder-image.jpg"}
                      alt={image.caption || `Gallery image ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          images={gallery.images}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          onNext={showNextImage}
          onPrev={showPrevImage}
        />
      )}
    </>
  )
}
