"use client"

import { useState } from "react"
// import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

const firstTimerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{10,20}$/, "Please enter a valid phone number")
    .refine((value) => {
      const digitsOnly = value.replace(/\D/g, "")
      return digitsOnly.length >= 10 && digitsOnly.length <= 15
    }, "Phone number should contain 10 to 15 digits"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  ageGroup: z.enum(["UNDER_18", "AGE_18_25", "AGE_26_35", "AGE_36_50", "AGE_51_PLUS"]).optional(),
  isFirstTime: z.boolean(),
  attendingDuration: z.string().optional(),
  servicesAttended: z.array(z.string()).min(1, "Please select at least one service"),
  departmentsInterest: z.array(z.string()),
  needsCounseling: z.boolean(),
  prayerRequest: z.string().optional(),
  updatePreferences: z.array(z.string()).min(1, "Please select at least one update preference"),
  serviceFeedback: z.string().optional(),
  suggestions: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.isFirstTime && !data.attendingDuration?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["attendingDuration"],
      message: "Please tell us how long you have been attending",
    })
  }

  if (data.needsCounseling && !data.prayerRequest?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["prayerRequest"],
      message: "Please share your counseling or prayer need",
    })
  }
})

type FirstTimerForm = z.infer<typeof firstTimerSchema>

const services = [
  "Leadership Training (Sunday)(8:00 AM)",
  "Celebration Service (Sunday)(9:20 AM)",
  "Wednesday Word Alive (Bible Study - 5:00 PM)",
  "Friday (Prayer Meeting - 5:00 PM)",
  "Covenant Day (1st Day of the Month)",
  "Celebration Church (3rd Sunday of the Month)",
]

const departments = [
  "TCWC. Multimedia (Media & Tech)",
  "TCWC. Voices (Choir & Worship)",
  "Protocol (Ushering & Hospitality)",
  "Prayer Unit (Intercessors)",
  "Welfare (Support & Care)",
  "Children's Church",
  "Teens' Church",
  "Evangelism (Outreach & Soul-Winning)",
  "Follow-up (New Members Integration)",
  "Drama Ministry",
]

