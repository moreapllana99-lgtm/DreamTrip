"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Tabs from "@/components/ui/Tabs";
import Badge from "@/components/ui/Badge";
import { planTrip } from "@/lib/ai";
import { travelStyles, interestOptions } from "@/lib/mock-data";
import { Itinerary, Trip, Interest, TravelStyle } from "@/lib/types";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

// ─── Planner Form ───
function PlannerForm({ onSubmit }: { onSubmit: (data: Partial<Trip>) => void }) {
  const [destination, setDestination] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState(2000);
  const [currency, setCurrency] = useState("USD");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [pets, setPets] = useState(0);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("adventure");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [notes, setNotes] = useState("");

  const toggleInterest = (interest: Interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      destination,
      departureCity,
      startDate,
      endDate,
      budget,
      currency,
      travelers: { adults, kids, pets },
      travelStyle,
      interests,
      customNotes: notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">📍</span> Trip Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g., Tokyo, Japan" />
          <Input label="Departure City" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} placeholder="e.g., New York" />
          <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </Card>

      {/* Budget & Currency */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">💰</span> Budget
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget ({currency})</label>
            <input
              type="range"
              min={500}
              max={20000}
              step={100}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$500</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(budget, currency)}</span>
              <span>$20,000</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm"
            >
              {["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "INR"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Travelers */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">👥</span> Travelers
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Adults", value: adults, set: setAdults, min: 1 },
            { label: "Kids", value: kids, set: setKids, min: 0 },
            { label: "Pets", value: pets, set: setPets, min: 0 },
          ].map(({ label, value, set, min }) => (
            <div key={label} className="text-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
              <div className="flex items-center justify-center gap-2">
                <button type="button" onClick={() => set(Math.max(min, value - 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">-</button>
                <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{value}</span>
                <button type="button" onClick={() => set(value + 1)} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">+</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Travel Style */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">🎯</span> Travel Style
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {travelStyles.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTravelStyle(value as TravelStyle)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                travelStyle === value
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/50"
                  : "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              <span className="text-lg">{icon}</span> {label}
            </button>
          ))}
        </div>
      </Card>

      {/* Interests */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">❤️</span> Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleInterest(value as Interest)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                interests.includes(value as Interest)
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/50"
                  : "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      </Card>

      {/* Notes */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">📝</span> Custom Notes
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requirements, dietary restrictions, accessibility needs, or preferences..."
          rows={4}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-200 resize-none"
        />
      </Card>

      <Button type="submit" size="lg" className="w-full">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Generate AI Itinerary
      </Button>
    </form>
  );
}

// ─── Itinerary Display ───
function ItineraryDisplay({ itinerary, onBack }: { itinerary: Itinerary; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { addTrip } = useStore();

  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "daily", label: "Daily Plan", icon: "📅" },
    { id: "flights", label: "Flights", icon: "✈️" },
    { id: "hotels", label: "Hotels", icon: "🏨" },
    { id: "food", label: "Food", icon: "🍽️" },
    { id: "budget", label: "Budget", icon: "💰" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Planner
        </button>
        <Button size="sm" onClick={() => { addTrip({ id: Date.now().toString(), userId: "1", title: itinerary.summary.slice(0, 50), destination: "Planned Trip", departureCity: "", startDate: "", endDate: "", travelers: { adults: 1, kids: 0, pets: 0 }, budget: itinerary.budget.total, currency: itinerary.budget.currency, travelStyle: "adventure", interests: [], status: "planned", isPublic: false, likes: 0, comments: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }); }}>
          💾 Save Trip
        </Button>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{itinerary.summary}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {itinerary.dailyPlan.length} days · {itinerary.budget.total ? formatCurrency(itinerary.budget.total, itinerary.budget.currency) : "N/A"} total
        </p>
      </Card>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📝 Travel Advice</h3>
            <ul className="space-y-2">
              {itinerary.travelAdvice.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="text-blue-500 mt-0.5">•</span> {tip}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🛡️ Safety Tips</h3>
            <ul className="space-y-2">
              {itinerary.safetyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="text-green-500 mt-0.5">•</span> {tip}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🎒 Packing Checklist</h3>
            <div className="grid grid-cols-2 gap-2">
              {itinerary.packingChecklist.map((item, i) => (
                <label key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                  {item}
                </label>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Daily Plan Tab */}
      {activeTab === "daily" && (
        <div className="space-y-4">
          {itinerary.dailyPlan.map((day) => (
            <Card key={day.day}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day {day.day}</h3>
              <p className="text-xs text-gray-400 mb-4">{day.date}</p>
              <div className="space-y-3">
                {day.activities.map((act, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold flex-shrink-0">
                      {act.time.split(":")[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{act.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{act.description}</p>
                      <span className="inline-block mt-1 text-xs text-gray-400">{act.duration} · {act.category}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-400 mb-2">Meals:</p>
                <div className="flex gap-1.5 flex-wrap">
                  {day.meals.map((meal, i) => (
                    <Badge key={i} variant="info">{meal.type}: {meal.restaurant}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Flights Tab */}
      {activeTab === "flights" && (
        <div className="space-y-4">
          {itinerary.flights.map((flight, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{flight.airline}</p>
                  <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{flight.departureTime}</p>
                      <p className="text-xs text-gray-400">{flight.departure}</p>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 relative">
                      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs">✈️</span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{flight.arrivalTime}</p>
                      <p className="text-xs text-gray-400">{flight.arrival}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(flight.price)}</p>
                  <Button size="sm" variant="outline" className="mt-2">View Flight</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Hotels Tab */}
      {activeTab === "hotels" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {itinerary.hotels.map((hotel, i) => (
            <Card key={i} className="overflow-hidden p-0">
              <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{hotel.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(Math.floor(hotel.rating))].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{hotel.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{hotel.address}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {hotel.amenities.slice(0, 4).map((a, j) => (
                    <Badge key={j} variant="default">{a}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(hotel.pricePerNight, itinerary.budget.currency)}<span className="text-xs font-normal text-gray-400">/night</span></span>
                  <Button size="sm" variant="outline">View Hotel</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Food Tab */}
      {activeTab === "food" && (
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🍜 Local Foods to Try</h3>
            <div className="flex flex-wrap gap-2">
              {itinerary.localFoods.map((food, i) => (
                <Badge key={i} variant="success">{food}</Badge>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itinerary.restaurants.map((r, i) => (
              <Card key={i}>
                <h4 className="font-semibold text-gray-900 dark:text-white">{r.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge>{r.cuisine}</Badge>
                  <span className="text-xs text-gray-400">{r.priceRange}</span>
                  <span className="text-xs text-yellow-500">★ {r.rating}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{r.address}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Budget Tab */}
      {activeTab === "budget" && (
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Budget Breakdown</h3>
          {[
            { label: "Flights", value: itinerary.budget.flights, color: "bg-blue-500" },
            { label: "Hotels", value: itinerary.budget.hotels, color: "bg-indigo-500" },
            { label: "Food", value: itinerary.budget.food, color: "bg-green-500" },
            { label: "Activities", value: itinerary.budget.activities, color: "bg-yellow-500" },
            { label: "Transportation", value: itinerary.budget.transportation, color: "bg-orange-500" },
            { label: "Shopping", value: itinerary.budget.shopping, color: "bg-pink-500" },
            { label: "Misc", value: itinerary.budget.misc, color: "bg-gray-500" },
          ].map((item) => (
            <div key={item.label} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.value, itinerary.budget.currency)}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.value / itinerary.budget.total) * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-gray-900 dark:text-white">Total</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(itinerary.budget.total, itinerary.budget.currency)}</span>
          </div>
        </Card>
      )}
    </motion.div>
  );
}

// ─── Main Planner Page ───
export default function PlannerPage() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<Trip>) => {
    setIsLoading(true);
    const result = await planTrip(data);
    setItinerary(result);
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">AI Trip Planner</h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            {itinerary ? "Your personalized itinerary is ready!" : "Tell us about your dream trip and let AI do the rest"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                <span className="text-3xl">✈️</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Planning your dream trip...</h2>
              <p className="text-gray-500 dark:text-gray-400">Our AI is crafting your perfect itinerary</p>
              <div className="mt-6 flex justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </motion.div>
          ) : itinerary ? (
            <motion.div key="itinerary" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ItineraryDisplay itinerary={itinerary} onBack={() => setItinerary(null)} />
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <PlannerForm onSubmit={handleSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
