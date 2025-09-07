'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserJourney } from '@/contexts/UserJourneyContext'
import { Card3D } from '@/components/ui/Card3D'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const { state: authState, login, loginWithGoogle, register } = useAuth()
  const { updateStep, setCurrentStep } = useUserJourney()

  // Redirect if already authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      router.push('/welcome')
    }
  }, [authState.isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let success = false
      
      if (mode === 'login') {
        success = await login(formData.email, formData.password)
      } else {
        success = await register(formData.name, formData.email, formData.password)
      }

      if (success) {
        updateStep(1, true)
        setCurrentStep(2)
        router.push('/welcome')
      } else {
        setError('Authentication failed. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const success = await loginWithGoogle()
      if (success) {
        updateStep(1, true)
        setCurrentStep(2)
        router.push('/welcome')
      } else {
        setError('Google authentication failed. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luminara-vibrant-teal"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-luminara-vibrant-teal/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-luminara-warm-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luminara-deep-blue/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card3D className="p-8" elevation="high">
          {/* Luminara Logo */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-luminara-vibrant-teal to-luminara-warm-accent rounded-xl flex items-center justify-center animate-pulse-glow">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h1 className="text-3xl font-bold text-white font-poppins">Luminara</h1>
            </div>
            <p className="text-gray-300 text-sm">AI-Powered Educational Guidance</p>
          </motion.div>

          {/* Mode Toggle */}
          <div className="flex items-center justify-center mb-6">
            <div className="glass-dark rounded-full p-1">
              <div className="flex">
                <button
                  onClick={() => setMode('login')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    mode === 'login'
                      ? 'bg-luminara-vibrant-teal text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    mode === 'register'
                      ? 'bg-luminara-vibrant-teal text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Google OAuth Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mb-6 bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
              <span>Continue with Google</span>
            </div>
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 text-gray-400 bg-transparent">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-luminara-vibrant-teal focus:ring-luminara-vibrant-teal border-gray-600 rounded"
                  />
                  <Label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-luminara-vibrant-teal hover:text-luminara-warm-accent transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-luminara-vibrant-teal to-luminara-warm-accent hover:from-luminara-warm-accent hover:to-luminara-vibrant-teal transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Security Badges */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Privacy Protected</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-luminara-vibrant-teal rounded-full"></div>
              <span className="text-xs text-gray-400">Step 1 of 9 - Authentication</span>
            </div>
          </div>
        </Card3D>
      </motion.div>
    </div>
  )
}