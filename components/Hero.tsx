"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight, Heart, Users, BookOpen } from "lucide-react";

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
				<div className="text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
							Welcome to <br />
							<span className="text-yellow-300">Word Of Grace Ministries</span>
						</h1>
					</motion.div>

					<motion.p
						className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						A Place of Worship, Fellowship, and Spiritual Growth in Agbor
					</motion.p>

					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<Link href="/first-timer">
							<Button
								size="lg"
								className="bg-yellow-400 text-blue-900 hover:bg-yellow-300"
							>
								I'm New Here
								<ChevronRight className="ml-2" />
							</Button>
						</Link>
						<Link href="/about">
							<Button
								size="lg"
								variant="outline"
								className="bg-white/10 text-white border-white hover:bg-white/20"
							>
								Learn More
							</Button>
						</Link>
					</motion.div>

					{/* Service Times */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						<motion.div
							className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
							whileHover={{
								scale: 1.05,
								backgroundColor: "rgba(255, 255, 255, 0.15)",
							}}
							transition={{ duration: 0.3 }}
						>
							<Heart className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
							<h3 className="text-xl font-semibold text-white mb-2">
								Sunday Services
							</h3>
							<p className="text-white/80">LeaderShip Training: 8:00 AM</p>
							<p className="text-white/80">Celebration: 9:30 AM</p>
						</motion.div>

						<motion.div
							className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
							whileHover={{
								scale: 1.05,
								backgroundColor: "rgba(255, 255, 255, 0.15)",
							}}
							transition={{ duration: 0.3 }}
						>
							<BookOpen className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
							<h3 className="text-xl font-semibold text-white mb-2">
								Midweek Services
							</h3>
							<p className="text-white/80">Wednesday Word Alive: 5:00 PM</p>
							<p className="text-white/80">Friday Prayer: 5:00 PM</p>
						</motion.div>

						<motion.div
							className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
							whileHover={{
								scale: 1.05,
								backgroundColor: "rgba(255, 255, 255, 0.15)",
							}}
							transition={{ duration: 0.3 }}
						>
							<Users className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
							<h3 className="text-xl font-semibold text-white mb-2">
								Special Services
							</h3>
							<p className="text-white/80">Covenant Day: 1st of Month</p>
							<p className="text-white/80">Celebration: 3rd Sunday</p>
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<ChevronRight className="w-6 h-6 text-white rotate-90" />
			</motion.div>
		</section>
	);
}
