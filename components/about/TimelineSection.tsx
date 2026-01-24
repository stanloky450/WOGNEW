"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timelineEvents = [
  {
    year: "1967",
    title: "Birth",
    description: "Born in Sapele, Delta State, Nigeria on July 5th.",
  },
  {
    year: "1984",
    title: "Salvation",
    description:
      "Encountered Jesus at Bishop Henry Saliu's crusade on Easter Friday.",
  },
  {
    year: "1984-1992",
    title: "Training",
    description:
      "Studied at Institute of Faith and served under spiritual mentors.",
  },
  {
    year: "1996",
    title: "Ministry Launch",
    description:
      "Word of Grace Ministries begins in his living room with 8 members.",
  },
  {
    year: "2011",
    title: "Foundation Laid",
    description:
      "Foundation laid for 1,000-capacity Trans-Continental Worship Centre.",
  },
  {
    year: "Present",
    title: "Continuing Legacy",
    description:
      "Leading TCWC and impacting lives through teaching, writing, and television.",
  },
];

const TimelineSection = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Life Timeline
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold to-gold/20 transform -translate-x-1/2 hidden md:block" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative flex items-center mb-8 ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gold z-10 hidden md:block"
                whileInView={{ scale: [0, 1.5, 1] }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
              />

              {/* Card */}
              <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring" }}>
                  <Card className="bg-gradient-card border-gold/20 shadow-soft hover:shadow-gold transition-all duration-300">
                    <CardContent className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold font-display font-bold text-sm mb-3">
                        {event.year}
                      </span>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
