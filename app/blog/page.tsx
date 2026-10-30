"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

type Blog = {
  id: number;
  title: string;
  content: string;
  cover_image_url: string;
  created_at: string;
};

export default function BlogListPage() {
  const [blog, setblog] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchblog = async () => {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setblog(data || []);
      setLoading(false);
    };
    fetchblog();
  }, []);

  // Search Filter Logic
  const filteredblog = blog.filter((blog) => {
    const searchTerm = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Insights & Articles
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Explore the latest trends in AI, technology, and digital products.
            </p>
          </motion.div>
        </div>

        {/* 🔍 Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20 relative"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full backdrop-blur-xl overflow-hidden">
              <span className="pl-6 text-gray-400 text-xl">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full px-6 py-5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="pr-6 text-gray-400 hover:text-white transition-colors text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredblog.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl max-w-2xl mx-auto">
            <p className="text-gray-400 text-xl mb-4">
              {search ? "No articles found matching your search." : "No articles published yet."}
            </p>
            {search && (
              <button 
                onClick={() => setSearch("")} 
                className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredblog.map((blog, i) => (
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={blog.id}
                className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500"
              >
                
                {/* Image Container */}
                <Link href={`/blog/${blog.id}`} className="block aspect-[16/10] overflow-hidden relative cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 opacity-80"></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Date Badge on Image */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-gray-300">
                    {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </Link>
                
                {/* Content Container */}
                <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20">
                  <Link href={`/blog/${blog.id}`}>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>
                  
                  <Link 
                    href={`/blog/${blog.id}`}
                    className="mt-auto inline-flex items-center text-sm font-bold text-white group-hover:text-cyan-400 transition-colors"
                  >
                    Read Article 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}