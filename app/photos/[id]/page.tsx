import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/server"

export default async function PhotoPage({ params }: { params: { id: string } }) {
  const { data: photo, error } = await supabase
    .from("photos")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !photo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-white/80">Photo introuvable.</p>
      </div>
    )
  }

  const imageUrl = `https://bjrtzxwokhhcuagonduz.supabase.co/storage/v1/object/public/photos/${photo.filename}`

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
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
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Share className="h-4 w-4" />
            <span className="sr-only">Partager</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Télécharger</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/#gallery"
            className="mb-6 inline-flex items-center text-sm font-medium text-white/70 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la galerie
          </Link>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={photo.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-8">
            <h1 className="text-2xl font-bold sm:text-3xl">{photo.title}</h1>
            <p className="mt-2 text-white/70">{photo.description || "Photo sans description."}</p>
            <p className="mt-4 max-w-3xl text-lg text-white/80">
              Cette image capture un moment unique. La composition équilibrée et les tons riches
              créent une atmosphère immersive qui invite le spectateur à contempler.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm">Photographie</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm">{photo.title}</span>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-white/10 bg-black px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm text-white/60">© 2025 Photo Studio. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
