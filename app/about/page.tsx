"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ContactPage() {
  const [about, setAbout] = useState<any>(null)

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase.from("about").select("*").single()
      if (!error) setAbout(data)
      else console.error("Erreur Supabase :", error.message)
    }

    fetchAbout()
  }, [])

  if (!about) {
    return (
      <div className="text-center text-white py-20">
        Chargement en cours...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <div className="mt-6 mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-12 text-center">
            {about.title}
          </h1>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={about.image}
                alt="Portrait du photographe"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg text-white/80 mb-6">{about.content_1}</p>
              <p className="text-lg text-white/80 mb-6">{about.content_2}</p>
              <p className="text-lg text-white/80 mb-8">{about.content_3}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
