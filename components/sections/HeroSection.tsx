"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Mic, Volume2, Play } from "lucide-react";

// Money particle component
function MoneyParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-20, -120],
        rotate: [0, 360],
        scale: [1, 0.5],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      className="absolute text-[#7AFF9B] text-lg font-bold"
      style={{ left: `${x}%`, bottom: "20%" }}
    >
      $
    </motion.div>
  );
}

// Waveform bar component
function WaveformBar({ delay }: { delay: number }) {
  return (
    <motion.div
      animate={{
        scaleY: [0.3, 1, 0.5, 0.8, 0.3],
      }}
      transition={{
        duration: 1.2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-1 bg-gradient-to-t from-[#7AFF9B] to-[#4ade80] rounded-full origin-bottom"
      style={{ height: "40px" }}
    />
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden pt-24 pb-16"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#7AFF9B]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#7AFF9B]/3 to-transparent rounded-full" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#7AFF9B 1px, transparent 1px), linear-gradient(90deg, #7AFF9B 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7AFF9B]/10 border border-[#7AFF9B]/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#7AFF9B] animate-pulse" />
              <span className="text-[#7AFF9B] text-sm font-medium">AI-Powered Sales Training</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Master Sales Calls in{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]">
                  Weeks
                </span>
                <motion.span
                  className="absolute -inset-1 bg-[#7AFF9B]/20 blur-xl rounded-lg"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              , Not Years.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              The most realistic way to practice sales without talking to a real person — powered by AI that responds, challenges, and trains you like an actual buyer.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(122, 255, 155, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-[#7AFF9B] text-black font-bold rounded-full text-lg flex items-center justify-center gap-2 hover:bg-[#6ae88a] transition-colors"
              >
                Start Practicing Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '50K+', label: 'Calls Practiced' },
                { value: '4.9', label: 'User Rating' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative preserve-3d"
            >
              {/* Floating phone */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Phone frame */}
                <div className="relative w-72 sm:w-80 h-[580px] sm:h-[640px] bg-gradient-to-b from-[#0a0a0a] to-[#000000] rounded-[3rem] p-3 border border-gray-800/30">
                  {/* Phone notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

                  {/* Phone screen */}
                  <div className="relative w-full h-full bg-[#000000] rounded-[2.5rem] overflow-hidden">
                    {/* Screen content */}
                    <div className="absolute inset-0 p-6 flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-8 pt-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7AFF9B] to-[#4ade80]" />
                          <span className="text-white font-semibold text-sm">SalesAI</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-[#7AFF9B] rounded-full animate-pulse" />
                          <span className="text-[#7AFF9B] text-xs">Live</span>
                        </div>
                      </div>

                      {/* Call interface */}
                      <div className="flex-1 flex flex-col items-center justify-center">
                        {/* AI Avatar */}
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7AFF9B]/10 to-[#4ade80]/5 flex items-center justify-center mb-4"
                        >
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0a0a0a] to-[#141414] flex items-center justify-center">
                            <Volume2 className="w-8 h-8 text-[#7AFF9B]" />
                          </div>
                        </motion.div>

                        <span className="text-white font-medium mb-1">AI Buyer</span>
                        <span className="text-gray-500 text-sm mb-6">Enterprise Decision Maker</span>

                        {/* Waveform */}
                        <div className="flex items-end gap-1 h-12 mb-6">
                          {[...Array(12)].map((_, i) => (
                            <WaveformBar key={i} delay={i * 0.1} />
                          ))}
                        </div>

                        {/* Call duration */}
                        <div className="glass px-4 py-2 rounded-full">
                          <span className="text-[#7AFF9B] font-mono text-sm">02:34</span>
                        </div>
                      </div>

                      {/* Bottom controls */}
                      <div className="flex items-center justify-center gap-6 pb-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-gray-800"
                        >
                          <Mic className="w-6 h-6 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center"
                          style={{ boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)" }}
                        >
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-gray-800"
                        >
                          <Volume2 className="w-6 h-6 text-white" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Screen glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#7AFF9B]/3 pointer-events-none" />
                  </div>
                </div>

                {/* Money particles */}
                {[...Array(5)].map((_, i) => (
                  <MoneyParticle key={i} delay={i * 0.6} x={20 + i * 15} />
                ))}

                {/* Floating elements around phone */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-8 -right-8 w-16 h-16 glass rounded-2xl flex items-center justify-center"
                >
                  <span className="text-2xl">📈</span>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-1/3 -left-12 w-14 h-14 glass rounded-xl flex items-center justify-center"
                >
                  <span className="text-xl">🎯</span>
                </motion.div>

                <motion.div
                  animate={{ y: [-5, 15, -5], rotate: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute bottom-1/4 -right-10 w-12 h-12 glass rounded-xl flex items-center justify-center"
                >
                  <span className="text-lg">💰</span>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -15, 5] }}
                  transition={{ duration: 4.5, repeat: Infinity }}
                  className="absolute -bottom-6 left-8 w-20 h-10 glass rounded-full flex items-center justify-center gap-1"
                >
                  <span className="text-[#7AFF9B] text-xs font-medium">+32%</span>
                  <svg className="w-3 h-3 text-[#7AFF9B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#7AFF9B]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

