"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function AboutHero() {
  return (
    <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1560BD] via-blue-700 to-blue-900 text-white shadow-2xl mx-4 md:mx-8">
        
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative px-6 py-20 md:py-32 text-center container mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="inline-flex items-center justify-center p-2 mb-6 bg-blue-800/50 backdrop-blur-sm rounded-full border border-blue-400/30 px-6">
                <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-blue-100 tracking-wide uppercase">Est. 1996</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
             About Word of Grace
             <span className="block text-blue-200">Ministries</span>
            </h1>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block"
        >
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-25"></div>
                <div className="relative px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                    <p className="text-xl md:text-2xl font-bold text-yellow-400 tracking-wide">
                        "A Place Where Dreams Come True"
                    </p>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  )
}
