"use client";

import { useSession } from "next-auth/react";
import StepForm from '@/components/resume-builder/StepForm';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle, FileText, User, Sparkles, Download, Save, Edit3, CheckCircle, ArrowRight, X } from "lucide-react";
import { useState } from "react";

export default function ResumeBuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [proceedWithoutSignIn, setProceedWithoutSignIn] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-t-2 border-blue-600 border-solid rounded-full animate-spin mx-auto"></div>
            <FileText className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-muted-foreground mt-4">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  // If the user is not signed in and hasn't chosen to proceed
  if (!session && !proceedWithoutSignIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm mb-6 dark:bg-gray-800/80">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-3">
              Create a Professional Resume in Minutes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build an ATS-friendly resume that stands out and gets you hired faster
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Benefits Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-blue-600" />
                Why create an account?
              </h2>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20">
                  <div className="bg-blue-100 dark:bg-blue-800/30 p-2 rounded-full">
                    <Save className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Save & Access Anywhere</h3>
                    <p className="text-sm text-muted-foreground mt-1">Your resumes are securely stored in the cloud</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50/50 dark:bg-green-900/20">
                  <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-full">
                    <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Multiple Export Formats</h3>
                    <p className="text-sm text-muted-foreground mt-1">Download in PDF, Word, and other formats</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50/50 dark:bg-purple-900/20">
                  <div className="bg-purple-100 dark:bg-purple-800/30 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Unlimited Resumes</h3>
                    <p className="text-sm text-muted-foreground mt-1">Create different versions for various jobs</p>
                  </div>
                </div>


              </div>

              <Button
                onClick={() => router.push('/signin')}
                size="lg"
                className="w-full py-3 bg-black text-white flex items-center justify-center gap-2 shadow-md hover:bg-gray-800 hover:shadow-lg transition-all"
              >
                <User className="h-5 w-5" />
                Sign In / Register
              </Button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Secure authentication with next-auth
              </p>
            </div>

            {/* Continue Without Account Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 max-w-xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-xl p-5 mb-6 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-200">
                      You are not signed in
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      If you continue without signing in, your resume will not be saved and you might lose access to it later.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold mb-4">Continue without account</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm text-red-600 dark:text-red-400">
                  <X className="h-4 w-4" />
                  <span>Resume won't be saved</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-red-600 dark:text-red-400">
                  <X className="h-4 w-4" />
                  <span>No access to editing later</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-red-600 dark:text-red-400">
                  <X className="h-4 w-4" />
                  <span>Limited to one download</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-green-500 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Can still create and download once</span>
                </li>
              </ul>

              <Button
                variant="outline"
                onClick={() => setProceedWithoutSignIn(true)}
                size="lg"
                className="w-full py-3 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20 flex items-center justify-center gap-2"
              >
                Continue Without Saving
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                You can sign in anytime to save your work
              </p>
            </div>
          </div>

         
         
        </div>
      </div>
    );
  }

  // If the user is signed in or chose to proceed without signing in
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
      {!session && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 py-3 px-4 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>You are working without an account. Your resume will not be saved.</span>
          <Button
            variant="link"
            onClick={() => router.push('/signin')}
            className="text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 ml-2 h-auto p-0 whitespace-nowrap"
          >
            Sign in to save your work
          </Button>
        </div>
      )}
      <StepForm />
    </div>
  );
}
