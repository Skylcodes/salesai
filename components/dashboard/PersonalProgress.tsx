'use client'

import { motion } from 'framer-motion'
import { Clock, Phone, Trophy } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface PersonalProgressProps {
  user: User | null
  onboardingData?: {
    full_name: string | null
  } | null
}

export default function PersonalProgress({ user, onboardingData }: PersonalProgressProps) {
  const stats = [
    { icon: Clock, label: 'Weekly Minutes', value: '127', suffix: 'min' },
    { icon: Phone, label: 'Calls Completed', value: '24', suffix: '' },
    { icon: Trophy, label: 'Overall Score', value: '87', suffix: '/100' },
  ]

  const displayName = onboardingData?.full_name || user?.email?.split('@')[0] || 'Sales Pro'
  const initials = onboardingData?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7AFF9B] to-[#4ade80] flex items-center justify-center text-black font-bold text-lg">
            {initials}
          </div>
          <div>
            <h2 className="font-semibold text-white">{displayName}</h2>
            <p className="text-sm text-gray-500">Level 5 Closer</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 md:gap-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7AFF9B]/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#7AFF9B]" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">
                  {stat.value}<span className="text-sm text-gray-500">{stat.suffix}</span>
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

