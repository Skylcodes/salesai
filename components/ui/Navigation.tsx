"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4"
      >
        <div
          className={`relative rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-gradient-to-b from-white/[0.15] to-white/[0.05] border border-white/20 backdrop-blur-xl py-3 px-6"
              : "bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/15 backdrop-blur-xl py-4 px-8"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7AFF9B] to-[#4ade80] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-[#7AFF9B] transition-colors">
                SalesAI
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#7AFF9B] transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center gap-4">
              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/login')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-4 py-2"
              >
                Log In
              </motion.button>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(122, 255, 155, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/signup')}
                className="px-6 py-2.5 bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Start Free Trial
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-32 px-6 bg-black/80 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium text-white hover:text-[#7AFF9B] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 mt-4"
              >
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/login');
                  }}
                  className="px-6 py-3 text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                >
                  Log In
                </motion.button>
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/signup');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold rounded-full hover:opacity-90 transition-opacity"
                >
                  Start Free Trial
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
