"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Navigation } from "lucide-react";
import Link from "next/link";

export default function MapSection() {
  return (
    <section className="py-10 bg-white dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4 text-primary text-4xl">Visit Us</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We would love to welcome you in person. Join us for our weekly services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-none shadow-xl ring-1 ring-gray-200 dark:ring-gray-800">
            <div className="grid lg:grid-cols-[1fr,1.5fr] min-h-[850px]">
              {/* Information Side */}
              <div className="p-4 flex flex-col justify-center bg-gray-50 dark:bg-gray-900 relative">
                {/* Decorative Pattern */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-600" />
                
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Our Location
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-200 mb-2">Address</h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            No 64 Old Lagos Asaba Road,<br />                            
                            Agbor, Delta State,<br />
                            Nigeria.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2">
                             <Clock className="w-5 h-5 text-primary" />
                             Service Times
                        </h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2 gap-4">
                                <span>Sunday Service</span>
                                <span className="font-medium text-primary whitespace-nowrap">8:00 AM</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2 gap-4">
                                <span>Wednesday Bible Study</span>
                                <span className="font-medium text-primary whitespace-nowrap">5:00 PM</span>
                            </li>
                             <li className="flex justify-between pb-2 gap-4">
                                <span>Friday Prayer Meeting</span>
                                <span className="font-medium text-primary whitespace-nowrap">5:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4">
                    <Link href="https://maps.google.com/?q=Agbor,+Delta+State,+Nigeria" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="w-full gap-2 shadow-lg hover:shadow-primary/25 transition-all">
                            <Navigation className="w-4 h-4" />
                            Get Directions
                        </Button>
                    </Link>
                </div>
              </div>

              {/* Map Side */}
              <div className="relative px-8 w-full h-full min-h-[750px] lg:min-h-full bg-gray-200">
                <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Church Location Map"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1098.2121968573838!2d6.19386452857116!3d6.253285583136272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10414ef80707cefd%3A0x63b28cc9619da10e!2sWord%20Of%20Grace%20Ministries!5e0!3m2!1sen!2sng!4v1769281573896!5m2!1sen!2sng" 
                >
                </iframe>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
