"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic2, HeartHandshake, ShieldCheck, Zap, Gem, Compass } from "lucide-react"

const values = [
  {
    title: "Worship Excellence",
    description: "We prioritize authentic, Spirit-filled worship that touches heaven and transforms lives.",
    icon: Mic2,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Compassionate Service",
    description: "We serve with love and compassion, meeting practical needs while sharing the Gospel.",
    icon: HeartHandshake,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    title: "Godly Leadership",
    description: "We develop leaders who lead with integrity, wisdom, and the fear of the Lord.",
    icon: ShieldCheck,
    gradient: "from-slate-600 to-gray-700",
  },
  {
    title: "Faith & Miracles",
    description: "We believe in the power of God to make the impossible possible every day.",
    icon: Zap,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Kingdom Prosperity",
    description: "We teach and demonstrate God's principles for financial blessing and spiritual abundance.",
    icon: Gem,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Divine Purpose",
    description: "We help people discover and fulfill their God-given destiny and dreams.",
    icon: Compass,
    gradient: "from-violet-500 to-purple-600",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } as const },
}

export default function CoreValues() {
  return (
    <div className="mb-16 px-4 md:px-8">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#1560BD]">
        Our Core Values
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {values.map((value, index) => {
          const Icon = value.icon
          return (
            <motion.div key={index} variants={item}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${value.gradient} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150`} />
                
                <CardHeader className="relative">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:rotate-6 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
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
