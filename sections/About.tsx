import Image from "next/image"
import { supabase } from "@/lib/supabase/server"

export const revalidate = 60

export default async function About() {
  const { data: about, error } = await supabase
    .from("about")
    .select("title, image, content_1, content_2, content_3")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error || !about) {
    return (
      <section id="about" className="px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <p>La présentation est momentanément indisponible.</p>
      </section>
    )
  }
  
    return (
      <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
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
      )
}
    


