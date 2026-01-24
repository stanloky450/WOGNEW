"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  CreditCard, 
  Landmark, 
  Mail, 
  MapPin, 
  Smartphone 
} from "lucide-react";

export default function GivePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-16 px-4">
        <div className="container-custom mx-auto max-w-6xl">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider block mb-2">
              Support the Ministry
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Give with a Cheerful Heart
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              <span className="block mt-2 text-primary font-medium">— 2 Corinthians 9:7</span>
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-8"
          >
            
            {/* Online Giving */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="h-full border-t-4 border-t-primary shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl">Give Online</CardTitle>
                  <CardDescription>
                    Securely give using your credit card, debit card, or bank account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full h-12 text-lg group" size="lg">
                    Give Now
                  </Button>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Simple, secure, and instant.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bank Transfer (Featured) */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="h-full bg-gradient-to-br from-primary to-blue-700 text-white shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Landmark className="w-64 h-64 transform translate-x-12 -translate-y-12" />
                </div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-white/80 uppercase tracking-wide">Direct Transfer</span>
                  </div>
                  <CardTitle className="text-3xl text-white">Naira Account Details</CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 space-y-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-white/70 text-sm mb-1 uppercase font-medium">Bank Name</p>
                        <p className="text-2xl font-bold">United Bank for Africa (UBA)</p>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm mb-1 uppercase font-medium">Account Name</p>
                        <p className="text-2xl font-bold">Word of Grace Ministries</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white text-primary rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
                    <div>
                      <p className="text-primary/70 text-sm uppercase font-bold mb-1">Account Number</p>
                      <p className="text-4xl font-mono font-bold tracking-wider">1004100448</p>
                    </div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 whitespace-nowrap" onClick={() => {navigator.clipboard.writeText("1004100")}}>
                      Copy Number
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Other Ways to Give */}
            <motion.div variants={itemVariants} className="lg:col-span-3 mt-8">
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 flex items-center justify-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                Other Ways to Give
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <Smartphone className="w-5 h-5 text-gray-700" />
                    </div>
                    <CardTitle className="text-lg">USSD Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Dial <span className="font-mono font-bold text-gray-900">*919*...#</span> from your mobile phone for instant transfer.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <MapPin className="w-5 h-5 text-gray-700" />
                    </div>
                    <CardTitle className="text-lg">In Person</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Drop your offering in the designated boxes during any of our services or visit our office.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <Mail className="w-5 h-5 text-gray-700" />
                    </div>
                    <CardTitle className="text-lg">By Mail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Send checks payable to "Word of Grace Ministries" to our office address.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
