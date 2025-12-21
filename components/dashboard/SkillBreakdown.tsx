'use client'

import { motion } from 'framer-motion'
import { Mic2, Shield, HelpCircle, Timer, MessageSquare, Heart, TrendingUp, TrendingDown } from 'lucide-react'

export default function SkillBreakdown() {
  const skills = [
    { icon: Mic2, name: 'Tone', score: 82, change: 5, up: true },
    { icon: Shield, name: 'Confidence', score: 75, change: 8, up: true },
    { icon: HelpCircle, name: 'Questions', score: 88, change: 3, up: true },
    { icon: Timer, name: 'Pacing', score: 71, change: 2, up: false },
    { icon: MessageSquare, name: 'Objections', score: 79, change: 12, up: true },
    { icon: Heart, name: 'Rapport', score: 85, change: 1, up: false },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-[#7AFF9B] to-[#4ade80]'
    if (score >= 70) return 'from-yellow-400 to-yellow-500'
    return 'from-red-400 to-red-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <h3 className="text-lg font-semibold mb-4">Skill Breakdown</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
              <skill.icon className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(skill.score)} bg-clip-text text-transparent`}>
              {skill.score}
            </div>
            
            <div className="text-sm text-gray-400 mb-2">{skill.name}</div>
            
            <div className={`flex items-center justify-center gap-1 text-xs ${
              skill.up ? 'text-[#7AFF9B]' : 'text-red-400'
            }`}>
              {skill.up ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {skill.change}%
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

