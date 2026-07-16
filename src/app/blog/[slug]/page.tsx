"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { blogPosts } from "@/lib/mock-data";

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">📄</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Post not found</h1>
          <Link href="/blog"><Button>Back to Blog</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <Badge variant="info" className="mb-3">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{post.title}</h1>
          <div className="flex items-center gap-3">
            <img src={post.authorAvatar} alt={post.authorName} className="w-8 h-8 rounded-full ring-2 ring-white/30" />
            <span className="text-white/80 text-sm">{post.authorName}</span>
            <span className="text-white/50 text-sm">· {post.readTime} min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{post.excerpt}</p>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>This is a placeholder for the full blog content. In a production environment, this would contain the complete article with rich formatting, images, and interactive elements.</p>
            <p>The article would feature detailed travel tips, personal stories, practical advice, and beautiful photography to inspire readers to explore new destinations.</p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Key Takeaways</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Research your destination thoroughly before traveling</li>
              <li>Pack light and smart — you don&apos;t need as much as you think</li>
              <li>Learn a few local phrases — it goes a long way</li>
              <li>Always have travel insurance</li>
            </ul>
          </div>
        </Card>

        <div className="flex items-center gap-4 mt-8">
          <Button variant="outline">❤️ {post.likes} Likes</Button>
          <Button variant="outline">💬 {post.comments} Comments</Button>
          <Button variant="outline">🔖 Bookmark</Button>
          <Button variant="ghost" className="ml-auto">Share</Button>
        </div>
      </div>
    </div>
  );
}
