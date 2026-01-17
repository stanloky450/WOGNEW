"use client";

import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Calendar, Newspaper, ImageIcon, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const features = [
	{
		icon: Calendar,
		title: "Upcoming Events",
		description:
			"Stay connected with our upcoming church events, programs, and special services",
		href: "/events",
		color: "bg-blue-500",
	},
	{
		icon: Newspaper,
		title: "Latest News",
		description: "Get the latest updates and announcements from our ministry",
		href: "/news",
		color: "bg-purple-500",
	},
	{
		icon: ImageIcon,
		title: "Photo Gallery",
		description:
			"Browse through memories of our services, events, and fellowship moments",
		href: "/gallery",
		color: "bg-pink-500",
	},
	{
		icon: Users,
		title: "Ministries",
		description: "Discover various ministries and find where you can serve",
		href: "/about",
		color: "bg-yellow-500",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function FeaturedSections() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Discover Our Ministry
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Join us in worship, fellowship, and growing together in faith
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{ y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<Card className="h-full hover:shadow-xl transition-shadow border-t-4 border-t-primary">
								<CardHeader>
									<div
										className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
									>
										<feature.icon className="w-8 h-8 text-white" />
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
									<CardDescription className="text-base">
										{feature.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Link href={feature.href}>
										<Button variant="outline" className="w-full">
											Learn More
										</Button>
									</Link>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white"
				>
					<h3 className="text-3xl md:text-4xl font-bold mb-4">
						Join Our Growing Family
					</h3>
					<p className="text-xl mb-8 opacity-90">
						Experience the love and grace of God in our vibrant community
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/first-timer">
							<Button
								size="lg"
								className="bg-white text-blue-600 hover:bg-gray-100"
							>
								I Want to Visit
							</Button>
						</Link>
						<Link href="/about">
							<Button
								size="lg"
								variant="outline"
								className="border-white text-white hover:bg-white/10"
							>
								Contact Us
							</Button>
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
