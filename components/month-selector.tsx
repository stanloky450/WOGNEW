"use client"

const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
]

const monthColors = [
  "from-green-400 to-green-500",
  "from-pink-400 to-pink-500",
  "from-red-500 to-red-600",
  "from-blue-500 to-blue-600",
  "from-cyan-400 to-cyan-500",
  "from-yellow-400 to-yellow-500",
  "from-purple-500 to-purple-600",
  "from-cyan-400 to-cyan-500",
  "from-orange-500 to-orange-600",
  "from-green-500 to-green-600",
  "from-yellow-500 to-yellow-600",
  "from-blue-600 to-blue-700",
]

interface MonthSelectorProps {
  selectedMonth: string | null
  onMonthSelect: (month: string) => void
}

export default function MonthSelector({ selectedMonth, onMonthSelect }: MonthSelectorProps) {
  const currentDate = new Date()
  const currentMonthIndex = currentDate.getMonth()

  const isMonthDisabled = (monthIndex: number) => {
    return monthIndex > currentMonthIndex
  }

  return (
    <div className="bg-white rounded-3xl p-6 mb-8 shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {months.map((month, index) => {
          const disabled = isMonthDisabled(index)

          return (
            <button
              key={month}
              onClick={() => !disabled && onMonthSelect(month)}
              disabled={disabled}
              className={`py-3 px-4 rounded-full font-bold text-white text-sm transition-all transform ${
                disabled
                  ? "opacity-50 cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500"
                  : `bg-gradient-to-r ${monthColors[index]} cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95`
              } ${selectedMonth === month ? "ring-4 ring-white shadow-lg scale-110" : ""} shadow-md`}
            >
              {month}
            </button>
          )
        })}
      </div>
    </div>
  )
}
