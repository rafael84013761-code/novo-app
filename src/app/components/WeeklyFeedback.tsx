"use client"

import { useState, useEffect } from "react"
import { UserProfile } from "../page"
import { Calendar, TrendingDown, TrendingUp, MessageSquare, CheckCircle, AlertCircle, Sparkles } from "lucide-react"

type FeedbackEntry = {
  week: number
  date: string
  currentWeight: number
  energyLevel: number // 1-5
  adherenceDiet: number // 1-5
  adherenceExercise: number // 1-5
  challenges: string
  achievements: string
  mood: "great" | "good" | "neutral" | "bad"
}

type Props = {
  profile: UserProfile
  onUpdateWeight: (newWeight: number) => void
}

export function WeeklyFeedback({ profile, onUpdateWeight }: Props) {
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackEntry[]>([])
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState<Partial<FeedbackEntry>>({
    currentWeight: profile.weight,
    energyLevel: 3,
    adherenceDiet: 3,
    adherenceExercise: 3,
    challenges: "",
    achievements: "",
    mood: "good",
  })

  // Verificar se é hora de solicitar feedback (a cada 7 dias)
  useEffect(() => {
    const lastFeedback = feedbackHistory[feedbackHistory.length - 1]
    if (!lastFeedback) {
      // Primeira vez - mostrar após 7 dias
      const savedDate = localStorage.getItem("fitlife_start_date")
      if (savedDate) {
        const startDate = new Date(savedDate)
        const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        if (daysSinceStart >= 7) {
          setShowFeedbackForm(true)
        }
      } else {
        localStorage.setItem("fitlife_start_date", new Date().toISOString())
      }
    } else {
      // Verificar se passaram 7 dias desde o último feedback
      const lastDate = new Date(lastFeedback.date)
      const daysSinceLast = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
      if (daysSinceLast >= 7) {
        setShowFeedbackForm(true)
      }
    }

    // Carregar histórico do localStorage
    const saved = localStorage.getItem("fitlife_feedback_history")
    if (saved) {
      setFeedbackHistory(JSON.parse(saved))
    }
  }, [feedbackHistory])

  const handleSubmitFeedback = () => {
    const newEntry: FeedbackEntry = {
      week: feedbackHistory.length + 1,
      date: new Date().toISOString(),
      currentWeight: currentFeedback.currentWeight || profile.weight,
      energyLevel: currentFeedback.energyLevel || 3,
      adherenceDiet: currentFeedback.adherenceDiet || 3,
      adherenceExercise: currentFeedback.adherenceExercise || 3,
      challenges: currentFeedback.challenges || "",
      achievements: currentFeedback.achievements || "",
      mood: currentFeedback.mood || "good",
    }

    const updated = [...feedbackHistory, newEntry]
    setFeedbackHistory(updated)
    localStorage.setItem("fitlife_feedback_history", JSON.stringify(updated))
    
    // Atualizar peso do perfil
    onUpdateWeight(newEntry.currentWeight)
    
    setShowFeedbackForm(false)
    setCurrentFeedback({
      currentWeight: newEntry.currentWeight,
      energyLevel: 3,
      adherenceDiet: 3,
      adherenceExercise: 3,
      challenges: "",
      achievements: "",
      mood: "good",
    })
  }

  const calculateProgress = () => {
    if (feedbackHistory.length === 0) return null
    
    const firstWeight = feedbackHistory[0].currentWeight
    const currentWeight = feedbackHistory[feedbackHistory.length - 1].currentWeight
    const weightChange = firstWeight - currentWeight
    const progressPercentage = ((weightChange / Math.abs(profile.weight - profile.targetWeight)) * 100).toFixed(1)
    
    return {
      weightChange,
      progressPercentage: parseFloat(progressPercentage),
      isPositive: profile.goal === "lose" ? weightChange > 0 : weightChange < 0,
    }
  }

  const getMotivationalMessage = () => {
    const progress = calculateProgress()
    if (!progress) return "Comece sua jornada registrando seu primeiro feedback semanal!"
    
    if (progress.isPositive && progress.progressPercentage > 50) {
      return "🎉 Incrível! Você já passou da metade do caminho! Continue assim!"
    } else if (progress.isPositive && progress.progressPercentage > 25) {
      return "💪 Ótimo progresso! Você está no caminho certo!"
    } else if (progress.isPositive) {
      return "🌟 Cada passo conta! Continue firme no seu objetivo!"
    } else {
      return "💙 Não desanime! Ajustes fazem parte do processo. Vamos juntos!"
    }
  }

  const progress = calculateProgress()

  return (
    <div className="space-y-6">
      {/* Motivational Banner */}
      <div className="bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Acompanhamento Semanal</h2>
            <p className="text-purple-50 text-sm sm:text-base">{getMotivationalMessage()}</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      {progress && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              {progress.isPositive ? (
                <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">Mudança de Peso</span>
            </div>
            <div className={`text-2xl font-bold ${progress.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {progress.weightChange > 0 ? "-" : "+"}{Math.abs(progress.weightChange).toFixed(1)} kg
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Progresso</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {Math.abs(progress.progressPercentage)}%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Semanas</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {feedbackHistory.length}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-emerald-500 dark:border-emerald-600">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
              <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Feedback da Semana {feedbackHistory.length + 1}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Como foi sua semana? Compartilhe seu progresso!
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Peso Atual */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peso Atual (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={currentFeedback.currentWeight}
                onChange={(e) => setCurrentFeedback({ ...currentFeedback, currentWeight: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Nível de Energia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nível de Energia (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCurrentFeedback({ ...currentFeedback, energyLevel: level })}
                    className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                      currentFeedback.energyLevel === level
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Aderência à Dieta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aderência à Dieta (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCurrentFeedback({ ...currentFeedback, adherenceDiet: level })}
                    className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                      currentFeedback.adherenceDiet === level
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Aderência aos Exercícios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aderência aos Exercícios (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCurrentFeedback({ ...currentFeedback, adherenceExercise: level })}
                    className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                      currentFeedback.adherenceExercise === level
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Humor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Como você se sente?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "great", label: "Ótimo", emoji: "😄" },
                  { value: "good", label: "Bem", emoji: "🙂" },
                  { value: "neutral", label: "Neutro", emoji: "😐" },
                  { value: "bad", label: "Difícil", emoji: "😔" },
                ].map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setCurrentFeedback({ ...currentFeedback, mood: mood.value as any })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      currentFeedback.mood === mood.value
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desafios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Desafios da Semana (opcional)
              </label>
              <textarea
                value={currentFeedback.challenges}
                onChange={(e) => setCurrentFeedback({ ...currentFeedback, challenges: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 resize-none"
                rows={3}
                placeholder="O que foi difícil esta semana?"
              />
            </div>

            {/* Conquistas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Conquistas da Semana (opcional)
              </label>
              <textarea
                value={currentFeedback.achievements}
                onChange={(e) => setCurrentFeedback({ ...currentFeedback, achievements: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 resize-none"
                rows={3}
                placeholder="Do que você se orgulha esta semana?"
              />
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Depois
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback History */}
      {feedbackHistory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Histórico de Feedbacks</h3>
          <div className="space-y-4">
            {feedbackHistory.slice().reverse().map((entry) => (
              <div
                key={entry.week}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                        Semana {entry.week}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {entry.currentWeight} kg
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Energia</div>
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{entry.energyLevel}/5</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Dieta</div>
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{entry.adherenceDiet}/5</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Exercício</div>
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{entry.adherenceExercise}/5</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Humor</div>
                    <div className="text-lg">
                      {entry.mood === "great" && "😄"}
                      {entry.mood === "good" && "🙂"}
                      {entry.mood === "neutral" && "😐"}
                      {entry.mood === "bad" && "😔"}
                    </div>
                  </div>
                </div>

                {(entry.achievements || entry.challenges) && (
                  <div className="space-y-2 text-sm">
                    {entry.achievements && (
                      <div>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">Conquistas: </span>
                        <span className="text-gray-700 dark:text-gray-300">{entry.achievements}</span>
                      </div>
                    )}
                    {entry.challenges && (
                      <div>
                        <span className="font-medium text-orange-600 dark:text-orange-400">Desafios: </span>
                        <span className="text-gray-700 dark:text-gray-300">{entry.challenges}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Trigger Button */}
      {!showFeedbackForm && (
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-400 to-pink-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          Adicionar Feedback Semanal
        </button>
      )}
    </div>
  )
}
