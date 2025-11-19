"use client"

import { useState } from "react"
import { UserProfile } from "../page"
import { ChevronRight, ChevronLeft, Pill, User, Target, Activity, Utensils } from "lucide-react"

type Props = {
  onComplete: (profile: UserProfile) => void
}

export function Questionnaire({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    dietaryRestrictions: [],
  })

  const steps = [
    {
      title: "Informações Básicas",
      icon: User,
      fields: (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seu nome
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Idade
              </label>
              <input
                type="number"
                value={formData.age || ""}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Ex: 30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Altura (cm)
              </label>
              <input
                type="number"
                value={formData.height || ""}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Ex: 170"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peso atual (kg)
              </label>
              <input
                type="number"
                value={formData.weight || ""}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Ex: 75"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peso desejado (kg)
              </label>
              <input
                type="number"
                value={formData.targetWeight || ""}
                onChange={(e) => setFormData({ ...formData, targetWeight: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Ex: 65"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Seu Objetivo",
      icon: Target,
      fields: (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Qual é o seu objetivo principal?
          </label>
          {[
            { value: "lose", label: "Perder peso", emoji: "🎯" },
            { value: "maintain", label: "Manter peso", emoji: "⚖️" },
            { value: "gain", label: "Ganhar peso", emoji: "💪" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFormData({ ...formData, goal: option.value as any })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                formData.goal === option.value
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700"
              }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{option.label}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Nível de Atividade",
      icon: Activity,
      fields: (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Qual é o seu nível de atividade física?
          </label>
          {[
            { value: "sedentary", label: "Sedentário", desc: "Pouco ou nenhum exercício" },
            { value: "light", label: "Leve", desc: "Exercício 1-3 dias/semana" },
            { value: "moderate", label: "Moderado", desc: "Exercício 3-5 dias/semana" },
            { value: "active", label: "Ativo", desc: "Exercício 6-7 dias/semana" },
            { value: "veryActive", label: "Muito Ativo", desc: "Exercício intenso diariamente" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFormData({ ...formData, activityLevel: option.value as any })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                formData.activityLevel === option.value
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700"
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{option.label}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Preferência de Exercício",
      icon: Activity,
      fields: (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Onde você prefere se exercitar?
          </label>
          {[
            { value: "home", label: "Em casa", emoji: "🏠" },
            { value: "gym", label: "Academia", emoji: "🏋️" },
            { value: "outdoor", label: "Ao ar livre", emoji: "🌳" },
            { value: "mixed", label: "Misto", emoji: "🔄" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFormData({ ...formData, exercisePreference: option.value as any })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                formData.exercisePreference === option.value
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700"
              }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{option.label}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Medicação e Dieta",
      icon: Pill,
      fields: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Você usa ou pretende usar Ozempic?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFormData({ ...formData, useOzempic: true })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.useOzempic === true
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700"
                }`}
              >
                <div className="text-2xl mb-2">💉</div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Sim</div>
              </button>
              <button
                onClick={() => setFormData({ ...formData, useOzempic: false })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.useOzempic === false
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700"
                }`}
              >
                <div className="text-2xl mb-2">🚫</div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Não</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Restrições alimentares (opcional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Vegetariano", "Vegano", "Sem glúten", "Sem lactose", "Low carb", "Diabetes"].map((restriction) => (
                <button
                  key={restriction}
                  onClick={() => {
                    const current = formData.dietaryRestrictions || []
                    const updated = current.includes(restriction)
                      ? current.filter((r) => r !== restriction)
                      : [...current, restriction]
                    setFormData({ ...formData, dietaryRestrictions: updated })
                  }}
                  className={`p-3 rounded-lg border transition-all text-sm ${
                    formData.dietaryRestrictions?.includes(restriction)
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-700"
                  }`}
                >
                  {restriction}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.age && formData.height && formData.weight && formData.targetWeight
      case 1:
        return formData.goal
      case 2:
        return formData.activityLevel
      case 3:
        return formData.exercisePreference
      case 4:
        return formData.useOzempic !== undefined
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData as UserProfile)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Passo {currentStep + 1} de {steps.length}
            </span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-3 rounded-xl">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {currentStepData.title}
            </h2>
          </div>

          <div className="mb-8">{currentStepData.fields}</div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-emerald-400 to-teal-600 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              {currentStep < steps.length - 1 ? "Próximo" : "Começar"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
