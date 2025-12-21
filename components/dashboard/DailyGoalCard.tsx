'use client'

import { motion } from 'framer-motion'
import { Target, Flame, CheckCircle2 } from 'lucide-react'

export default function DailyGoalCard() {
  const dailyGoal = {
    title: "Handle 3 objections: 'Not interested'",
    description: "Practice overcoming the most common rejection with confidence.",
    progress: 66,
    completed: 2,
    total: 3,
  }

  const bonusTasks = [
    { label: 'Practice tone control for 5 min', done: true },
    { label: 'Complete 1 discovery call', done: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold">Today's Goal</h3>
        </div>
        <div className="flex items-center gap-1 text-orange-400">
          <Flame className="w-5 h-5" />
          <span className="font-bold">5</span>
        </div>
      </div>

      {/* Main Goal */}
      <div className="mb-6">
        <h4 className="font-medium text-white mb-2">{dailyGoal.title}</h4>
        <p className="text-sm text-gray-500 mb-4">{dailyGoal.description}</p>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dailyGoal.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className="text-gray-500">{dailyGoal.completed} of {dailyGoal.total} completed</span>
            <span className="text-[#7AFF9B] font-medium">{dailyGoal.progress}%</span>
          </div>
        </div>
      </div>

      {/* Bonus Tasks */}
      <div className="pt-4 border-t border-white/5">
        <p className="text-xs text-gray-500 mb-3">BONUS TASKS</p>
        <div className="space-y-2">
          {bonusTasks.map((task, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg ${task.done ? 'bg-[#7AFF9B]/5' : 'bg-white/[0.02]'
                }`}
            >
              <CheckCircle2
                className={`w-5 h-5 ${task.done ? 'text-[#7AFF9B]' : 'text-gray-600'}`}
              />
              <span className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                {task.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

