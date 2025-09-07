'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useUserJourney } from '@/contexts/UserJourneyContext'
import { usePathname } from 'next/navigation'

export function ProgressTracker() {
  const { state } = useUserJourney()
  const pathname = usePathname()

  // Hide on auth page
  if (pathname === '/auth') return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark p-4 rounded-2xl min-w-[200px]"
      >
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm font-semibold">Journey Progress</h3>
          <span className="text-luminara-vibrant-teal text-xs font-medium">
            {Math.round(state.progress)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-luminara-vibrant-teal to-luminara-warm-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${state.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>

        {/* Current Step Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-luminara-vibrant-teal rounded-full animate-pulse" />
            <span className="text-white text-xs">
              Step {state.currentStep} of {state.steps.length}
            </span>
          </div>
          
          <div className="text-gray-300 text-xs">
            {state.steps.find(s => s.id === state.currentStep)?.name}
          </div>
        </div>

        {/* Next Step Preview */}
        {state.currentStep < state.steps.length && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
              <span>Next: {state.steps.find(s => s.id === state.currentStep + 1)?.name}</span>
            </div>
          </div>
        )}

        {/* Completion Indicator */}
        {state.progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t border-green-500"
          >
            <div className="flex items-center gap-2 text-green-400 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Journey Complete!</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}