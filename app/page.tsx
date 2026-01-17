import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedSections from "@/components/FeaturedSections";
import Footer from "@/components/Footer";
import DailyDevotional from "@/components/DailyDevotional";

export default function Home() {
	return (
		<main className="min-h-screen">
			<Navigation />
			<Hero />
			<DailyDevotional />
			<FeaturedSections />
			<Footer />
		</main>
	);
}
