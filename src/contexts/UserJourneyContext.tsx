'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface UserJourneyStep {
  id: number
  name: string
  path: string
  completed: boolean
  locked: boolean
  description: string
}

export interface UserJourneyState {
  currentStep: number
  steps: UserJourneyStep[]
  userData: any
  progress: number
}

interface UserJourneyContextType {
  state: UserJourneyState
  updateStep: (stepId: number, completed: boolean) => void
  setCurrentStep: (stepId: number) => void
  updateUserData: (data: any) => void
  getNextStep: () => UserJourneyStep | null
  getPreviousStep: () => UserJourneyStep | null
}

const initialSteps: UserJourneyStep[] = [
  {
    id: 1,
    name: 'Authentication',
    path: '/auth',
    completed: false,
    locked: false,
    description: 'Login or create your account'
  },
  {
    id: 2,
    name: 'Welcome',
    path: '/welcome',
    completed: false,
    locked: true,
    description: 'Get introduced to Luminara'
  },
  {
    id: 3,
    name: 'Profile Setup',
    path: '/profile',
    completed: false,
    locked: true,
    description: 'Complete your personal profile'
  },
  {
    id: 4,
    name: 'Journey Roadmap',
    path: '/roadmap',
    completed: false,
    locked: true,
    description: 'View your learning pathway'
  },
  {
    id: 5,
    name: 'Psychometric Assessment',
    path: '/psychometric',
    completed: false,
    locked: true,
    description: 'Discover your personality and interests'
  },
  {
    id: 6,
    name: 'Career Analysis',
    path: '/career-analysis',
    completed: false,
    locked: true,
    description: 'Get personalized career recommendations'
  },
  {
    id: 7,
    name: 'Course Mapping',
    path: '/course-mapping',
    completed: false,
    locked: true,
    description: 'Explore degree programs and career paths'
  },
  {
    id: 8,
    name: 'Learning Path',
    path: '/learning-path',
    completed: false,
    locked: true,
    description: 'Access customized study materials'
  },
  {
    id: 9,
    name: 'College Directory',
    path: '/colleges',
    completed: false,
    locked: true,
    description: 'Find nearby government colleges'
  },
  {
    id: 10,
    name: 'Timeline Tracker',
    path: '/timeline',
    completed: false,
    locked: true,
    description: 'Track admission dates and deadlines'
  }
]

const UserJourneyContext = createContext<UserJourneyContextType | undefined>(undefined)

export function UserJourneyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserJourneyState>({
    currentStep: 1,
    steps: initialSteps,
    userData: {},
    progress: 0
  })

  // Calculate progress based on completed steps
  useEffect(() => {
    const completedSteps = state.steps.filter(step => step.completed).length
    const progress = (completedSteps / state.steps.length) * 100
    setState(prev => ({ ...prev, progress }))
  }, [state.steps])

  // Unlock next step when current is completed
  useEffect(() => {
    const updatedSteps = state.steps.map(step => {
      if (step.id === state.currentStep + 1) {
        const previousStep = state.steps.find(s => s.id === state.currentStep)
        return { ...step, locked: !previousStep?.completed }
      }
      return step
    })
    
    if (JSON.stringify(updatedSteps) !== JSON.stringify(state.steps)) {
      setState(prev => ({ ...prev, steps: updatedSteps }))
    }
  }, [state.currentStep, state.steps])

  const updateStep = (stepId: number, completed: boolean) => {
    setState(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, completed } : step
      )
    }))
  }

  const setCurrentStep = (stepId: number) => {
    setState(prev => ({ ...prev, currentStep: stepId }))
  }

  const updateUserData = (data: any) => {
    setState(prev => ({
      ...prev,
      userData: { ...prev.userData, ...data }
    }))
  }

  const getNextStep = (): UserJourneyStep | null => {
    const nextStep = state.steps.find(step => step.id === state.currentStep + 1)
    return nextStep || null
  }

  const getPreviousStep = (): UserJourneyStep | null => {
    const previousStep = state.steps.find(step => step.id === state.currentStep - 1)
    return previousStep || null
  }

  // Persist state to localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('luminara-journey')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        setState(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Failed to load journey state:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('luminara-journey', JSON.stringify(state))
  }, [state])

  return (
    <UserJourneyContext.Provider value={{
      state,
      updateStep,
      setCurrentStep,
      updateUserData,
      getNextStep,
      getPreviousStep
    }}>
      {children}
    </UserJourneyContext.Provider>
  )
}

export function useUserJourney() {
  const context = useContext(UserJourneyContext)
  if (context === undefined) {
    throw new Error('useUserJourney must be used within a UserJourneyProvider')
  }
  return context
}