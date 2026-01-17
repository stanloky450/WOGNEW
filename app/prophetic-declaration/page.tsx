"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Navigation";
import VideoGrid from "@/components/video-grid";
import MonthSelector from "@/components/month-selector";
import PrayerPoints from "@/components/prayer-points";
import Footer from "@/components/Footer";
import VideoModal from "@/components/video-modal";

const monthVideos = {
	JANUARY: {
		title: "JANUARY PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	FEBRUARY: {
		title: "FEBRUARY PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	MARCH: {
		title: "MARCH PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	APRIL: {
		title: "APRIL PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	MAY: {
		title: "MAY PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	JUNE: {
		title: "JUNE PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	JULY: {
		title: "JULY PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	AUGUST: {
		title: "AUGUST PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	SEPTEMBER: {
		title: "SEPTEMBER PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	OCTOBER: {
		title: "OCTOBER PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	NOVEMBER: {
		title: "NOVEMBER PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	DECEMBER: {
		title: "DECEMBER PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
};

export default function Home() {
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
	const [selectedVideo, setSelectedVideo] = useState<{
		title: string;
		youtubeUrl: string;
		month?: string;
	} | null>(null);

	useEffect(() => {
		const currentDate = new Date();
		const currentMonthIndex = currentDate.getMonth();
		const currentMonth = months[currentMonthIndex];

		setSelectedMonth(currentMonth);
		const video = monthVideos[currentMonth as keyof typeof monthVideos];
		if (video) {
			setSelectedVideo({ ...video, month: currentMonth });
		}
	}, []);

	const months = [
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER",
	];

	const handleMonthSelect = (month: string) => {
		setSelectedMonth(month);
		const video = monthVideos[month as keyof typeof monthVideos];
		if (video) {
			setSelectedVideo({ ...video, month });
		}
	};

	return (
		<div>
			<Header />
			<div className="min-h-screen bg-gradient-to-br mt-14 from-purple-900 via-purple-800 to-purple-600">
				<main className="container mx-auto px-4 py-8">
					<VideoGrid onVideoClick={setSelectedVideo} />
					<MonthSelector
						selectedMonth={selectedMonth}
						onMonthSelect={handleMonthSelect}
					/>
					<PrayerPoints month={selectedMonth} />
				</main>
				<Footer />

				{selectedVideo && (
					<VideoModal
						video={selectedVideo}
						onClose={() => setSelectedVideo(null)}
					/>
				)}
			</div>
		</div>
	);
}
