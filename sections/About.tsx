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

    
export default function About() {   
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
    <>        
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">  {about.title}</h2>
              <p className="text-lg text-white/80 mb-6">{about.content_1}</p>
              <p className="text-lg text-white/80 mb-6">{about.content_2}</p>
              <p className="text-lg text-white/80 mb-8">{about.content_3}</p>
            </div>
          </div>
        </div>
        </section>
    </>
    )
}
    


