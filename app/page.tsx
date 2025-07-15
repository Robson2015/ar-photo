import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase/server"

import { Button } from "@/components/ui/button"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import Contact from "@/sections/Contact"
import About from "@/sections/About"
import Testimonial from "@/sections/Testimonial"
import Category from "@/sections/Category"

export default async function Home() {
  // Récupérer les photos depuis Supabase
  const { data: photos, error } = await supabase
    .from('photos')
    .select('id, title, description, filename, category')

  if (error) {
    console.error('Erreur Supabase :', error.message)
  }


  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="relative h-[100vh] w-full">
          <Image
            src="/photo1.jpg?height=1080&width=1920"
            alt="Photo principale"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
             Capturer des moments inoubliables
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/90">
              Photographie professionnelle pour vos événements spéciaux, portraits et paysages
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full">
                Voir la galerie
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                Me contacter
              </Button>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">Galerie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos && photos.length > 0 ? (
            photos.map((photo) => (
              <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden bg-zinc-900">
                <Image
                  src={`https://bjrtzxwokhhcuagonduz.supabase.co/storage/v1/object/public/photos/${photo.filename}`}
                  alt={photo.title} 
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="text-xl font-semibold">{photo.title}</h3>
                  <p className="text-sm text-white/80">{photo.description}</p>
                  <Link href={`/photos/${photo.id}`} className="mt-2 inline-flex items-center text-sm text-yellow-400 hover:underline">
                    Voir plus <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white/70">Aucune photo disponible.</p>
          )}
        </div>
      </div>
        </section>

        <Category />

        <About />
        
        <Testimonial />

        <Contact />
      </main>

      <Footer />
    </div>
  )
}
