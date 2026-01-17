"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, Newspaper, Image as ImageIcon, Users } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    posts: 0,
    events: 0,
    news: 0,
    galleries: 0,
    firstTimers: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [posts, events, news, galleries, firstTimers] = await Promise.all([
        fetch("/api/posts").then((r) => r.json()),
        fetch("/api/events").then((r) => r.json()),
        fetch("/api/news").then((r) => r.json()),
        fetch("/api/gallery").then((r) => r.json()),
        fetch("/api/first-timer").then((r) => r.json()),
      ])

      setStats({
        posts: posts.data?.length || 0,
        events: events.data?.length || 0,
        news: news.data?.length || 0,
        galleries: galleries.data?.length || 0,
        firstTimers: firstTimers.data?.length || 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const cards = [
    {
      title: "Posts",
      value: stats.posts,
      icon: FileText,
      color: "bg-blue-500",
      href: "/dashboard/posts",
    },
    {
      title: "Events",
      value: stats.events,
      icon: Calendar,
      color: "bg-purple-500",
      href: "/dashboard/events",
    },
    {
      title: "News",
      value: stats.news,
      icon: Newspaper,
      color: "bg-green-500",
      href: "/dashboard/news",
    },
    {
      title: "Galleries",
      value: stats.galleries,
      icon: ImageIcon,
      color: "bg-pink-500",
      href: "/dashboard/gallery",
    },
    {
      title: "First Timers",
      value: stats.firstTimers,
      icon: Users,
      color: "bg-yellow-500",
      href: "/dashboard/first-timers",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || "Admin"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your ministry today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Total {card.title.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
