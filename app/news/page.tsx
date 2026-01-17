"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface News {
	id: string;
	title: string;
	content: string;
	excerpt: string | null;
	coverImage: string | null;
	publishedAt: string;
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
			<div className="pt-24 pb-2">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-12"
					>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
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
						<div className="grid gap-6">
							{news.map((item, index) => (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
								>
									<Link href={`/news/${item.id}`} className="block h-full">
										<Card className="hover:shadow-lg transition-shadow h-full overflow-hidden flex flex-col">
											{item.coverImage && (
												<div className="h-48 w-full overflow-hidden">
													<img
														src={item.coverImage}
														alt={item.title}
														className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
													/>
												</div>
											)}
											<CardHeader>
												<div className="flex justify-between items-start">
													<div>
														<CardTitle className="text-2xl mb-2 hover:text-primary transition-colors">
															{item.title}
														</CardTitle>
														<p className="text-sm text-gray-600">
															{formatDate(item.publishedAt)}
														</p>
													</div>
												</div>
											</CardHeader>
											<CardContent>
												{item.excerpt && (
													<p className="text-gray-700 font-semibold mb-2">
														{item.excerpt}
													</p>
												)}
												<p className="text-gray-600 line-clamp-3">
													{item.content}
												</p>
											</CardContent>
										</Card>
									</Link>
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
