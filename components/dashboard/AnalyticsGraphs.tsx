'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function AnalyticsGraphs() {
  const progressData = [
    { week: 'W1', score: 65 },
    { week: 'W2', score: 70 },
    { week: 'W3', score: 68 },
    { week: 'W4', score: 75 },
    { week: 'W5', score: 82 },
    { week: 'W6', score: 79 },
    { week: 'W7', score: 87 },
  ]

  const objectionsData = [
    { name: 'Price', missed: 12 },
    { name: 'Timing', missed: 8 },
    { name: 'Competitor', missed: 6 },
    { name: 'Authority', missed: 4 },
    { name: 'Need', missed: 3 },
  ]

  const talkTimeData = [
    { name: 'You', value: 45, color: '#7AFF9B' },
    { name: 'AI Buyer', value: 55, color: '#4B5563' },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm">
          <p className="text-gray-400">{label}</p>
          <p className="text-[#7AFF9B] font-semibold">{payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4">Analytics</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {/* Progress Over Time */}
        <div className="p-5 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Progress Over Time</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis hide domain={[50, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#7AFF9B"
                  strokeWidth={3}
                  dot={{ fill: '#7AFF9B', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#7AFF9B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Missed Objections */}
        <div className="p-5 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Most Missed Objections</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={objectionsData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="missed" fill="#7AFF9B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Talk Time Ratio */}
        <div className="p-5 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Talk Time Ratio</h4>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={talkTimeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {talkTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {talkTimeData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

