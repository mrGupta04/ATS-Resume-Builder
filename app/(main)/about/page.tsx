"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Palette, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Revolutionizing Resume Creation
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              We combine cutting-edge AI technology with elegant design to help you create professional resumes that stand out in today's competitive job market.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="gap-2 hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/resume/create")}
              >
                Get Started <ArrowRight size={16} />
              </Button>

              <Button
                variant="outline"
                className="gap-2 hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/resume/create")}
              >
                See Examples
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-30 dark:opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-200 rounded-full blur-xl opacity-30 dark:opacity-20"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-b border-gray-100 dark:border-gray-800">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Easy To</div>
              <div className="text-sm text-muted-foreground">Create ATS Friendly Resume</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5+</div>
              <div className="text-sm text-muted-foreground">Templates</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">Use AI Assitance</div>
              <div className="text-sm text-muted-foreground">To Optimise Resume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Resume Builder</h2>
            <p className="text-muted-foreground">
              We've reimagined resume creation with a focus on effectiveness, aesthetics, and user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700 overflow-hidden">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered Content</h3>
                <p className="text-muted-foreground">
                  Powered by Llama 3.1, get intelligent suggestions to improve your resume content and make your experience stand out.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700 overflow-hidden">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ATS-Optimized Templates</h3>
                <p className="text-muted-foreground">
                  Our templates are designed to pass through Applicant Tracking Systems while maintaining a professional appearance.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700 overflow-hidden">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Modern Design</h3>
                <p className="text-muted-foreground">
                  Choose from professionally designed templates that highlight your strengths and impress hiring managers.
                </p>
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700 overflow-hidden">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Export</h3>
                <p className="text-muted-foreground">
                  Download your completed resume as a PDF, ready to send to employers. Multiple format options available.
                </p>
              </CardContent>
            </Card>

            {/* Card 5 */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700 overflow-hidden">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
                    <path d="M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4h8c0 2-2 2-2 4"></path>
                    <path d="M18 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Customizable Sections</h3>
                <p className="text-muted-foreground">
                  Tailor your resume with customizable sections that highlight your unique skills and experiences.
                </p>
              </CardContent>
            </Card>

            {/* Card 6 */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700 overflow-hidden">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Cloud Storage</h3>
                <p className="text-muted-foreground">
                  Save your resumes securely in the cloud and access them from any device, anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Perfect Resume?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who have landed their dream jobs with resumes created on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 gap-2 hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/resume/create")}
              >
                Get Started Free <ArrowRight size={16} />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue-600 hover:bg-white/10 gap-2 hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/resume/create")}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
