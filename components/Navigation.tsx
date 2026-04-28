"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
		setIsAboutOpen(false);
	}, [pathname]);

	const closeMenu = () => {
		setIsOpen(false);
		setIsAboutOpen(false);
	};

	return (
		<nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/" className="flex items-center space-x-2">
					<img
					src="/images/WOGLOGO.png"
					alt="Logo"
					height={30}
					width={40}
					/>
						{/* <span className="text-2xl font-bold text-primary">WOG</span> */}
						<span className="text-sm font-semibold text-gray-700 hidden sm:block">
							Word of Grace Ministries
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
						
						<div className="relative group">
							<button className="flex items-center space-x-1 text-gray-700 hover:text-primary transition focus:outline-none">
								<span>About</span>
								<svg 
									xmlns="http://www.w3.org/2000/svg" 
									width="16" 
									height="16" 
									viewBox="0 0 24 24" 
									fill="none" 
									stroke="currentColor" 
									strokeWidth="2" 
									strokeLinecap="round" 
									strokeLinejoin="round" 
									className="transition-transform duration-200 group-hover:rotate-180"
								>
									<path d="m6 9 6 6 6-6"/>
								</svg>
							</button>
							<div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform origin-top-left z-50">
								<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
									<Link
										href="/about"
										className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
										role="menuitem"
									>
										About Us
									</Link>
									<Link
										href="/goodwill_adogho"
										className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary border-t border-gray-100"
										role="menuitem"
									>
										Rev. Goodwill Adogho
									</Link>
								</div>
							</div>
						</div>

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
						<Link href="/membership-bio">
							<Button variant="outline">Membership Bio</Button>
						</Link>
						<Link href="/give">
							<Button>GIVE </Button>
						</Link>
						{/* <Link href="/dashboard">
							<Button variant="outline">Dashboard</Button>
						</Link> */}
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden text-gray-700 p-2"
						aria-label="Toggle mobile menu"
						aria-expanded={isOpen}
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden bg-white border-t max-h-[calc(100vh-4rem)] overflow-y-auto">
					<div className="px-3 py-3 space-y-1">
						<Link
							href="/"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={closeMenu}
						>
							Home
						</Link>

						<button
							type="button"
							onClick={() => setIsAboutOpen((prev) => !prev)}
							className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between"
							aria-expanded={isAboutOpen}
						>
							<span>About</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={`transition-transform ${isAboutOpen ? "rotate-180" : ""}`}
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</button>

						{isAboutOpen && (
							<div className="pl-4 space-y-1">
								<Link
									href="/about"
									className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
									onClick={closeMenu}
								>
									About Us
								</Link>
								<Link
									href="/goodwill_adogho"
									className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
									onClick={closeMenu}
								>
									Rev. Goodwill Adogho
								</Link>
							</div>
						)}

						<Link
							href="/gallery"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={closeMenu}
						>
							Gallery
						</Link>
						<Link
							href="/events"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={closeMenu}
						>
							Events
						</Link>
						<Link
							href="/news"
							className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
							onClick={closeMenu}
						>
							News
						</Link>

						<div className="pt-2 space-y-2">
							<Link href="/first-timer" onClick={closeMenu} className="block">
								<Button className="w-full">First Timer</Button>
							</Link>
							<Link href="/membership-bio" onClick={closeMenu} className="block">
								<Button variant="outline" className="w-full">Membership Bio</Button>
							</Link>
							<Link href="/give" onClick={closeMenu} className="block">
								<Button className="w-full">Give</Button>
							</Link>
						</div>
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
