"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Masonry from "react-masonry-css";

export default function BlogPage() {
	// This would fetch from API in production
	const blogs = [
		{
			id: 1,
			title: "5 Ways to Strengthen Your Prayer Life",
			excerpt:
				"Prayer is the foundation of our relationship with God. Here are five practical ways to deepen your prayer life and experience more of His presence.",
			author: "Pastor William",
			date: "2024-01-05",
			category: "Spiritual Growth",
			slug: "strengthen-prayer-life",
		},
		{
			id: 2,
			title: "Understanding Biblical Grace",
			excerpt:
				"Grace is more than just a theological concept - it's the very foundation of our salvation and daily walk with Christ. Let's explore what the Bible teaches about grace.",
			author: "Sarah Johnson",
			date: "2024-01-03",
			category: "Theology",
			slug: "understanding-biblical-grace",
		},
		{
			id: 3,
			title: "Walking in Faith During Difficult Times",
			excerpt:
				"When life gets hard, our faith can falter. Learn how to maintain trust in God during life's storms and emerge stronger.",
			author: "Elder Mark",
			date: "2024-01-01",
			category: "Faith",
			slug: "faith-difficult-times",
		},
		{
			id: 4,
			title: "The Importance of Community in Faith",
			excerpt:
				"We were never meant to walk this Christian journey alone. Discover the biblical basis for community and fellowship.",
			author: "Pastor William",
			date: "2023-12-28",
			category: "Community",
			slug: "importance-community-faith",
		},
		{
			id: 5,
			title: "Hearing God's Voice",
			excerpt:
				"How do we know when God is speaking to us? Learn to recognize and respond to God's voice in your daily life.",
			author: "Sarah Johnson",
			date: "2023-12-25",
			category: "Spiritual Growth",
			slug: "hearing-gods-voice",
		},
	];

	const breakpointColumns = {
		default: 3,
		1024: 2,
		640: 1,
	};

	return (
		<div className="py-16">
			<div className="container-custom">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Insights, teachings, and inspiration from our ministry to help you
						grow in your faith
					</p>
				</motion.div>

				<Masonry
					breakpointCols={breakpointColumns}
					className="flex -ml-6 w-auto"
					columnClassName="pl-6 bg-clip-padding"
				>
					{blogs.map((blog, index) => (
						<motion.div
							key={blog.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -5 }}
							className="mb-6"
						>
							<Link href={`/blog/${blog.slug}`} className="card block group">
								<div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600" />

								<div className="p-6">
									<div className="flex items-center gap-2 mb-3">
										<span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
											{blog.category}
										</span>
										<span className="text-xs text-gray-500">
											{new Date(blog.date).toLocaleDateString()}
										</span>
									</div>

									<h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
										{blog.title}
									</h3>

									<p className="text-gray-600 mb-4">{blog.excerpt}</p>

									<div className="flex items-center justify-between text-sm text-gray-500">
										<span>{blog.author}</span>
										<span className="text-primary-600 font-medium group-hover:underline">
											Read More →
										</span>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</Masonry>
			</div>
		</div>
	);
}
