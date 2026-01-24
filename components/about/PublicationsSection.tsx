"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const books = [
  {
    title: "Faith at its Best",
    description:
      "A profound exploration of faith and its transformative power in the believer's life.",
  },
  {
    title: "Language of Zion",
    description:
      "Understanding the spiritual language and communication of the Kingdom of God.",
  },
];

const PublicationsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Publications
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Books & Writings
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Spreading the Word through the written page — teachings that
            continue to transform lives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {books.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full bg-gradient-card border-gold/20 shadow-soft hover:shadow-gold transition-all duration-500 group overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity" />

                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6"
                    whileHover={{ rotate: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BookOpen className="w-8 h-8 text-primary-foreground" />
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>

                  <motion.div
                    className="mt-6 flex items-center gap-2 text-gold font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn More</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
