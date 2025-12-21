"use client";

import { motion } from "framer-motion";
import { Mic, ShieldAlert, Users, FileText, Radio, BarChart3 } from "lucide-react";

export function AIFeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: "Real-Time AI Voice Practice",
      description: "Practice speaking with an AI that responds naturally to your voice in real-time.",
    },
    {
      icon: ShieldAlert,
      title: "Objection Simulator",
      description: "Face every possible objection and learn to handle them with confidence.",
    },
    {
      icon: Users,
      title: "Role Personas",
      description: "Practice with different buyer personas — from skeptical CFOs to eager decision-makers.",
    },
    {
      icon: FileText,
      title: "Script Improvement AI",
      description: "Get AI suggestions to strengthen your scripts and improve your messaging.",
    },
    {
      icon: Radio,
      title: "Call Recording & Transcripts",
      description: "Review your practice sessions with full recordings and searchable transcripts.",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your improvement over time with detailed performance analytics.",
    },
  ];

  return (
    <section id="features" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#7AFF9B]/5 to-transparent rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#7AFF9B 1px, transparent 1px), linear-gradient(90deg, #7AFF9B 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-[#7AFF9B]/10 border border-[#7AFF9B]/20 text-[#7AFF9B] text-sm font-medium mb-6"
          >
            AI Features
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Personal Sales Coach —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]">
              Available 24/7
            </span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              {/* Glassmorphism card */}
              <div className="relative h-full p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden hover:border-[#7AFF9B]/30 transition-colors">
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#7AFF9B]/5 to-transparent" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7AFF9B]/20 to-[#7AFF9B]/5 border border-[#7AFF9B]/20 flex items-center justify-center mb-4"
                >
                  <feature.icon className="w-6 h-6 text-[#7AFF9B]" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#7AFF9B] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7AFF9B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(122, 255, 155, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
