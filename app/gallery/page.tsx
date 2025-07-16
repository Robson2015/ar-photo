'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function GalleryPage() {
  const [photos, setPhotos] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*").order("name")
      setCategories(data || [])
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchPhotos = async () => {
      let query = supabase.from("photos").select("*").order("id", { ascending: false })

      if (selectedCategory) {
        query = query.ilike("category", selectedCategory)
      }

      const { data, error } = await query
      if (error) {
        console.error("Erreur Supabase :", error.message)
      } else {
        setPhotos(data || [])
      }
    }

    fetchPhotos()
  }, [selectedCategory])

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="px-4 py-16 sm:px-6 lg:px-8 bg-black text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-8">Galerie</h1>

          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 border rounded ${
                selectedCategory === null ? "bg-white text-black" : "bg-zinc-800"
              }`}
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 border rounded ${
                  selectedCategory === cat.name ? "bg-white text-black" : "bg-zinc-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {photos.length > 0 ? (
              photos.map((photo) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid overflow-hidden rounded-lg relative group bg-zinc-900"
                >
                  <Image
                    src={`https://bjrtzxwokhhcuagonduz.supabase.co/storage/v1/object/public/photos/${photo.filename}`}
                    alt={photo.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h3 className="text-lg font-semibold">{photo.title}</h3>
                    <p className="text-sm text-white/80">{photo.description}</p>
                    <Link
                      href={`/photos/${photo.id}`}
                      className="mt-2 inline-flex items-center text-sm text-yellow-400 hover:underline"
                    >
                      Voir plus <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">Aucune photo trouvée.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
