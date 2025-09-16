"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Create Resume", href: "/resume/create" },
  { title: "ATS Checker", href: "/ats-checker" },
  
];

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSignOut = async () => {
    localStorage.clear();
    await signOut({ redirect: false });
    router.push("/");
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          {session?.user?.name || "User"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-xl rounded-xl">
        <DropdownMenuLabel className="text-sm text-gray-500 dark:text-gray-400">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 dark:text-red-400"
          onClick={handleSignOut}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ATS Resume Builder
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {session ? (
              <UserMenu />
            ) : (
              <Link
                href="/signin"
                className="px-5 py-2 rounded-full bg-black text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-l border-gray-200 dark:border-gray-800"
              >
                <nav className="flex flex-col gap-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 rounded-md hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setSheetOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                    {session ? (
                      <>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setSheetOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setSheetOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            setSheetOpen(false);
                            handleSignOut();
                          }}
                          className="w-full text-left px-4 py-2 rounded-md text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/signin"
                        className="block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                        onClick={() => setSheetOpen(false)}
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
