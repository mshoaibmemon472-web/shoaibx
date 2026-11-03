"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 overflow-x-hidden font-sans">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative h-screen flex items-center justify-center px-6">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Watch Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa]/80 via-[#fafafa]/90 to-[#fafafa]"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto mt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] text-gray-500 uppercase mb-4"
          >
            Welcome to Wriston
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-black mb-6 tracking-tight"
          >
            Timeless Elegance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 mb-10 max-w-xl mx-auto font-light"
          >
            Discover our exclusive collection of premium timepieces, crafted for those who value precision and style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/products"
              className="inline-block px-10 py-4 bg-black text-white text-sm tracking-widest uppercase font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Shop The Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. CATEGORIES / FEATURED SECTION ===== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Categories</h2>
            <div className="w-16 h-0.5 bg-black mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <Link href="/products" className="group relative h-[400px] overflow-hidden block">
              <Image
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop"
                alt="Men's Watches"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-serif text-white mb-2">Men&apos;s Watches</h3>
                <p className="text-white/80 text-sm tracking-widest uppercase">Explore →</p>
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/products" className="group relative h-[400px] overflow-hidden block">
              <Image
                src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop"
                alt="Women's Watches"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-serif text-white mb-2">Women&apos;s Watches</h3>
                <p className="text-white/80 text-sm tracking-widest uppercase">Explore →</p>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/products" className="group relative h-[400px] overflow-hidden block">
              <Image
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop"
                alt="Smart Watches"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-serif text-white mb-2">Smart Watches</h3>
                <p className="text-white/80 text-sm tracking-widest uppercase">Explore →</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 3. BRAND STORY SECTION ===== */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative h-[500px] w-full">
             <Image
                src="https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1000&auto=format&fit=crop"
                alt="Wriston Story"
                fill
                className="object-cover"
              />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-2">Our Philosophy</h2>
            <h3 className="text-4xl font-serif font-bold mb-6">The Wriston Story</h3>
            <p className="text-gray-600 leading-relaxed mb-6 font-light">
              At Wriston, we believe a watch is more than just a tool to tell time. It is a statement of who you are. Founded by M. Shoaib Memon, our mission is to curate the finest timepieces that blend classic craftsmanship with modern elegance.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 font-light">
              Every watch in our collection is handpicked for its precision, durability, and timeless design. We don&apos;t just sell watches; we deliver confidence.
            </p>
            <Link href="/about" className="border-b border-black pb-1 text-sm font-semibold tracking-widest uppercase hover:text-gray-600 transition-colors">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}