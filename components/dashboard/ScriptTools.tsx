'use client'

import { motion } from 'framer-motion'
import { Wand2, FileEdit, ArrowRight } from 'lucide-react'

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
  )
}

