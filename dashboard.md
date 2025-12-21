dashboard: import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { LogOut } from 'lucide-react';

import PersonalProgress from '@/components/dashboard/PersonalProgress';
import StartPracticeCard from '@/components/dashboard/StartPracticeCard';
import RecentPerformanceCard from '@/components/dashboard/RecentPerformanceCard';
import DailyGoalCard from '@/components/dashboard/DailyGoalCard';
import SkillBreakdown from '@/components/dashboard/SkillBreakdown';
import AnalyticsGraphs from '@/components/dashboard/AnalyticsGraphs';
import CallHistory from '@/components/dashboard/CallHistory';
import ScriptTools from '@/components/dashboard/ScriptTools';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        base44.auth.redirectToLogin(createPageUrl('Dashboard'));
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    base44.auth.logout(createPageUrl('Home'));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#7AFF9B]/20 border-t-[#7AFF9B] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7AFF9B]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4ade80]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7AFF9B] to-[#4ade80] flex items-center justify-center">
              <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold">SalesAI</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-400"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Top: Personal Progress */}
        <PersonalProgress user={user} />

        {/* Main Cards Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          <StartPracticeCard />
          <RecentPerformanceCard />
          <DailyGoalCard />
        </div>

        {/* Skill Breakdown */}
        <SkillBreakdown />

        {/* Analytics Graphs */}
        <AnalyticsGraphs />

        {/* Call History */}
        <CallHistory />

        {/* Script Tools */}
        <ScriptTools />
      </main>
    </div>
  );
}


personal progress UI component code: import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Phone, Trophy } from 'lucide-react';

export default function PersonalProgress({ user }) {
  const stats = [
    { icon: Clock, label: 'Weekly Minutes', value: '127', suffix: 'min' },
    { icon: Phone, label: 'Calls Completed', value: '24', suffix: '' },
    { icon: Trophy, label: 'Overall Score', value: '87', suffix: '/100' },
  ];

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
            {user?.full_name?.[0] || user?.email?.[0] || 'U'}
          </div>
          <div>
            <h2 className="font-semibold text-white">{user?.full_name || 'Sales Pro'}</h2>
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
  );
}


start practice card UI code: import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Mic, ChevronDown } from 'lucide-react';

export default function StartPracticeCard() {
  const [scenario, setScenario] = useState('cold_call');
  const [voice, setVoice] = useState('professional');
  const [difficulty, setDifficulty] = useState(50);

  const scenarios = [
    { id: 'cold_call', label: 'Cold Call' },
    { id: 'discovery', label: 'Discovery Call' },
    { id: 'objections', label: 'Objection Handling' },
    { id: 'custom', label: 'Custom Scenario' },
  ];

  const voices = [
    { id: 'professional', label: 'Professional Mike' },
    { id: 'skeptical', label: 'Skeptical Sarah' },
    { id: 'friendly', label: 'Friendly Tom' },
    { id: 'executive', label: 'Executive Karen' },
  ];

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
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7AFF9B]"
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
  );
}

recend performance card UI code: import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function RecentPerformanceCard() {
  const recentCalls = [
    { score: 85, duration: '12 min', weakness: 'Pacing', tag: 'Price objection handled well', color: 'green' },
    { score: 72, duration: '8 min', weakness: 'Confidence', tag: 'Struggled with gatekeeper', color: 'yellow' },
    { score: 91, duration: '15 min', weakness: 'None', tag: 'Great discovery questions', color: 'green' },
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-[#7AFF9B]';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

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
  );
}

daily goal UI code: import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flame, CheckCircle2 } from 'lucide-react';

