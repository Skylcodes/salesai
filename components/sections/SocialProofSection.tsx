"use client";

import { motion } from "framer-motion";

// Abstract logo placeholders
function AbstractLogo({ variant }: { variant: number }) {
  const logos = [
    // Geometric shapes
    <svg key="1" viewBox="0 0 120 40" className="w-full h-full">
      <rect x="10" y="10" width="20" height="20" rx="4" fill="currentColor" opacity="0.6" />
      <rect x="35" y="5" width="10" height="30" rx="2" fill="currentColor" opacity="0.4" />
      <circle cx="60" cy="20" r="10" fill="currentColor" opacity="0.5" />
      <rect x="80" y="12" width="30" height="6" rx="3" fill="currentColor" opacity="0.3" />
      <rect x="80" y="22" width="20" height="6" rx="3" fill="currentColor" opacity="0.3" />
    </svg>,
    // Bars
    <svg key="2" viewBox="0 0 120 40" className="w-full h-full">
      <rect x="10" y="20" width="8" height="15" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="22" y="12" width="8" height="23" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="34" y="5" width="8" height="30" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="55" y="15" width="55" height="5" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="55" y="24" width="35" height="5" rx="2" fill="currentColor" opacity="0.3" />
    </svg>,
    // Hexagon
    <svg key="3" viewBox="0 0 120 40" className="w-full h-full">
      <polygon points="25,5 40,12 40,28 25,35 10,28 10,12" fill="currentColor" opacity="0.5" />
      <rect x="50" y="12" width="60" height="6" rx="3" fill="currentColor" opacity="0.4" />
      <rect x="50" y="22" width="40" height="6" rx="3" fill="currentColor" opacity="0.3" />
    </svg>,
    // Circles
    <svg key="4" viewBox="0 0 120 40" className="w-full h-full">
      <circle cx="15" cy="20" r="12" fill="currentColor" opacity="0.4" />
      <circle cx="35" cy="20" r="8" fill="currentColor" opacity="0.6" />
      <rect x="55" y="15" width="55" height="5" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="55" y="24" width="35" height="5" rx="2" fill="currentColor" opacity="0.3" />
    </svg>,
    // Abstract S
    <svg key="5" viewBox="0 0 120 40" className="w-full h-full">
      <path d="M10,10 Q25,10 25,17.5 T10,25 Q25,25 25,32.5 T40,32.5" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.5" />
      <rect x="55" y="12" width="55" height="6" rx="3" fill="currentColor" opacity="0.4" />
      <rect x="55" y="22" width="40" height="6" rx="3" fill="currentColor" opacity="0.3" />
    </svg>,
    // Diamond
    <svg key="6" viewBox="0 0 120 40" className="w-full h-full">
      <polygon points="25,5 45,20 25,35 5,20" fill="currentColor" opacity="0.5" />
      <rect x="55" y="12" width="55" height="6" rx="3" fill="currentColor" opacity="0.4" />
      <rect x="55" y="22" width="40" height="6" rx="3" fill="currentColor" opacity="0.3" />
    </svg>,
  ];

  return logos[variant % logos.length];
}

export function SocialProofSection() {
  return (
    <section className="relative py-16 overflow-hidden border-y border-gray-800/50">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4ade80]/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gray-400 text-lg">
            Built for <span className="text-[#4ade80]">closers</span>, <span className="text-[#4ade80]">setters</span>, <span className="text-[#4ade80]">founders</span>, and anyone serious about getting better at selling.
          </p>
        </motion.div>

        {/* Logo strip with infinite scroll */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
          
          {/* Scrolling logos */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-16 items-center"
            >
              {/* Double the logos for seamless loop */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-40 h-12 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <AbstractLogo variant={i} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { icon: "🔒", text: "Enterprise Security" },
            { icon: "⚡", text: "99.9% Uptime" },
            { icon: "🌍", text: "Global CDN" },
            { icon: "🛡️", text: "SOC 2 Compliant" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-500 text-sm"
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

