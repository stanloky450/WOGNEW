"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Sparkles } from "lucide-react";

const mandates = [
  {
    icon: Users,
    title: "Raising Worshippers",
    description:
      "Building an army of dedicated worshippers who know how to enter God's presence with praise.",
  },
  {
    icon: Target,
    title: "Developing Leaders",
    description:
      "Equipping and empowering leaders for effective kingdom service and impact.",
  },
  {
    icon: Sparkles,
    title: "Making Dreams Reality",
    description:
      "Helping people discover God's purpose and making their divine dreams come true.",
  },
];

const MandateSection = () => {
  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full border border-gold/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-gold/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-light font-medium text-sm uppercase tracking-wider">
            The Vision
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
            Ministry <span className="text-gradient-gold">Mandate</span>
          </h2>
          <p className="text-background/70 mt-4 max-w-2xl mx-auto">
            The divine assignment driving Word of Grace Ministries forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {mandates.map((mandate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="h-full bg-background/5 backdrop-blur-sm border-gold/20 hover:bg-background/10 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-3xl bg-gradient-gold flex items-center justify-center mb-6"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <mandate.icon className="w-10 h-10 text-foreground" />
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold text-background mb-4">
                    {mandate.title}
                  </h3>
                  <p className="text-background/70 leading-relaxed">
                    {mandate.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MandateSection;
