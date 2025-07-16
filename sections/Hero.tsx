  
  import Link from "next/link"
  import Image from "next/image"
  import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
  import { Button } from "@/components/ui/button"
      
  export default function Hero() {    
      return (
      <>        
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
                <Link href="/gallery">Voir la galerie</Link>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                Me contacter
              </Button>
            </div>
          </div>
        </section>
      </>
      )
  }
            
