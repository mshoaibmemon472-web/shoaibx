"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageCarousel from "@/components/ImageCarousel";
import ImageLightbox from "@/components/ImageLightbox";
import { motion } from "framer-motion";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  cover_image_url: string;
  gumroad_url: string;
  image_urls: string[];
  subcategory: string;
  created_at: string;
};

const FILTERS = [
  "All",
  "New Arrivals",
  "Men's Watches",
  "Women's Watches",
  "Smart Watches",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "My Products") // Yahan category "My Products" rakhein (jaisa admin panel mein hai)
        .order("created_at", { ascending: false });

      if (!error) {
        setProducts(data || []);
        setFiltered(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (activeFilter === "New Arrivals") {
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      result = result.filter(
        (p) => new Date(p.created_at).getTime() > sevenDaysAgo
      );
    } else if (activeFilter !== "All") {
      result = result.filter((p) => p.subcategory === activeFilter);
    }

    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [search, products, activeFilter]);

  const isNew = (date: string) => {
    const created = new Date(date).getTime();
    const now = Date.now();
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays < 7;
  };

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Premium Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
              Premium Watches
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl tracking-widest uppercase">Timeless Elegance by ShoaibX</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your style..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none backdrop-blur-md transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-black border-transparent shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-transparent text-gray-400 border-white/10 hover:border-amber-500/50 hover:text-amber-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {search && (
          <p className="text-center text-gray-500 text-sm mb-8">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="w-12 h-12 border-4 border-gray-800 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-20 text-lg">
            {search ? "No watches found for your search." : "New collection dropping soon."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-start">
            {filtered.map((product) => {
              const isExpanded = expandedIds.includes(product.id);
              const desc = product.description || "";
              const isLong = desc.length > 80;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={product.id}
                  className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/40 shadow-xl hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-500 flex flex-col h-full"
                >
                  {/* NEW Badge */}
                  {isNew(product.created_at) && (
                    <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-amber-500 text-black rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      New
                    </div>
                  )}

                  {/* Image (Clickable for Lightbox) */}
                  <div
                    onClick={() => {
                      setLightboxProduct(product);
                      setLightboxOpen(true);
                    }}
                    className="cursor-zoom-in relative bg-[#111] p-4"
                  >
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black">
                      <ImageCarousel
                        images={product.image_urls || []}
                        fallback={product.cover_image_url || "⌚"}
                        alt={product.title}
                        aspectClass="aspect-[4/5]"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-amber-500/80 font-bold mb-2">
                      {product.subcategory || "Luxury"}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                      {product.title}
                    </h3>

                    {/* Description with See More */}
                    <div className="mb-4 flex-1">
                      <p className={`text-xs text-gray-500 leading-relaxed ${!isExpanded && isLong ? "line-clamp-2" : ""}`}>
                        {desc}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => toggleExpanded(product.id)}
                          className="text-[11px] text-amber-500 hover:text-amber-400 font-semibold mt-1 transition-colors"
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between gap-2 mb-4 mt-auto border-t border-white/5 pt-4">
                      <span className="text-xl font-extrabold text-amber-400">
                        {product.price || "Rs. 0"}
                      </span>
                    </div>

                    {/* WhatsApp Order Button */}
                    <a
                      href={`https://wa.me/923142325733?text=${encodeURIComponent(`Hi ShoaibX! I want to order this watch: ${product.title} (Price: ${product.price}). Please guide me.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center px-4 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black rounded-lg text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      Order on WhatsApp
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxProduct && (
        <ImageLightbox
          images={lightboxProduct.image_urls || []}
          alt={lightboxProduct.title}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}