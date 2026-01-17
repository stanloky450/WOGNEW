"use client"

import { X, Share2 } from "lucide-react"

interface VideoModalProps {
  video: { title: string; youtubeUrl: string }
  onClose: () => void
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const handleShare = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: "Check out this prophetic declaration!",
        url: url,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>

        {/* Video */}
        <div className="relative bg-black aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={video.youtubeUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex-1 pr-4">{video.title}</h2>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex-shrink-0"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
