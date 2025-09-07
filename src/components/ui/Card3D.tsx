'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  glassEffect?: boolean
  hover3D?: boolean
  onClick?: () => void
  disabled?: boolean
  elevation?: 'low' | 'medium' | 'high'
}

export function Card3D({
  children,
  className,
  glassEffect = true,
  hover3D = true,
  onClick,
  disabled = false,
  elevation = 'medium'
}: Card3DProps) {
  const elevationClasses = {
    low: 'shadow-lg',
    medium: 'shadow-xl',
    high: 'shadow-2xl'
  }

  const baseClasses = cn(
    'relative rounded-2xl transition-all duration-300 ease-out transform-gpu',
    glassEffect ? 'glass-card' : 'bg-white/10 backdrop-blur-sm border border-white/20',
    elevationClasses[elevation],
    hover3D && !disabled && 'card-3d cursor-pointer',
    disabled && 'opacity-50 cursor-not-allowed',
    onClick && !disabled && 'hover:scale-105',
    className
  )

  const cardVariants = {
    initial: { opacity: 0, y: 20, rotateX: 0 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
  }

  const hoverVariant = hover3D && !disabled ? {
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
  } : undefined

  const tapVariant = onClick && !disabled ? {
    scale: 0.98,
    rotateX: -5,
  } : undefined

  return (
    <motion.div
      className={baseClasses}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={hoverVariant}
      whileTap={tapVariant}
      onClick={disabled ? undefined : onClick}
      style={{ perspective: '1000px' }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      {/* Glow Effect */}
      {hover3D && !disabled && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-luminara-vibrant-teal/20 to-luminara-warm-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-all duration-700 hover:left-full" />
      </div>
    </motion.div>
  )
}