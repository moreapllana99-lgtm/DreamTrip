"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { popularDestinations, blogPosts } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = query.trim() ? [
    ...popularDestinations.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase())).map(d => ({ type: "destination" as const, title: d.name, subtitle: d.country, image: d.bannerImage, url: `/destination/${d.id}`, rating: d.rating })),
    ...blogPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).map(p => ({ type: "blog" as const, title: p.title, subtitle: p.category, image: p.coverImage, url: `/blog/${p.slug}`, rating: undefined })),
  ] : [];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, blogs, trips..."
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
        />

        {query && (
          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-500">{results.length} results for &ldquo;{query}&rdquo;</p>
            {results.map((r, i) => (
              <Link key={i} href={r.url}>
                <Card hover>
                  <div className="flex items-center gap-4">
                    <img src={r.image} alt={r.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="info">{r.type}</Badge>
                        {r.rating && <span className="text-xs text-yellow-500">★ {r.rating}</span>}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{r.title}</h3>
                      <p className="text-sm text-gray-500">{r.subtitle}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
            {results.length === 0 && (
              <p className="text-center text-gray-500 py-12">No results found. Try a different search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
