"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

export default function HighlightsSection() {
  return (
    <section className="py-16 px-8 bg-white dark:bg-gray-950">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Yearly Declaration Video Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full overflow-hidden shadow-lg border-2 border-primary/10">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl text-primary">
                  <PlayCircle className="w-6 h-6" />
                  2026 Fatherly's Blessing
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/vBo5YOEAOFk?si=MmseM2wCEtXD4W6L"
                    title="2026 Prophetic Declaration"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Watch the prophetic declaration and fatherly blessing for the year 2026 by Rev. Goodwill Adogho. 
                    Step into your season of fulfillment and divine acceleration.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team of the Year Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full overflow-hidden shadow-lg border-2 border-gold/20">
              <CardHeader className="bg-gold/5 border-b border-gold/10">
                <CardTitle className="text-xl md:text-2xl text-gold-dark">
                  Theme of the Year 2026
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 relative h-[400px] md:h-auto min-h-[300px]">
                <img
                  src="/images/TCWC.png"
                  alt="Team of the Year"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              
              </CardContent>
              <CardContent>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                  <div className="p-6 text-black">
                    <h3 className="text-2xl font-bold mb-2">Excellence in Service</h3>
                    <p className="opacity-90">
                      Celebrating the dedicated men and women who have served with distinction and passion throughout the year.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
