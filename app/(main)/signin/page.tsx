"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Lock, Shield, FileText, Sparkles } from "lucide-react"; // removed Loader2

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const email = session?.user?.email;
    if (typeof email === "string") {
      const loadSettings = async () => {
        try {
          const docRef = doc(db, 'users', email, 'settings', 'preferences');
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);

            localStorage.setItem('resumeitnow_name', data.displayName);
            localStorage.setItem('resumeitnow_template', data.defaultTemplate);
          }
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      };
      loadSettings();
      router.push('/profile');
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-t-2 border-blue-600 border-solid rounded-full animate-spin mx-auto"></div>
            <Lock className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-muted-foreground mt-4">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      {/* Decorative elements */}
      <div className="fixed top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-30 dark:opacity-20"></div>
      <div className="fixed bottom-10 right-10 w-24 h-24 bg-indigo-200 rounded-full blur-xl opacity-30 dark:opacity-20"></div>
      
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm mb-6 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-3">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your resume builder account
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Continue with Google</h2>
            <p className="text-sm text-muted-foreground">
              Securely sign in to your account
            </p>
          </div>

          <Button
            onClick={() => signIn("google")}
            className="w-full py-3 h-auto bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="mr-3">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span className="text-sm font-medium">Sign in with Google</span>
            </div>
          </Button>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-center mb-4 text-muted-foreground">Why sign in?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm">Save and access your resumes anytime</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm">Secure Google authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full">
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm">AI-powered resume enhancements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
