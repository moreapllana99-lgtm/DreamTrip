"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import Avatar from "@/components/ui/Avatar";

import { popularDestinations } from "@/lib/mock-data";

const sharedTrips = [
  { id: "1", user: "Sarah J.", avatar: "https://i.pravatar.cc/150?img=47", destination: "Tokyo, Japan", days: 7, likes: 234, comments: 45, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400" },
  { id: "2", user: "Mike C.", avatar: "https://i.pravatar.cc/150?img=12", destination: "Barcelona, Spain", days: 5, likes: 189, comments: 32, image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400" },
  { id: "3", user: "Emma D.", avatar: "https://i.pravatar.cc/150?img=5", destination: "Bali, Indonesia", days: 10, likes: 456, comments: 78, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" },
  { id: "4", user: "Alex K.", avatar: "https://i.pravatar.cc/150?img=68", destination: "Paris, France", days: 4, likes: 312, comments: 56, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
];

const stories = [
  { id: "1", user: "TravelPro", avatar: "https://i.pravatar.cc/150?img=32", title: "My 30-Day Southeast Asia Adventure", excerpt: "From the temples of Angkor Wat to the beaches of Thailand..." },
  { id: "2", user: "Wanderlust", avatar: "https://i.pravatar.cc/150?img=44", title: "How I Traveled Europe on $50/Day", excerpt: "Tips and tricks for budget travel across Europe..." },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("trips");

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Community</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Get inspired by fellow travelers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <Tabs
            tabs={[
              { id: "trips", label: "Shared Trips", icon: "✈️" },
              { id: "stories", label: "Travel Stories", icon: "📖" },
              { id: "photos", label: "Photo Gallery", icon: "📸" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === "trips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sharedTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden p-0">
                <div className="flex">
                  <img src={trip.image} alt={trip.destination} className="w-32 sm:w-48 h-full object-cover" />
                  <div className="p-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar src={trip.avatar} name={trip.user} size="sm" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{trip.user}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{trip.destination}</h3>
                    <p className="text-xs text-gray-500 mb-3">{trip.days} days trip</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>❤️ {trip.likes}</span>
                      <span>💬 {trip.comments}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "stories" && (
          <div className="space-y-4 max-w-3xl mx-auto">
            {stories.map((story) => (
              <Card key={story.id} hover>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar src={story.avatar} name={story.user} size="sm" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{story.user}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{story.title}</h3>
                <p className="text-sm text-gray-500">{story.excerpt}</p>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "photos" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularDestinations.slice(0, 8).map((dest, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={dest.gallery?.[0] || dest.bannerImage} alt={dest.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
