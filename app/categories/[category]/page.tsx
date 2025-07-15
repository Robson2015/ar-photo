import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase/server"

import { Button } from "@/components/ui/button"

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
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-2 py-2 backdrop-blur-sm sm:px-4 ">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
          <Image
            src="/ar-photo.png"
            alt="logo"
            width={150}
            height={100}
            className="object-cover"
            priority
          />
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-white/70">
            Accueil
          </Link>
          <Link href="#gallery" className="text-sm font-medium hover:text-white/70">
            Galerie
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-white/70">
            À propos
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-white/70">
            Contact
          </Link>
        </nav>
        <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
          Réserver une séance
        </Button>
        <Button variant="outline" size="icon" className="md:hidden bg-transparent">
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </header>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                        <span className="font-medium">{photo.title}</span>
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
      <footer className="border-t border-white/10 bg-black px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-white/60">© 2025 Photo Studio. Tous droits réservés.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-white">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-white/60 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}