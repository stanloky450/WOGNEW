"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DailyDevotional() {
	// This would fetch from API in production
	const devotional = {
		title: "Walking in Faith",
		scripture: {
			reference: "Hebrews 11:1",
			text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
		},
		excerpt:
			"Faith is not just believing in God, but trusting Him completely with every aspect of our lives...",
		date: new Date().toISOString(),
	};

	return (
		<section className="py-16 bg-white">
			<div className="container-custom">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="section-title">Today's Devotional</h2>
					<p className="section-subtitle">
						Daily spiritual nourishment for your walk with Christ
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					whileHover={{ y: -5 }}
					className="max-w-3xl mx-auto card p-8 border-l-4 border-primary-600"
				>
					<div className="mb-4">
						<span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
							{new Date(devotional.date).toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</span>
					</div>

					<h3 className="text-2xl font-bold mb-4">{devotional.title}</h3>

					<div className="bg-primary-50 p-6 rounded-lg mb-6 border-l-4 border-primary-400">
						<p className="text-sm font-semibold text-primary-700 mb-2">
							{devotional.scripture.reference}
						</p>
						<p className="text-gray-700 italic">{devotional.scripture.text}</p>
					</div>

					<p className="text-gray-600 mb-6 leading-relaxed">
						{devotional.excerpt}
					</p>

					<Link href="/devotionals" className="btn btn-primary">
						Read Full Devotional
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
