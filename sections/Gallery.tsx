// gallery.tsx (ou autre nom de ton composant serveur)

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabase/server"
import { getPhotoUrl } from "@/lib/storage"

// ➕ Cette ligne indique à Next.js de revalider les données toutes les 60 secondes
export const revalidate = 0

export default async function Gallery() {
  const { data: photos, error } = await supabase
    .from("photos")
    .select("id, title, description, filename, category")

  if (error) {
    console.error("Erreur Supabase :", error.message)
  }

  return (
    <section id="gallery" className="border-t border-white/10 bg-[#0b0b0a] px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Sélection récente</p>
            <h2 className="display-font text-5xl font-semibold leading-none sm:text-7xl">Galerie</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-white/50 sm:block">Des images pensées pour garder une trace sensible des instants qui comptent.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos && photos.length > 0 ? (
            photos.slice(0,12 ).map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/5] overflow-hidden bg-[#171715] sm:aspect-square"
              >
                
                <Image
                  src={getPhotoUrl(photo.filename)}
                  alt={photo.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-xl font-semibold text-white">{photo.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{photo.description}</p>
                  <Link
                    href={`/photos/${photo.id}`}
                    className="mt-3 inline-flex items-center text-xs font-bold uppercase tracking-[0.15em] text-[#d6b36a]"
                  >
                    Voir plus <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white/70">
              Aucune photo disponible.
            </p>
          )}
        </div>

        {/* BOUTON VOIR PLUS */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex rounded-full border border-white/20 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#d6b36a] hover:text-[#d6b36a]"
          >
            Voir plus de photos
          </Link>
        </div>
      </div>
    </section>
  )
}
