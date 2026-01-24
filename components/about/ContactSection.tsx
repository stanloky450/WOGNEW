"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Globe, ArrowRight } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "64 Old Lagos Asaba Road, Agbor, Delta State, Nigeria",
  },
  {
    icon: Globe,
    label: "Website",
    value: "wgministries.org",
  },
];

const ContactSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gold/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Join us at Trans-Continental Worship Center or connect online.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-card border-gold/20 shadow-elevated overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        <p className="font-medium text-foreground">
                          {info.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-10 pt-8 border-t border-border"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        Visit Our Website
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Explore more about Word of Grace Ministries
                      </p>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="bg-gradient-gold text-primary-foreground hover:opacity-90 transition-opacity shadow-gold"
                        size="lg"
                        onClick={() => window.open("https://www.wgministries.org", "_blank")}
                      >
                        Visit Website
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="font-display text-2xl md:text-3xl italic text-foreground/80 max-w-3xl mx-auto">
            "Learn all you can and also can all you learn."
          </p>
          <p className="text-gold mt-4 font-medium">— Rev. Goodwill Adogho</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
