"use client";

import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

export function WhyThisWorksSection() {
  const painPoints = [
    "No awkward roleplay.",
    "No waiting for reps or managers.",
    "No fake scripts.",
  ];

  // Animated graph data
  const graphBars = [
    { height: 20, delay: 0 },
    { height: 35, delay: 0.1 },
    { height: 28, delay: 0.2 },
    { height: 45, delay: 0.3 },
    { height: 55, delay: 0.4 },
    { height: 48, delay: 0.5 },
    { height: 70, delay: 0.6 },
    { height: 85, delay: 0.7 },
    { height: 78, delay: 0.8 },
    { height: 95, delay: 0.9 },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#7AFF9B]/10 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-[#7AFF9B]/10 border border-[#7AFF9B]/20 text-[#7AFF9B] text-sm font-medium mb-6"
            >
              Why This Works
            </motion.span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              The Fastest Way to Build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]">
                Sales Confidence
              </span>
            </h2>

            {/* Pain points with X marks transformed to checks */}
            <div className="space-y-5">
              {painPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="relative">
                    {/* X icon (old way) */}
                    <motion.div
                      className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:opacity-0 transition-opacity absolute inset-0"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </motion.div>
                    {/* Check icon (new way) */}
                    <motion.div
                      className="w-10 h-10 rounded-full bg-[#7AFF9B]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#7AFF9B]" />
                    </motion.div>
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-gray-400 leading-relaxed"
            >
              Traditional sales training is slow, awkward, and ineffective. Our AI gives you unlimited practice with zero judgment — so you can build real confidence before your next call.
            </motion.p>
          </motion.div>

          {/* Right Content - Animated Graph */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Graph container */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm">
              {/* Graph title */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-white font-semibold text-lg">Confidence Growth</h3>
                  <p className="text-gray-500 text-sm">After using SalesAI</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#7AFF9B]" />
                  <span className="text-gray-400 text-sm">Your Progress</span>
                </div>
              </div>

              {/* Graph */}
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* Graph area */}
                <div className="ml-10 h-full flex items-end gap-3">
                  {graphBars.map((bar, idx) => (
                    <motion.div
                      key={idx}
                      className="flex-1 relative group"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: bar.delay, ease: "easeOut" }}
                    >
                      {/* Bar */}
                      <div
                        className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-[#7AFF9B]/60 to-[#7AFF9B] group-hover:from-[#7AFF9B]/80 group-hover:to-[#7AFF9B] transition-colors"
                        style={{ boxShadow: "0 0 20px rgba(122, 255, 155, 0.3)" }}
                      />

                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-2 py-1 rounded bg-white text-black text-xs font-semibold whitespace-nowrap">
                          {bar.height}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* X-axis line */}
                <div className="absolute bottom-8 left-10 right-0 h-px bg-white/10" />

                {/* Trend line */}
                <svg className="absolute inset-0 ml-10 mb-8" style={{ overflow: "visible" }}>
                  <motion.path
                    d="M 0 180 Q 50 150, 100 140 T 200 100 T 300 60 T 400 20"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7AFF9B" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7AFF9B" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="ml-10 flex justify-between text-xs text-gray-500 mt-2">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                {[
                  { value: "+85%", label: "Confidence" },
                  { value: "3x", label: "Close Rate" },
                  { value: "-60%", label: "Call Anxiety" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-[#7AFF9B]">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
