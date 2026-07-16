"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { pricingPlans } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Simple Pricing</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Choose the plan that fits your travel style</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={`h-full flex flex-col relative ${plan.highlighted ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/10' : ''}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {plan.price === 0 ? 'Free' : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && <span className="text-gray-500 dark:text-gray-400">/mo</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.id === "free" ? "/signup" : "/pricing"}>
                  <Button variant={plan.highlighted ? "primary" : "outline"} className="w-full">{plan.cta}</Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto grid gap-4">
            {["Can I cancel anytime?", "Do you offer refunds?", "Can I switch plans?", "Is there a free trial?"].map((q, i) => (
              <Card key={i}>
                <p className="font-medium text-gray-900 dark:text-white">{q}</p>
                <p className="text-sm text-gray-500 mt-1">Yes! Our flexible plans let you change or cancel anytime with no hidden fees.</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
