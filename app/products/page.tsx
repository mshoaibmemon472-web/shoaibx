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

const FILTERS = ["All", "New Arrivals", "Men's Watches", "Women's Watches"];

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
        .eq("category", "My Products")
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
      result = result.filter((p) => new Date(p.created_at).getTime() > sevenDaysAgo);
    } else if (activeFilter !== "All") {
      result = result.filter((p) => p.subcategory === activeFilter);
    }

    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
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
    <main className="min-h-screen bg-[#0a0303] text-gray-200 pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Deep Maroon Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4a0e0e]/30 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent">
              The SX FLEX Collection
            </span>
          </h1>
          <p className="text-[#a33a3a] text-sm tracking-[0.3em] uppercase font-bold">
            Your Wrist. Your Statement.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative border-b border-[#4a0e0e] pb-2 flex items-center focus-within:border-gray-400 transition-colors">
            <span className="text-gray-500 mr-3">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search timepieces..."
              className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none text-sm font-medium"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-500 hover:text-white">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-8 mb-16 flex-wrap">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs uppercase tracking-widest pb-1 transition-all border-b-2 font-bold ${
                activeFilter === cat
                  ? "border-[#a33a3a] text-white"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="w-8 h-8 border-2 border-[#4a0e0e] border-t-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-20 font-serif italic text-xl">
            {search ? "No timepieces found." : "New collection dropping soon."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
            {filtered.map((product) => {
              const isExpanded = expandedIds.includes(product.id);
              const desc = product.description || "";
              const isLong = desc.length > 80;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={product.id}
                  className="group flex flex-col h-full bg-[#140606] border border-[#4a0e0e]/50 rounded-xl overflow-hidden hover:border-[#a33a3a]/60 shadow-2xl hover:shadow-[0_0_30px_rgba(163,58,58,0.15)] transition-all duration-500"
                >
                  {/* Image Container */}
                  <div
                    onClick={() => {
                      setLightboxProduct(product);
                      setLightboxOpen(true);
                    }}
                    className="cursor-zoom-in relative bg-[#0a0303] aspect-square p-6 flex items-center justify-center overflow-hidden"
                  >
                    <ImageCarousel
                      images={product.image_urls || []}
                      fallback={product.cover_image_url || "⌚"}
                      alt={product.title}
                      aspectClass="aspect-square"
                    />
                    {isNew(product.created_at) && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[#a33a3a] text-white text-[10px] font-bold tracking-widest uppercase rounded-sm shadow-lg">
                        New
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-[#a33a3a] font-bold mb-2">
                      {product.subcategory || "Luxury Watch"}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2 font-serif">
                      {product.title}
                    </h3>

                    <div className="mb-4 flex-1">
                      <p className={`text-xs text-gray-400 leading-relaxed ${!isExpanded && isLong ? "line-clamp-2" : ""}`}>
                        {desc}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => toggleExpanded(product.id)}
                          className="text-[10px] uppercase tracking-widest text-gray-300 font-bold mt-2 hover:text-white underline decoration-[#a33a3a] underline-offset-4"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-6 border-t border-[#4a0e0e]/50 pt-4">
                      <span className="text-lg font-bold text-gray-200">
                        {product.price || "Price on Request"}
                      </span>
                    </div>

                    {/* Order Button */}
                    <a
                      href={`https://wa.me/923142325733?text=${encodeURIComponent(`Hi SX FLEX! I want to order this watch: ${product.title} (Price: ${product.price}). Please guide me.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full text-center px-4 py-3 bg-gradient-to-r from-[#5c1111] to-[#330808] border border-[#a33a3a]/30 text-white text-xs tracking-widest uppercase font-bold hover:from-[#a33a3a] hover:to-[#5c1111] transition-all duration-300 rounded shadow-lg"
                    >
                      Order Now
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