import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash, X, Loader2 } from "lucide-react"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
        alert("Cloudinary Configuration Missing! Please check .env file.")
        return;
    }

    setLoading(true)

    try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        )

        const data = await response.json()

        if (response.ok) {
            onChange(data.secure_url)
        } else {
            console.error("Upload Error:", data)
            alert(`Upload Failed: ${data.error?.message || "Unknown error"}`)
        }
    } catch (error) {
        console.error("Upload Error:", error)
        alert("Something went wrong during upload.")
    } finally {
        setLoading(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-100 border">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img
              className="object-cover w-full h-full"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center gap-4">
            <Button
            type="button"
            disabled={disabled || loading}
            variant="secondary"
            onClick={() => document.getElementById('cloudinary-upload')?.click()}
            >
            {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
                <ImagePlus className="h-4 w-4 mr-2" />
            )}
            {loading ? "Uploading..." : "Upload an Image"}
            </Button>
            <input 
                id="cloudinary-upload"
                type="file" 
                accept="image/*"
                className="hidden"
                onChange={onUpload}
                disabled={disabled || loading}
            />
        </div>
      </div>
    </div>
  )
}
