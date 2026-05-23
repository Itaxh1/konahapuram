"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Terminal } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-lg font-medium">
            Ashwin
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="https://linkedin.com/in/ashwinkumar99"
              target="_blank"
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Itaxh1"
              target="_blank"
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="/terminal"
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-28 pb-16">
        <section className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-serif text-3xl md:text-4xl leading-snug max-w-2xl">
              I&apos;m Ashwin, a builder from Tamil Nadu. Currently building OZ at HiringBae.
            </h1>
            <p className="text-[#666] max-w-xl">
              AI employees for real teams. Before that, Master&apos;s in CS at Oregon State.
            </p>
            <div className="text-sm text-[#999]">Arizona / Remote</div>
          </motion.div>

          {/* Photo Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {/* Photo 1 - Large */}
            <div className="col-span-2 row-span-2 aspect-[4/3] bg-[#e8e8e8] rounded overflow-hidden relative group">
              {/* Replace src with your photo */}
              <div className="w-full h-full flex items-center justify-center text-[#bbb] text-sm">
                Photo 1
              </div>
              {/* Uncomment and add your image:
              <Image
                src="/images/photo1.jpg"
                alt="Photo description"
                fill
                className="object-cover"
              />
              */}
            </div>

            {/* Photo 2 */}
            <div className="aspect-square bg-[#e8e8e8] rounded overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center text-[#bbb] text-sm">
                Photo 2
              </div>
            </div>

            {/* Photo 3 */}
            <div className="aspect-square bg-[#e8e8e8] rounded overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center text-[#bbb] text-sm">
                Photo 3
              </div>
            </div>

            {/* Photo 4 */}
            <div className="aspect-square bg-[#e8e8e8] rounded overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center text-[#bbb] text-sm">
                Photo 4
              </div>
            </div>

            {/* Photo 5 */}
            <div className="aspect-square bg-[#e8e8e8] rounded overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center text-[#bbb] text-sm">
                Photo 5
              </div>
            </div>

            {/* Photo 6 */}
            <div className="aspect-square bg-[#e8e8e8] rounded overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center text-[#bbb] text-sm">
                Photo 6
              </div>
            </div>
          </motion.div>

          {/* Brief About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 max-w-xl"
          >
            <p className="text-[#444] leading-relaxed">
              I like hard technical problems attached to something real and useful. 
              That&apos;s usually the difference between work I respect and work I forget.
            </p>
          </motion.div>

          {/* Current Work */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 py-8 border-t border-[#e0e0e0]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#999] tracking-wider mb-2">NOW</div>
                <h2 className="text-xl font-medium">HiringBae / OZ</h2>
                <p className="text-[#666] text-sm mt-1">AI employees for integrations, onboarding, support</p>
              </div>
              <Link
                href="mailto:ufoundashwin@gmail.com"
                className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all"
              >
                Say hello <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Terminal Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link href="/terminal">
              <div className="bg-[#0a0a0a] text-green-400 p-6 rounded hover:bg-[#111] transition-colors cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5" />
                    <span className="font-mono text-sm">~/ashwin --interactive</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e0e0e0]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-[#999]">Ashwin Kumar</div>
            <div className="flex items-center gap-5">
              <Link
                href="https://linkedin.com/in/ashwinkumar99"
                target="_blank"
                className="text-[#999] hover:text-[#1a1a1a] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://github.com/Itaxh1"
                target="_blank"
                className="text-[#999] hover:text-[#1a1a1a] transition-colors"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:ufoundashwin@gmail.com"
                className="text-[#999] hover:text-[#1a1a1a] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
