import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Roboto, Poppins, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Load common Google fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Ashwin Kumar | Builder & Engineer",
  description: "Co-founder at HiringBae, building OZ. Full-stack engineer passionate about AI and meaningful products.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${roboto.variable} ${poppins.variable} ${playfair.variable}`}>
      <head>{/* No custom font preloads - using Google fonts only */}</head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
