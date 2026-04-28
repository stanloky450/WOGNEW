"use client"

import { useState } from "react"
import { Share2, Check, Copy } from "lucide-react"
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

  const getShareUrl = () => {
    if (typeof window === "undefined") return ""
    if (!url) return window.location.href
    if (url.startsWith("http://") || url.startsWith("https://")) return url
    return `${window.location.origin}${url}`
  }

  const handleCopyLink = () => {
    const shareUrl = getShareUrl()
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          url: getShareUrl(),
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
        handleCopyLink()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`gap-2 rounded-full ${className || ""}`}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          Copy Link
        </DropdownMenuItem>
        {/* We can add more share options like standard social links if needed */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
