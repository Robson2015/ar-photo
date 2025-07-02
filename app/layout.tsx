import type React from "react"
import "app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photo Studio - Portfolio de Photographie Professionnelle",
  description: "Portfolio de photographie professionnelle présentant des portraits, paysages et événements.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
