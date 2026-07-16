"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { blogPosts } from "@/lib/mock-data";

const categories = ["All", "Travel Tips", "Budget Travel", "Food & Drink", "Adventure"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = blogPosts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || p.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Travel Blog</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Tips, stories, and travel inspiration</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..."
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  category === c ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >{c}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card hover className="overflow-hidden p-0 h-full">
                <div className="h-48 overflow-hidden">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <Badge className="mb-2">{post.category}</Badge>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <img src={post.authorAvatar} alt={post.authorName} className="w-6 h-6 rounded-full" />
                      <span>{post.authorName}</span>
                    </div>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
