import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
    
export default function About() {    
    return (
    <>        
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=800&text=Portrait"
                  alt="Portrait du photographe"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">À propos de moi</h2>
                <p className="text-lg text-white/80 mb-6">
                  Passionné(e) par la photographie depuis plus de 10 ans, je m'efforce de capturer l'essence de chaque
                  moment avec une approche artistique et authentique.
                </p>
                <p className="text-lg text-white/80 mb-6">
                  Spécialisé(e) dans les portraits, les paysages et les événements, je travaille avec une attention
                  particulière aux détails et à la lumière pour créer des images qui racontent une histoire.
                </p>
                <p className="text-lg text-white/80 mb-8">
                  Chaque projet est une nouvelle aventure et une opportunité de créer quelque chose d'unique et de
                  mémorable.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
    )
}
    
