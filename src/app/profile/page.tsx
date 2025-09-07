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
import { Textarea } from '@/components/ui/textarea'

interface ProfileData {
  personalInfo: {
    fullName: string
    dateOfBirth: string
    phone: string
    location: string
    avatar?: string
  }
  academic: {
    currentEducation: string
    institution: string
    grade: string
    subjects: string[]
  }
  interests: {
    hobbies: string[]
    preferredActivities: string[]
    personalityTraits: string[]
  }
  career: {
    dreamJob: string
    workEnvironment: string
    salaryExpectation: string
    jobSecurity: string
  }
  skills: {
    technical: string[]
    soft: string[]
    languages: string[]
  }
}

const initialProfileData: ProfileData = {
  personalInfo: {
    fullName: '',
    dateOfBirth: '',
    phone: '',
    location: '',
  },
  academic: {
    currentEducation: '',
    institution: '',
    grade: '',
    subjects: [],
  },
  interests: {
    hobbies: [],
    preferredActivities: [],
    personalityTraits: [],
  },
  career: {
    dreamJob: '',
    workEnvironment: '',
    salaryExpectation: '',
    jobSecurity: '',
  },
  skills: {
    technical: [],
    soft: [],
    languages: [],
  }
}

const categories = [
  { id: 'personal', name: 'Personal Information', icon: '👤' },
  { id: 'academic', name: 'Academic Background', icon: '🎓' },
  { id: 'interests', name: 'Interests & Hobbies', icon: '❤️' },
  { id: 'career', name: 'Career Aspirations', icon: '🎯' },
  { id: 'skills', name: 'Skills Assessment', icon: '⚡' }
]

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const router = useRouter()
  const { state: authState } = useAuth()
  const { updateStep, setCurrentStep: setJourneyStep, updateUserData } = useUserJourney()

  // Redirect if not authenticated
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push('/auth')
    }
  }, [authState, router])

  const calculateProgress = () => {
    const totalSteps = categories.length
    return Math.round((completedSteps.size / totalSteps) * 100)
  }

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    updateUserData({ profile: profileData })
    updateStep(3, true)
    setJourneyStep(4)
    router.push('/roadmap')
  }

  const handleInputChange = (section: keyof ProfileData, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))

    // Mark step as completed if required fields are filled
    if (value.trim()) {
      setCompletedSteps(prev => new Set([...prev, currentStep]))
    }
  }

  const handleArrayInput = (section: keyof ProfileData, field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean)
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: items
      }
    }))

    if (items.length > 0) {
      setCompletedSteps(prev => new Set([...prev, currentStep]))
    }
  }

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            avatar: e.target?.result as string
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Avatar Upload */}
      <div className="text-center">
        <div
          className={`relative w-32 h-32 mx-auto mb-4 border-2 border-dashed rounded-full transition-all ${
            dragOver ? 'border-luminara-vibrant-teal bg-luminara-vibrant-teal/10' : 'border-gray-600'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
        >
          {profileData.personalInfo.avatar ? (
            <img
              src={profileData.personalInfo.avatar}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-xs text-gray-400">Drop photo here</p>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-400">Max 5MB, JPG/PNG</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Full Name</Label>
          <Input
            value={profileData.personalInfo.fullName}
            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label className="text-gray-300">Date of Birth</Label>
          <Input
            type="date"
            value={profileData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Phone Number</Label>
          <Input
            value={profileData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <Label className="text-gray-300">Location</Label>
          <Input
            value={profileData.personalInfo.location}
            onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
            placeholder="City, State, Country"
          />
        </div>
      </div>
    </div>
  )

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Current Education Level</Label>
          <select
            value={profileData.academic.currentEducation}
            onChange={(e) => handleInputChange('academic', 'currentEducation', e.target.value)}
            className="w-full bg-white/10 border border-gray-600 rounded-md px-3 py-2 text-white"
          >
            <option value="">Select education level</option>
            <option value="high-school">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </div>
        <div>
          <Label className="text-gray-300">Institution Name</Label>
          <Input
            value={profileData.academic.institution}
            onChange={(e) => handleInputChange('academic', 'institution', e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
            placeholder="School/College/University name"
          />
        </div>
        <div>
          <Label className="text-gray-300">Current Grade/CGPA</Label>
          <Input
            value={profileData.academic.grade}
            onChange={(e) => handleInputChange('academic', 'grade', e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
            placeholder="e.g., 3.8 GPA or 85%"
          />
        </div>
        <div>
          <Label className="text-gray-300">Subjects/Majors</Label>
          <Input
            onChange={(e) => handleArrayInput('academic', 'subjects', e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
            placeholder="Math, Physics, Chemistry (comma separated)"
          />
        </div>
      </div>
    </div>
  )

  const renderInterests = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-gray-300">Hobbies & Interests</Label>
        <Textarea
          onChange={(e) => handleArrayInput('interests', 'hobbies', e.target.value)}
          className="bg-white/10 border-gray-600 text-white"
          placeholder="Reading, Gaming, Sports, Music, etc. (comma separated)"
          rows={3}
        />
      </div>
      <div>
        <Label className="text-gray-300">Preferred Activities</Label>
        <Textarea
          onChange={(e) => handleArrayInput('interests', 'preferredActivities', e.target.value)}
          className="bg-white/10 border-gray-600 text-white"
          placeholder="Team projects, Solo work, Creative tasks, etc. (comma separated)"
          rows={3}
        />
      </div>
      <div>
        <Label className="text-gray-300">Personality Traits</Label>
        <Textarea
          onChange={(e) => handleArrayInput('interests', 'personalityTraits', e.target.value)}
          className="bg-white/10 border-gray-600 text-white"
          placeholder="Analytical, Creative, Leadership, Empathetic, etc. (comma separated)"
          rows={3}
        />
      </div>
    </div>
  )

  const renderCareerAspirations = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-gray-300">Dream Job/Career</Label>
        <Input
          value={profileData.career.dreamJob}
          onChange={(e) => handleInputChange('career', 'dreamJob', e.target.value)}
          className="bg-white/10 border-gray-600 text-white"
          placeholder="Software Engineer, Doctor, Artist, etc."
        />
      </div>
      <div>
        <Label className="text-gray-300">Preferred Work Environment</Label>
        <select
          value={profileData.career.workEnvironment}
          onChange={(e) => handleInputChange('career', 'workEnvironment', e.target.value)}
          className="w-full bg-white/10 border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          <option value="">Select work environment</option>
          <option value="office">Office Environment</option>
          <option value="remote">Remote Work</option>
          <option value="hybrid">Hybrid Work</option>
          <option value="fieldwork">Field Work</option>
          <option value="lab">Laboratory</option>
          <option value="creative">Creative Studio</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Salary Expectation</Label>
          <select
            value={profileData.career.salaryExpectation}
            onChange={(e) => handleInputChange('career', 'salaryExpectation', e.target.value)}
            className="w-full bg-white/10 border border-gray-600 rounded-md px-3 py-2 text-white"
          >
            <option value="">Select range</option>
            <option value="entry">Entry Level ($30k-50k)</option>
            <option value="mid">Mid Level ($50k-80k)</option>
            <option value="senior">Senior Level ($80k-120k)</option>
            <option value="executive">Executive Level ($120k+)</option>
          </select>
        </div>
        <div>
          <Label className="text-gray-300">Job Security Importance</Label>
          <select
            value={profileData.career.jobSecurity}
            onChange={(e) => handleInputChange('career', 'jobSecurity', e.target.value)}
            className="w-full bg-white/10 border border-gray-600 rounded-md px-3 py-2 text-white"
          >
            <option value="">Select importance</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="critical">Critical Priority</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderSkillsAssessment = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-gray-300">Technical Skills</Label>
        <Textarea
          onChange={(e) => handleArrayInput('skills', 'technical', e.target.value)}
          className="bg-white/10 border-gray-600 text-white"
          placeholder="Programming, Design, Data Analysis, etc. (comma separated)"
          rows={3}
        />
      </div>
      <div>
        <Label className="text-gray-300">Soft Skills</Label>
        <Textarea
          onChange={(e) => handleArrayInput('skills', 'soft', e.target.value)}
          className="bg-white/10 border-gray-600 text-white"
          placeholder="Communication, Leadership, Problem-solving, etc. (comma separated)"
          rows={3}
        />
      </div>
      <div>
        <Label className="text-gray-300">Languages</Label>
        <Textarea
          onChange={(e) => handleArrayInput('skills', 'languages', e.target.value)}
          className="bg-white/10 border-gray-600 text-white"
          placeholder="English, Spanish, French, etc. (comma separated)"
          rows={2}
        />
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderPersonalInfo()
      case 1: return renderAcademicInfo()
      case 2: return renderInterests()
      case 3: return renderCareerAspirations()
      case 4: return renderSkillsAssessment()
      default: return null
    }
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white font-poppins mb-4">
          Complete Your Profile
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Help us understand you better to provide personalized career guidance
        </p>
        <div className="mt-4">
          <span className="text-luminara-vibrant-teal font-semibold">
            {calculateProgress()}% Complete - {completedSteps.size} of {categories.length} sections
          </span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-luminara-vibrant-teal to-luminara-warm-accent"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Category Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setCurrentStep(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                currentStep === index
                  ? 'bg-luminara-vibrant-teal text-white'
                  : completedSteps.has(index)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              {completedSteps.has(index) && <span>✓</span>}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card3D className="p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={currentStep}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">{categories[currentStep].icon}</span>
              {categories[currentStep].name}
            </h2>
            
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50"
            >
              Previous
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {categories.length}
              </span>
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-luminara-vibrant-teal to-luminara-warm-accent hover:from-luminara-warm-accent hover:to-luminara-vibrant-teal"
            >
              {currentStep === categories.length - 1 ? 'Complete Profile' : 'Next'}
            </Button>
          </div>

          {/* Save Progress Note */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Your progress is automatically saved as you complete each section</p>
          </div>
        </Card3D>
      </div>
    </div>
  )
}