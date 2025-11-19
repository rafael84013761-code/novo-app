"use client"

import { UserProfile } from "../page"
import { Coffee, Sun, Moon, Apple, Salad, Pizza, Info } from "lucide-react"

type Props = {
  profile: UserProfile
}

type Meal = {
  name: string
  time: string
  calories: number
  foods: string[]
  icon: any
}

export function DietPlan({ profile }: Props) {
  const calculateCalories = () => {
    const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }
    const maintenance = bmr * activityMultipliers[profile.activityLevel]
    
    if (profile.goal === "lose") {
      return Math.round(maintenance - 500)
    } else if (profile.goal === "gain") {
      return Math.round(maintenance + 300)
    }
    return Math.round(maintenance)
  }

  const dailyCalories = calculateCalories()

  const getMeals = (): Meal[] => {
    const isVegetarian = profile.dietaryRestrictions?.includes("Vegetariano")
    const isVegan = profile.dietaryRestrictions?.includes("Vegano")
    const isLowCarb = profile.dietaryRestrictions?.includes("Low carb")
    const hasGlutenFree = profile.dietaryRestrictions?.includes("Sem glúten")
    const hasLactoseFree = profile.dietaryRestrictions?.includes("Sem lactose")

    // Ajuste de porções baseado em Ozempic (porções menores)
    const portionMultiplier = profile.useOzempic ? 0.7 : 1

    const breakfastCalories = Math.round((dailyCalories * 0.25) * portionMultiplier)
    const lunchCalories = Math.round((dailyCalories * 0.35) * portionMultiplier)
    const snackCalories = Math.round((dailyCalories * 0.15) * portionMultiplier)
    const dinnerCalories = Math.round((dailyCalories * 0.25) * portionMultiplier)

    let breakfastFoods = []
    let lunchFoods = []
    let snackFoods = []
    let dinnerFoods = []

    // Café da manhã
    if (isVegan) {
      breakfastFoods = [
        "Aveia com leite vegetal e frutas",
        "Pão integral com pasta de amendoim",
        "Suco verde detox",
      ]
    } else if (isVegetarian) {
      breakfastFoods = [
        hasLactoseFree ? "Ovos mexidos" : "Iogurte natural com granola",
        hasGlutenFree ? "Tapioca com queijo" : "Pão integral com queijo",
        "Frutas da estação",
      ]
    } else if (isLowCarb) {
      breakfastFoods = [
        "Ovos mexidos com queijo",
        "Abacate",
        "Café sem açúcar",
      ]
    } else {
      breakfastFoods = [
        hasGlutenFree ? "Tapioca" : "Pão integral",
        hasLactoseFree ? "Ovos" : "Iogurte com granola",
        "Frutas e café",
      ]
    }

    // Almoço
    if (isVegan) {
      lunchFoods = [
        "Arroz integral com feijão",
        "Salada verde variada",
        "Legumes grelhados",
        "Tofu ou grão de bico",
      ]
    } else if (isVegetarian) {
      lunchFoods = [
        isLowCarb ? "Salada completa" : "Arroz integral",
        "Feijão ou lentilha",
        "Legumes cozidos",
        hasLactoseFree ? "Ovos" : "Queijo branco",
      ]
    } else if (isLowCarb) {
      lunchFoods = [
        "Frango grelhado (150g)",
        "Salada verde à vontade",
        "Legumes no vapor",
        "Azeite extra virgem",
      ]
    } else {
      lunchFoods = [
        "Arroz integral (4 colheres)",
        "Feijão (1 concha)",
        "Frango ou peixe grelhado (120g)",
        "Salada verde",
        "Legumes cozidos",
      ]
    }

    // Lanche
    if (isVegan) {
      snackFoods = [
        "Mix de castanhas",
        "Frutas",
        "Barra de cereal vegana",
      ]
    } else if (isLowCarb) {
      snackFoods = [
        "Castanhas (30g)",
        hasLactoseFree ? "Ovo cozido" : "Queijo",
        "Café ou chá",
      ]
    } else {
      snackFoods = [
        "Frutas da estação",
        hasLactoseFree ? "Castanhas" : "Iogurte",
        hasGlutenFree ? "Tapioca" : "Biscoito integral",
      ]
    }

    // Jantar
    if (isVegan) {
      dinnerFoods = [
        "Sopa de legumes",
        "Salada com quinoa",
        "Tofu grelhado",
      ]
    } else if (isVegetarian) {
      dinnerFoods = [
        isLowCarb ? "Omelete de legumes" : "Sopa de legumes",
        "Salada verde",
        hasLactoseFree ? "Grão de bico" : "Queijo branco",
      ]
    } else if (isLowCarb) {
      dinnerFoods = [
        "Peixe ou frango grelhado",
        "Salada verde",
        "Legumes no vapor",
      ]
    } else {
      dinnerFoods = [
        "Sopa de legumes ou caldo",
        "Peixe ou frango grelhado (100g)",
        "Salada verde",
        hasGlutenFree ? "Batata doce" : "Pão integral (1 fatia)",
      ]
    }

    return [
      {
        name: "Café da Manhã",
        time: "07:00 - 08:00",
        calories: breakfastCalories,
        foods: breakfastFoods,
        icon: Coffee,
      },
      {
        name: "Almoço",
        time: "12:00 - 13:00",
        calories: lunchCalories,
        foods: lunchFoods,
        icon: Sun,
      },
      {
        name: "Lanche",
        time: "15:00 - 16:00",
        calories: snackCalories,
        foods: snackFoods,
        icon: Apple,
      },
      {
        name: "Jantar",
        time: "19:00 - 20:00",
        calories: dinnerCalories,
        foods: dinnerFoods,
        icon: Moon,
      },
    ]
  }

  const meals = getMeals()

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Salad className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Seu Plano Alimentar</h2>
            <p className="text-orange-100 text-sm sm:text-base">
              Meta diária: {dailyCalories} calorias
            </p>
          </div>
        </div>
        {profile.useOzempic && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Usando Ozempic</p>
                <p className="text-orange-100">
                  As porções foram ajustadas para serem menores, considerando a redução do apetite.
                  Mantenha-se hidratado e coma devagar.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {meals.map((meal, index) => {
          const Icon = meal.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-orange-400 to-pink-600 p-3 rounded-xl">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {meal.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{meal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {meal.calories}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">calorias</div>
                </div>
              </div>

              <div className="space-y-2">
                {meal.foods.map((food, foodIndex) => (
                  <div
                    key={foodIndex}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{food}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dietary Info */}
      {profile.dietaryRestrictions && profile.dietaryRestrictions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            Suas Restrições Alimentares
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.dietaryRestrictions.map((restriction) => (
              <span
                key={restriction}
                className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium"
              >
                {restriction}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          🥗 Dicas Nutricionais
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>Beba água antes das refeições para aumentar a saciedade</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>Mastigue devagar e aprecie cada refeição</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>Evite alimentos processados e bebidas açucaradas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>Prefira alimentos integrais e naturais</span>
          </li>
          {profile.useOzempic && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Coma porções menores e mais frequentes se necessário</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Evite alimentos muito gordurosos que podem causar desconforto</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Macros Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Distribuição de Macronutrientes
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {profile.dietaryRestrictions?.includes("Low carb") ? "20%" : "45%"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Carboidratos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
              {profile.dietaryRestrictions?.includes("Low carb") ? "40%" : "25%"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Proteínas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {profile.dietaryRestrictions?.includes("Low carb") ? "40%" : "30%"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Gorduras</div>
          </div>
        </div>
      </div>
    </div>
  )
}
