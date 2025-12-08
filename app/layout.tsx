import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Pravin | Full Stack Developer | MERN & Next.js Expert",
    template: "%s | Pravin - Full Stack Developer",
  },
  description: "Pravin is a Full Stack Developer (MERN, Next.js, Node.js) based in India, offering custom web app development, scalable backend solutions, and modern UI/UX design. Specializing in React, TypeScript, and Cloud Deployment.",
  keywords: [
    // Roles
    "Full Stack Developer", "MERN Stack Developer", "MEAN Stack Developer",
    "React Full Stack Developer", "Next.js Full Stack Developer", "Node.js Full Stack Developer",
    "Web Developer Frontend Backend", "Full Stack Engineer", "Full Stack Web Development Services",
    "Full Stack Application Developer", "React Developer", "Next.js Developer", "TypeScript Developer",
    "JavaScript Developer", "Tailwind CSS Developer", "Responsive UI/UX Developer", "Frontend Development Services",
    "SPA Development React", "PWA Development", "HTML CSS JavaScript Expert",
    // Backend & DB
    "Node.js Backend Developer", "Express.js Developer", "REST API Developer", "API Integration Developer",
    "Backend Architecture", "Microservices Backend Developer", "Authentication & Authorization Expert",
    "Secure Backend Development", "MongoDB Developer", "SQL Developer", "Database Design",
    "Database Optimization", "Database Administrator", "NoSQL Database Expert", "Data Modeling MongoDB",
    // Cloud & DevOps
    "Cloud Deployment AWS", "Docker Deployment", "CI/CD Developer", "Server Management Linux",
    "Scalable Web Application Deployment", "Vercel/Netlify Deployment Expert",
    // Tools
    "Git GitHub Version Control", "Postman API Tester", "Firebase Developer", "Prisma / Mongoose Expert",
    "JWT Authentication", "GraphQL API Developer",
    // Services
    "Cross Platform App Developer", "Web App Development", "Mobile Responsive Development",
    "Progressive Web Apps", "Full Stack Website Development", "Custom Web App Development",
    "E-commerce Web App Developer", "Business Website Development", "Portfolio Website Developer",
    "Startup MVP Development",
    // Location & Intent
    "Full stack developer in India", "MERN developer in Coimbatore", "React developer Near Me",
    "Node.js developer Tamil Nadu", "Best web developer in Coimbatore", "Freelance developer India",
    "Hire Full Stack Developer", "Affordable Full Stack Development", "Fast & Scalable Web Apps",
    "Modern UI High Performance Websites", "Clean Code Web Development"
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#000000",
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
