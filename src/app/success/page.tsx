"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      window.location.href = '/'
    }
  }, [countdown])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Bem-vindo ao FitLife Pro Premium! 🎉
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Sua assinatura foi ativada com sucesso!
          </p>

          {/* Trial Info */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Seu teste grátis começou!
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Você tem <strong>7 dias</strong> para explorar todas as funcionalidades premium sem pagar nada.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                💳 Seu primeiro pagamento será cobrado apenas após o período de teste.
                <br />
                ❌ Cancele quando quiser, sem compromisso.
              </p>
            </div>
          </div>

          {/* Features Unlocked */}
          <div className="text-left mb-8">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4 text-center">
              Funcionalidades desbloqueadas:
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Feature text="Treinos personalizados ilimitados" />
              <Feature text="Planos alimentares completos" />
              <Feature text="Acompanhamento semanal" />
              <Feature text="Sugestões de alimentos" />
              <Feature text="Cronômetros ajustáveis" />
              <Feature text="Agenda de treino programável" />
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
            >
              Começar agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecionando automaticamente em {countdown}s...
            </p>
          </div>

          {/* Session ID (for debugging) */}
          {sessionId && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-8">
              ID da sessão: {sessionId}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
      <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  )
}
