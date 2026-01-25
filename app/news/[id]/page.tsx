
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/utils"
// import Image from "next/image"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import RichTextDisplay from "@/components/ui/rich-text-display"

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const news = await db.news.findUnique({
    where: { id }
  })

  if (!news) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden text-black">
          {news.coverImage && (
            <div className="w-full h-[400px] relative">
              <img
                src={news.coverImage}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <header className="mb-8">
              <div className="flex gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${news.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {news.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-gray-500 text-sm py-1">
                   • {formatDate(news.createdAt)}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>
              
              {news.excerpt && (
                <p className="text-xl text-gray-600 italic border-l-4 border-blue-500 pl-4">
                  {news.excerpt}
                </p>
              )}
            </header>

            <RichTextDisplay content={news.content} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
