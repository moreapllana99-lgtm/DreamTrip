"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">We&apos;d love to hear from you</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <div className="space-y-4">
              {[
                { icon: "📧", label: "Email", value: "hello@dreamtrip.com" },
                { icon: "📞", label: "Phone", value: "+1 (555) 123-4567" },
                { icon: "📍", label: "Office", value: "San Francisco, CA" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card>
            {sent ? (
              <div className="text-center py-8">
                <span className="text-5xl mb-4 block">✅</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-sm text-gray-500">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="How can we help?"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-200 resize-none" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
