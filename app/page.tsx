"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Minimal Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
        <span className="text-sm tracking-tight">Ashwin Kumar</span>
        <Link
          href="/terminal"
          className="w-8 h-8 bg-[#111] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Terminal className="w-3.5 h-3.5 text-green-400" />
        </Link>
      </nav>

      {/* Hero - Dead Simple */}
      <main className="px-6 pt-32 pb-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.1] tracking-tight text-[#111]">
            Builder.
            <br />
            <span className="text-[#888]">Engineer.</span>
          </h1>
          
          <p className="mt-8 text-[#666] max-w-md text-lg">
            Co-founder at HiringBae, building OZ.
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-3 gap-3"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`
                ${i === 1 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"}
                bg-[#eee] rounded-lg overflow-hidden relative group cursor-pointer
                hover:opacity-90 transition-opacity
              `}
            >
              {/* Placeholder - replace with your images */}
              <div className="absolute inset-0 flex items-center justify-center text-[#ccc] text-xs">
                {i}
              </div>
              {/* 
              <Image
                src={`/photos/${i}.jpg`}
                alt=""
                fill
                className="object-cover"
              />
              */}
            </div>
          ))}
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex items-center gap-6 text-sm"
        >
          <Link
            href="mailto:ufoundashwin@gmail.com"
            className="text-[#111] underline underline-offset-4 hover:no-underline"
          >
            Email
          </Link>
          <Link
            href="https://linkedin.com/in/ashwinkumar99"
            target="_blank"
            className="text-[#888] hover:text-[#111] transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/Itaxh1"
            target="_blank"
            className="text-[#888] hover:text-[#111] transition-colors"
          >
            GitHub
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
