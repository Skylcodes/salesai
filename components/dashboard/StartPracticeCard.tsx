'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Mic, ChevronDown } from 'lucide-react'

export default function StartPracticeCard() {
  const [scenario, setScenario] = useState('cold_call')
  const [voice, setVoice] = useState('professional')
  const [difficulty, setDifficulty] = useState(50)

  const scenarios = [
    { id: 'cold_call', label: 'Cold Call' },
    { id: 'discovery', label: 'Discovery Call' },
    { id: 'objections', label: 'Objection Handling' },
    { id: 'custom', label: 'Custom Scenario' },
  ]

  const voices = [
    { id: 'professional', label: 'Professional Mike' },
    { id: 'skeptical', label: 'Skeptical Sarah' },
    { id: 'friendly', label: 'Friendly Tom' },
    { id: 'executive', label: 'Executive Karen' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7AFF9B] to-[#4ade80] flex items-center justify-center">
          <Mic className="w-5 h-5 text-black" />
        </div>
        <h3 className="text-lg font-semibold">Start Practice</h3>
      </div>

      {/* Scenario Selector */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mb-2 block">Scenario</label>
        <div className="grid grid-cols-2 gap-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scenario === s.id
                  ? 'bg-[#7AFF9B] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Selector */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mb-2 block">AI Voice</label>
        <div className="relative">
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#7AFF9B]/50"
          >
            {voices.map((v) => (
              <option key={v.id} value={v.id} className="bg-gray-900">
                {v.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Difficulty Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-400">Difficulty</label>
          <span className="text-sm text-[#7AFF9B] font-medium">{difficulty}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7AFF9B] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#7AFF9B] [&::-moz-range-thumb]:border-0"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Easy</span>
          <span>Hard</span>
        </div>
      </div>

      {/* Start Button */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(122, 255, 155, 0.3)' }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold rounded-xl text-lg flex items-center justify-center gap-2"
      >
        <Play className="w-5 h-5 fill-current" />
        Start Practice Call
      </motion.button>
    </motion.div>
  )
}

