"use client"

import { useState } from "react"
import { Questionnaire } from "../components/Questionnaire"
import { Dashboard } from "../components/Dashboard"
import { WorkoutTimer } from "../components/WorkoutTimer"
import { DietPlan } from "../components/DietPlan"
import { FoodSuggestions } from "../components/FoodSuggestions"
import { WeeklyFeedback } from "../components/WeeklyFeedback"
import { PricingModal } from "../components/PricingModal"
import { Activity, Apple, Timer, User, UtensilsCrossed, MessageSquare, Crown } from "lucide-react"

export type UserProfile = {
  name: string
  age: number
  weight: number
  height: number
  goal: "lose" | "maintain" | "gain"
  targetWeight: number
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "veryActive"
  useOzempic: boolean
  dietaryRestrictions: string[]
  exercisePreference: "home" | "gym" | "outdoor" | "mixed"
}

export default function AppPage() {
  const [step, setStep] = useState<"questionnaire" | "dashboard">("questionnaire")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [activeView, setActiveView] = useState<"dashboard" | "workout" | "diet" | "foods" | "feedback">("dashboard")
  const [showPricing, setShowPricing] = useState(false)

  const handleQuestionnaireComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setStep("dashboard")
  }

  const handleUpdateWeight = (newWeight: number) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, weight: newWeight })
    }
  }

  if (step === "questionnaire") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-emerald-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-2 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  FitLife Pro
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Olá, {userProfile?.name}!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPricing(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
              >
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Premium</span>
              </button>
              <button
                onClick={() => {
                  setStep("questionnaire")
                  setUserProfile(null)
                }}
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                Refazer perfil
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto py-3">
            <button
              onClick={() => setActiveView("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeView === "dashboard"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView("workout")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeView === "workout"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Timer className="w-4 h-4" />
              <span className="text-sm font-medium">Treino</span>
            </button>
            <button
              onClick={() => setActiveView("diet")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeView === "diet"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Apple className="w-4 h-4" />
              <span className="text-sm font-medium">Dieta</span>
            </button>
            <button
              onClick={() => setActiveView("foods")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeView === "foods"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span className="text-sm font-medium">Alimentos</span>
            </button>
            <button
              onClick={() => setActiveView("feedback")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeView === "feedback"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Progresso</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeView === "dashboard" && userProfile && (
          <Dashboard profile={userProfile} />
        )}
        {activeView === "workout" && userProfile && (
          <WorkoutTimer profile={userProfile} />
        )}
        {activeView === "diet" && userProfile && (
          <DietPlan profile={userProfile} />
        )}
        {activeView === "foods" && userProfile && (
          <FoodSuggestions profile={userProfile} />
        )}
        {activeView === "feedback" && userProfile && (
          <WeeklyFeedback profile={userProfile} onUpdateWeight={handleUpdateWeight} />
        )}
      </main>

      {/* Pricing Modal */}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </div>
  )
}
