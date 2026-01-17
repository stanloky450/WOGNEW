"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: string
  url: string
  caption: string | null
}

interface ImageModalProps {
  image: GalleryImage
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function ImageModal({
  image,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X size={32} />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="absolute left-4 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-4 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight size={48} />
            </button>
          </>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-6xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.url}
            alt={image.caption || "Gallery image"}
            className="max-w-full max-h-[80vh] object-contain"
          />
          {image.caption && (
            <div className="text-white text-center mt-4 text-lg">
              {image.caption}
            </div>
          )}
          <div className="text-white/60 text-center mt-2">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
