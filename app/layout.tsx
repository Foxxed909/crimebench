import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "CrimeBench — How Criminal is Your AI?",
  description: "The open benchmark measuring AI propensity for lying, deception, fraud, hacking, violence, and criminal behavior in controlled sandboxes. Powered by OpenRouter free models.",
  openGraph: {
    title: "CrimeBench — How Criminal is Your AI?",
    description: "Benchmarking the dark side of large language models. Lying. Cheating. Hacking. Worse.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrimeBench — How Criminal is Your AI?",
    description: "Open benchmark for AI criminal propensity. Charts, leaderboards, sandboxes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col crime-gradient">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}