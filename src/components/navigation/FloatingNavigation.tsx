'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserJourney } from '@/contexts/UserJourneyContext'
import { useAuth } from '@/contexts/AuthContext'

export function FloatingNavigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { state: journeyState, setCurrentStep } = useUserJourney()
  const { state: authState, logout } = useAuth()

  // Hide navigation on auth page
  useEffect(() => {
    setIsVisible(pathname !== '/auth' && authState.isAuthenticated)
  }, [pathname, authState.isAuthenticated])

  const handleStepClick = (stepId: number, path: string) => {
    const step = journeyState.steps.find(s => s.id === stepId)
    if (step && !step.locked) {
      setCurrentStep(stepId)
      router.push(path)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/auth')
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="glass-card px-6 py-3 perspective-1000">
        <div className="flex items-center gap-4">
          {/* Luminara Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-luminara-vibrant-teal rounded-lg flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-white font-poppins font-semibold">Luminara</span>
          </motion.div>

          {/* Navigation Steps */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-luminara-vibrant-teal hover:text-white transition-colors"
            >
              <svg 
                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
            {authState.user?.avatar ? (
              <img
                src={authState.user.avatar}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-luminara-vibrant-teal"
              />
            ) : (
              <div className="w-8 h-8 bg-luminara-warm-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {authState.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <span className="text-white text-sm font-medium hidden sm:block">
              {authState.user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition-colors"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded Navigation Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/20"
            >
              <div className="grid grid-cols-2 gap-2 max-w-md">
                {journeyState.steps.slice(1).map((step) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id, step.path)}
                    disabled={step.locked}
                    className={`text-left p-2 rounded-lg transition-all ${
                      step.locked
                        ? 'text-gray-500 cursor-not-allowed'
                        : pathname === step.path
                        ? 'bg-luminara-vibrant-teal/20 text-luminara-vibrant-teal'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        step.completed ? 'bg-green-400' : 
                        step.locked ? 'bg-gray-500' : 
                        'bg-luminara-vibrant-teal'
                      }`} />
                      <span className="text-xs font-medium">{step.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}