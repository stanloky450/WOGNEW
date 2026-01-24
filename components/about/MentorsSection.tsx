"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const mentors = [
  { name: "Kenneth Hagin", role: "Spiritual Influence" },
  { name: "Benny Hinn", role: "Spiritual Influence" },
  { name: "Benson Idahosa", role: "Nigerian Pioneer" },
  { name: "Bishop David Oyedepo", role: "Mentor" },
  { name: "Pastor Chris Oyakhilome", role: "Mentor" },
  { name: "Bishop Henry Saliu", role: "Spiritual Father" },
];

const MentorsSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Influences
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Spiritual Mentors & Influences
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Standing on the shoulders of giants — those who have shaped and
            influenced his ministry journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full bg-gradient-card border-gold/20 hover:shadow-gold transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Star className="w-6 h-6 text-gold" />
                  </motion.div>
                  <h4 className="font-display font-semibold text-foreground text-sm">
                    {mentor.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {mentor.role}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MentorsSection;
