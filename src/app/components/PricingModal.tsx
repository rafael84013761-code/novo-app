"use client"

import { useState } from "react"
import { getStripe, PRICE_ID } from "@/lib/stripe"
import { Check, Zap, Crown, Sparkles } from "lucide-react"

export function PricingModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: PRICE_ID,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-10 h-10" />
            <h2 className="text-3xl sm:text-4xl font-bold">FitLife Pro Premium</h2>
          </div>
          <p className="text-lg text-white/90">
            Transforme seu corpo e sua vida com nosso plano completo
          </p>
        </div>

        {/* Pricing Card */}
        <div className="p-8">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 mb-8 border-2 border-emerald-300 dark:border-emerald-600">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Plano Mensal
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Acesso completo a todas as funcionalidades
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  R$ 29,90
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">por mês</div>
              </div>
            </div>

            <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Zap className="w-5 h-5" />
                <span className="font-semibold text-lg">
                  🎉 7 dias de teste GRÁTIS
                </span>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 ml-7">
                Cancele quando quiser, sem compromisso
              </p>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : 'Começar teste grátis de 7 dias'}
            </button>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Treino Personalizado
              </h4>
              <FeatureItem text="Cronômetros ajustáveis para cardio" />
              <FeatureItem text="Treino por repetições para musculação" />
              <FeatureItem text="Agenda de treino programável" />
              <FeatureItem text="Alarmes perceptíveis" />
              <FeatureItem text="Reinício automático" />
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Nutrição Completa
              </h4>
              <FeatureItem text="Plano alimentar personalizado" />
              <FeatureItem text="Sugestões de alimentos saudáveis" />
              <FeatureItem text="Cálculo de calorias e macros" />
              <FeatureItem text="Receitas adaptadas ao seu objetivo" />
              <FeatureItem text="Restrições alimentares respeitadas" />
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Acompanhamento
              </h4>
              <FeatureItem text="Dashboard com progresso visual" />
              <FeatureItem text="Feedback semanal personalizado" />
              <FeatureItem text="Evolução do peso e medidas" />
              <FeatureItem text="Ajustes automáticos no plano" />
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Suporte Premium
              </h4>
              <FeatureItem text="Atualizações constantes" />
              <FeatureItem text="Novos recursos mensais" />
              <FeatureItem text="Suporte prioritário" />
              <FeatureItem text="Acesso vitalício às atualizações" />
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h5 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Garantia de 7 dias
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Teste todas as funcionalidades por 7 dias gratuitamente. 
                  Se não gostar, cancele antes do fim do período de teste e não pague nada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full">
        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  )
}
