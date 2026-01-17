"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Users,
  LogOut,
  Home
} from "lucide-react"

export default function DashboardNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = (session?.user as any)?.role

  const allNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["SUPERADMIN", "ADMIN", "NEWS_ADMIN", "EVENT_ADMIN", "POST_ADMIN", "GALLERY_MANAGER", "EDITOR"] },
    { href: "/dashboard/posts", label: "Posts", icon: FileText, roles: ["SUPERADMIN", "ADMIN", "EDITOR", "POST_ADMIN"] },
    { href: "/dashboard/events", label: "Events", icon: Calendar, roles: ["SUPERADMIN", "ADMIN", "EDITOR", "EVENT_ADMIN"] },
    { href: "/dashboard/news", label: "News", icon: Newspaper, roles: ["SUPERADMIN", "ADMIN", "EDITOR", "NEWS_ADMIN"] },
    { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon, roles: ["SUPERADMIN", "ADMIN", "GALLERY_MANAGER", "EDITOR"] },
    { href: "/dashboard/first-timers", label: "First Timers", icon: Users, roles: ["SUPERADMIN", "ADMIN"] },
  ]

  const filteredNavItems = allNavItems.filter(item => {
    if (!role) return false;
    // Superadmin and Admin see everything (except maybe we want to restrict some?)
    // Actually, let's use the explicit roles array.
    // If roles includes "SUPERADMIN" or "ADMIN" and the user is one of those, they see it.
    // Ideally, if the user is SUPERADMIN, they see EVERYTHING.
    if (role === "SUPERADMIN") return true; 
    
    // For others, check specific permission
    return item.roles.includes(role);
  });

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">WOG</span>
              <span className="text-sm font-semibold text-gray-700">Dashboard</span>
            </Link>

            <div className="hidden md:flex space-x-4">
              {filteredNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home size={18} className="mr-2" />
                View Site
              </Button>
            </Link>
            <div className="text-sm text-gray-700">
              {session?.user?.email}
            </div>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
