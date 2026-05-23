"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const experiences = [
  {
    period: "2025 — Present",
    role: "Co-Founder",
    company: "HiringBae",
    description: "Building OZ — AI employees that handle end-to-end workflows. From integrations to onboarding to support, helping teams ship faster with intelligent automation.",
    technologies: ["TypeScript", "Python", "Next.js", "AI/ML", "PostgreSQL"],
    link: "#",
  },
  {
    period: "2024 — 2025",
    role: "Web Developer",
    company: "Oregon State University",
    description: "Developed and maintained university web applications, improving accessibility and user experience for thousands of students and faculty.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    period: "2022 — 2023",
    role: "Associate Software Developer",
    company: "Agrosperity Kivi",
    description: "Built scalable backend systems for agricultural technology platform. Implemented real-time data processing pipelines and API integrations.",
    technologies: ["Python", "Flask", "MongoDB", "Docker", "GCP"],
  },
  {
    period: "2022",
    role: "Data Analyst Consultant",
    company: "Genworks Healthcare",
    description: "Analyzed healthcare data to derive actionable insights. Built dashboards and automated reporting systems.",
    technologies: ["Python", "SQL", "Tableau", "ETL"],
  },
]

const projects = [
  {
    name: "OZ",
    description: "AI employees for real teams",
    status: "Building",
  },
  {
    name: "Terminal Portfolio",
    description: "Interactive CLI experience",
    status: "Live",
    link: "/terminal",
  },
]

