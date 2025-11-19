import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conteúdo Instagram - FitLife Pro | Vídeos, Reels e Posts Prontos",
  description: "Vídeos promocionais, scripts de reels, ideias de stories e posts prontos para divulgar o FitLife Pro no Instagram. Conteúdo viral para aumentar engajamento.",
  keywords: [
    "FitLife Pro Instagram",
    "conteúdo fitness",
    "reels fitness",
    "vídeos treino",
    "marketing fitness",
    "posts instagram fitness",
    "stories fitness",
    "conteúdo viral fitness"
  ],
  openGraph: {
    title: "Conteúdo Instagram - FitLife Pro",
    description: "Vídeos promocionais, scripts de reels, ideias de stories e posts prontos para divulgar o FitLife Pro no Instagram",
    images: ["https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=1200&h=630&fit=crop"],
  },
}

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
