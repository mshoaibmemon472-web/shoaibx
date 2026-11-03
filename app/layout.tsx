import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShoaibX | Premium Books, Blogs & Products",
    template: "%s | ShoaibX"
  },
  description: "Discover premium AI education books, storybooks, and trending e-commerce products.",
  verification: {
    google: "a31dzwemgTuHF6GDpr8TlDmprj1W_otmDyoO8c8zMkc",
  },
  openGraph: {
    title: "ShoaibX | Premium Books & Products",
    description: "Discover premium AI education, storybooks, and trending products.",
    url: "https://shoaibx.vercel.app",
    siteName: "ShoaibX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}>
        
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        <Analytics />
        <GoogleAnalytics gaId="G-0CGZ4FHCLN" />
        
        <Script 
          id="monetag-in-page-push" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='12111516',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />

        <Script 
          id="monetag-vignette" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='12111547',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />

        <Script 
          id="monetag-push-notification" 
          src="https://5gvci.com/act/files/tag.min.js?z=12151851"
          data-cfasync="false" 
          strategy="afterInteractive"
        />
        
      </body>
    </html>
  );
}