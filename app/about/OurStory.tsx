"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const milestones = [
  {
    year: "Origin",
    title: "The Divine Call",
    content: (
      <>
        Word of Grace Ministries was birthed from prayer in Ghana, when the founder received a
        divine calling:
        <div className="my-4 pl-4 border-l-4 border-[#1560BD] italic text-gray-700 bg-blue-50/50 p-4 rounded-r-lg">
          <Quote className="inline w-4 h-4 mr-2 text-[#1560BD] opacity-50 mb-2" />
          "I will get the work started and keep the work going."
        </div>
        This profound promise became the foundation of a ministry that has touched countless lives.
      </>
    ),
  },
  {
    year: "1996",
    title: "The Humble Beginning",
    content: (
      <>
        On <span className="font-semibold text-[#1560BD]">April 10, 1996</span>, the ministry officially launched in a living room
        with just five initial members: the founder&apos;s wife, daughter, and two others.
        <br /><br />
        What seemed like a humble beginning was marked by divine confirmation — during the first
        service, birds flew in and began singing, interpreted as a sign of God&apos;s approval.
        By the first Sunday, attendance had already grown to eight people.
      </>
    ),
  },
  {
    year: "Today",
    title: "A Thriving Community",
    content: (
      <>
        Today, Word of Grace Ministries operates from a permanent location along Lagos-Asaba Road
        in Agbor, Delta State, Nigeria.
        <div className="mt-4 mb-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                Current Project
            </Badge>
            <span className="ml-2 text-sm font-medium">1,000-seater building in progress</span>
        </div>
        The ministry stands on the founding promise that <span className="font-semibold text-[#1560BD]">"this Ministry shall know no lack"</span> — 
        a promise that continues to be fulfilled as God provides for His work.
      </>
    ),
  },
]

export default function OurStory() {
  return (
    <div className="max-w-4xl mx-auto mb-16 px-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#1560BD]">
        Our Story
      </h2>
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot (Desktop) */}
              <div className="absolute left-1/2 top-0 w-4 h-4 bg-[#1560BD] rounded-full -translate-x-1/2 mt-6 ring-4 ring-white shadow-sm hidden md:block z-10" />

              {/* Content Card */}
              <div className="flex-1">
                <Card className="border-t-4 border-t-[#1560BD] shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                         <Badge className="bg-[#1560BD] text-white hover:bg-blue-700">
                            {milestone.year}
                         </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {milestone.title}
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      {milestone.content}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spacer for Timeline Alignment */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center max-w-2xl mx-auto"
        >
            <p className="text-xl text-gray-600 italic">
                "Through the years, we have remained faithful to our divine mandate..."
            </p>
        </motion.div>
      </div>
    </div>
  )
}
