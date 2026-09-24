"use client"

import { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import { createClient } from "@supabase/supabase-js"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Captions from "yet-another-react-lightbox/plugins/captions"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";



const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function GalleryPage() {
  const [photos, setPhotos] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // Charger les catégories
  useEffect(() => {
    const fetchGalleryData = async () => {
      const [{ data: categoryData }, { data: photoData }] = await Promise.all([
        supabase.from("categories").select("id, name, slug").order("name"),
        supabase
          .from("photos")
          .select("id, title, description, filename, category")
          .order("id", { ascending: false }),
      ])

      if (categoryData) setCategories(categoryData)
      if (photoData) setPhotos(photoData)
      setIsLoading(false)
    }

    fetchGalleryData()
  }, [])

  const filteredPhotos = selectedCategory === "all"
    ? photos
    : photos.filter((photo) => photo.category === selectedCategory)

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category)
      setIndex(0)
    })
  }

  const slides = filteredPhotos.map((photo) => ({
    src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.filename}`,
    alt: photo.title,
    description: photo.description
  }))

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="px-4 py-20 sm:px-6 lg:px-8 bg-black text-white">
        <div className="mt-6 mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-6">Galerie complète</h1>

          {/* Filtre catégorie */}
          <div className="flex justify-center flex-wrap gap-4 mb-10">
            <button
              onClick={() => handleCategoryChange("all")}
              aria-pressed={selectedCategory === "all"}
              className={`rounded-full border px-4 py-2 transition-colors duration-200 ${
                selectedCategory === "all" ? "bg-white text-black" : "border-white text-white"
              }`}
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                aria-pressed={selectedCategory === cat.slug}
                className={`rounded-full border px-4 py-2 transition-colors duration-200 ${
                  selectedCategory === cat.slug ? "bg-white text-black" : "border-white text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Galerie */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Chargement de la galerie">
              {Array.from({ length: 8 }, (_, skeletonIndex) => (
                <div key={skeletonIndex} className="aspect-[4/5] animate-pulse bg-white/10" />
              ))}
            </div>
          ) : filteredPhotos.length > 0 ? (
          <div className={`columns-1 gap-4 space-y-4 transition-opacity duration-200 sm:columns-2 lg:columns-5 ${isPending ? "opacity-60" : "opacity-100"}`}>
            {filteredPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid overflow-hidden rounded-lg relative group bg-zinc-900 cursor-pointer"
                onClick={() => {
                  setIndex(i)
                  setIsOpen(true)
                }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.filename}`}
                  alt={photo.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold">{photo.title}</h3>
                  <p className="text-sm text-white/80">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center text-white text-md py-20">
              On n' a pas encore d’image dans cette catégorie.
            </div>
          )}



          {/* Lightbox */}
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={index}
            slides={slides}
            plugins={[Captions,Fullscreen, Slideshow, Thumbnails, Zoom]}
          />                
        </div>
      </main>

      <Footer />
    </div>
  )
}
