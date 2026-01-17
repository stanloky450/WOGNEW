
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/utils"
// import Image from "next/image" // Using standard img for resilience
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const post = await db.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true }
      }
    }
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden text-black">
          {post.coverImage && (
            <div className="w-full h-[400px] relative">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <header className="mb-8">
              <div className="flex gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-gray-500 text-sm py-1">
                   • {formatDate(post.createdAt)}
                </span>
                {post.author.name && (
                    <span className="text-gray-500 text-sm py-1">
                        • By {post.author.name}
                    </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 italic border-l-4 border-blue-500 pl-4">
                  {post.excerpt}
                </p>
              )}
            </header>

            <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
