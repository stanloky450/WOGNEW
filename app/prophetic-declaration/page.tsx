"use client";

import { useState } from "react";
import Header from "@/components/Navigation";
import MonthSelector from "@/components/month-selector";
import PrayerPoints from "@/components/prayer-points";
import Footer from "@/components/Footer";

const monthVideos = {
	Year: {
		title: "2026 PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/vBo5YOEAOFk?si=MmseM2wCEtXD4W6L",
	},
	JANUARY: {
		title: "JANUARY PROPHETIC DECLARATION",
		youtubeUrl: "https://www.youtube.com/embed/vBo5YOEAOFk?si=MmseM2wCEtXD4W6L",
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
    // Default to 'Year' so the main video shows covering the logic
	const [selectedMonth, setSelectedMonth] = useState<string>("Year");
	const [selectedVideo, setSelectedVideo] = useState<{
		title: string;
		youtubeUrl: string;
		month?: string;
	}>(monthVideos.Year);


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
                    {/* Featured Video Cover */}
                    {selectedVideo && (
                        <div className="mb-12">
                            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 tracking-tight">
                                {selectedVideo.title}
                            </h1>
                            <div className="max-w-5xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-400/30">
                                <div className="aspect-video">
                                    <iframe 
                                        src={`${selectedVideo.youtubeUrl}?autoplay=1&rel=0`}
                                        title={selectedVideo.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}

					<MonthSelector
						selectedMonth={selectedMonth === "Year" ? null : selectedMonth}
						onMonthSelect={handleMonthSelect}
					/>
                    
                    {/* Only show prayer points if a specific month is selected, not Year */}
					{selectedMonth !== "Year" && (
                        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <PrayerPoints month={selectedMonth} />
                        </div>
                    )}
				</main>
				<Footer />
			</div>
		</div>
	);
}
