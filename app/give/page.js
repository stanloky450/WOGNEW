'use client'

import { motion } from 'framer-motion'

export default function GivePage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Give</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generosity helps us continue spreading the Gospel and serving our community
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Why We Give</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under
                compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
              </p>
              <p>
                Your tithes and offerings support our mission to spread the Gospel, nurture spiritual growth,
                and serve our community. Through your generosity, we are able to maintain our facilities,
                support our staff, conduct outreach programs, and invest in missions around the world.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Online Giving</h3>
              <p className="text-gray-600 mb-4">
                Give securely online using your credit card, debit card, or bank account.
              </p>
              <button className="btn btn-primary w-full">Give Online</button>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Text to Give</h3>
              <p className="text-gray-600 mb-4">
                Text "GIVE" to (555) 123-4567 to give quickly and securely from your mobile device.
              </p>
              <button className="btn btn-outline w-full">Learn More</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Other Ways to Give</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Mail</h3>
                <p>
                  Send checks payable to "WG Ministries" to:<br />
                  123 Faith Street, Springfield, IL 62701
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">In Person</h3>
                <p>
                  Drop your offering in the designated boxes during any of our services or visit our office
                  during business hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Bank Transfer</h3>
                <p>
                  Contact our finance office at finance@wgministries.org for bank transfer details.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
