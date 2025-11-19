"use client"

import { UserProfile } from "../page"
import { Leaf, Drumstick, Fish, Milk, Wheat, Apple as AppleIcon, Carrot, Egg, Flame, TrendingDown, Target } from "lucide-react"

type Props = {
  profile: UserProfile
}

type FoodCategory = {
  name: string
  icon: any
  foods: {
    name: string
    calories: string
    benefits: string
    portion: string
  }[]
}

export function FoodSuggestions({ profile }: Props) {
  const getGoalTitle = () => {
    if (profile.goal === "lose") return "Alimentos para Perder Peso"
    if (profile.goal === "gain") return "Alimentos para Ganhar Peso"
    return "Alimentos para Manter o Peso"
  }

  const getGoalIcon = () => {
    if (profile.goal === "lose") return TrendingDown
    if (profile.goal === "gain") return Flame
    return Target
  }

  const getGoalColor = () => {
    if (profile.goal === "lose") return "from-blue-400 to-cyan-600"
    if (profile.goal === "gain") return "from-orange-400 to-red-600"
    return "from-emerald-400 to-teal-600"
  }

  const getFoodCategories = (): FoodCategory[] => {
    const isVegetarian = profile.dietaryRestrictions?.includes("Vegetariano")
    const isVegan = profile.dietaryRestrictions?.includes("Vegano")
    const isLowCarb = profile.dietaryRestrictions?.includes("Low carb")
    const hasGlutenFree = profile.dietaryRestrictions?.includes("Sem glúten")
    const hasLactoseFree = profile.dietaryRestrictions?.includes("Sem lactose")

    const categories: FoodCategory[] = []

    // Proteínas
    if (!isVegan) {
      const proteinFoods = []
      
      if (!isVegetarian) {
        proteinFoods.push(
          {
            name: "Peito de Frango",
            calories: "165 kcal/100g",
            benefits: "Alto teor proteico, baixo em gordura",
            portion: "120-150g por refeição"
          },
          {
            name: "Peixe (Tilápia, Salmão)",
            calories: "120-200 kcal/100g",
            benefits: "Ômega-3, proteína de qualidade",
            portion: "120-150g por refeição"
          },
          {
            name: "Carne Vermelha Magra",
            calories: "250 kcal/100g",
            benefits: "Ferro, vitamina B12, proteína",
            portion: profile.goal === "lose" ? "80-100g" : "120-150g"
          }
        )
      }

      proteinFoods.push(
        {
          name: "Ovos",
          calories: "70 kcal/unidade",
          benefits: "Proteína completa, vitaminas",
          portion: profile.goal === "lose" ? "2-3 ovos" : "3-4 ovos"
        }
      )

      if (!hasLactoseFree) {
        proteinFoods.push(
          {
            name: "Queijo Cottage",
            calories: "98 kcal/100g",
            benefits: "Alto em proteína, baixo em gordura",
            portion: "100-150g"
          },
          {
            name: "Iogurte Grego Natural",
            calories: "59 kcal/100g",
            benefits: "Probióticos, proteína",
            portion: "150-200g"
          }
        )
      }

      categories.push({
        name: "Proteínas",
        icon: Drumstick,
        foods: proteinFoods
      })
    }

    // Proteínas Vegetais
    if (isVegetarian || isVegan) {
      categories.push({
        name: "Proteínas Vegetais",
        icon: Leaf,
        foods: [
          {
            name: "Tofu",
            calories: "76 kcal/100g",
            benefits: "Proteína completa, baixo em calorias",
            portion: "150-200g"
          },
          {
            name: "Grão de Bico",
            calories: "164 kcal/100g",
            benefits: "Fibras, proteína vegetal",
            portion: "100-150g cozido"
          },
          {
            name: "Lentilha",
            calories: "116 kcal/100g",
            benefits: "Ferro, proteína, fibras",
            portion: "100-150g cozida"
          },
          {
            name: "Quinoa",
            calories: "120 kcal/100g",
            benefits: "Proteína completa, aminoácidos",
            portion: "80-100g cozida"
          },
          {
            name: "Edamame",
            calories: "122 kcal/100g",
            benefits: "Proteína, antioxidantes",
            portion: "100-150g"
          }
        ]
      })
    }

    // Carboidratos (se não for low carb)
    if (!isLowCarb) {
      const carbFoods = []

      if (!hasGlutenFree) {
        carbFoods.push(
          {
            name: "Aveia",
            calories: "68 kcal/30g",
            benefits: "Fibras, energia sustentada",
            portion: profile.goal === "lose" ? "30-40g" : "50-60g"
          },
          {
            name: "Pão Integral",
            calories: "69 kcal/fatia",
            benefits: "Fibras, vitaminas do complexo B",
            portion: profile.goal === "lose" ? "1-2 fatias" : "2-3 fatias"
          }
        )
      }

      carbFoods.push(
        {
          name: "Batata Doce",
          calories: "86 kcal/100g",
          benefits: "Vitamina A, fibras, energia",
          portion: profile.goal === "lose" ? "100-150g" : "150-200g"
        },
        {
          name: "Arroz Integral",
          calories: "111 kcal/100g cozido",
          benefits: "Fibras, magnésio",
          portion: profile.goal === "lose" ? "3-4 colheres" : "5-6 colheres"
        },
        {
          name: "Mandioca/Aipim",
          calories: "125 kcal/100g",
          benefits: "Energia, sem glúten",
          portion: profile.goal === "lose" ? "80-100g" : "120-150g"
        }
      )

      categories.push({
        name: "Carboidratos Saudáveis",
        icon: Wheat,
        foods: carbFoods
      })
    }

    // Gorduras Boas
    const fatFoods = [
      {
        name: "Abacate",
        calories: "160 kcal/100g",
        benefits: "Gorduras monoinsaturadas, fibras",
        portion: profile.goal === "lose" ? "1/4 unidade" : "1/2 unidade"
      },
      {
        name: "Castanhas e Nozes",
        calories: "607 kcal/100g",
        benefits: "Ômega-3, vitamina E",
        portion: profile.goal === "lose" ? "20-30g" : "30-40g"
      },
      {
        name: "Azeite Extra Virgem",
        calories: "884 kcal/100ml",
        benefits: "Antioxidantes, gorduras saudáveis",
        portion: "1-2 colheres de sopa"
      },
      {
        name: "Semente de Chia",
        calories: "486 kcal/100g",
        benefits: "Ômega-3, fibras",
        portion: "1-2 colheres de sopa"
      },
      {
        name: "Amendoim Natural",
        calories: "567 kcal/100g",
        benefits: "Proteína, gorduras boas",
        portion: profile.goal === "lose" ? "20-30g" : "30-40g"
      }
    ]

    categories.push({
      name: "Gorduras Saudáveis",
      icon: Fish,
      foods: fatFoods
    })

    // Frutas
    const fruitFoods = [
      {
        name: "Banana",
        calories: "89 kcal/unidade média",
        benefits: "Potássio, energia rápida",
        portion: profile.goal === "lose" ? "1 unidade" : "1-2 unidades"
      },
      {
        name: "Maçã",
        calories: "52 kcal/unidade média",
        benefits: "Fibras, antioxidantes",
        portion: "1-2 unidades"
      },
      {
        name: "Morango",
        calories: "32 kcal/100g",
        benefits: "Vitamina C, baixa caloria",
        portion: "150-200g"
      },
      {
        name: "Melancia",
        calories: "30 kcal/100g",
        benefits: "Hidratação, baixa caloria",
        portion: "200-300g"
      },
      {
        name: "Mamão",
        calories: "43 kcal/100g",
        benefits: "Digestão, vitamina A",
        portion: "150-200g"
      },
      {
        name: "Abacaxi",
        calories: "50 kcal/100g",
        benefits: "Bromelina, digestão",
        portion: "150-200g"
      }
    ]

    categories.push({
      name: "Frutas",
      icon: AppleIcon,
      foods: fruitFoods
    })

    // Vegetais
    const veggieFoods = [
      {
        name: "Brócolis",
        calories: "34 kcal/100g",
        benefits: "Vitaminas C e K, fibras",
        portion: "À vontade"
      },
      {
        name: "Espinafre",
        calories: "23 kcal/100g",
        benefits: "Ferro, antioxidantes",
        portion: "À vontade"
      },
      {
        name: "Couve",
        calories: "49 kcal/100g",
        benefits: "Cálcio, vitaminas",
        portion: "À vontade"
      },
      {
        name: "Tomate",
        calories: "18 kcal/100g",
        benefits: "Licopeno, vitamina C",
        portion: "À vontade"
      },
      {
        name: "Cenoura",
        calories: "41 kcal/100g",
        benefits: "Vitamina A, betacaroteno",
        portion: "À vontade"
      },
      {
        name: "Abobrinha",
        calories: "17 kcal/100g",
        benefits: "Baixa caloria, fibras",
        portion: "À vontade"
      }
    ]

    categories.push({
      name: "Vegetais",
      icon: Carrot,
      foods: veggieFoods
    })

    return categories
  }

  const categories = getFoodCategories()
  const GoalIcon = getGoalIcon()

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className={`bg-gradient-to-br ${getGoalColor()} rounded-2xl p-6 sm:p-8 text-white shadow-xl`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <GoalIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{getGoalTitle()}</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Alimentos recomendados para seu objetivo
            </p>
          </div>
        </div>
        
        {profile.useOzempic && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
            <p className="text-sm">
              💊 <strong>Usando Ozempic:</strong> Prefira alimentos leves e de fácil digestão. 
              Evite gorduras em excesso que podem causar desconforto.
            </p>
          </div>
        )}
      </div>

      {/* Goal-specific tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          💡 Dicas para seu Objetivo
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {profile.goal === "lose" && (
            <>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Priorize proteínas magras e vegetais para aumentar saciedade</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Controle porções de carboidratos e gorduras</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Evite alimentos processados e açúcares refinados</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Beba bastante água ao longo do dia</span>
              </p>
            </>
          )}
          {profile.goal === "gain" && (
            <>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Aumente a ingestão de proteínas para construção muscular</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Inclua carboidratos complexos em todas as refeições</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Adicione gorduras saudáveis para aumentar calorias</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Faça refeições frequentes (5-6 por dia)</span>
              </p>
            </>
          )}
          {profile.goal === "maintain" && (
            <>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Mantenha equilíbrio entre proteínas, carboidratos e gorduras</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Varie os alimentos para garantir todos os nutrientes</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Pratique alimentação consciente e intuitiva</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Mantenha consistência nas porções</span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Food Categories */}
      <div className="space-y-6">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-br ${getGoalColor()} p-3 rounded-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {category.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.foods.map((food, foodIndex) => (
                  <div
                    key={foodIndex}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {food.name}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {food.calories}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {food.benefits}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-2">
                        📏 {food.portion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hydration reminder */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          💧 Hidratação
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
          Beba pelo menos <strong>{Math.round(profile.weight * 35)} ml de água por dia</strong> ({Math.round(profile.weight * 35 / 250)} copos de 250ml)
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          A água é essencial para metabolismo, digestão e eliminação de toxinas.
        </p>
      </div>

      {/* Restrictions reminder */}
      {profile.dietaryRestrictions && profile.dietaryRestrictions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            🚫 Suas Restrições Alimentares
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.dietaryRestrictions.map((restriction) => (
              <span
                key={restriction}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  profile.goal === "lose"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : profile.goal === "gain"
                    ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                    : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                }`}
              >
                {restriction}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            As sugestões acima já consideram suas restrições alimentares.
          </p>
        </div>
      )}
    </div>
  )
}
