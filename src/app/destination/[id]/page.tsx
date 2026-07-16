"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { popularDestinations } from "@/lib/mock-data";

export default function DestinationPage() {
  const params = useParams();
  const dest = popularDestinations.find((d) => d.id === params.id);

  if (!dest) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">🔍</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Destination not found</h1>
          <p className="text-gray-500 mb-6">The destination you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/discover"><Button>Browse Destinations</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Banner */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={dest.bannerImage} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="info" className="mb-3">{dest.continent}</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{dest.name}</h1>
            <p className="text-lg text-white/80">{dest.country}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{dest.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { label: "Safety Score", value: `${dest.safetyScore}/100`, color: "text-green-600" },
                  { label: "Cost of Living", value: dest.costOfLiving, color: "text-blue-600" },
                  { label: "Language", value: dest.language, color: "text-purple-600" },
                  { label: "Currency", value: dest.currency, color: "text-orange-600" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Attractions */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Popular Attractions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.popularAttractions.map((attraction) => (
                  <div key={attraction} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <span className="text-xl">🗺️</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{attraction}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Restaurants & Hotels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🍽️ Best Restaurants</h2>
                <ul className="space-y-2">
                  {dest.bestRestaurants.map((r) => (
                    <li key={r} className="text-sm text-gray-600 dark:text-gray-300">• {r}</li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🏨 Best Hotels</h2>
                <ul className="space-y-2">
                  {dest.bestHotels.map((h) => (
                    <li key={h} className="text-sm text-gray-600 dark:text-gray-300">• {h}</li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Food Guide & Transport */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🍜 Food Guide</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{dest.foodGuide}</p>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🚇 Transportation</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{dest.transportation}</p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div><span className="text-gray-500">Timezone:</span> <span className="text-gray-900 dark:text-white">{dest.timezone}</span></div>
                <div><span className="text-gray-500">Visa:</span> <span className="text-gray-900 dark:text-white">{dest.visaRequirements}</span></div>
                <div><span className="text-gray-500">Weather:</span> <span className="text-gray-900 dark:text-white">{dest.weather}</span></div>
                <div><span className="text-gray-500">Nightlife:</span> <span className="text-gray-900 dark:text-white">{dest.nightlife}</span></div>
              </div>
              <Link href={`/planner`}>
                <Button className="w-full mt-4">Plan Trip Here</Button>
              </Link>
            </Card>

            {/* Emergency */}
            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🆘 Emergency Numbers</h3>
              <div className="space-y-2">
                {dest.emergencyNumbers.map((e) => (
                  <div key={e.service} className="flex justify-between text-sm">
                    <span className="text-gray-500">{e.service}</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{e.number}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Gallery */}
            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📸 Gallery</h3>
              <div className="grid grid-cols-2 gap-2">
                {dest.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`${dest.name} ${i + 1}`} className="rounded-xl w-full h-24 object-cover hover:scale-105 transition-transform" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
