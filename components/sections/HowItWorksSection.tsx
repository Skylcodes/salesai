"use client";

import { motion } from "framer-motion";
import { Mic, Target, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Real Conversations. Real Pressure.",
    description: "Practice with AI that sounds, responds, and challenges you like a real buyer would.",
    gradient: "from-[#7AFF9B] to-[#4ade80]",
  },
  {
    icon: Target,
    title: "Every Sales Scenario. One Platform.",
    description: "Cold calls, discovery, demos, negotiations — master them all in one place.",
    gradient: "from-[#4ade80] to-[#22c55e]",
  },
  {
    icon: Zap,
    title: "Instant Feedback & Scoring.",
    description: "Get real-time insights on your performance and know exactly what to improve.",
    gradient: "from-[#22c55e] to-[#16a34a]",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#7AFF9B]/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#4ade80]/5 rounded-full blur-[150px] -translate-y-1/2" />
      </div>

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
            How It Works
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Train Like You&apos;re On a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]">
              Real Sales Call
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Your AI buyer listens, responds, objects, and adapts — giving you the closest thing to real-life sales conversations you can get without dialing an actual number.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`} />
                </div>

                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-white/[0.03]">
                  0{idx + 1}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-black" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#7AFF9B] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7AFF9B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

