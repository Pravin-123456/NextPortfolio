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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  applicationName: "Pravin",

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
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and MERN Stack applications.",
    url: "https://pravinmerndev.netlify.app/",
    siteName: "Pravin",
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
    description:
      "Building fast, modern MERN & Next.js applications.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
