import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "Pravin | Full Stack Developer | MERN & Next.js Expert",
    template: "%s | Pravin - Full Stack Developer",
  },
  description: "Pravin is a Top-Rated Full Stack Developer & MERN Stack Expert in India. Specializing in Custom Web Development, React.js, Next.js, Node.js, and SEO-Optimized Portfolio Websites. Hire for freelance or full-time projects today.",
  keywords: [
    // Core Roles & Titles
    "web development", "web developer", "web development services", "web development portfolio", 
    "web developer portfolio", "web developer portfolio website", "modern web developer portfolio", 
    "best web developer portfolios", "web development projects", "web developer projects", "web development examples",
    "frontend web developer", "backend web developer", "full stack web developer", "full stack web developer portfolio",
    "javascript web developer", "mern stack developer", "mern stack developer portfolio", "mern stack projects", 
    "mern stack projects portfolio", "HTML developer", "CSS developer", "JavaScript developer", "React.js developer", 
    "Next.js developer", "Node.js developer", "Express.js developer", "MongoDB developer", "MySQL developer", 
    "REST API developer", "JSON API developer", "Git developer", "Tailwind CSS developer", "Bootstrap developer", 
    "react web developer", "next js developer", "node js backend developer", "express js backend developer", 
    "mongodb database developer", "mysql database developer", "freelance web developer", "freelance mern stack developer", 
    "hire web developer", "hire mern stack developer", "web developer for hire",

    // Technical Skills & Concepts
    "GitHub projects", "Responsive Web Design", "JWT authentication", "MVC architecture", "CRUD operations", 
    "Postman API testing", "NPM packages", "web hosting and deployment", "website deployment services", 
    "basic SEO optimization", "rest api development", "secure jwt authentication", "full stack mvc application", 
    "crud application development", "seo friendly website development", "ui ux web development", "landing page development",

    // Location-Based (India, Tamil Nadu, Coimbatore, Malumichampatti)
    "freelance web developer india", "freelance mern stack developer india", "hire web developer india", 
    "web developer india", "web developer tamil nadu", "web developer coimbatore", "web developer near me", 
    "mern stack developer india", "mern stack developer tamil nadu", "mern stack developer coimbatore", 
    "freelance web developer tamil nadu", "mern stack developer malumichampatti", "freelance web developer malumichampatti", 
    "freelance web developer coimbatore", "hire mern stack developer malumichampatti", "hire mern stack developer coimbatore", 
    "hire web developer tamil nadu", "web developer portfolio malumichampatti", "web developer portfolio coimbatore", 
    "web developer portfolio tamil nadu", "full stack web developer coimbatore", "full stack web developer tamil nadu", 
    "react developer malumichampatti", "react developer coimbatore", "react developer tamil nadu", 
    "node js developer malumichampatti", "node js developer coimbatore", "node js developer tamil nadu", 
    "express js developer malumichampatti", "express js developer coimbatore", "express js developer tamil nadu",

    // Services & Project Types
    "portfolio website development", "business website development", "custom website development", 
    "web application development", "custom web application development", "react web application development", 
    "responsive website design", "ecommerce website development", "mern stack ecommerce project",

    // Educational / Learn
    "learn web development", "web development tutorial", "mern stack tutorial", "react js tutorial", 
    "next js tutorial", "node js tutorial", "mongodb tutorial", "how to become web developer", 
    "best mern stack projects for portfolio", "how to build full stack web application", "how to hire web developer in india"
  ],
  authors: [{ name: "Pravin" }],
  creator: "Pravin",
  publisher: "Pravin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Pravin | Full Stack Developer | MERN & Next.js Expert",
    description: "Expert Full Stack Services: React, Next.js, Node.js, and Cloud Solutions.",
    url: "https://nextport.com",
    siteName: "Pravin Portfolio",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Pravin - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pravin | Full Stack Developer",
    description: "Expert Full Stack Services: React, Next.js, Node.js, and Cloud Solutions.",
    creator: "@pravin_dev", 
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
