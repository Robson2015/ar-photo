import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase/server"

import { Button } from "@/components/ui/button"

import Header from "@/components/Header"
import Footer from "@/components/footer"

export default async function CategoryPage({
    params,
  }: {
    params: { category: string }
  }) {
    const category = decodeURIComponent(params.category)
  
    const { data: photos, error } = await supabase
      .from("photos")
      .select("*")
      .ilike("category", `%${category}%`) // pour matcher insensiblement
  
    if (error) {
      console.error("Erreur Supabase :", error.message)
    }


  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header/>
      <main className="flex-1">

        <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 capitalize">{category}</h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {photos && photos.length > 0 ? (
                    photos.map((photo) => (
                    <Link
                        key={photo.id}
                        href={`/photos/${photo.id}`}
                        className="group relative aspect-square overflow-hidden rounded-lg"
                    >
                        <Image
                        src={`https://bjrtzxwokhhcuagonduz.supabase.co/storage/v1/object/public/photos/${photo.filename}`}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <h3 className="text-xl font-semibold">{photo.title}</h3>
                        <span className="font-medium">{photo.description}</span>
                        </div>
                    </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-white/70">
                    Aucune photo trouvée pour cette catégorie.
                    </p>
                )}
                </div>
            </div>
        </div>
        </section>


      </main>
      <Footer/>
    </div>
  )
}