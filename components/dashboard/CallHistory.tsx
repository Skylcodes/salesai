'use client'

import { motion } from 'framer-motion'
import { Play, FileText, Clock, Calendar } from 'lucide-react'

export default function CallHistory() {
  const calls = [
    { date: 'Today, 2:30 PM', scenario: 'Cold Call', duration: '12 min', score: 85, label: 'Price objection', labelColor: 'bg-yellow-500/20 text-yellow-400' },
    { date: 'Today, 10:15 AM', scenario: 'Discovery', duration: '18 min', score: 91, label: 'Great questions', labelColor: 'bg-[#7AFF9B]/20 text-[#7AFF9B]' },
    { date: 'Yesterday, 4:45 PM', scenario: 'Objection Handling', duration: '8 min', score: 72, label: 'Gatekeeper', labelColor: 'bg-orange-500/20 text-orange-400' },
    { date: 'Yesterday, 11:00 AM', scenario: 'Cold Call', duration: '15 min', score: 88, label: 'Skeptical customer', labelColor: 'bg-purple-500/20 text-purple-400' },
    { date: 'Dec 29, 3:20 PM', scenario: 'Discovery', duration: '22 min', score: 94, label: 'Perfect close', labelColor: 'bg-[#7AFF9B]/20 text-[#7AFF9B]' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Call History</h3>
        <button className="text-sm text-[#7AFF9B] hover:opacity-80 transition-opacity">View All</button>
      </div>
      
      <div className="rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">DATE & TIME</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">SCENARIO</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">DURATION</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">SCORE</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">LABEL</th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {call.date}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white">{call.scenario}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {call.duration}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-lg font-bold ${
                      call.score >= 85 ? 'text-[#7AFF9B]' : call.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {call.score}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs ${call.labelColor}`}>
                      {call.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" title="Play Recording">
                        <Play className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" title="View Feedback">
                        <FileText className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

