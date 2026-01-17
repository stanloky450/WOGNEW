
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/utils"
// import Image from "next/image"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const event = await db.event.findUnique({
    where: { id }
  })

  if (!event) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden text-black">
          {event.coverImage && (
            <div className="w-full h-[400px] relative">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <header className="mb-8">
              <div className="flex gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {event.published ? 'Published' : 'Draft'}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 bg-gray-50 p-4 rounded-lg mb-6">
                <div>
                    <strong>Date:</strong> {formatDate(event.date)}
                </div>
                <div>
                   <strong>Time:</strong> {event.time || "TBA"}
                </div>
                <div className="md:col-span-2">
                    <strong>Location:</strong> {event.location || "TBA"}
                </div>
              </div>

            </header>

            <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap">
              {event.description}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
