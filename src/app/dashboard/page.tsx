"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useStore } from "@/lib/store";
import { achievements } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const { user, trips } = useStore();

  const stats = [
    { icon: "✈️", label: "Upcoming Trips", value: trips.filter(t => t.status === "planned").length },
    { icon: "🌍", label: "Countries Visited", value: 12 },
    { icon: "📋", label: "Total Trips", value: trips.length || 8 },
    { icon: "💰", label: "Total Spent", value: formatCurrency(15420) },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name || "Traveler"}!</h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Here's your travel overview</p>
            </div>
            <Link href="/planner">
              <Button>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Plan New Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center text-2xl">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Trips */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Trips</h2>
            {trips.length === 0 ? (
              <Card className="text-center py-12">
                <span className="text-5xl mb-4 block">🗺️</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No trips yet</h3>
                <p className="text-sm text-gray-500 mb-6">Start planning your first adventure!</p>
                <Link href="/planner"><Button>Plan Your First Trip</Button></Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {trips.map((trip) => (
                  <Card key={trip.id} hover>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{trip.destination}</h3>
                        <p className="text-sm text-gray-500">{trip.status}</p>
                      </div>
                      <Badge variant={trip.status === "planned" ? "info" : "success"}>{trip.status}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Achievements & Stats */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.slice(0, 6).map((a) => (
                <Card key={a.id} className="text-center p-3">
                  <span className="text-2xl">{a.icon}</span>
                  <p className="text-xs font-medium text-gray-900 dark:text-white mt-1">{a.name}</p>
                </Card>
              ))}
            </div>

            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {["Tokyo, Japan", "Barcelona, Spain", "Bali, Indonesia"].map((dest, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                    <span className="text-xl">{["🗼", "🏰", "🌴"][i]}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{dest}</p>
                      <p className="text-xs text-gray-400">Based on your interests</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
