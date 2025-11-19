"use client"

import { UserProfile } from "../page"
import { TrendingDown, Target, Activity, Calendar, Flame, Droplets } from "lucide-react"

type Props = {
  profile: UserProfile
}

export function Dashboard({ profile }: Props) {
  const calculateBMI = () => {
    const heightInMeters = profile.height / 100
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const calculateCalories = () => {
    // Fórmula de Harris-Benedict simplificada
    const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }
    const maintenance = bmr * activityMultipliers[profile.activityLevel]
    
    // Ajuste para objetivo
    if (profile.goal === "lose") {
      return Math.round(maintenance - 500) // Déficit de 500 calorias
    } else if (profile.goal === "gain") {
      return Math.round(maintenance + 300) // Superávit de 300 calorias
    }
    return Math.round(maintenance)
  }

  const weightDifference = Math.abs(profile.weight - profile.targetWeight)
  const estimatedWeeks = Math.ceil(weightDifference / 0.5) // 0.5kg por semana é saudável

  const bmi = calculateBMI()
  const dailyCalories = calculateCalories()

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Abaixo do peso", color: "text-blue-600 dark:text-blue-400" }
    if (bmi < 25) return { label: "Peso normal", color: "text-emerald-600 dark:text-emerald-400" }
    if (bmi < 30) return { label: "Sobrepeso", color: "text-yellow-600 dark:text-yellow-400" }
    return { label: "Obesidade", color: "text-red-600 dark:text-red-400" }
  }

  const bmiCategory = getBMICategory(parseFloat(bmi))

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Bem-vindo de volta, {profile.name}! 👋</h2>
        <p className="text-emerald-50 text-sm sm:text-base">
          Você está no caminho certo para alcançar seus objetivos!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Peso Atual */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {profile.weight} kg
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Peso Atual</div>
        </div>

        {/* Meta */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
              <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {profile.targetWeight} kg
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Peso Meta</div>
        </div>

        {/* IMC */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {bmi}
          </div>
          <div className={`text-sm font-medium ${bmiCategory.color}`}>
            {bmiCategory.label}
          </div>
        </div>

        {/* Calorias Diárias */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
              <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {dailyCalories}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Calorias/dia</div>
        </div>

        {/* Tempo Estimado */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {estimatedWeeks}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Semanas estimadas</div>
        </div>

        {/* Hidratação */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-cyan-100 dark:bg-cyan-900/30 p-3 rounded-lg">
              <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {Math.round(profile.weight * 35)} ml
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Água recomendada/dia</div>
        </div>
      </div>

      {/* Informações do Perfil */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Seu Perfil</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Objetivo</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {profile.goal === "lose" && "Perder peso"}
              {profile.goal === "maintain" && "Manter peso"}
              {profile.goal === "gain" && "Ganhar peso"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nível de Atividade</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {profile.activityLevel === "sedentary" && "Sedentário"}
              {profile.activityLevel === "light" && "Leve"}
              {profile.activityLevel === "moderate" && "Moderado"}
              {profile.activityLevel === "active" && "Ativo"}
              {profile.activityLevel === "veryActive" && "Muito Ativo"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Preferência de Exercício</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {profile.exercisePreference === "home" && "Em casa"}
              {profile.exercisePreference === "gym" && "Academia"}
              {profile.exercisePreference === "outdoor" && "Ao ar livre"}
              {profile.exercisePreference === "mixed" && "Misto"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Uso de Ozempic</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {profile.useOzempic ? "Sim" : "Não"}
            </div>
          </div>
          {profile.dietaryRestrictions && profile.dietaryRestrictions.length > 0 && (
            <div className="sm:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Restrições Alimentares</div>
              <div className="flex flex-wrap gap-2">
                {profile.dietaryRestrictions.map((restriction) => (
                  <span
                    key={restriction}
                    className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dicas */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">💡 Dicas para Hoje</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>Beba pelo menos {Math.round(profile.weight * 35)} ml de água hoje</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>Faça pelo menos 30 minutos de atividade física</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>Mantenha suas refeições dentro de {dailyCalories} calorias</span>
          </li>
          {profile.useOzempic && (
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>Lembre-se de tomar sua medicação conforme prescrito</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
