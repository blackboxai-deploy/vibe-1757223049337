import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { UserJourneyProvider } from "@/contexts/UserJourneyContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { FloatingNavigation } from "@/components/navigation/FloatingNavigation"
import { ProgressTracker } from "@/components/ui/ProgressTracker"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Luminara - AI-Powered Educational Guidance",
  description: "Transform your educational journey with AI-powered career guidance, psychometric assessments, and personalized learning paths.",
  keywords: ["education", "career guidance", "AI", "psychometric", "learning", "college", "career counseling"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-luminara-dark-slate via-luminara-deep-blue to-luminara-vibrant-teal font-inter antialiased">
        <AuthProvider>
          <UserJourneyProvider>
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              {/* Animated Geometric Shapes */}
              <div className="absolute top-20 left-20 w-32 h-32 bg-luminara-vibrant-teal/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute top-1/3 right-20 w-24 h-24 bg-luminara-warm-accent/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-luminara-soft-blue/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
              
              {/* Gradient Particles */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luminara-vibrant-teal/5 to-transparent animate-pulse"></div>
            </div>

            {/* Floating Navigation */}
            <FloatingNavigation />
            
            {/* Progress Tracker */}
            <ProgressTracker />
            
            {/* Main Content */}
            <main className="relative z-10">
              {children}
            </main>

            {/* Global 3D Cursor Effects */}
            <div id="cursor-glow" className="fixed pointer-events-none z-50 w-8 h-8 bg-luminara-vibrant-teal/30 rounded-full blur-md transition-all duration-300 ease-out"></div>
          </UserJourneyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}