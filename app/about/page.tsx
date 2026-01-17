import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
				<div className="max-w-5xl mx-auto text-center mb-16 bg-[#1560BD]">
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-white ">
						About Word of Grace Ministries
					</h1>
					<p className="text-xl font-bold text-yellow-400">
						A Place Where Dreams Come True
					</p>
				</div>
				{/* Five Pillars */}
				<div className="mb-16 px-16">
					<h2 className="text-4xl font-bold mb-8 text-center text-[#1560BD]">
						Our Mandate: Five Pillars
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								title: "Armies of Worshipers",
								description:
									"Raising passionate worshipers who encounter God in spirit and truth.",
							},
							{
								title: "Smiles on Mankind",
								description:
									"Putting smiles on the face of mankind through love, compassion, and service.",
							},
							{
								title: "Leaders After God's Order",
								description:
									"Developing leaders who follow God's pattern and purpose.",
							},
							{
								title: "Dreams Come True",
								description:
									"Making mankind's God-given dreams become reality.",
							},
							{
								title: "Wealth Creation",
								description:
									"Creating wealth for God's people through divine wisdom and principles.",
							},
						].map((pillar, index) => (
							<div key={index} className="card p-6 border-l-4 border-[#1560BD]">
								<h3 className="text-xl font-bold mb-3 text-[#1560BD]">
									{pillar.title}
								</h3>
								<p className="text-gray-600">{pillar.description}</p>
							</div>
						))}
					</div>
				</div>
				{/* Our Story */}
				<div className="max-w-5xl mx-auto mb-16">
					<h2 className="text-4xl font-bold mb-6 text-[#1560BD]">Our Story</h2>
					<div className="prose prose-lg max-w-none">
						<p className="text-gray-600 leading-relaxed mb-4">
							Word of Grace Ministries was birthed from prayer in Ghana, when
							the founder received a divine calling:
							<strong className="text-[#1560BD]">
								{" "}
								"I will get the work started and keep the work going."
							</strong>
							This profound promise became the foundation of a ministry that has
							touched countless lives.
						</p>
						<p className="text-gray-600 leading-relaxed mb-4">
							On <strong>April 10, 1996</strong>, Word of Grace Ministries
							officially launched in a living room with just five initial
							members, including the founder's wife, daughter, and two others.
							What seemed like a humble beginning was marked by divine
							confirmation - during the first service, birds flew in and began
							singing, which the founder interpreted as a sign of God's approval
							and presence.
						</p>
						<p className="text-gray-600 leading-relaxed mb-4">
							By the first Sunday, attendance had already grown to eight people
							(four adults and four children). From that small seed, God has
							grown Word of Grace Ministries into a thriving community of faith.
						</p>
						<p className="text-gray-600 leading-relaxed mb-4">
							Today, Word of Grace Ministries operates from a permanent location
							along Lagos-Asaba Road in Agbor, Delta State, Nigeria, with a{" "}
							<strong>1,000-seater building currently in progress</strong>. The
							ministry stands on the founding promise that{" "}
							<strong className="text-[#1560BD]">
								"this Ministry shall know no lack"
							</strong>{" "}
							- a promise that continues to be fulfilled as God provides for His
							work.
						</p>
						<p className="text-gray-600 leading-relaxed">
							Through the years, we have remained faithful to our divine
							mandate: raising armies of worshipers, putting smiles on the face
							of mankind, developing leaders after God's own order, making
							dreams come true, and creating wealth for God's people.
						</p>
					</div>
				</div>
				{/* Core Values */}
				<div className="mb-16 px-8">
					<h2 className="text-4xl font-bold mb-8 text-center text-[#1560BD]">
						Our Core Values
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						{[
							{
								title: "Worship Excellence",
								description:
									"We prioritize authentic, Spirit-filled worship that touches heaven and transforms lives.",
							},
							{
								title: "Compassionate Service",
								description:
									"We serve with love and compassion, meeting practical needs while sharing the Gospel.",
							},
							{
								title: "Godly Leadership",
								description:
									"We develop leaders who lead with integrity, wisdom, and the fear of the Lord.",
							},
							{
								title: "Faith & Miracles",
								description:
									"We believe in the power of God to make the impossible possible.",
							},
							{
								title: "Kingdom Prosperity",
								description:
									"We teach and demonstrate God's principles for financial blessing and abundance.",
							},
							{
								title: "Divine Purpose",
								description:
									"We help people discover and fulfill their God-given destiny and dreams.",
							},
						].map((value, index) => (
							<div key={index} className="card p-6">
								<h3 className="text-xl font-bold mb-3 text-[#1560BD]">
									{value.title}
								</h3>
								<p className="text-gray-600">{value.description}</p>
							</div>
						))}
					</div>
				</div>
				{/* Leadership */}
				<div>
					<h2 className="text-4xl font-bold mb-8 text-center text-[#1560BD]">
						Our Leadership
					</h2>
					<div className="max-w-2xl mx-auto">
						<div className="card overflow-hidden">
							<div className="md:flex">
								<div className="md:w-64 aspect-square bg-gradient-to-br from-[#1560BD] to-[#1560BD]" />
								<div className="p-8 flex-1">
									<h3 className="text-2xl font-bold mb-2">
										Rev. Goodwill Adogho
									</h3>
									<p className="text-primary-600 font-semibold mb-4">
										General Overseer & Founder
									</p>
									<p className="text-gray-600 leading-relaxed mb-4">
										Rev. Goodwill Adogho is the founder and General Overseer of
										Word of Grace Ministries. Raised in the Jehovah's Witness
										tradition, he experienced a divine calling at age 8 when he
										encountered the Lord directing him toward ministry.
									</p>
									<p className="text-gray-600 leading-relaxed">
										With over 25 years of ministry experience, Rev. Adogho leads
										Word of Grace Ministries with a passion for worship,
										compassion for people, and a commitment to seeing God's
										people prosper in every area of life.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
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
