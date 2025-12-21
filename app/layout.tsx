import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SalesAI - Master Sales Calls in Weeks, Not Years",
  description: "The most realistic way to practice sales without talking to a real person — powered by AI that responds, challenges, and trains you like an actual buyer.",
  keywords: ["sales training", "AI sales coach", "sales practice", "objection handling", "sales skills"],
  openGraph: {
    title: "SalesAI - Master Sales Calls in Weeks, Not Years",
    description: "The most realistic way to practice sales without talking to a real person — powered by AI that responds, challenges, and trains you like an actual buyer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#000000] text-white`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
