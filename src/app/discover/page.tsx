"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { popularDestinations } from "@/lib/mock-data";

const continents = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Oceania"];

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [activeContinent, setActiveContinent] = useState("All");

  const filtered = popularDestinations.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
    const matchesContinent = activeContinent === "All" || d.continent === activeContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Discover Destinations</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Explore amazing places around the world</p>
          <div className="max-w-md mx-auto mt-6">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              }
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => setActiveContinent(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeContinent === c
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <Link key={dest.id} href={`/destination/${dest.id}`}>
              <Card hover className="overflow-hidden p-0 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={dest.bannerImage} alt={dest.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                    <p className="text-sm text-white/80">{dest.country}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-medium text-white">★ {dest.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{dest.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{dest.language}</Badge>
                    <Badge variant="info">{dest.currency}</Badge>
                    <Badge variant="success">Safety: {dest.safetyScore}/100</Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No destinations found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or continent filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
