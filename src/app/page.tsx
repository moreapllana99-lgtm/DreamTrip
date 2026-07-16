"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { popularDestinations, blogPosts, pricingPlans, travelStyles } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

// ─── Animations ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Hero Section ───
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-blue-950/20 dark:via-gray-950 dark:to-gray-950" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="info" className="mb-6 px-4 py-1.5 text-sm">
              ✈️ AI-Powered Travel Planning
            </Badge>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            Travel smarter
            <br />
            <span className="text-gradient">with AI.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Plan your perfect trip in seconds. Get personalized itineraries, discover hidden gems, and create unforgettable memories — all powered by AI.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/planner">
              <Button size="lg" className="px-8 py-4 text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Planning
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-base">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { value: "10K+", label: "Happy Travelers" },
              { value: "500+", label: "Destinations" },
              { value: "50K+", label: "Trips Planned" },
              { value: "4.9", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Animated travel illustrations */}
      <div className="relative max-w-5xl mx-auto mt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="h-10 bg-gray-100 dark:bg-gray-700 flex items-center px-4 gap-2 border-b border-gray-200 dark:border-gray-600">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-gray-500">DreamTrip AI Planner</span>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Input Panel */}
              <div className="space-y-3">
                <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
                <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" style={{ animationDelay: "0.4s" }} />
                <div className="h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl" />
              </div>
              {/* Map Preview */}
              <div className="md:col-span-2 bg-gray-100 dark:bg-gray-700 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl">🗺️</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Interactive Map Preview</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features Section ───
function FeaturesSection() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Planning",
      description: "Our advanced AI creates personalized itineraries based on your preferences, budget, and travel style.",
    },
    {
      icon: "🗺️",
      title: "Interactive Maps",
      description: "Visualize your entire trip with interactive maps showing hotels, restaurants, and attractions.",
    },
    {
      icon: "📋",
      title: "Smart Checklists",
      description: "Never forget anything with AI-generated packing lists and pre-trip checklists.",
    },
    {
      icon: "🌤️",
      title: "Weather Integration",
      description: "Get real-time weather forecasts for your travel dates and alternative plans for rainy days.",
    },
    {
      icon: "💰",
      title: "Budget Tracking",
      description: "Track every expense and stay within budget with detailed cost breakdowns.",
    },
    {
      icon: "👥",
      title: "Community Sharing",
      description: "Share trips, get inspired by other travelers, and plan together with friends.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Everything you need to travel better
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            From planning to packing, we&apos;ve got you covered with intelligent tools
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <Card hover className="h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Destinations Carousel ───
function DestinationsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Popular destinations
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Discover trending places handpicked by our AI
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {popularDestinations.slice(0, 6).map((dest) => (
            <motion.div key={dest.id} variants={fadeUp}>
              <Link href={`/destination/${dest.id}`}>
                <Card hover className="overflow-hidden p-0 group h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dest.bannerImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                      <p className="text-sm text-white/80">{dest.country}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-medium text-white">
                        ★ {dest.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{dest.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                      <span>{dest.language}</span>
                      <span>{dest.currency}</span>
                      <span>{dest.costOfLiving}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link href="/discover">
            <Button variant="outline" size="lg">
              Explore All Destinations
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ───
function HowItWorksSection() {
  const steps = [
    { step: 1, title: "Tell us your preferences", description: "Choose your destination, budget, travel style, and interests." },
    { step: 2, title: "AI creates your plan", description: "Our AI generates a complete personalized itinerary in seconds." },
    { step: 3, title: "Book & explore", description: "Book flights, hotels, and activities — then enjoy your perfect trip!" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            How it works
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Plan your entire trip in three simple steps
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/25">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-300 to-transparent dark:from-blue-700" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ───
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "DreamTrip planned my entire honeymoon to Bali in minutes! The itinerary was perfect and we discovered places we'd never have found on our own.",
      name: "Sarah & Tom",
      role: "Honeymoon in Bali",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      quote: "I was skeptical about AI trip planning, but this blew me away. My 2-week Europe trip was flawlessly organized with the best local spots.",
      name: "Mike Chen",
      role: "Europe Backpacker",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      quote: "The budget tracking feature alone is worth it. I saved $500 on my Japan trip compared to what I would have spent otherwise!",
      name: "Emma Davis",
      role: "Solo Traveler",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Loved by travelers worldwide
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            See what our users say about DreamTrip
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <Card className="h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing Section ───
function PricingSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Simple, transparent pricing
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Start free, upgrade when you need more
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {pricingPlans.map((plan) => (
            <motion.div key={plan.id} variants={fadeUp}>
              <Card className={`h-full flex flex-col relative ${plan.highlighted ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/10' : ''}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price === 0 ? 'Free' : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500 dark:text-gray-400">/mo</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.id === 'free' ? '/signup' : '/pricing'}>
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ───
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the AI trip planner work?",
      a: "Our AI analyzes millions of data points including destinations, user preferences, seasonal trends, and real-time pricing to create personalized itineraries in seconds.",
    },
    {
      q: "Can I customize the AI-generated itinerary?",
      a: "Absolutely! You can edit, reorder, add, or remove any item from your itinerary. The AI adapts to your changes for a truly personalized experience.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use bank-level encryption, never sell your data, and are GDPR compliant. Your travel plans are private by default.",
    },
    {
      q: "Do you offer real-time flight and hotel bookings?",
      a: "We provide real-time pricing and availability for flights, hotels, and activities. Bookings are completed through our trusted partners.",
    },
    {
      q: "Can I plan trips with friends?",
      a: "Yes! Our Pro plan includes collaborative trip planning where multiple people can contribute to the same itinerary in real-time.",
    },
    {
      q: "What if I need to cancel or change my trip?",
      a: "You can modify your itinerary anytime. Cancellation policies depend on your individual bookings — we'll help you navigate the process.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left"
              >
                <Card className={`transition-all duration-200 ${openIndex === i ? 'ring-2 ring-blue-500/50' : ''}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Blog Section ───
function BlogSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              From the blog
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              Travel tips, stories, and inspiration
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/blog">
              <Button variant="ghost">View all posts &rarr;</Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {blogPosts.slice(0, 4).map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <Link href={`/blog/${post.slug}`}>
                <Card hover className="overflow-hidden p-0 h-full">
                  <div className="h-40 overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2">{post.category}</Badge>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.readTime} min read</span>
                      <span>{post.likes} ❤️</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ───
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to plan your dream trip?
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
          Join thousands of travelers who are planning smarter with AI. Start for free today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl px-8 py-4 text-base">
              Get Started Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main Landing Page ───
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
