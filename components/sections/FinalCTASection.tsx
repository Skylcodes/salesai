"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export function FinalCTASection() {
  const router = useRouter();
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#7AFF9B]/10 via-[#7AFF9B]/5 to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Animated particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#7AFF9B]/40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7AFF9B] to-[#4ade80] mb-8"
        >
          <Zap className="w-10 h-10 text-black" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Ready to Sell With{" "}
          <span className="relative">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]">
              Confidence?
            </span>
            <motion.span
              className="absolute -inset-2 bg-[#7AFF9B]/20 blur-xl rounded-lg"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Start practicing today — and master sales calls faster than you ever thought possible.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={() => router.push('/signup')}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(122, 255, 155, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="group px-10 py-5 bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold rounded-full text-xl inline-flex items-center gap-3 hover:opacity-90 transition-all"
          >
            Start Practicing Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-gray-500 text-sm"
        >
          No credit card required • Free trial included • Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