export default function FirstTimerPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FirstTimerForm>({
    resolver: zodResolver(firstTimerSchema),
    defaultValues: {
      isFirstTime: true,
      needsCounseling: false,
      servicesAttended: [],
      departmentsInterest: [],
      updatePreferences: [],
    },
  })

  const isFirstTime = watch("isFirstTime")
  const needsCounseling = watch("needsCounseling")
  const servicesAttended = watch("servicesAttended")
  const departmentsInterest = watch("departmentsInterest")
  const updatePreferences = watch("updatePreferences")

  const onSubmit = async (data: FirstTimerForm) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/first-timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
        setTimeout(() => router.push("/"), 3000)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleService = (service: string) => {
    const nextValue = servicesAttended.includes(service)
      ? servicesAttended.filter((s) => s !== service)
      : [...servicesAttended, service]

    setValue("servicesAttended", nextValue, { shouldValidate: true, shouldDirty: true })
  }

  const toggleDepartment = (dept: string) => {
    const nextValue = departmentsInterest.includes(dept)
      ? departmentsInterest.filter((d) => d !== dept)
      : [...departmentsInterest, dept]

    setValue("departmentsInterest", nextValue, { shouldValidate: true, shouldDirty: true })
  }

  const togglePreference = (pref: string) => {
    const nextValue = updatePreferences.includes(pref)
      ? updatePreferences.filter((p) => p !== pref)
      : [...updatePreferences, pref]

    setValue("updatePreferences", nextValue, { shouldValidate: true, shouldDirty: true })
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="text-center text-white p-8">
            <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
            <p className="text-xl">We're excited to have you worship with us!</p>
            <p className="mt-4">Redirecting to homepage...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-3xl">Welcome to Word Of Grace Ministries, Agbor!</CardTitle>
                <CardDescription className="text-white/90 text-lg mt-2">
                  We're delighted to have you worship with us today! Please take a moment to fill this form so we can serve you better.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">
                      1. Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-base">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          {...register("fullName")}
                          className="mt-1"
                          autoComplete="name"
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber" className="text-base">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phoneNumber"
                          {...register("phoneNumber")}
                          inputMode="tel"
                          autoComplete="tel"
                          className="mt-1"
                          placeholder="+234 XXX XXX XXXX"
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-base">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          autoComplete="email"
                          className="mt-1"
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-base">Age Group</Label>
                        <div className="mt-2 space-y-2">
                          {[
                            { value: "UNDER_18", label: "Under 18" },
                            { value: "AGE_18_25", label: "18-25" },
                            { value: "AGE_26_35", label: "26-35" },
                            { value: "AGE_36_50", label: "36-50" },
                            { value: "AGE_51_PLUS", label: "51+" },
                          ].map((age) => (
                            <div key={age.value} className="flex items-center">
                              <input
                                type="radio"
                                id={age.value}
                                value={age.value}
                                {...register("ageGroup")}
                                className="mr-2"
                              />
                              <Label htmlFor={age.value} className="font-normal cursor-pointer">
                                {age.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visit Details */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">
                      2. Visit Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base mb-2 block">
                          Is this your first time worshipping with us?
                        </Label>
                        <div className="flex gap-6">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="firstTimeYes"
                              checked={isFirstTime}
                              onChange={() =>
                                setValue("isFirstTime", true, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })
                              }
                              className="mr-2"
                            />
                            <Label htmlFor="firstTimeYes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="firstTimeNo"
                              checked={!isFirstTime}
                              onChange={() =>
                                setValue("isFirstTime", false, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })
                              }
                              className="mr-2"
                            />
                            <Label htmlFor="firstTimeNo" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </div>
                      </div>

                      {!isFirstTime && (
                        <div>
                          <Label htmlFor="attendingDuration" className="text-base">
                            How long have you been attending?
                          </Label>
                          <Input
                            id="attendingDuration"
                            {...register("attendingDuration")}
                            className="mt-1"
                            placeholder="e.g., 3 months, 1 year"
                          />
                          {errors.attendingDuration && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.attendingDuration.message}
                            </p>
                          )}
                        </div>
                      )}

                      <div>
                        <Label className="text-base mb-3 block">
                          Which service did you attend today? (Check all that apply)
                        </Label>
                        <div className="space-y-2">
                          {services.map((service) => (
                            <div key={service} className="flex items-center">
                              <Checkbox
                                id={service}
                                checked={servicesAttended.includes(service)}
                                onCheckedChange={() => toggleService(service)}
                              />
                              <Label
                                htmlFor={service}
                                className="ml-2 font-normal cursor-pointer"
                              >
                                {service}
                              </Label>
                            </div>
                          ))}
                          <div className="flex items-center">
                            <Input placeholder="Other (please specify)" className="max-w-md" />
                          </div>
                        </div>
                        {errors.servicesAttended && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.servicesAttended.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* How Can We Serve You */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">
                      3. How Can We Serve You?
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base mb-3 block">
                          I'd like to join a department: (Check all that apply)
                        </Label>
                        <div className="space-y-2">
                          {departments.map((dept) => (
                            <div key={dept} className="flex items-center">
                              <Checkbox
                                id={dept}
                                checked={departmentsInterest.includes(dept)}
                                onCheckedChange={() => toggleDepartment(dept)}
                              />
                              <Label htmlFor={dept} className="ml-2 font-normal cursor-pointer">
                                {dept}
                              </Label>
                            </div>
                          ))}
                          <div className="flex items-center">
                            <Input placeholder="Other (please specify)" className="max-w-md" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base mb-2 block">
                          I need pastoral counseling:
                        </Label>
                        <div className="flex gap-6">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="counselingYes"
                              checked={needsCounseling}
                              onChange={() =>
                                setValue("needsCounseling", true, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })
                              }
                              className="mr-2"
                            />
                            <Label htmlFor="counselingYes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="counselingNo"
                              checked={!needsCounseling}
                              onChange={() =>
                                setValue("needsCounseling", false, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })
                              }
                              className="mr-2"
                            />
                            <Label htmlFor="counselingNo" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="prayerRequest" className="text-base">
                          Prayer Request (Briefly share how we can pray for you)
                        </Label>
                        <Textarea
                          id="prayerRequest"
                          {...register("prayerRequest")}
                          className="mt-1"
                          rows={4}
                          placeholder="Share your prayer request..."
                        />
                        {errors.prayerRequest && (
                          <p className="text-red-500 text-sm mt-1">{errors.prayerRequest.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stay Connected */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">
                      4. Stay Connected!
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base mb-3 block">
                          How would you like to receive updates?
                        </Label>
                        <div className="space-y-2">
                          {["WhatsApp", "Email", "SMS", "All"].map((pref) => (
                            <div key={pref} className="flex items-center">
                              <Checkbox
                                id={`pref-${pref}`}
                                checked={updatePreferences.includes(pref)}
                                onCheckedChange={() => togglePreference(pref)}
                              />
                              <Label
                                htmlFor={`pref-${pref}`}
                                className="ml-2 font-normal cursor-pointer"
                              >
                                {pref}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.updatePreferences && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.updatePreferences.message}
                          </p>
                        )}
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Follow us on social media:</p>
                        <p className="text-sm">Instagram: @wgministries</p>
                        <p className="text-sm">Facebook: Word of Grace Min.INC</p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">
                      5. Feedback
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serviceFeedback" className="text-base">
                          What blessed you most about today's service?
                        </Label>
                        <Textarea
                          id="serviceFeedback"
                          {...register("serviceFeedback")}
                          className="mt-1"
                          rows={3}
                          placeholder="Share what blessed you..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="suggestions" className="text-base">
                          Any suggestions for improvement?
                        </Label>
                        <Textarea
                          id="suggestions"
                          {...register("suggestions")}
                          className="mt-1"
                          rows={3}
                          placeholder="Your suggestions are valuable to us..."
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Form"}
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
