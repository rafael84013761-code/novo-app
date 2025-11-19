"use client"

import { useState } from "react"
import { PricingModal } from "./components/PricingModal"
import { Activity, Check, Crown, Dumbbell, Apple, Timer, TrendingUp, Users, Star, Zap, Instagram } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [showPricing, setShowPricing] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-2 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FitLife Pro
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/instagram"
                className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
              >
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">Conteúdo Instagram</span>
              </Link>
              <Link
                href="/app"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Entrar
              </Link>
              <button
                onClick={() => setShowPricing(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Crown className="w-4 h-4" />
                <span>Começar Agora</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Video */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>7 dias grátis • Cancele quando quiser</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Transforme seu corpo com
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> treinos personalizados</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Planos de treino e dieta personalizados com IA, cronômetros inteligentes e acompanhamento completo do seu progresso. Tudo em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setShowPricing(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-2xl hover:shadow-emerald-500/50 hover:scale-105"
              >
                <Crown className="w-5 h-5" />
                <span>Começar Teste Grátis</span>
              </button>
              <Link
                href="/app"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all"
              >
                Ver Demo
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 border-2 border-white dark:border-gray-900"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white dark:border-gray-900"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 border-2 border-white dark:border-gray-900"></div>
                </div>
                <span className="font-medium">+2.500 usuários ativos</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 font-medium">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Promotional Video */}
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/20">
              <video
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect fill='%2310b981' width='1200' height='675'/%3E%3C/svg%3E"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-in-a-gym-41206-large.mp4" type="video/mp4" />
              </video>
              
              {/* Video Overlay with CTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-12 pointer-events-none">
                <div className="text-center pointer-events-auto">
                  <p className="text-white text-2xl font-bold mb-4 drop-shadow-lg">
                    Sua transformação começa aqui 💪
                  </p>
                  <button
                    onClick={() => setShowPricing(true)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-2xl hover:scale-105"
                  >
                    Experimente Grátis por 7 Dias
                  </button>
                </div>
              </div>
            </div>

            {/* Video Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-emerald-600 mb-1">2.500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-emerald-600 mb-1">15kg</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Média de Perda</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-emerald-600 mb-1">90 dias</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Resultados Visíveis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tudo que você precisa para alcançar seus objetivos
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ferramentas profissionais para treinar, se alimentar melhor e acompanhar sua evolução
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Treinos Personalizados
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Planos de treino adaptados ao seu nível, objetivos e preferências. Academia, casa ou ao ar livre.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Timer className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Cronômetros Inteligentes
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                HIIT, Tabata, descanso entre séries. Cronômetros ajustáveis que salvam suas preferências.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-purple-400 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Apple className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Dieta Personalizada
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Plano alimentar completo baseado em seus objetivos, restrições e preferências alimentares.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-amber-400 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Acompanhamento de Progresso
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Registre seu peso, tire fotos e acompanhe sua evolução semana a semana.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-red-400 to-rose-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Agenda de Treino
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Organize seus treinos por dia da semana. Segunda: Supino 3x10. Terça: Agachamento 4x12.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Suporte Especializado
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Tire dúvidas e receba orientações personalizadas para maximizar seus resultados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comece sua transformação hoje
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Teste grátis por 7 dias. Cancele quando quiser.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl border-2 border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-8 h-8 text-amber-500" />
              <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Plano Premium
              </h4>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
                  R$ 29,90
                </span>
                <span className="text-xl text-gray-600 dark:text-gray-400">/mês</span>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                7 dias grátis • Cancele quando quiser
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Treinos personalizados ilimitados",
                "Planos de dieta customizados",
                "Cronômetros inteligentes (HIIT, Tabata, etc)",
                "Agenda de treino semanal editável",
                "Acompanhamento de progresso completo",
                "Sugestões de alimentos e receitas",
                "Suporte prioritário",
                "Atualizações constantes"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-emerald-500 rounded-full p-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowPricing(true)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Crown className="w-5 h-5" />
              <span>Começar Teste Grátis de 7 Dias</span>
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Sem compromisso. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para transformar seu corpo?
          </h3>
          <p className="text-xl text-emerald-50 mb-8">
            Junte-se a milhares de pessoas que já estão alcançando seus objetivos com o FitLife Pro
          </p>
          <button
            onClick={() => setShowPricing(true)}
            className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:scale-105"
          >
            Começar Agora - 7 Dias Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-2 rounded-xl">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">FitLife Pro</span>
            </div>
            <p className="text-sm">
              © 2024 FitLife Pro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Pricing Modal */}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </div>
  )
}
