import type React from "react"
import "../styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ar photo",
  description: "Portfolio photographe par passion.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr"className="overflow-x-hidden">
     <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-[#0b0b0a] text-[#f5f1e8]">{children}</body>
    </html>
  )
}