export default function HomePage() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("about")

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] selection:bg-[#3b82f6] selection:text-white">
      {/* Fixed Left Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[280px] p-10 hidden lg:flex flex-col justify-between border-r border-[#1a1a1a]">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-medium tracking-tight"
          >
            Ashwin Kumar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#666] mt-1"
          >
            Builder & Engineer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[#444] text-sm mt-4 leading-relaxed"
          >
            I build products that help teams work smarter. Currently making AI employees at HiringBae.
          </motion.p>

          {/* Navigation */}
          <nav className="mt-16 space-y-1">
            {["about", "experience", "projects"].map((section, i) => (
              <motion.a
                key={section}
                href={`#${section}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                onClick={() => setActiveSection(section)}
                className={`flex items-center gap-3 py-2 text-sm uppercase tracking-widest transition-colors ${
                  activeSection === section ? "text-white" : "text-[#555] hover:text-[#888]"
                }`}
              >
                <span
                  className={`h-px transition-all ${
                    activeSection === section ? "w-16 bg-white" : "w-8 bg-[#333]"
                  }`}
                />
                {section}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-5"
        >
          <Link
            href="https://github.com/Itaxh1"
            target="_blank"
            className="text-[#555] hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/ashwinkumar99"
            target="_blank"
            className="text-[#555] hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:ufoundashwin@gmail.com"
            className="text-[#555] hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <Link
            href="/terminal"
            className="text-[#555] hover:text-[#22c55e] transition-colors"
            title="Terminal Mode"
          >
            <Terminal className="w-5 h-5" />
          </Link>
        </motion.div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#1a1a1a] px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium">Ashwin Kumar</h1>
            <p className="text-[#666] text-sm">Builder & Engineer</p>
          </div>
          <Link
            href="/terminal"
            className="w-10 h-10 bg-[#111] rounded-full flex items-center justify-center border border-[#222] hover:border-[#22c55e] transition-colors"
          >
            <Terminal className="w-4 h-4 text-[#22c55e]" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-[280px] px-6 lg:px-16 py-24 lg:py-16 max-w-4xl">
        {/* About Section */}
        <section id="about" className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg lg:text-xl leading-relaxed text-[#999]">
              I&apos;m a software engineer passionate about building products that make a real difference.
              Currently, I&apos;m co-founding{" "}
              <span className="text-white font-medium">HiringBae</span>, where we&apos;re creating{" "}
              <span className="text-[#3b82f6]">OZ</span> — AI employees that handle integrations,
              onboarding, and support so teams can focus on what matters.
            </p>

            <p className="text-lg lg:text-xl leading-relaxed text-[#999] mt-6">
              I recently completed my Master&apos;s in Computer Science from{" "}
              <span className="text-white">Oregon State University</span> with a 3.6 GPA. 
              Before that, I built backend systems for agritech and healthcare companies in India.
            </p>

            <p className="text-lg lg:text-xl leading-relaxed text-[#999] mt-6">
              When I&apos;m not coding, I&apos;m probably exploring new technologies, contributing to open source, 
              or thinking about how to make AI more useful for everyday work.
            </p>
          </motion.div>

          {/* Photo Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-2 lg:gap-3"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-[#111] rounded-lg overflow-hidden relative group border border-[#1a1a1a] hover:border-[#333] transition-colors"
              >
                {/* Placeholder - replace with your images */}
                <div className="absolute inset-0 flex items-center justify-center text-[#333] text-sm">
                  Photo {i}
                </div>
                {/* 
                <Image
                  src={`/photos/photo-${i}.jpg`}
                  alt=""
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                */}
              </div>
            ))}
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-[#555] mb-10 lg:hidden"
          >
            Experience
          </motion.h2>

          <div className="space-y-2">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredExp(index)}
                onMouseLeave={() => setHoveredExp(null)}
                className={`group p-6 rounded-lg border transition-all duration-300 cursor-default ${
                  hoveredExp === index
                    ? "bg-[#111] border-[#222]"
                    : "bg-transparent border-transparent hover:bg-[#0d0d0d]"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <span className="text-sm text-[#555] lg:w-36 shrink-0 font-mono">
                    {exp.period}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      {exp.role}
                      <span className="text-[#555]">·</span>
                      <span className={`${hoveredExp === index ? "text-[#3b82f6]" : "text-[#888]"} transition-colors`}>
                        {exp.company}
                      </span>
                      {exp.link && (
                        <ArrowUpRight className="w-4 h-4 text-[#555] group-hover:text-[#3b82f6] transition-colors" />
                      )}
                    </h3>
                    <p className="text-[#666] mt-3 leading-relaxed text-sm">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-[#1a1a1a] text-[#888] border border-[#222]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              href="/Ashwin_Kumar_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors group"
            >
              View Full Resume
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-[#555] mb-10 lg:hidden"
          >
            Projects
          </motion.h2>

          <div className="grid gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {project.link ? (
                  <Link
                    href={project.link}
                    className="block p-6 rounded-lg border border-[#1a1a1a] hover:border-[#333] hover:bg-[#0d0d0d] transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-white flex items-center gap-2">
                          {project.name}
                          <ArrowUpRight className="w-4 h-4 text-[#555] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </h3>
                        <p className="text-[#666] mt-1 text-sm">{project.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === "Live" 
                          ? "bg-[#22c55e]/10 text-[#22c55e]" 
                          : "bg-[#3b82f6]/10 text-[#3b82f6]"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 rounded-lg border border-[#1a1a1a]">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-white">{project.name}</h3>
                        <p className="text-[#666] mt-1 text-sm">{project.description}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-[#3b82f6]/10 text-[#3b82f6]">
                        {project.status}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Terminal CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <Link
            href="/terminal"
            className="block p-8 rounded-lg bg-gradient-to-br from-[#0d1a0d] to-[#0a0a0a] border border-[#1a2a1a] hover:border-[#22c55e]/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center border border-[#22c55e]/20">
                <Terminal className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="font-medium text-white group-hover:text-[#22c55e] transition-colors">
                  Enter Terminal Mode
                </h3>
                <p className="text-[#666] text-sm mt-1">
                  Explore my portfolio the hacker way
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#555] ml-auto group-hover:text-[#22c55e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-[#1a1a1a] pt-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6 lg:hidden">
              <Link href="https://github.com/Itaxh1" target="_blank" className="text-[#555] hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com/in/ashwinkumar99" target="_blank" className="text-[#555] hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="mailto:ufoundashwin@gmail.com" className="text-[#555] hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-[#444]">
              Built with Next.js & Framer Motion
            </p>
            <p className="text-sm text-[#444]">
              Based in Oregon, USA
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
