"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface Post {
  id: string
  title: string
  excerpt: string | null
  content: string
  coverImage: string | null
  publishedAt: string
  author: {
    name: string | null
  }
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      const data = await response.json()
      if (data.success) {
        setPosts(data.data.filter((p: any) => p.published))
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest from our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Inspiring articles and updates
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/posts/${post.id}`} className="block h-full">
                    <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                      {post.coverImage && (
                        <div className="h-48 w-full overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-2">
                          {formatDate(post.publishedAt)} • {post.author.name || "Admin"}
                        </p>
                      </CardHeader>
                      <CardContent>
                        {post.excerpt && (
                          <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                        )}
                        {!post.excerpt && (
                            <p className="text-gray-600 line-clamp-3">{post.content}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
