"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export function PricingSection() {
  const benefits = [
    "Unlimited practice sessions",
    "Unlimited objections",
    "Unlimited personas",
    "Full analytics",
    "All updates included",
  ];

  return (
    <section id="pricing" className="relative bg-black py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7AFF9B]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-[#7AFF9B]/10 border border-[#7AFF9B]/20 text-[#7AFF9B] text-sm font-medium mb-6"
          >
            Pricing
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Start Free. Unlock Mastery With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]">
              Unlimited Practice
            </span>
          </h2>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7AFF9B]/20 via-[#4ade80]/20 to-[#7AFF9B]/20 rounded-[32px] blur-xl opacity-50" />

          {/* Card */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.1] to-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Floating sparkles */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 right-8"
            >
              <Sparkles className="w-8 h-8 text-[#7AFF9B]/30" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left - Price */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7AFF9B]/10 border border-[#7AFF9B]/20 text-[#7AFF9B] text-xs font-medium mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7AFF9B] animate-pulse" />
                  Most Popular
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl sm:text-7xl font-bold text-white">$50</span>
                  <span className="text-gray-400 text-xl">/ month</span>
                </div>

                <p className="text-gray-400 mb-8">
                  Everything you need to master sales calls and close more deals.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(122, 255, 155, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold rounded-full text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Right - Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#7AFF9B]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#7AFF9B]" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-8 border-t border-white/10 text-center"
            >
              <p className="text-gray-400 text-sm">
                <span className="text-[#7AFF9B] font-medium">All features are free for a limited time</span>
                {" "}— upgrade anytime to unlock unlimited use.
              </p>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#7AFF9B]/10 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tl from-[#7AFF9B]/5 to-transparent rounded-tl-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
