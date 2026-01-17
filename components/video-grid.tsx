"use client";

interface VideoGridProps {
	onVideoClick: (video: { title: string; youtubeUrl: string }) => void;
}

const topVideos = [
	{
		title: "FATHERLY'S BLESSING & PROPHETIC DECLARATION FOR THE YEAR",
		youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	// {
	//   title: "PASTOR SOLA OLUKOYA'S 2026 DECLARATION",
	//   youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	// },
];

export default function VideoGrid({ onVideoClick }: VideoGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
			{topVideos.map((video) => (
				<div
					key={video.title}
					onClick={() => onVideoClick(video)}
					className="cursor-pointer group"
				>
					<div className="text-center mb-3">
						<p className="text-white text-sm font-semibold uppercase tracking-wider">
							{video.title}
						</p>
					</div>
					<div className="bg-gray-300 rounded-2xl aspect-video hover:shadow-2xl transition-all group-hover:scale-105 overflow-hidden">
						<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400 text-gray-600">
							<div className="text-center">
								<div className="text-4xl mb-2">▶️</div>
								<p className="text-sm">Click to play</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
