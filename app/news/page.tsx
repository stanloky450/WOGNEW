"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

interface News {
	id: string;
	title: string;
	content: string;
	excerpt: string | null;
	coverImage: string | null;
	publishedAt: string;
    updatedAt: string; // Assuming API provides this, optional if not used
    author: {          // Added potential author field if API supports it, or will fallback
        name: string | null;
        email: string;
    } | null;
}

export default function NewsPage() {
	const [news, setNews] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		try {
			const response = await fetch("/api/news");
			const data = await response.json();
			if (data.success) {
				setNews(data.data.filter((n: any) => n.published));
			}
		} catch (error) {
			console.error("Error fetching news:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Navigation />
			<div className="pt-24 pb-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-12"
					>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
							Latest News
						</h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Stay updated with the latest from our ministry
						</p>
					</motion.div>

					{loading ? (
						<div className="flex justify-center py-20">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{news.map((item, index) => (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
								>
                                    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-t-transparent hover:border-t-primary">
                                        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                                            {item.coverImage ? (
                                                <img
                                                    src={item.coverImage}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50">
                                                    <span className="text-sm">No cover image</span>
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <Badge className="bg-primary/90 hover:bg-primary text-white shadow-sm backdrop-blur-sm">
                                                    News
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardHeader className="pb-3">
                                            <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                                                <Link href={`/news/${item.id}`} className="hover:underline">
                                                    {item.title}
                                                </Link>
                                            </CardTitle>
                                             {/* News might not always have specific author, but keeping layout consistent if available or defaulting to Admin/Church Name */}
                                            <CardDescription className="flex items-center gap-2 mt-2">
                                                <User size={14} /> 
                                                <span>{item.author?.name || "Church Administration"}</span>
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex-1 pb-3">
                                            {item.excerpt && (
                                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                                    {item.excerpt}
                                                </p>
                                            )}
                                            {!item.excerpt && (
                                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                                    {item.content}
                                                </p>
                                            )}
                                            
                                            <div className="space-y-1 text-xs text-gray-500 mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={12} />
                                                    <span>Published: {formatDate(item.publishedAt)}</span>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="pt-3 border-t bg-gray-50/50">
                                            <Button asChild className="w-full group-hover:bg-primary group-hover:text-white transition-colors" variant="outline">
                                                <Link href={`/news/${item.id}`}>
                                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}
