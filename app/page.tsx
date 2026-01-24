import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedSections from "@/components/FeaturedSections";
import Footer from "@/components/Footer";
import DailyDevotional from "@/components/DailyDevotional";
import MapSection from "@/components/MapSection";
import { db } from "@/lib/db";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  let latestPost = null;

  try {
    latestPost = await db.post.findFirst({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch latest post for homepage:", error);
    // Continue rendering with null latestPost (will show fallback)
  }

  // Serialize Date objects for Client Component
  const serializablePost = latestPost
    ? {
        ...latestPost,
        createdAt: latestPost.createdAt.toISOString(),
        updatedAt: latestPost.updatedAt.toISOString(),
        publishedAt: latestPost.publishedAt?.toISOString() || null,
      }
    : null;

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <DailyDevotional post={serializablePost} />
      <FeaturedSections />
      <MapSection />
      <Footer />
    </main>
  );
}
