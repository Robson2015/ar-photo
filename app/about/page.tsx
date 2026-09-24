import Image from "next/image"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"

import { supabase } from "@/lib/supabase/server"

export const revalidate = 60

export default async function AboutPage() {
  const { data: about, error } = await supabase
    .from("about")
    .select("title, image, content_1, content_2, content_3")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error || !about) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
        <p>La présentation est momentanément indisponible.</p>
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