export default function DailyGoalCard() {
  const dailyGoal = {
    title: "Handle 3 objections: 'Not interested'",
    description: "Practice overcoming the most common rejection with confidence.",
    progress: 66,
    completed: 2,
    total: 3,
  };

  const bonusTasks = [
    { label: 'Practice tone control for 5 min', done: true },
    { label: 'Complete 1 discovery call', done: false },
  ];

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
              className={`flex items-center gap-3 p-3 rounded-lg ${
                task.done ? 'bg-[#7AFF9B]/5' : 'bg-white/[0.02]'
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
  );
}

skill breakdown UI code: import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Shield, HelpCircle, Timer, MessageSquare, Heart, TrendingUp, TrendingDown } from 'lucide-react';

export default function SkillBreakdown() {
  const skills = [
    { icon: Mic2, name: 'Tone', score: 82, change: 5, up: true },
    { icon: Shield, name: 'Confidence', score: 75, change: 8, up: true },
    { icon: HelpCircle, name: 'Questions', score: 88, change: 3, up: true },
    { icon: Timer, name: 'Pacing', score: 71, change: 2, up: false },
    { icon: MessageSquare, name: 'Objections', score: 79, change: 12, up: true },
    { icon: Heart, name: 'Rapport', score: 85, change: 1, up: false },
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-[#7AFF9B] to-[#4ade80]';
    if (score >= 70) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

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
  );
}

analyticsgrpahs UI code: import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsGraphs() {
  const progressData = [
    { week: 'W1', score: 65 },
    { week: 'W2', score: 70 },
    { week: 'W3', score: 68 },
    { week: 'W4', score: 75 },
    { week: 'W5', score: 82 },
    { week: 'W6', score: 79 },
    { week: 'W7', score: 87 },
  ];

  const objectionsData = [
    { name: 'Price', missed: 12 },
    { name: 'Timing', missed: 8 },
    { name: 'Competitor', missed: 6 },
    { name: 'Authority', missed: 4 },
    { name: 'Need', missed: 3 },
  ];

  const talkTimeData = [
    { name: 'You', value: 45, color: '#7AFF9B' },
    { name: 'AI Buyer', value: 55, color: '#4B5563' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm">
          <p className="text-gray-400">{label}</p>
          <p className="text-[#7AFF9B] font-semibold">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

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
                    <Cell key={index} fill={entry.color} />
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
  );
}

callhistory UI code: import React from 'react';
import { motion } from 'framer-motion';
import { Play, FileText, Clock, Calendar } from 'lucide-react';

export default function CallHistory() {
  const calls = [
    { date: 'Today, 2:30 PM', scenario: 'Cold Call', duration: '12 min', score: 85, label: 'Price objection', labelColor: 'bg-yellow-500/20 text-yellow-400' },
    { date: 'Today, 10:15 AM', scenario: 'Discovery', duration: '18 min', score: 91, label: 'Great questions', labelColor: 'bg-[#7AFF9B]/20 text-[#7AFF9B]' },
    { date: 'Yesterday, 4:45 PM', scenario: 'Objection Handling', duration: '8 min', score: 72, label: 'Gatekeeper', labelColor: 'bg-orange-500/20 text-orange-400' },
    { date: 'Yesterday, 11:00 AM', scenario: 'Cold Call', duration: '15 min', score: 88, label: 'Skeptical customer', labelColor: 'bg-purple-500/20 text-purple-400' },
    { date: 'Dec 29, 3:20 PM', scenario: 'Discovery', duration: '22 min', score: 94, label: 'Perfect close', labelColor: 'bg-[#7AFF9B]/20 text-[#7AFF9B]' },
  ];

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
  );
}

script tools UI code: import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, FileEdit, ArrowRight } from 'lucide-react';

export default function ScriptTools() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold mb-4">Script Tools</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Improve My Script */}
        <motion.div
          whileHover={{ scale: 1.01, y: -2 }}
          className="p-6 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 cursor-pointer group hover:border-[#7AFF9B]/30 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-blue-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#7AFF9B] group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-semibold text-white mb-2">Improve My Script</h4>
          <p className="text-sm text-gray-500">
            Upload or paste your current script and get AI-powered suggestions to make it more effective.
          </p>
        </motion.div>

        {/* Build a New Script */}
        <motion.div
          whileHover={{ scale: 1.01, y: -2 }}
          className="p-6 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 cursor-pointer group hover:border-[#7AFF9B]/30 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
              <FileEdit className="w-6 h-6 text-purple-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#7AFF9B] group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-semibold text-white mb-2">Build a New Script</h4>
          <p className="text-sm text-gray-500">
            Tell us your niche and the AI will generate a complete sales pitch tailored for your product.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}