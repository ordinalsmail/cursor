import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ordinals Mail - Secure Messaging on Bitcoin",
  description:
    "Experience the future of decentralized email with Ordinals Mail. Secure messaging via Bitcoin blockchain inscriptions.",
  openGraph: {
    title: "Ordinals Mail - Secure Messaging on Bitcoin",
    description:
      "Experience the future of decentralized email with Ordinals Mail. Secure messaging via Bitcoin blockchain inscriptions.",
    url: "https://ordinalsmail.com",
    siteName: "Ordinals Mail",
    images: [
      {
        url: "https://ordinalsmail.com/og-image.png", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Ordinals Mail Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ordinals Mail - Secure Messaging on Bitcoin",
    description:
      "Experience the future of decentralized email with Ordinals Mail. Secure messaging via Bitcoin blockchain inscriptions.",
    images: ["https://ordinalsmail.com/twitter-image.png"], // Make sure to add this image to your public folder
    creator: "@ordinalsmail",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'