import type { Metadata } from "next";
import { siteConfig } from "@/content/site.config";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Ankit Chaubey",
    "ML Systems",
    "Machine Learning",
    "Transformers From Scratch",
    "Diffusion Models From Scratch",
    "PyTorch",
    "CUDA",
    "IIT Guwahati",
    "Robotics & AI",
    "Fiserv Cybersecurity",
    "Research Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankitchaubey.dev",
    title: siteConfig.title,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.tagline,
    creator: "@ankhu1610",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CommandPalette } from "@/components/ui/CommandPalette";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="bg-base text-text-primary antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <CommandPalette />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
