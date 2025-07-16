"use client"

import { useEffect, useState } from "react"
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
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name")
      if (data) setCategories(data)
    }

    fetchCategories()
  }, [])

  // Charger les photos filtrées
  useEffect(() => {
    const fetchPhotos = async () => {
      const query = supabase.from("photos").select("*").order("id", { ascending: false })
      if (selectedCategory !== "all") {
        query.eq("category", selectedCategory)
      }

      const { data, error } = await query
      if (!error) setPhotos(data || [])
    }

    fetchPhotos()
  }, [selectedCategory])

  const slides = photos.map((photo) => ({
    src: `https://bjrtzxwokhhcuagonduz.supabase.co/storage/v1/object/public/photos/${photo.filename}`,
    alt: photo.title,
    description: photo.description
  }))

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="px-4 py-16 sm:px-6 lg:px-8 bg-black text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-6">Galerie complète</h1>

          {/* Filtre catégorie */}
          <div className="flex justify-center flex-wrap gap-4 mb-10">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === "all" ? "bg-white text-black" : "border-white text-white"
              }`}
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === cat.slug ? "bg-white text-black" : "border-white text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Galerie */}
          <div className="columns-1 sm:columns-2 lg:columns-5 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid overflow-hidden rounded-lg relative group bg-zinc-900 cursor-pointer"
                onClick={() => {
                  setIndex(i)
                  setIsOpen(true)
                }}
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
                </div>
              </div>
            ))}
          </div>

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
