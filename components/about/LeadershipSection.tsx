"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LeadershipSection = () => {
    return (
        <section className="mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold mb-4 text-[#1560BD]">
                    Our Leadership
                </h2>
                <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <Card className="overflow-hidden border-none shadow-xl">
                    <div className="grid md:grid-cols-[1.2fr,3fr]">
                        <div className="relative h-[400px] md:h-auto">
                            <img
                                src="/images/Rev1.jpeg"
                                alt="Rev. Goodwill Adogho"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Rev. Goodwill Adogho</h3>
                                    <p className="text-white/80">General Overseer & Founder</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-gray-900">
                            <div className="hidden md:block mb-6">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Rev. Goodwill Adogho
                                </h3>
                                <p className="text-primary font-medium text-lg uppercase tracking-wider">
                                    General Overseer & Founder
                                </p>
                            </div>

                            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>
                                    Rev. Goodwill Adogho is the visionary founder of Word of Grace Ministries. 
                                    Called by God at the tender age of 8, he has dedicated his life to 
                                    preaching the Gospel and raising disciples.
                                </p>
                                <p>
                                    With over 25 years of ministry impact, he leads with a heart of compassion 
                                    and a mandate to empower believers to prosper in all areas of life.
                                </p>
                            </div>

                            <div className="mt-8">
                                <Link href="/goodwill_adogho">
                                    <Button className="group gap-2">
                                        Read Full Biography
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </section>
    );
};

export default LeadershipSection;
