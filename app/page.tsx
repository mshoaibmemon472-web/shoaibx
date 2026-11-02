"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// ===== Luxury Maroon Logo Background =====
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. Huge Faded Logo in Background */}
      <motion.div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage: "url('/sx-logo.png')",
          backgroundSize: "60%", // Logo ko screen ke hisaab se adjust karega
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 1, -1, 0] // Bohot halka sa rotate hone ka effect
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Maroon Color Overlay (Gehra Laal) */}
      <div className="absolute inset-0 bg-[#4a0e0e]/30 mix-blend-color" />

      {/* 3. Dark Overlay (Taaki Text Saaf Padha Jaye) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0303] via-[#0a0303]/90 to-transparent" />

      {/* 4. Maroon Spotlight Beam from Top Right */}
      <motion.div
        className="absolute -top-20 right-10 w-[300px] md:w-[500px] h-[800px] origin-top"
        style={{
          background: "linear-gradient(180deg, rgba(163,58,58,0.15) 0%, transparent 80%)",
          clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0% 100%)",
          transform: "rotate(-15deg)",
          filter: "blur(30px)",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 5. Maroon Floor Glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[300px]"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(163,58,58,0.2) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0303] text-white overflow-x-hidden relative font-sans">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        
        <HeroBackground />

        <div className="relative z-20 max-w-4xl mx-auto mt-10 flex flex-col items-center">
          
          {/* Actual Logo in Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-32 h-32 md:w-40 md:h-40 relative mb-8 rounded-full overflow-hidden border border-[#a33a3a]/30 shadow-[0_0_40px_rgba(163,58,58,0.3)] bg-[#0a0303]"
          >
            <Image 
              src="/sx-logo.png" 
              alt="SX Flex Logo" 
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 px-5 py-2 border border-[#a33a3a]/50 rounded-full bg-[#4a0e0e]/30 backdrop-blur-md inline-flex items-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-[#a33a3a] rounded-full shadow-[0_0_10px_#a33a3a]"
            />
            <p className="text-sm text-gray-300 font-medium tracking-widest uppercase">Luxury Watches & Tech</p>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 tracking-tight drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent">
              SX FLEX
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-[#a33a3a] mb-4 font-semibold tracking-[0.2em] uppercase"
          >
            Your Wrist. Your Statement.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-sm md:text-base text-gray-400 mb-12 tracking-wide"
          >
            Curated by M. Shoaib Memon
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="block px-10 py-4 bg-gradient-to-r from-[#5c1111] to-[#a33a3a] rounded-sm font-bold text-white uppercase tracking-widest text-sm shadow-lg shadow-[#a33a3a]/30 hover:shadow-[#a33a3a]/60 transition-all duration-300 border border-[#a33a3a]/50"
              >
                Explore Collection
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/blog"
                className="block px-10 py-4 border border-gray-600 rounded-sm font-bold text-gray-300 uppercase tracking-widest text-sm bg-black/40 backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-gray-400 transition-all duration-300"
              >
                Read Articles
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. CATEGORY BUTTONS SECTION ===== */}
      <section id="categories-section" className="relative z-20 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          {/* Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/products"
              className="group relative flex flex-col items-center justify-center w-full h-56 md:h-64 rounded-xl overflow-hidden border border-[#4a0e0e] hover:border-[#a33a3a] transition-all duration-500 shadow-2xl"
            >
              {/* Yahan humne smoke ki jagah aapka logo background mein rakha hai */}
              <div className="absolute inset-0 bg-[url('/sx-logo.png')] bg-center bg-no-repeat bg-contain opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0303]/95 via-[#4a0e0e]/80 to-[#0a0303]/95 opacity-90" />
              
              <div className="relative z-10 text-center px-6">
                <div className="text-4xl mb-3">⌚</div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                  The Watch Collection
                </h2>
                <p className="text-[#a33a3a] text-sm tracking-widest uppercase mb-6">Premium Timepieces</p>
                <span className="inline-block px-8 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest group-hover:bg-[#a33a3a] group-hover:text-white transition-colors rounded-sm">
                  Shop Now
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Books & Blogs Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Books */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/books"
                className="group relative flex flex-col items-center justify-center w-full h-56 md:h-64 rounded-xl overflow-hidden border border-[#4a0e0e] hover:border-gray-400 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0303]/95 to-[#1a0505]/95 opacity-90" />
                
                <div className="relative z-10 text-center px-6">
                  <div className="text-4xl mb-3">📚</div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                    Published Books
                  </h2>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">AI & Stories</p>
                  <span className="inline-block text-[#a33a3a] text-xs font-bold uppercase tracking-widest border-b border-[#a33a3a] pb-1 group-hover:text-white group-hover:border-white transition-colors">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Blogs */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/blog"
                className="group relative flex flex-col items-center justify-center w-full h-56 md:h-64 rounded-xl overflow-hidden border border-[#4a0e0e] hover:border-gray-400 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0303]/95 to-[#1a0505]/95 opacity-90" />
                
                <div className="relative z-10 text-center px-6">
                  <div className="text-4xl mb-3">✍️</div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                    Insights & Articles
                  </h2>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">Tech & Knowledge</p>
                  <span className="inline-block text-[#a33a3a] text-xs font-bold uppercase tracking-widest border-b border-[#a33a3a] pb-1 group-hover:text-white group-hover:border-white transition-colors">
                    Read Blog
                  </span>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== 3. ABOUT SECTION ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 py-24 px-6 bg-[#0a0303]"
      >
        <div className="max-w-4xl mx-auto text-center border-t border-[#4a0e0e]/50 pt-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            <span className="text-white">
              About The Founder
            </span>
          </h2>
          
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-[#a33a3a]/50 shadow-[0_0_20px_rgba(163,58,58,0.3)] relative">
             <Image 
               src="/profile.jpg" 
               alt="M. Shoaib Memon" 
               fill
               sizes="128px"
               className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
             />
          </div>

          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-light">
            Hi! I&apos;m <strong className="text-white font-medium">M. Shoaib Memon</strong> — a student and creator with a deep passion for 
            AI and storytelling. I started <strong className="text-[#a33a3a]">SX FLEX</strong> to share AI resources, inspire beginners, and curate premium timepieces.
          </p>
          
          <Link href="/about" className="inline-block px-8 py-3 border border-[#a33a3a]/50 rounded-sm text-gray-300 text-xs tracking-widest uppercase font-bold hover:bg-[#a33a3a]/10 hover:border-[#a33a3a] transition-all">
            Read Full Story
          </Link>
        </div>
      </motion.section>

      {/* ===== 4. CONTACT SECTION ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 py-20 px-6 bg-gradient-to-b from-[#0a0303] to-[#140606]"
      >
        <div className="max-w-4xl mx-auto text-center border-t border-[#4a0e0e]/50 pt-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            <span className="text-white">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-500 mb-10 text-sm tracking-wide">Have a question? Let&apos;s connect.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/923142325733" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#4a0e0e] rounded-sm text-gray-300 text-xs font-bold tracking-widest uppercase hover:bg-[#25D366]/10 hover:border-[#25D366] hover:text-[#25D366] transition-all">
              WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/muhammad-shoaib-memon-b3070740a" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#4a0e0e] rounded-sm text-gray-300 text-xs font-bold tracking-widest uppercase hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-all">
              LinkedIn
            </a>
            <a href="https://instagram.com/nexoradigital890" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#4a0e0e] rounded-sm text-gray-300 text-xs font-bold tracking-widest uppercase hover:bg-pink-500/10 hover:border-pink-500 hover:text-pink-400 transition-all">
              Instagram
            </a>
          </div>
        </div>
      </motion.section>

    </main>
  );
}