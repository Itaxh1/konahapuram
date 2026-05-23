"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Terminal, ArrowUpRight, Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const experiences = [
  {
    period: "2025 — Present",
    role: "Co-Founder",
    company: "HiringBae",
    description: "Building OZ — AI employees that handle end-to-end workflows. From integrations to onboarding to support, helping teams ship faster with intelligent automation.",
    technologies: ["TypeScript", "Python", "Next.js", "AI/ML", "PostgreSQL"],
    link: "https://hiringbae.com",
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

export default function HomePage() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("about")
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"]
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Fixed Left Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-screen w-[300px] p-10 hidden lg:flex flex-col justify-between border-r border-border z-40">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl font-light tracking-tight">Ashwin Kumar</h1>
            <p className="text-muted-foreground mt-1">Builder & Engineer</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-muted-foreground/70 text-sm mt-6 leading-relaxed"
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
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                className={`flex items-center gap-4 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeSection === section 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    activeSection === section ? "w-16 bg-accent" : "w-8 bg-border"
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
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/ashwinkumar99"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:ufoundashwin@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <div className="w-px h-5 bg-border" />
          <Link
            href="/terminal"
            className="text-muted-foreground hover:text-green-500 transition-colors"
            title="Terminal Mode"
            aria-label="Terminal Mode"
          >
            <Terminal className="w-5 h-5" />
          </Link>
        </motion.div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium">Ashwin Kumar</h1>
            <p className="text-muted-foreground text-sm">Builder & Engineer</p>
          </div>
          <Link
            href="/terminal"
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center border border-border hover:border-green-500/50 transition-colors"
          >
            <Terminal className="w-4 h-4 text-green-500" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-[300px]">
        {/* Hero Section */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 lg:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <p className="text-accent text-sm tracking-widest uppercase mb-6">Co-founder at HiringBae</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
              Building{" "}
              <span className="italic font-serif">intelligent</span>
              <br />
              <span className="italic font-serif">systems</span> that work
              <br />
              alongside humans.
            </h2>
            <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-lg">
              Currently crafting{" "}
              <Link href="https://hiringbae.com" target="_blank" className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">
                OZ
              </Link>{" "}
              — AI employees for end-to-end workflows.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-6 lg:left-16 flex items-center gap-3 text-muted-foreground text-sm"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
            <span className="tracking-wide">Scroll to explore</span>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <section id="about" className="px-6 lg:px-16 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
              I&apos;m a software engineer passionate about building products that make a real difference.
              Currently, I&apos;m co-founding{" "}
              <span className="text-foreground font-medium">HiringBae</span>, where we&apos;re creating{" "}
              <span className="text-accent">OZ</span> — AI employees that handle integrations,
              onboarding, and support so teams can focus on what matters.
            </p>

            <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground mt-6">
              I recently completed my Master&apos;s in Computer Science from{" "}
              <span className="text-foreground">Oregon State University</span> with a 3.6 GPA. 
              Before that, I built backend systems for agritech and healthcare companies in India.
            </p>
          </motion.div>

          {/* Photo Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-8">Moments</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Photo 1 - Large */}
              <div className="col-span-2 row-span-2 aspect-square bg-secondary rounded-lg overflow-hidden relative group cursor-pointer border border-border hover:border-muted-foreground/30 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-7xl font-light">
                  01
                </div>
                {/* <Image src="/images/photo-1.jpg" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" /> */}
              </div>

              {/* Photo 2 */}
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden relative group cursor-pointer border border-border hover:border-muted-foreground/30 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-light">
                  02
                </div>
              </div>

              {/* Photo 3 */}
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden relative group cursor-pointer border border-border hover:border-muted-foreground/30 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-light">
                  03
                </div>
              </div>

              {/* Photo 4 */}
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden relative group cursor-pointer border border-border hover:border-muted-foreground/30 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-light">
                  04
                </div>
              </div>

              {/* Photo 5 */}
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden relative group cursor-pointer border border-border hover:border-muted-foreground/30 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-light">
                  05
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="px-6 lg:px-16 py-24 lg:py-32 border-t border-border">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm tracking-widest uppercase mb-16"
          >
            Experience
          </motion.p>

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
                className={`group p-6 rounded-lg border transition-all duration-300 ${
                  hoveredExp === index
                    ? "bg-secondary/50 border-border"
                    : "bg-transparent border-transparent"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <span className="text-sm text-muted-foreground lg:w-36 shrink-0 font-mono">
                    {exp.period}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground flex items-center gap-2 flex-wrap">
                      {exp.role}
                      <span className="text-muted-foreground">·</span>
                      {exp.link ? (
                        <Link
                          href={exp.link}
                          target="_blank"
                          className={`${hoveredExp === index ? "text-accent" : "text-muted-foreground"} transition-colors inline-flex items-center gap-1`}
                        >
                          {exp.company}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <span className={`${hoveredExp === index ? "text-accent" : "text-muted-foreground"} transition-colors`}>
                          {exp.company}
                        </span>
                      )}
                    </h3>
                    <p className="text-muted-foreground mt-3 leading-relaxed text-sm">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground border border-border"
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
            className="mt-12"
          >
            <Link
              href="/Ashwin_Kumar_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              View Full Resume
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-6 lg:px-16 py-24 lg:py-32 border-t border-border">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm tracking-widest uppercase mb-16"
          >
            Projects
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* OZ Project */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                href="https://hiringbae.com"
                target="_blank"
                className="block p-8 rounded-lg bg-secondary/30 border border-border hover:border-accent/30 hover:bg-secondary/50 transition-all h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-accent tracking-widest uppercase">Building</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-2xl font-light group-hover:text-accent transition-colors">OZ</h3>
                <p className="text-muted-foreground mt-2">AI employees for real teams. Handling integrations, onboarding, and support.</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {["AI Agents", "Workflows", "Enterprise"].map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground border border-border px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>

            {/* Terminal Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Link
                href="/terminal"
                className="block p-8 rounded-lg bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20 hover:border-green-500/40 hover:from-green-500/10 transition-all h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-green-500 tracking-widest uppercase">Live</span>
                  <Terminal className="w-5 h-5 text-green-500/50 group-hover:text-green-500 transition-colors" />
                </div>
                <h3 className="text-2xl font-light group-hover:text-green-500 transition-colors">Terminal Portfolio</h3>
                <p className="text-muted-foreground mt-2">Interactive command-line style resume. Type commands to explore.</p>
                <div className="mt-6 font-mono text-sm text-green-500/70">
                  $ explore --interactive
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 lg:px-16 py-24 lg:py-32 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              Have an interesting project?
              <br />
              <span className="italic font-serif">Let&apos;s talk.</span>
            </h2>

            <div className="mt-12 flex flex-wrap gap-6">
              <Link
                href="mailto:ufoundashwin@gmail.com"
                className="flex items-center gap-2 text-lg hover:text-accent transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span className="underline underline-offset-4">Email</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="https://linkedin.com/in/ashwinkumar99"
                target="_blank"
                className="flex items-center gap-2 text-lg hover:text-accent transition-colors group"
              >
                <Linkedin className="w-5 h-5" />
                <span className="underline underline-offset-4">LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="https://github.com/Itaxh1"
                target="_blank"
                className="flex items-center gap-2 text-lg hover:text-accent transition-colors group"
              >
                <Github className="w-5 h-5" />
                <span className="underline underline-offset-4">GitHub</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="px-6 lg:px-16 py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
            <p>Ashwin Kumar {new Date().getFullYear()}</p>
            <p>Based in Oregon, USA</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
