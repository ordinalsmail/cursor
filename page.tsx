"use client"

import React from "react"
import Link from "next/link"
import { useState } from "react"
import {
  Archive,
  ArchiveX,
  File,
  Inbox,
  Mail,
  MoreHorizontal,
  Moon,
  Search,
  Send,
  Star,
  Sun,
  Trash2,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"


export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true"
    }
    return false
  })

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "You've been added to the waitlist.",
        })
        setEmail("")
      } else {
        throw new Error("Subscription failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const SidebarButton = React.memo(
    ({ icon: Icon, label, badge }: { icon: React.ElementType; label: string; badge?: string }) => (
      <Button variant="ghost" className="justify-start gap-2 font-normal w-full" asChild>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </div>
          {badge && (
            <Badge variant="secondary" className="ml-auto">
              {badge}
            </Badge>
          )}
        </div>
      </Button>
    ),
  )

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex h-full flex-col border-r dark:border-gray-800">
          <div className="flex h-14 items-center px-4 border-b dark:border-gray-800">
            <div className="flex items-center gap-2 font-semibold">
              <Mail className="h-5 w-5 text-[#F7931A]" />
              <span>Ordinals Mail</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" aria-label="More options">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2 bg-background dark:bg-gray-900">
            <nav className="grid gap-1 px-2">
              <SidebarButton icon={Inbox} label="Inbox" badge="Coming Soon" />
              <SidebarButton icon={File} label="Drafts" />
              <SidebarButton icon={Send} label="Sent" />
              <SidebarButton icon={Star} label="Starred" />
              <SidebarButton icon={Archive} label="Archive" />
              <SidebarButton icon={ArchiveX} label="Spam" />
              <SidebarButton icon={Trash2} label="Trash" />
         <Link
                  href="https://docs.ordinalsmail.com"
                  className="flex items-start gap-4 p-4 hover:bg-[#F7931A] accent/50 cursor-pointer transition-colors opacity-50"
                >  
                  <SidebarButton icon={File} label="Documents" badge="Read Now" />  
                </Link>
          </nav>
          </div>
          <div className="p-4 mt-auto bg-background dark:bg-gray-900">
            <div className="text-xs text-muted-foreground dark:text-gray-400 bg-background dark:bg-gray-900">
              <p>© 2025 Ordinals Mail</p>
              <p className="mt-1">Launching Soon</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background dark:bg-gray-900 dark:border-gray-800 px-4 lg:px-6">
            <div className="lg:hidden flex items-center gap-2 font-semibold">
              <Mail className="h-5 w-5 text-[#F7931A]" />
              <span>Ordinals Mail</span>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="ml-auto lg:ml-0"
                aria-label="Toggle dark mode"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <form className="ml-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-background pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
            </div>
          </header>

          {/* Email List */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-800">
              <h2 className="text-lg font-semibold">Inbox</h2>
              <Badge variant="outline" className="ml-auto">
                Preview
              </Badge>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="divide-y dark:divide-gray-800">
                {/* Featured Email */}
                <div className="flex items-start gap-4 p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                  <Avatar className="mt-1 h-8 w-8 bg-[#F7931A] text-white">
                    <span>~~1</span>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">Ordinals Mail Team</div>
                      <div className="text-xs text-muted-foreground">Block #779247</div>
                      <Badge className="ml-auto bg-[#808080]">Coming Soon</Badge>
                    </div>
                    <div className="font-medium">Web3 Communication</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      Be part of a decentralized messaging system inscribed directly on the
                      Bitcoin blockchain.
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        Inscription #284485...
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Coming Soon Emails */}
                <div className="flex items-start gap-4 p-4 hover:bg-accent/50 cursor-pointer transition-colors opacity-60">
             <Avatar className="mt-1 h-8 w-8 bg-[#000000] text-white">
                    <span>~~2</span>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">Developer</div>
                      <div className="text-xs text-muted-foreground">Coming Soon
                    </div>
                    </div>
                    <div className="font-medium">InscribeMail</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      Your guide to Inscribing Mail on the Bitcoin Blockchain...
                    </div>
                  </div>
                </div>

                <Link
                  href="https://docs.ordinalsmail.com"
                  className="flex items-start gap-4 p-4 hover:bg-[#F7931A] accent/40 cursor-pointer transition-colors opacity-30"
                >
                   <Avatar className="mt-1 h-8 w-8 bg-[#F7931A] text-white">
                    <span>~~3</span>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">Satoshi</div>
                      <div className="text-xs text-muted-foreground"><Badge className="ml-auto bg">See Attached</Badge></div>
                      <Badge className="ml-auto bg-[#F7931A]">Docs</Badge>
                    </div>
                    <div className="font-medium">Re: Ordinals Mail Standard</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      The technical specifications for the messaging protocol...
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Email Content / Sign Up Form */}
            <div className="border-t p-4 md:p-6 bg-accent/20 dark:bg-gray-800 dark:border-gray-700">
              <div className="mx-auto max-w-md space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">
                    Ordinals Mail on <span className="text-[#F7931A]">Bitcoin</span>
                  </h2>
                  <p className="text-muted-foreground dark:text-gray-400">
                    Secure messaging via Ordinals inscriptions. Be the first to experience it.
                  </p>
                </div>

                <Card className="border-[#F7931A]/20 dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Why Wait? Get an Update!</CardTitle>
                    <CardDescription>Get early access when we launch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="focus-visible:ring-[#F7931A] dark:bg-gray-700 dark:border-gray-600"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#F7931A] hover:bg-[#E68209] text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Subscribing..." : "Subscribe for Updates"}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between text-xs text-muted-foreground">
                    <Link href="#" className="hover:text-[#F7931A]">
                      Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-[#F7931A]">
                      info@ordinalsmail.com
                    </Link>
                    <Link href="#" className="hover:text-[#F7931A]">
                      Terms of Service
                    </Link>
                  </CardFooter>
                </Card>

                <div className="flex justify-center space-x-4">
                  <Link href="https://x.com/ordinalsmail" className="text-sm hover:text-[#F7931A]">
                    Twitter
                  </Link>
                  <Link href="https://ordinalsdiscord.com" className="text-sm hover:text-[#F7931A]">
                    Discord
                  </Link>
                  <Link href="https://docs.ordinalsmail.com" className="text-sm hover:text-[#F7931A]">
                    Documentation
                  </Link>
                  <Link href="https://MetaOrds.com" className="text-sm hover:text-[#F7931A]">
                    Genesis Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hexagonal Background Pattern - Only visible on dark sections */}
      <div className="fixed inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(5)">
              <polygon
                points="25,0 50,14.4 50,28.8 25,43.4 0,28.8 0,14.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>
    </div>
  )
}

