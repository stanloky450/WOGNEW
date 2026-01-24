"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, GraduationCap, Heart } from "lucide-react";

const infoCards = [
  {
    icon: Calendar,
    label: "Born",
    value: "July 5th, 1967",
    detail: "Sapele, Delta State",
  },
  {
    icon: MapPin,
    label: "Origin",
    value: "Urhobo",
    detail: "Delta State, Nigeria",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "Institute of Faith",
    detail: "Under Bishop Henry Saliu",
  },
  {
    icon: Heart,
    label: "Family",
    value: "Married to Faith Adogho",
    detail: "Since October 17th, 1972",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const BiographySection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Biography
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Early Life & Background
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {infoCards.map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-gradient-card border-border/50 hover:shadow-gold transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <card.icon className="w-6 h-6 text-gold" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {card.label}
                  </p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {card.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {card.detail}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-card border-gold/20 shadow-soft overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-1 h-24 bg-gradient-gold rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    The Journey Begins
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    On July 5th, 1967, Goodwill Samuel Iwesiri Adogho was born in
                    Sapele, Delta State, Nigeria. Raised by parents who were
                    members of the Jehovah's Witness movement, his path to ministry
                    would take an unexpected turn.
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                After completing his education at Association Primary School and
                Zik Grammar School in Sapele, at age 16-17, he encountered Jesus
                at a crusade held by Bishop Henry Saliu on Easter Friday 1984. This
                life-changing moment set him on a path of devoted ministry.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gold/5 border border-gold/10"
                >
                  <p className="text-3xl font-display font-bold text-gold mb-2">
                    1 Daughter
                  </p>
                  <p className="text-muted-foreground">
                    Barr. Mrs. Sharoon Goodwill Peters
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gold/5 border border-gold/10"
                >
                  <p className="text-3xl font-display font-bold text-gold mb-2">
                    2 Grandchildren
                  </p>
                  <p className="text-muted-foreground">
                    A blessed family legacy
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BiographySection;
