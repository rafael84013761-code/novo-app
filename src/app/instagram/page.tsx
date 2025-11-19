"use client"

import { useState } from "react"
import { Download, Instagram, TrendingUp, Zap, Crown, Dumbbell, Apple, Timer, Check, Play, Smartphone, Star, Quote } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export const metadata = {
  title: "Conteúdo Instagram - FitLife Pro | Vídeos, Reels e Posts Prontos",
  description: "Vídeos promocionais, scripts de reels, ideias de stories e posts prontos para divulgar o FitLife Pro no Instagram. Conteúdo viral para aumentar engajamento.",
  openGraph: {
    title: "Conteúdo Instagram - FitLife Pro",
    description: "Vídeos promocionais, scripts de reels, ideias de stories e posts prontos para divulgar o FitLife Pro no Instagram",
    images: ["https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=1200&h=630&fit=crop"],
  },
}

export default function InstagramContentPage() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null)

  const testimonials = [
    {
      id: "test-1",
      name: "Maria Silva",
      age: 32,
      result: "Perdi 18kg em 4 meses",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      quote: "O FitLife Pro mudou minha vida! Os treinos personalizados e a dieta que eu consigo seguir fizeram toda a diferença. Nunca foi tão fácil alcançar meus objetivos!",
      rating: 5,
      beforeAfter: true
    },
    {
      id: "test-2",
      name: "João Pedro",
      age: 28,
      result: "Ganhou 8kg de massa muscular",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      quote: "Sempre tive dificuldade em ganhar massa. Com o app, consegui um plano de treino e dieta específicos para hipertrofia. Resultados incríveis em 3 meses!",
      rating: 5,
      beforeAfter: false
    },
    {
      id: "test-3",
      name: "Ana Carolina",
      age: 35,
      result: "Perdeu 12kg e ganhou disposição",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      quote: "Como mãe de dois filhos, achei que nunca teria tempo. O FitLife Pro me mostrou que 30 minutos por dia são suficientes. Estou mais disposta e feliz!",
      rating: 5,
      beforeAfter: true
    },
    {
      id: "test-4",
      name: "Carlos Eduardo",
      age: 42,
      result: "Reduziu 15cm de cintura",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      quote: "Depois dos 40, pensei que seria impossível. Mas o app me provou o contrário. Treinos adaptados à minha idade e condição física. Sensacional!",
      rating: 5,
      beforeAfter: false
    },
    {
      id: "test-5",
      name: "Juliana Costa",
      age: 26,
      result: "Definiu o abdômen em 60 dias",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      quote: "Sempre quis ter abdômen definido mas não sabia como. O cronômetro HIIT do app é viciante! Em 2 meses consegui o shape dos sonhos.",
      rating: 5,
      beforeAfter: true
    },
    {
      id: "test-6",
      name: "Rafael Santos",
      age: 30,
      result: "Perdeu 22kg e recuperou a saúde",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      quote: "Estava com problemas de saúde por causa do peso. O FitLife Pro foi meu divisor de águas. Hoje estou saudável, forte e confiante!",
      rating: 5,
      beforeAfter: true
    }
  ]

  const promoVideos = [
    {
      id: "video-1",
      title: "Treino Intenso na Academia",
      url: "https://videos.pexels.com/video-files/4753994/4753994-uhd_2560_1440_30fps.mp4",
      thumbnail: "https://images.pexels.com/videos/4753994/pexels-photo-4753994.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Vídeo motivacional de treino pesado na academia",
      duration: "30s"
    },
    {
      id: "video-2",
      title: "Transformação e Resultados",
      url: "https://videos.pexels.com/video-files/4753992/4753992-uhd_2560_1440_30fps.mp4",
      thumbnail: "https://images.pexels.com/videos/4753992/pexels-photo-4753992.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Demonstração de exercícios e resultados reais",
      duration: "25s"
    },
    {
      id: "video-3",
      title: "HIIT Cardio Explosivo",
      url: "https://videos.pexels.com/video-files/4753989/4753989-uhd_2560_1440_30fps.mp4",
      thumbnail: "https://images.pexels.com/videos/4753989/pexels-photo-4753989.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Treino HIIT de alta intensidade",
      duration: "20s"
    },
    {
      id: "video-4",
      title: "Musculação e Força",
      url: "https://videos.pexels.com/video-files/4753991/4753991-uhd_2560_1440_30fps.mp4",
      thumbnail: "https://images.pexels.com/videos/4753991/pexels-photo-4753991.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Foco em ganho de massa muscular",
      duration: "28s"
    }
  ]

  const reelsContent = [
    {
      id: "reel-1",
      title: "Transformação em 90 Dias",
      description: "Antes e depois impressionante de usuário real",
      type: "Reel de Transformação",
      duration: "15s",
      hook: "Você não vai acreditar nessa transformação! 😱",
      script: [
        "0-3s: Foto 'antes' com texto 'Há 90 dias atrás...'",
        "3-5s: Transição dramática com efeito de flash",
        "5-8s: Foto 'depois' com texto 'Hoje! 💪'",
        "8-12s: Montagem rápida de treinos no app",
        "12-15s: Logo FitLife Pro + CTA '7 dias grátis'"
      ],
      hashtags: "#transformacao #fitness #antesedepois #emagrecimento #academia #treino #dieta #fitlife #90diasdetransformacao #resultados",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "reel-2",
      title: "Treino HIIT Completo",
      description: "Demonstração do cronômetro HIIT em ação",
      type: "Reel Tutorial",
      duration: "30s",
      hook: "Queime 500 calorias em 20 minutos! 🔥",
      script: [
        "0-5s: Pessoa iniciando treino HIIT no app",
        "5-10s: Close no cronômetro do app funcionando",
        "10-15s: Montagem rápida de exercícios (burpees, jumping jacks, mountain climbers)",
        "15-20s: Pessoa suando, cansada mas feliz",
        "20-25s: Tela do app mostrando 'Treino Concluído! 520 calorias'",
        "25-30s: Logo + CTA 'Experimente grátis por 7 dias'"
      ],
      hashtags: "#hiit #treino #queimarcalorias #fitness #emagrecimento #treinoemcasa #cardio #fitlife #workout #motivation",
      color: "from-orange-500 to-red-600"
    },
    {
      id: "reel-3",
      title: "Dieta Personalizada",
      description: "Como funciona o plano alimentar do app",
      type: "Reel Educativo",
      duration: "20s",
      hook: "Emagreça comendo o que você gosta! 🍽️",
      script: [
        "0-4s: Pessoa abrindo o app na aba 'Dieta'",
        "4-8s: Scroll mostrando refeições deliciosas e saudáveis",
        "8-12s: Close em pratos reais (café da manhã, almoço, jantar)",
        "12-16s: Pessoa comendo feliz e satisfeita",
        "16-20s: Texto 'Dieta personalizada para VOCÊ' + Logo + CTA"
      ],
      hashtags: "#dieta #alimentacaosaudavel #emagrecer #nutricao #dietapersonalizada #comersaudavel #receitas #fitlife #emagrecimento #saude",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "reel-4",
      title: "Agenda de Treino Semanal",
      description: "Organize seus treinos por dia da semana",
      type: "Reel Funcionalidade",
      duration: "15s",
      hook: "Nunca mais perca um treino! 📅",
      script: [
        "0-3s: Calendário semanal vazio",
        "3-6s: Adicionando treinos: 'Segunda: Peito e Tríceps'",
        "6-9s: 'Quarta: Costas e Bíceps', 'Sexta: Pernas'",
        "9-12s: Notificação no celular 'Hora do treino!'",
        "12-15s: Pessoa treinando feliz + Logo + CTA"
      ],
      hashtags: "#organizacao #treino #agenda #fitness #rotina #disciplina #foco #fitlife #treinosemanal #planejamento",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "reel-5",
      title: "Depoimento Real",
      description: "Usuário contando sua experiência",
      type: "Reel Testemunho",
      duration: "25s",
      hook: "Perdi 18kg em 4 meses! Veja como... 💪",
      script: [
        "0-5s: Pessoa falando: 'Eu tentei de tudo...'",
        "5-10s: 'Até que descobri o FitLife Pro'",
        "10-15s: Mostrando o app funcionando no celular",
        "15-20s: Antes e depois da pessoa",
        "20-25s: 'Hoje estou 18kg mais leve!' + Logo + CTA"
      ],
      hashtags: "#depoimento #transformacao #resultados #fitness #emagrecimento #motivacao #inspiracao #fitlife #antesedepois #sucesso",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "reel-6",
      title: "7 Dias Grátis",
      description: "Promoção do teste grátis",
      type: "Reel Promocional",
      duration: "10s",
      hook: "TESTE GRÁTIS POR 7 DIAS! 🎁",
      script: [
        "0-2s: Texto grande '7 DIAS GRÁTIS'",
        "2-5s: Montagem rápida das funcionalidades do app",
        "5-7s: 'Sem compromisso. Cancele quando quiser.'",
        "7-10s: Logo + CTA 'Comece agora!' + link na bio"
      ],
      hashtags: "#gratispor7dias #teste #promocao #fitness #app #treino #dieta #fitlife #semcompromisso #experimentegratis",
      color: "from-pink-500 to-rose-600"
    }
  ]

  const storiesContent = [
    {
      id: "story-1",
      title: "Enquete Interativa",
      description: "Qual seu maior desafio?",
      content: "Enquete: 'Qual seu maior desafio?' - Opções: Falta de tempo ⏰ / Falta de motivação 💪",
      color: "from-purple-400 to-pink-500"
    },
    {
      id: "story-2",
      title: "Quiz Fitness",
      description: "Teste seu conhecimento",
      content: "Quiz: 'Quantas calorias você queima em 30min de HIIT?' - Opções: 200 / 350 / 500",
      color: "from-blue-400 to-indigo-500"
    },
    {
      id: "story-3",
      title: "Dica Rápida",
      description: "Dica de treino do dia",
      content: "💡 DICA DO DIA: Beba água antes, durante e depois do treino. Hidratação = Performance!",
      color: "from-green-400 to-emerald-500"
    },
    {
      id: "story-4",
      title: "Contagem Regressiva",
      description: "Promoção limitada",
      content: "⏰ ÚLTIMAS HORAS! 7 dias grátis + 20% OFF no primeiro mês. Link na bio!",
      color: "from-red-400 to-orange-500"
    }
  ]

  const postsContent = [
    {
      id: "post-1",
      title: "Carrossel Educativo",
      description: "5 benefícios do treino HIIT",
      slides: [
        "Slide 1: '5 Benefícios do HIIT que você precisa conhecer! 🔥'",
        "Slide 2: '1. Queima calorias em menos tempo'",
        "Slide 3: '2. Acelera o metabolismo por até 48h'",
        "Slide 4: '3. Melhora a resistência cardiovascular'",
        "Slide 5: '4. Pode ser feito em qualquer lugar'",
        "Slide 6: '5. Resultados visíveis em semanas'",
        "Slide 7: 'Experimente no FitLife Pro! Link na bio 👆'"
      ],
      caption: "O HIIT (Treino Intervalado de Alta Intensidade) é uma das formas mais eficientes de treinar. Com o FitLife Pro, você tem cronômetros personalizados para HIIT, Tabata e muito mais! 💪\n\nTeste grátis por 7 dias. Link na bio! 🔗",
      hashtags: "#hiit #treino #fitness #emagrecimento #saude #bemestar #fitlife #workout #cardio #treinointervalo",
      color: "from-orange-400 to-red-500"
    },
    {
      id: "post-2",
      title: "Antes e Depois",
      description: "Transformação de usuário",
      image: "Grid com foto antes (esquerda) e depois (direita) + logo no centro",
      caption: "🔥 TRANSFORMAÇÃO REAL! 🔥\n\nConheça a história da Maria, que perdeu 15kg em 3 meses usando o FitLife Pro!\n\n'O app mudou minha vida. Treinos personalizados, dieta que eu consigo seguir e acompanhamento semanal. Nunca foi tão fácil!' - Maria, 32 anos\n\nVocê também pode! Teste grátis por 7 dias. 💪",
      hashtags: "#transformacao #antesedepois #resultados #fitness #emagrecimento #motivacao #inspiracao #fitlife #sucesso #mudanca",
      color: "from-purple-400 to-pink-500"
    },
    {
      id: "post-3",
      title: "Infográfico",
      description: "Como funciona o app",
      content: "Infográfico vertical:\n1️⃣ Responda o questionário\n2️⃣ Receba seu plano personalizado\n3️⃣ Treine com cronômetros inteligentes\n4️⃣ Siga sua dieta customizada\n5️⃣ Acompanhe seu progresso\n6️⃣ Alcance seus objetivos! 🎯",
      caption: "É simples assim! O FitLife Pro cuida de tudo para você focar apenas em treinar e alcançar seus objetivos. 💪\n\n✅ Treinos personalizados\n✅ Dieta customizada\n✅ Cronômetros inteligentes\n✅ Acompanhamento completo\n\nTeste grátis por 7 dias!",
      hashtags: "#fitness #app #treino #dieta #saude #bemestar #fitlife #tecnologia #inovacao #resultados",
      color: "from-blue-400 to-indigo-500"
    }
  ]

  return (
    <>
      <Head>
        <title>Conteúdo Instagram - FitLife Pro | Vídeos, Reels e Posts Prontos</title>
        <meta name="description" content="Vídeos promocionais, scripts de reels, ideias de stories e posts prontos para divulgar o FitLife Pro no Instagram. Conteúdo viral para aumentar engajamento." />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-purple-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Conteúdo Instagram
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Vídeos, Reels, Stories e Posts prontos para divulgar
                  </p>
                </div>
              </div>
              <Link
                href="/"
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
              >
                ← Voltar ao site
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Conteúdo viral pronto para usar
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Divulgue o FitLife Pro no Instagram
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Vídeos promocionais, scripts de reels, ideias de stories e posts prontos para aumentar seu engajamento e conversões
            </p>
          </div>

          {/* Download App CTA - Destaque */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <Smartphone className="w-20 h-20 text-white mx-auto mb-6 animate-bounce" />
                <h3 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                  Baixe o FitLife Pro AGORA!
                </h3>
                <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                  🎁 7 dias GRÁTIS + Acesso completo a todas as funcionalidades
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/app"
                    className="flex items-center justify-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 w-full sm:w-auto"
                  >
                    <Apple className="w-7 h-7" />
                    App Store
                  </a>
                  <a
                    href="/app"
                    className="flex items-center justify-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 w-full sm:w-auto"
                  >
                    <Download className="w-7 h-7" />
                    Google Play
                  </a>
                </div>
                <p className="text-white/80 mt-6 text-sm">
                  ⭐ Mais de 2.500 usuários já transformaram suas vidas!
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials Section - NOVO */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Depoimentos Reais de Usuários
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Veja o que nossos usuários estão dizendo sobre suas transformações com o FitLife Pro
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Header com foto e info */}
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-purple-100 dark:border-purple-900/30"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.age} anos
                        </p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Badge de resultado */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg mb-4">
                      <p className="text-sm font-bold text-green-700 dark:text-green-400 text-center">
                        ✅ {testimonial.result}
                      </p>
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="w-8 h-8 text-purple-200 dark:text-purple-900/50 absolute -top-2 -left-2" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic pl-6">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Badge antes/depois */}
                    {testimonial.beforeAfter && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">
                          📸 Fotos antes/depois disponíveis
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-8 text-center">
              <h4 className="text-2xl font-bold text-white mb-6">
                Resultados Comprovados
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-4xl font-bold text-white mb-2">2.500+</p>
                  <p className="text-white/90 text-sm">Usuários Ativos</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">15kg</p>
                  <p className="text-white/90 text-sm">Perda Média</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">4.9⭐</p>
                  <p className="text-white/90 text-sm">Avaliação Média</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">90%</p>
                  <p className="text-white/90 text-sm">Taxa de Sucesso</p>
                </div>
              </div>
            </div>
          </section>

          {/* Vídeos Promocionais Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2 rounded-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Vídeos Promocionais
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use esses vídeos reais de treino para promover o app no Instagram, TikTok e outras redes sociais
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {promoVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
                >
                  <div className="relative aspect-video bg-gray-900">
                    <video
                      src={video.url}
                      poster={video.thumbnail}
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      Seu navegador não suporta vídeos.
                    </video>
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-semibold">{video.duration}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {video.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {video.description}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={video.url}
                        download
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Baixar Vídeo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA para baixar o app dentro da seção de vídeos */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-center">
              <p className="text-white font-semibold text-lg mb-4">
                💡 Dica: Adicione o link do app na bio e nos stories ao postar esses vídeos!
              </p>
              <a
                href="/app"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg"
              >
                <Smartphone className="w-5 h-5" />
                Testar o App Agora
              </a>
            </div>
          </section>

          {/* Reels Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reels Virais
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reelsContent.map((reel) => (
                <div
                  key={reel.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedContent(reel.id)}
                >
                  <div className={`h-3 bg-gradient-to-r ${reel.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">
                          {reel.type}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                          {reel.title}
                        </h4>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {reel.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {reel.description}
                    </p>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                        Hook: {reel.hook}
                      </p>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all group-hover:scale-105">
                      <Download className="w-4 h-4" />
                      Ver Script Completo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stories Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-lg">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Stories Interativos
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {storiesContent.map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${story.color}`}></div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {story.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {story.description}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {story.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Posts Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Posts de Feed
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postsContent.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div className={`h-3 bg-gradient-to-r ${post.color}`}></div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {post.description}
                    </p>
                    {post.slides && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4 space-y-2">
                        {post.slides.map((slide, index) => (
                          <p key={index} className="text-xs text-gray-700 dark:text-gray-300">
                            {slide}
                          </p>
                        ))}
                      </div>
                    )}
                    {post.content && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                        <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {post.content}
                        </p>
                      </div>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">
                        Caption sugerida:
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                        {post.caption}
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        {post.hashtags}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section Final */}
          <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
            <Crown className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para divulgar?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Use esses conteúdos para promover o FitLife Pro e conquistar mais usuários!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/app"
                className="flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl"
              >
                <Dumbbell className="w-5 h-5" />
                Testar o App
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Ver Landing Page
              </Link>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              💡 Dicas para Maximizar Resultados
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Poste nos horários de pico
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reels: 18h-21h | Stories: 12h-14h e 19h-21h | Posts: 11h-13h
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Use músicas em alta
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reels com trending audio têm 3x mais alcance
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Check className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Responda todos os comentários
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Engajamento nos primeiros 30min é crucial para o algoritmo
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                    <Check className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Teste diferentes formatos
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Varie entre educativo, transformação e promocional
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Modal de Detalhes */}
        {selectedContent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Script Completo
                </h3>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                {reelsContent.find(r => r.id === selectedContent) && (
                  <>
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {reelsContent.find(r => r.id === selectedContent)?.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reelsContent.find(r => r.id === selectedContent)?.description}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg mb-6">
                      <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        Hook:
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {reelsContent.find(r => r.id === selectedContent)?.hook}
                      </p>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">
                        Script detalhado:
                      </p>
                      <ul className="space-y-3">
                        {reelsContent.find(r => r.id === selectedContent)?.script.map((line, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">
                        Hashtags sugeridas:
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        {reelsContent.find(r => r.id === selectedContent)?.hashtags}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
