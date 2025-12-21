'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, AlertCircle } from 'lucide-react'

export default function RecentPerformanceCard() {
  const recentCalls = [
    { score: 85, duration: '12 min', weakness: 'Pacing', tag: 'Price objection handled well', color: 'green' },
    { score: 72, duration: '8 min', weakness: 'Confidence', tag: 'Struggled with gatekeeper', color: 'yellow' },
    { score: 91, duration: '15 min', weakness: 'None', tag: 'Great discovery questions', color: 'green' },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-[#7AFF9B]'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold">Recent Performance</h3>
      </div>

      <div className="space-y-4">
        {recentCalls.map((call, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`text-2xl font-bold ${getScoreColor(call.score)}`}>
                {call.score}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {call.duration}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              {call.weakness !== 'None' && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {call.weakness}
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-400">{call.tag}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

