"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Church, Users, BookOpen, Tv } from "lucide-react";

const ministryStats = [
  { icon: Church, value: "1996", label: "Ministry Founded" },
  { icon: Users, value: "8", label: "Initial Members" },
  { icon: BookOpen, value: "2", label: "Books Published" },
  { icon: Tv, value: "1,000", label: "Seat Capacity" },
];

const MinistrySection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--gold)/0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,hsl(var(--gold)/0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Ministry
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Word of Grace Ministries
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Also known as Trans-Continental Worship Center (TCWC), located in
            Agbor, Delta State, Nigeria.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {ministryStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <Card className="bg-gradient-card border-gold/20 shadow-soft h-full">
                <CardContent className="p-8">
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-2xl bg-gradient-gold flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Ministry History */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-display font-bold text-foreground mb-6">
              From Living Room to{" "}
              <span className="text-gradient-gold">Trans-Continental</span>
            </h3>

            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Word of Grace Ministries kicked off in 1996 in Rev. Adogho's
                living room with just 8 members. After the first Sunday service,
                the landlady gave them notice to leave.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                By faith, Rev. Adogho declared they would not be there the next
                Sunday. Through divine guidance and a meeting with Bishop Godwill
                Iweribor, they found their permanent home at 64 Old Lagos Asaba
                Road, Agbor.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                In 2011, the foundation was laid for what is now the 1,000-capacity
                Trans-Continental Worship Centre — a testament to God's faithfulness.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden shadow-soft"
              >
                <img
                  src="/images/Rev2.jpg"
                  alt="Ministry Event"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden shadow-soft mt-8"
              >
                <img
                  src="/images/Rev3.jpg"
                  alt="Worship Service"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden shadow-soft"
              >
                <img
                  src="/images/Rev4.jpg"
                  alt="Church Building"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden shadow-soft mt-8"
              >
                <img
                  src="/images/Rev5.jpg"
                  alt="Rev. Adogho Preaching"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MinistrySection;
