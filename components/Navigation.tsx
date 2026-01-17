"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-2xl font-bold text-primary">WOG</span>
						<span className="text-sm font-semibold text-gray-700 hidden sm:block">
							Word of Grace
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="/"
							className="text-gray-700 hover:text-primary transition"
						>
							Home
						</Link>
						<Link
							href="/about"
							className="text-gray-700 hover:text-primary transition"
						>
							About
						</Link>
						<Link
							href="/gallery"
							className="text-gray-700 hover:text-primary transition"
						>
							Gallery
						</Link>
						<Link
							href="/events"
							className="text-gray-700 hover:text-primary transition"
						>
							Events
						</Link>
						<Link
							href="/news"
							className="text-gray-700 hover:text-primary transition"
						>
							News
						</Link>
						<Link href="/first-timer">
							<Button>First Timer</Button>
						</Link>
						<Link href="/give">
							<Button>GIVE </Button>
						</Link>
						<Link href="/dashboard">
							<Button variant="outline">Dashboard</Button>
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden text-gray-700"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden bg-white border-t">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<Link
							href="/"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/about"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							About
						</Link>
						<Link
							href="/gallery"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							Gallery
						</Link>
						<Link
							href="/events"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							Events
						</Link>
						<Link
							href="/news"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							News
						</Link>
						<Link
							href="/first-timer"
							className="block px-3 py-2 text-primary font-semibold hover:bg-gray-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							First Timer
						</Link>
						<Link
							href="/give"
							className="block px-3 py-2 text-primary font-semibold hover:bg-yellow-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							Give Online
						</Link>
						{/* <Link
							href="/dashboard"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							Dashboard
						</Link> */}
					</div>
				</div>
			)}
		</nav>
	);
}
