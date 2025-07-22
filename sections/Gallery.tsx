// gallery.tsx (ou autre nom de ton composant serveur)

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabase/server"

// ➕ Cette ligne indique à Next.js de revalider les données toutes les 60 secondes
export const revalidate = 60

export default async function Gallery() {
  const { data: photos, error } = await supabase
    .from("photos")
    .select("id, title, description, filename, category")

  if (error) {
    console.error("Erreur Supabase :", error.message)
  }

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">Galerie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos && photos.length > 0 ? (
            photos.slice(0, 12).map((photo) => (
              <div
                key={photo.id}
                className="relative group aspect-square rounded-lg overflow-hidden bg-zinc-900"
              >
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
            <p className="col-span-full text-center text-white/70">
              Aucune photo disponible.
            </p>
          )}
        </div>

        {/* BOUTON VOIR PLUS */}
        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="inline-block px-6 py-3 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition"
          >
            Voir plus de photos
          </Link>
        </div>
      </div>
    </section>
  )
}
