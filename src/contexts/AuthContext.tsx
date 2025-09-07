'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  provider?: 'google' | 'email'
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType {
  state: AuthState
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem('luminara-user')
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setState({
            user,
            isLoading: false,
            isAuthenticated: true
          })
        } else {
          setState(prev => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error('Failed to load user session:', error)
        setState(prev => ({ ...prev, isLoading: false }))
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const user: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        provider: 'email',
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('luminara-user', JSON.stringify(user))
      setState({
        user,
        isLoading: false,
        isAuthenticated: true
      })

      return true
    } catch (error) {
      console.error('Login failed:', error)
      setState(prev => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock Google user data
      const user: User = {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7c4e8037-3c49-4307-9e76-612c38f7ae2d.png',
        provider: 'google',
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('luminara-user', JSON.stringify(user))
      setState({
        user,
        isLoading: false,
        isAuthenticated: true
      })

      return true
    } catch (error) {
      console.error('Google login failed:', error)
      setState(prev => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      const user: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        provider: 'email',
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('luminara-user', JSON.stringify(user))
      setState({
        user,
        isLoading: false,
        isAuthenticated: true
      })

      return true
    } catch (error) {
      console.error('Registration failed:', error)
      setState(prev => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('luminara-user')
    localStorage.removeItem('luminara-journey')
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    })
  }

  const updateProfile = (data: Partial<User>) => {
    if (!state.user) return

    const updatedUser = { ...state.user, ...data }
    localStorage.setItem('luminara-user', JSON.stringify(updatedUser))
    setState(prev => ({
      ...prev,
      user: updatedUser
    }))
  }

  return (
    <AuthContext.Provider value={{
      state,
      login,
      loginWithGoogle,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}