import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChat from "@/components/layout/AIChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamTrip — Plan Your Perfect Trip with AI",
  description:
    "DreamTrip is an AI-powered travel planner that helps you create personalized vacations based on your budget, destination, and preferences.",
  keywords: ["travel", "AI", "trip planner", "vacation", "itinerary", "travel planning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <AIChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
