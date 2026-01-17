"use client"

const prayerPointsByMonth: Record<string, string[]> = {
  JANUARY: [
    "Pray for divine direction and clarity in your new beginnings",
    "Seek God's wisdom for decisions and commitments",
    "Declare prosperity and abundance over your life",
  ],
  FEBRUARY: [
    "Release God's love and forgiveness in all relationships",
    "Pray for healing and restoration in broken connections",
    "Declare victory over emotional struggles",
  ],
  MARCH: [
    "Seek breakthrough in areas of stagnation",
    "Pray for divine intervention in your circumstances",
    "Declare strength and courage for new challenges",
  ],
  APRIL: [
    "Celebrate resurrection power in your life",
    "Pray for spiritual renewal and transformation",
    "Declare fresh beginnings and new mercies",
  ],
  MAY: [
    "Seek God's protection and guidance",
    "Pray for growth in your spiritual walk",
    "Declare abundance and increase in all areas",
  ],
  JUNE: [
    "Pray for obedience and alignment with God's will",
    "Seek dedication to purpose and calling",
    "Declare favor and open doors",
  ],
  JULY: [
    "Celebrate God's faithfulness and provision",
    "Pray for freedom from limitations",
    "Declare independence from negativity and doubt",
  ],
  AUGUST: ["Seek God's strength and endurance", "Pray for steadfastness in trials", "Declare breakthrough and victory"],
  SEPTEMBER: [
    "Pray for new season transitions",
    "Seek wisdom for life changes",
    "Declare fresh opportunities and growth",
  ],
  OCTOBER: [
    "Seek God's light and direction",
    "Pray for clarity and understanding",
    "Declare illumination of your path",
  ],
  NOVEMBER: [
    "Pray with gratitude for God's blessings",
    "Seek thanksgiving and appreciation mindset",
    "Declare contentment and satisfaction",
  ],
  DECEMBER: [
    "Celebrate Christ's birth and redemption",
    "Pray for peace and joy in your heart",
    "Declare completion and fulfillment",
  ],
}

interface PrayerPointsProps {
  month: string | null
}

export default function PrayerPoints({ month }: PrayerPointsProps) {
  const points = month ? prayerPointsByMonth[month] : null

  if (!points) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <p className="text-gray-600">Select a month to view prayer points</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">{month} Prayer Points</h2>
      <ul className="space-y-4">
        {points.map((point, index) => (
          <li key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            <p className="text-gray-700 pt-1">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
