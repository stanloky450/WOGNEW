import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import FivePillars from "./FivePillars";
import CoreValues from "./CoreValues";
import OurStory from "./OurStory";
import AboutHero from "./AboutHero";
import LeadershipSection from "@/components/about/LeadershipSection";

export const metadata = {
	title: "About Us - Word of Grace Ministries",
	description:
		"Learn about Word of Grace Ministries, founded in 1996 by Rev. Goodwill Adogho. A place where dreams come true.",
};

export default function AboutPage() {
	return (
		<div className="py-16">
			<div className="container-custom  min-h-screen bg-gray-50">
				{/* <div className="min-h-screen bg-gray-50"> */}
				<Navigation />
				<AboutHero />
				{/* Five Pillars */}
				<FivePillars />
				{/* Our Story */}
				<OurStory />
				{/* Core Values */}
				<CoreValues />
				{/* Leadership */}
				<LeadershipSection />
				{/* Location */}
				<div className="mt-16 bg-[#1560BD] rounded-lg p-8 text-center">
					<h2 className="text-2xl font-bold mb-4">Visit Us</h2>
					<p className="text-lg text-gray-100 mb-2">
						<strong>Lagos-Asaba Road, Agbor</strong>
					</p>
					<p className="text-lg text-gray-50">
						<strong>Delta State, Nigeria</strong>
					</p>
					<p className="text-gray-100 mt-4">
						1,000-seater building currently in progress
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}

// import Navigation from "@/components/Navigation"
// import Footer from "@/components/Footer"

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
//       <div className="pt-24 pb-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
//           <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
//             <section>
//               <h2 className="text-2xl font-semibold text-primary mb-4">
//                 Word Of Grace Ministries, Agbor
//               </h2>
//               <p className="text-gray-700 leading-relaxed">
//                 Welcome to Word Of Grace Ministries, a vibrant community of believers
//                 committed to worship, fellowship, and spiritual growth. Located in Agbor,
//                 we are dedicated to spreading the message of God's grace and love.
//               </p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
//               <p className="text-gray-700 leading-relaxed">
//                 To raise disciples who will impact their world with the Word of God and
//                 demonstrate the love of Christ through service and outreach.
//               </p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold text-primary mb-4">Service Times</h2>
//               <div className="space-y-2 text-gray-700">
//                 <p><strong>Sunday Services:</strong></p>
//                 <ul className="list-disc ml-6">
//                   <li>Sunrise Service: 8:00 AM</li>
//                   <li>Sunshine Service: 9:30 AM</li>
//                 </ul>
//                 <p className="mt-4"><strong>Weekday Services:</strong></p>
//                 <ul className="list-disc ml-6">
//                   <li>Tuesday Digging Deep (Bible Study): 5:30 PM</li>
//                   <li>Thursday Faith Clinic (Prayer Meeting): 5:30 PM</li>
//                 </ul>
//                 <p className="mt-4"><strong>Special Services:</strong></p>
//                 <ul className="list-disc ml-6">
//                   <li>Covenant Day: 1st of every month</li>
//                   <li>Celebration Church: 3rd Sunday (2nd Service)</li>
//                 </ul>
//               </div>
//             </section>

//             <section>
//               <h2 className="text-2xl font-semibold text-primary mb-4">Connect With Us</h2>
//               <div className="text-gray-700 space-y-2">
//                 <p>Instagram: @wgministries</p>
//                 <p>Facebook: Word of Grace Min.INC</p>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }
