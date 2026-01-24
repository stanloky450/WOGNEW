"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Heart, Users, Star, TrendingUp } from "lucide-react"

const pillars = [
  {
    title: "Armies of Worshipers",
    description: "Raising passionate worshipers who encounter God in spirit and truth.",
    icon: Music,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Smiles on Mankind",
    description: "Putting smiles on the face of mankind through love, compassion, and service.",
    icon: Heart,
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
  {
    title: "Leaders After God's Order",
    description: "Developing leaders who focus on integrity, excellence, and God's pattern.",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Dreams Come True",
    description: "Empowering believers to realize their God-given dreams and destiny.",
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    title: "Wealth Creation",
    description: "Teaching biblical principles for financial stewardship and kingdom prosperity.",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
}

export default function FivePillars() {
  return (
    <div className="mb-16 px-4 md:px-16">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#1560BD]">
        Our Mandate: Five Pillars
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon
          return (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
                <div className={`h-2 ${pillar.bg} w-full`} /> {/* Color strip at top */}
                <CardHeader>
                  <div className={`mb-4 inline-flex p-3 rounded-full ${pillar.bg} ${pillar.color} w-fit group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#1560BD] group-hover:text-primary transition-colors">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
