# Word Of Grace Ministries Church Website

A modern, full-featured church website built with Next.js 14, TypeScript, Prisma, and Tailwind CSS. Features a beautiful frontend with Framer Motion animations and a comprehensive dashboard for content management.

## Features

### Frontend
- **Stunning Hero Section**: Vibrant gradient design with animated elements
- **Responsive Navigation**: Mobile-friendly navigation with smooth transitions
- **First Timer Form**: Comprehensive form for new visitors and converts with all requested fields
- **Photo Gallery**: Date-based gallery display with beautiful cards and image modal viewer
- **Events & News**: Public pages showcasing upcoming events and latest news
- **Framer Motion Animations**: Smooth, professional animations throughout the site

### Dashboard (Authentication Required)
- **Posts Management**: Create, edit, and delete blog posts
- **Events Management**: Manage upcoming church events
- **News Management**: Post and manage church news and announcements
- **Gallery Management**: Upload and manage photo galleries with bulk upload support
- **First Timers Management**: View and manage first-timer submissions
- **Role-Based Access**: Admin, Editor, Gallery Manager, and User roles

### Color Scheme
- Primary: Blue (#0000FF)
- Accent: White (#FFF)
- Additional vibrant shades: Purple, Yellow, Pink

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Prisma with SQLite (easily switchable to PostgreSQL/MySQL)
- **Authentication**: NextAuth.js v5 (Beta)
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd WOG
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   The `.env` file is already created with default values. For production, update:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database with admin user**
   ```bash
   npm run seed
   ```

   **Admin Credentials:**
   - Email: `admin@wgministries.com`
   - Password: `admin123`
   - **⚠️ IMPORTANT**: Change this password after first login!

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
WOG/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth configuration
│   │   ├── posts/          # Posts API
│   │   ├── events/         # Events API
│   │   ├── news/           # News API
│   │   ├── gallery/        # Gallery API
│   │   └── first-timer/    # First timer submissions API
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Protected dashboard pages
│   │   ├── posts/
│   │   ├── events/
│   │   ├── news/
│   │   ├── gallery/
│   │   └── first-timers/
│   ├── first-timer/        # First timer form
│   ├── gallery/            # Public gallery
│   ├── events/             # Public events page
│   ├── news/               # Public news page
│   └── about/              # About page
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── dashboard/          # Dashboard-specific components
│   └── gallery/            # Gallery components
├── lib/                     # Utility functions
│   ├── auth.ts             # NextAuth configuration
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
└── public/                  # Static assets
```

## First Timer Form Fields

The comprehensive first timer form includes:

1. **Personal Information**
   - Full Name (Required)
   - Phone Number (Required)
   - Email Address
   - Age Group

2. **Visit Details**
   - First time visitor status
   - Duration of attendance (if returning)
   - Services attended (multiple selection)

3. **Ministry Interests**
   - Department preferences (14+ departments including Multimedia, Choir, Protocol, etc.)
   - Pastoral counseling request
   - Prayer requests

4. **Communication Preferences**
   - WhatsApp, Email, SMS options

5. **Feedback**
   - Service feedback
   - Suggestions for improvement

## Dashboard Features

### Posts Management
- Create rich blog posts
- Add excerpts and cover images
- Publish/Draft status
- Delete posts

### Events Management
- Create upcoming events
- Set date, time, and location
- Add descriptions and cover images
- Publish events to public page

### News Management
- Post church announcements
- Add excerpts for previews
- Publish to news page

### Gallery Management
- Create photo galleries organized by date
- Bulk image upload via URLs
- Add titles and descriptions
- Role-based permissions for uploading

### First Timers Management
- View all form submissions
- Access contact information
- Review prayer requests
- Track first-time vs returning visitors

## Database Schema

The application uses Prisma ORM with the following models:
- **User**: Authentication and authorization
- **Post**: Blog posts
- **Event**: Church events
- **News**: News articles
- **FirstTimer**: Visitor information
- **Gallery**: Photo galleries
- **GalleryImage**: Individual gallery images

## Deployment

### Production Database
For production, switch to PostgreSQL or MySQL:

1. Update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   ```

2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // or "mysql"
     url      = env("DATABASE_URL")
   }
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   npm run seed
   ```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Service Times

- **Sunday Services**:
  - Sunrise Service: 8:00 AM
  - Sunshine Service: 9:30 AM

- **Weekday Services**:
  - Tuesday Digging Deep (Bible Study): 5:30 PM
  - Thursday Faith Clinic (Prayer Meeting): 5:30 PM

- **Special Services**:
  - Covenant Day: 1st of every month
  - Celebration Church: 3rd Sunday (2nd Service)

## Social Media

- Instagram: [@wgministries](https://instagram.com/wgministries)
- Facebook: [Word of Grace Min.INC](https://facebook.com/WordofGraceMin.INC)

## Support

For issues or questions, please open an issue in the repository.

## License

This project is private and proprietary to Word Of Grace Ministries, Agbor.

---

Built with ❤️ for Word Of Grace Ministries, Agbor
