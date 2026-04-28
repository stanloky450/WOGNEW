"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"

type SuccessRedirectModalProps = {
  open: boolean
  onRedirect: () => void
  countdownSeconds?: number
  description: string
}

export default function SuccessRedirectModal({
  open,
  onRedirect,
  countdownSeconds = 30,
  description,
}: SuccessRedirectModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(countdownSeconds)

  useEffect(() => {
    if (!open) {
      setSecondsLeft(countdownSeconds)
      return
    }

    setSecondsLeft(countdownSeconds)

    const redirectTimer = window.setTimeout(() => {
      onRedirect()
    }, countdownSeconds * 1000)

    const countdownTimer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(countdownTimer)
          return 0
        }

        return current - 1
      })
    }, 1000)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.clearTimeout(redirectTimer)
      window.clearInterval(countdownTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [countdownSeconds, onRedirect, open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 32, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 px-6 py-10 text-center text-white">
              <motion.div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/15 text-4xl shadow-lg"
                initial={{ scale: 0.7, rotate: -14 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
              >
                ✓
              </motion.div>
              <motion.h2
                className="mt-6 text-3xl font-bold"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Thank you for submitting
              </motion.h2>
            </div>

            <div className="space-y-5 px-6 py-6 text-center text-slate-700">
              <motion.p
                className="text-base leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {description}
              </motion.p>

              <motion.div
                className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Redirecting to the homepage in{" "}
                <span className="font-semibold text-slate-900">{secondsLeft}</span> seconds if
                you do not click below.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button className="w-full" size="lg" onClick={onRedirect}>
                  Go to homepage now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
