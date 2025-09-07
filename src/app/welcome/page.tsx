'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserJourney } from '@/contexts/UserJourneyContext'
import { Card3D } from '@/components/ui/Card3D'
import { Button } from '@/components/ui/button'

export default function WelcomePage() {
  const router = useRouter()
  const { state: authState } = useAuth()
  const { updateStep, setCurrentStep } = useUserJourney()

  // Redirect if not authenticated
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push('/auth')
    }
  }, [authState, router])

  const handleStartJourney = () => {
    updateStep(2, true)
    setCurrentStep(3)
    router.push('/profile')
  }

  if (authState.isLoading || !authState.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luminara-vibrant-teal"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 pt-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white font-poppins mb-6">
          Welcome to Luminara,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-luminara-vibrant-teal to-luminara-warm-accent">
            {authState.user?.name}
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Transform your educational journey with AI-powered career guidance, personalized assessments, and expert recommendations
        </p>
      </motion.div>

      {/* Hero Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex justify-center mb-16"
      >
        <div className="relative">
          <div className="w-96 h-64 bg-gradient-to-br from-luminara-deep-blue/30 to-luminara-vibrant-teal/30 rounded-3xl backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d8d94bbb-4047-467e-91ca-a618f10fa2ed.png" 
              alt="Students exploring diverse career paths with AI guidance dashboard interface"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-luminara-warm-accent rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-luminara-vibrant-teal rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
      >
        <Card3D hover3D className="p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="w-16 h-16 bg-gradient-to-br from-luminara-vibrant-teal to-luminara-warm-accent rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl font-bold text-white">10K+</span>
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-2">Students Guided</h3>
          <p className="text-gray-400">Successful career transitions with our AI platform</p>
        </Card3D>

        <Card3D hover3D className="p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-16 h-16 bg-gradient-to-br from-luminara-warm-accent to-luminara-vibrant-teal rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl font-bold text-white">4.8</span>
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-2">Rating</h3>
          <p className="text-gray-400">Average satisfaction score from students</p>
        </Card3D>

        <Card3D hover3D className="p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="w-16 h-16 bg-gradient-to-br from-luminara-deep-blue to-luminara-vibrant-teal rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl font-bold text-white">500+</span>
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-2">Expert Counselors</h3>
          <p className="text-gray-400">Professional guidance at your fingertips</p>
        </Card3D>
      </motion.div>

      {/* How Luminara Works */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <Card3D className="p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">How Luminara Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'AI Assessment',
                description: 'Complete comprehensive psychometric tests to understand your personality, interests, and cognitive abilities'
              },
              {
                step: '02',
                title: 'Career Matching',
                description: 'Get personalized career recommendations based on your unique profile and market trends'
              },
              {
                step: '03',
                title: 'Guided Learning',
                description: 'Follow customized learning paths with college recommendations and timeline tracking'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-luminara-vibrant-teal to-luminara-warm-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Card3D>
      </motion.div>

      {/* Journey Preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <Card3D className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Your Learning Journey Awaits</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Discover your potential, explore career paths, and build the future you want
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            {['Profile', 'Assessment', 'Analysis', 'Planning', 'Success'].map((stepName, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-luminara-vibrant-teal animate-pulse' : 'bg-gray-600'
                }`}></div>
                {index < 4 && <div className="w-8 h-0.5 bg-gray-600 mx-2"></div>}
              </div>
            ))}
          </div>

          <Button
            onClick={handleStartJourney}
            className="bg-gradient-to-r from-luminara-vibrant-teal to-luminara-warm-accent hover:from-luminara-warm-accent hover:to-luminara-vibrant-teal text-white px-12 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
          >
            Start Your Journey
          </Button>
        </Card3D>
      </motion.div>

      {/* Success Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="text-center text-gray-400"
      >
        <p className="text-sm mb-4">Join thousands of students who have transformed their careers</p>
        <div className="flex justify-center items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs">98% Success Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs">AI-Powered Insights</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}