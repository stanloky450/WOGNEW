"use client"

import { useState, useEffect } from "react"
import { Share2, Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  url?: string
  title?: string
  className?: string
}

export function ShareButton({ url, title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [hasNativeShare, setHasNativeShare] = useState(false)

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setHasNativeShare(true)
    }
  }, [])

  const getCanonicalUrl = () => {
    // Generate correct canonical URL using production base url if available
    const siteUrl = "https://www.wgministries.org"
    
    if (!url) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname
        return `${siteUrl}${path}`
      }
      return siteUrl
    }
    
    if (url.startsWith("http://") || url.startsWith("https://")) {
      try {
        const urlObj = new URL(url)
        return `${siteUrl}${urlObj.pathname}${urlObj.search}`
      } catch (e) {
        return url
      }
    }
    const cleanPath = url.startsWith("/") ? url : `/${url}`
    return `${siteUrl}${cleanPath}`
  }

  const triggerNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleCopyLink = () => {
    const shareUrl = getCanonicalUrl()
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setCopied(true)
          triggerNotification("Link copied to clipboard!")
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => {
          console.error("Clipboard copy failed:", err)
          triggerNotification("Failed to copy link.", "error")
        })
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: title || document.title,
          url: getCanonicalUrl(),
        })
        triggerNotification("Post shared successfully!")
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err)
          triggerNotification("Failed to share post.", "error")
        }
      }
    }
  }

  const getSocialShareUrl = (platform: "facebook" | "twitter" | "whatsapp" | "linkedin") => {
    const shareUrl = getCanonicalUrl()
    const shareTitle = title || "Check this out!"
    
    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
      default:
        return ""
    }
  }

  const handleSocialShare = (platform: string, shareUrl: string) => {
    if (typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
      triggerNotification(`Opening ${platform} share dialog...`)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={`gap-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors ${className || ""}`}>
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white border shadow-md rounded-md p-1 text-black">
          {hasNativeShare && (
            <DropdownMenuItem onClick={handleNativeShare} className="gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-medium flex items-center">
              <Share2 className="w-4 h-4 text-blue-600" />
              System Share...
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-medium flex items-center">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-600" />}
            Copy Link
          </DropdownMenuItem>
          
          <div className="h-px bg-gray-150 my-1"></div>

          <DropdownMenuItem 
            onClick={() => handleSocialShare("Facebook", getSocialShareUrl("facebook"))} 
            className="gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => handleSocialShare("Twitter/X", getSocialShareUrl("twitter"))} 
            className="gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Twitter / X
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => handleSocialShare("WhatsApp", getSocialShareUrl("whatsapp"))} 
            className="gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.015 14.07 1 11.53 1 6.136 1 1.737 5.371 1.733 10.8c-.001 1.8.486 3.56 1.412 5.12L2.148 21.16l5.5-1.422zM17.13 14.86c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.15-.64.15-.19.3-.73.9-.9.1-.16.19-.28.05-1.57-.6-1.002-.89-1.678-1.45-2.274-1.99-.44-.38-.66-.51-.8-.21-.13.3-.64.9-.78 1.05-.14.15-.28.17-.56.03-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.3.42-.45.14-.15.19-.25.28-.42.09-.17.04-.32-.02-.45-.06-.13-.64-1.53-.87-2.09-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.2 0-.52.07-.79.36-.27.3-1.03 1-1.03 2.45s1.07 2.85 1.22 3.05c.15.2 2.1 3.2 5.1 4.5.71.31 1.27.5 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.06-.1-.23-.17-.55-.32z"/>
            </svg>
            WhatsApp
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => handleSocialShare("LinkedIn", getSocialShareUrl("linkedin"))} 
            className="gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Floating notification for share and copy actions */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-gray-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {notification.type === "success" ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <span className="text-red-400 text-sm">⚠️</span>
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}
    </>
  )
}
