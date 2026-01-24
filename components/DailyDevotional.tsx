"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { 
  BookOpen, 
  Calendar, 
  Share2, 
  ArrowRight, 
  Quote 
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DailyDevotional({ post }: { post?: any }) {
  // Mock data as fallback
  const fallbackDevotional = {
    title: "Walking in Faith",
    scripture: {
      reference: "Hebrews 11:1",
      text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    },
    excerpt:
      "Faith is not just believing in God, but trusting Him completely with every aspect of our lives. It is the bedrock of our Christian walk, allowing us to see beyond the visible and hold onto the eternal promises of our Father.",
    author: "Pastor Grace",
    date: new Date().toISOString(),
    coverImage: null,
  };

  // If post exists, map it to the display format. 
  // Note: The Post model doesn't have a specific 'scripture' field, so we use a generic placeholder or part of the content if we could parse it. 
  // For now, we'll keep the static scripture if it's a dynamic post, or just show a generic message if we can't extract it.
  // Actually, let's use the Post's clean data. 
  // We will assume the post content *is* the devotional.
  
  const displayData = post ? {
    title: post.title,
    excerpt: post.excerpt || post.content.substring(0, 150) + "...",
    date: post.publishedAt || post.createdAt,
    author: post.author?.name || "Church Team",
    coverImage: post.coverImage,
    // Since we don't have separate scripture fields in Post, we'll use a display logic:
    // If coverImage exists, show it on the side. 
    // If NOT, maybe show a static daily scripture or just a quote icon.
    // For this implementation, I will stick to the layout but if `coverImage` is present, I'll use it in the side panel.
    scripture: {
        text: "The word of the Lord is a lamp to my feet and a light to my path.",
        reference: "Psalm 119:105"
    }
  } : fallbackDevotional;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary bg-primary/5">
            Spiritual Nourishment
          </Badge>
          <h2 className="section-title mb-4">Word for Today</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Daily insights to strengthen your walk with Christ and empower your spiritual journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto overflow-hidden border-none shadow-xl bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">
            <div className="grid md:grid-cols-[1.5fr,1fr] lg:grid-cols-[2fr,1fr]">
              <div className="p-8 md:p-10 flex flex-col justify-between relative order-2 md:order-1">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{format(new Date(displayData.date), "MMMM d, yyyy")}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>{displayData.author}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                    {displayData.title}
                  </h3>

                  <div className="mb-8 relative">
                    <Quote className="absolute -top-4 -left-6 w-8 h-8 text-primary/10 rotate-180" />
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {displayData.excerpt}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 relative">
                  <Link href={post ? `/posts/${post.id}` : "/devotionals"} className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto gap-2 group">
                      Read Full Devotional
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Scripture Side / Visual */}
              <div className={`relative flex flex-col justify-center order-1 md:order-2 ${displayData.coverImage ? 'p-0' : 'bg-primary/5 dark:bg-primary/10 p-8 md:p-10 border-b md:border-b-0 md:border-l border-primary/10'}`}>
                 {displayData.coverImage ? (
                    <div className="absolute inset-0 w-full h-full">
                        <img 
                            src={displayData.coverImage} 
                            alt={displayData.title} 
                            className="w-full h-full object-cover"
                        />
                         <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                    </div>
                 ) : (
                    <>
                        <div className="relative z-10">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            Scripture for Today
                            </h4>
                            <blockquote className="space-y-4">
                            <p className="text-xl md:text-2xl font-serif italic text-gray-800 dark:text-gray-100 leading-relaxed">
                                "{displayData.scripture.text}"
                            </p>
                            <footer className="font-semibold text-primary">
                                — {displayData.scripture.reference}
                            </footer>
                            </blockquote>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-1/2 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
                    </>
                 )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
