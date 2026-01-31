"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, User, FileText, CheckCircle, HelpCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface FirstTimer {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string | null;
  ageGroup: string | null;
  isFirstTime: boolean;
  attendingDuration: string | null;
  servicesAttended: string; // JSON string
  departmentsInterest: string; // JSON string
  needsCounseling: boolean;
  prayerRequest: string | null;
  updatePreferences: string; // JSON string
  serviceFeedback: string | null;
  suggestions: string | null;
  createdAt: string;
}

export default function FirstTimerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [firstTimer, setFirstTimer] = useState<FirstTimer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchFirstTimerDetails(params.id as string);
    }
  }, [params.id]);

  const fetchFirstTimerDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/first-timer/${id}`);
      const data = await response.json();
      if (data.success) {
        setFirstTimer(data.data);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseJson = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!firstTimer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">First Timer Not Found</h2>
        <Button onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const services = parseJson(firstTimer.servicesAttended);
  const interests = parseJson(firstTimer.departmentsInterest);
  const preferences = parseJson(firstTimer.updatePreferences);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden border-t-4 border-t-primary shadow-lg">
          <CardHeader className="bg-gray-50 border-b pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900">{firstTimer.fullName}</CardTitle>
                <div className="flex items-center text-gray-500 mt-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Submitted on {formatDate(firstTimer.createdAt)}</span>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-base font-medium ${
                  firstTimer.isFirstTime
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {firstTimer.isFirstTime ? "First Time Visitor" : "Returning Visitor"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
             {/* Contact Info */}
            <section>
                <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                    <User className="mr-2 h-5 w-5 text-primary" /> Personal & Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-1">
                        <span className="text-sm font-medium text-gray-500">Phone Number</span>
                        <p className="text-lg font-medium text-gray-900 flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" /> {firstTimer.phoneNumber}
                        </p>
                    </div>
                    {firstTimer.email && (
                     <div className="space-y-1">
                        <span className="text-sm font-medium text-gray-500">Email Address</span>
                        <p className="text-lg font-medium text-gray-900 flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" /> {firstTimer.email}
                        </p>
                    </div>
                    )}
                    {firstTimer.ageGroup && (
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-gray-500">Age Group</span>
                             <p className="text-lg font-medium text-gray-900">{firstTimer.ageGroup}</p>
                        </div>
                    )}
                 </div>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Church Involvement */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> Church Involvement
                    </h3>
                    <div className="space-y-4">
                        {services.length > 0 && (
                            <div className="bg-white border rounded-md p-4">
                                <span className="block text-sm font-medium text-gray-500 mb-2">Services Attended</span>
                                <div className="flex flex-wrap gap-2">
                                    {services.map((s: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-sm rounded border border-green-100">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {interests.length > 0 && (
                            <div className="bg-white border rounded-md p-4">
                                <span className="block text-sm font-medium text-gray-500 mb-2">Departments of Interest</span>
                                <div className="flex flex-wrap gap-2">
                                    {interests.map((int: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-sm rounded border border-indigo-100">
                                            {int}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {firstTimer.attendingDuration && (
                            <div className="bg-white border rounded-md p-4">
                                <span className="block text-sm font-medium text-gray-500">How long attending?</span>
                                <p className="text-gray-900 mt-1">{firstTimer.attendingDuration}</p>
                            </div>
                        )}
                         <div className="bg-white border rounded-md p-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Needs Counseling?</span>
                             <span className={`font-semibold ${firstTimer.needsCounseling ? 'text-red-600' : 'text-gray-600'}`}>
                                {firstTimer.needsCounseling ? "YES" : "No"}
                             </span>
                        </div>
                    </div>
                </section>

                {/* Feedback & Requests */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-orange-500" /> Feedback & Requests
                    </h3>
                     <div className="space-y-4 h-full">
                        {firstTimer.prayerRequest && (
                             <div className="bg-orange-50 border border-orange-100 rounded-md p-4">
                                <span className="block text-sm font-bold text-orange-800 mb-1">Prayer Request</span>
                                <p className="text-gray-800 italic">"{firstTimer.prayerRequest}"</p>
                            </div>
                        )}
                         {firstTimer.serviceFeedback && (
                             <div className="bg-gray-50 border rounded-md p-4">
                                <span className="block text-sm font-medium text-gray-500 mb-1">Service Feedback</span>
                                <p className="text-gray-800">"{firstTimer.serviceFeedback}"</p>
                            </div>
                        )}
                         {firstTimer.suggestions && (
                             <div className="bg-gray-50 border rounded-md p-4">
                                <span className="block text-sm font-medium text-gray-500 mb-1">Suggestions</span>
                                <p className="text-gray-800">"{firstTimer.suggestions}"</p>
                            </div>
                        )}
                        {preferences.length > 0 && (
                            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-auto">
                                <span className="block text-sm font-medium text-blue-800 mb-2">Update Preferences</span>
                                 <div className="flex flex-wrap gap-2">
                                    {preferences.map((p: string, i: number) => (
                                        <span key={i} className="text-xs font-semibold px-2 py-1 bg-white text-blue-600 rounded border border-blue-200">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                     </div>
                </section>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
