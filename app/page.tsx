"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Terminal } from "lucide-react"

export default function HomePage() {
  const work = [
    {
      number: "01",
      title: "HiringBae",
      description:
        "Building AI employees that actually work. OZ handles integrations, onboarding, and support end-to-end. The vision is simple: AI teammates that remember, communicate, and carry meaningful work forward.",
    },
    {
      number: "02",
      title: "Emergency Exit System",
      description:
        "Real-time management system built with Python, Flask, and GCP. Designed to handle critical situations with reliability and speed.",
      link: "https://emergency-exit-system-654928681850.us-central1.run.app",
    },
    {
      number: "03",
      title: "TaskPilot",
      description:
        "Workflow automation powered by Python and analytics. Built to help teams move faster without losing context.",
    },
    {
      number: "04",
      title: "3D Portfolio Experience",
      description:
        "An interactive Naruto-themed 3D resume built with Next.js and Three.js. Because sometimes you need to show, not tell.",
      link: "/village",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-lg font-medium">
            Ashwin
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="#story" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors">
              STORY
            </Link>
            <Link href="#work" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors">
              WORK
            </Link>
            <Link
              href="https://linkedin.com/in/ashwinkumar99"
              target="_blank"
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              LINKEDIN
            </Link>
            <Link
              href="https://github.com/Itaxh1"
              target="_blank"
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              GITHUB
            </Link>
            <Link href="/terminal" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" />
              TERMINAL
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - Image */}
            <motion.figure
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-[#e8e8e8] rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-[#999] text-sm">
                  {/* Placeholder for photo - user can add their own */}
                  <span className="font-serif text-6xl text-[#ccc]">A</span>
                </div>
              </div>
              <figcaption className="mt-4 text-sm text-[#666] italic">
                A kid from Tamil Nadu, still trying to build something meaningful.
              </figcaption>
            </motion.figure>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <h1 className="font-serif text-4xl md:text-5xl leading-tight text-balance">
                I&apos;m Ashwin. I care about building things that matter, solving hard problems, and creating AI that actually helps.
              </h1>

              <div className="space-y-6 text-[#444] leading-relaxed">
                <p>
                  I am from Tamil Nadu, and a lot of what drives me still comes from there: persistence, curiosity, a need to make something meaningful, and a refusal to let work become hollow just because it sounds impressive.
                </p>
                <p>
                  Currently building OZ at HiringBae — AI employees for real teams. Before that, I finished my Master&apos;s in Computer Science at Oregon State University, worked on everything from healthcare analytics to real-time emergency systems.
                </p>
                <p className="font-serif text-lg text-[#1a1a1a]">
                  Still the same kid from Chennai, just building stranger things now.
                </p>
              </div>

              <div className="text-sm text-[#666]">Arizona / Remote</div>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="max-w-6xl mx-auto px-6 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-1">
              <span className="text-xs text-[#999] tracking-wider">WHERE THE WORK COMES FROM</span>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                The work only makes sense when the life around it stays visible.
              </h2>
              <div className="space-y-6 text-[#444] leading-relaxed">
                <p>
                  I did not want to hide the personal side behind polished language. The products matter, but the person behind them matters too.
                </p>
                <p>
                  Family came first. The ambition showed up later. My parents taught me to show up fully, not halfway. That part matters because it is still the foundation.
                </p>
                <p>
                  I like hard technical problems, but I like them most when they are attached to something real and useful. That is usually the difference between work I respect and work I forget.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Technical Skills */}
        <section className="max-w-6xl mx-auto px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-[#e0e0e0] pt-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-[#666]">
              <div className="space-y-3">
                <h3 className="text-[#1a1a1a] font-medium">Languages</h3>
                <p>Python, TypeScript, JavaScript, SQL</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-[#1a1a1a] font-medium">Frontend</h3>
                <p>React, Next.js, Angular, Three.js</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-[#1a1a1a] font-medium">Backend</h3>
                <p>Node.js, Flask, FastAPI, Kafka</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-[#1a1a1a] font-medium">Infrastructure</h3>
                <p>Docker, GCP, PostgreSQL, Redis</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Work Section */}
        <section id="work" className="max-w-6xl mx-auto px-6 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <span className="text-xs text-[#999] tracking-wider">WHAT I KEEP BUILDING</span>
              </div>
              <div className="lg:col-span-2">
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  Work that stays close to what I actually believe.
                </h2>
                <p className="mt-6 text-[#444] leading-relaxed">
                  The through-line is simple: systems that improve with use, tools that solve real problems, and AI that feels less like a trick and more like serious infrastructure.
                </p>
              </div>
            </div>

            {/* Work Items */}
            <div className="space-y-12">
              {work.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-t border-[#e0e0e0]"
                >
                  <div className="lg:col-span-1 text-sm text-[#999]">{item.number}</div>
                  <div className="lg:col-span-3">
                    <h3 className="text-xl font-medium">{item.title}</h3>
                  </div>
                  <div className="lg:col-span-7 text-[#444] leading-relaxed">
                    <p>{item.description}</p>
                    {item.link && (
                      <Link
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        className="inline-flex items-center gap-1 mt-4 text-sm text-[#1a1a1a] hover:gap-2 transition-all"
                      >
                        View project <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-6 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-3xl">
              If you are building something meaningful and care about getting it right, I would be glad to talk.
            </h2>
            <Link
              href="mailto:ufoundashwin@gmail.com"
              className="inline-flex items-center gap-2 text-lg hover:gap-3 transition-all"
            >
              Say hello <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>

        {/* Terminal Mode Banner */}
        <section className="max-w-6xl mx-auto px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/terminal">
              <div className="bg-[#0a0a0a] text-green-400 p-8 rounded-sm hover:bg-[#111] transition-colors cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Terminal className="w-6 h-6" />
                    <div>
                      <div className="font-mono text-sm">~/ashwin_kumar</div>
                      <div className="font-mono text-xs text-green-600 mt-1">
                        Enter terminal mode for the full interactive experience
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e0e0e0] mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="font-medium">Ashwin Kumar</div>
              <div className="text-sm text-[#666] mt-1">Tamil Nadu in the bones, Arizona in the day-to-day.</div>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://linkedin.com/in/ashwinkumar99"
                target="_blank"
                className="text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/Itaxh1"
                target="_blank"
                className="text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:ufoundashwin@gmail.com"
                className="text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
