import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">aR.photo</span>
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
        <section className="relative h-[80vh] w-full">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
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
                Voir la galerie
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                Me contacter
              </Button>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">Galerie</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(9)].map((_, i) => (
                <Link
                  key={i}
                  href={`/photos/${i + 1}`}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={`/placeholder.svg?height=600&width=600&text=Photo ${i + 1}`}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                    <span className="font-medium">Voir la photo</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Voir plus de photos
              </Button>
            </div>
          </div>
        </section>

        <section id="categories" className="py-16 bg-zinc-900 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">Catégories</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Portraits", image: "/placeholder.svg?height=400&width=400&text=Portraits" },
                { name: "Paysages", image: "/placeholder.svg?height=400&width=400&text=Paysages" },
                { name: "Événements", image: "/placeholder.svg?height=400&width=400&text=Événements" },
                { name: "Architecture", image: "/placeholder.svg?height=400&width=400&text=Architecture" },
              ].map((category, i) => (
                <Link
                  key={i}
                  href={`/categories/${category.name.toLowerCase()}`}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

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
                <Button size="lg">En savoir plus</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-zinc-900 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">Témoignages</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Marie L.",
                  text: "Des photos magnifiques pour notre mariage ! Un vrai professionnel qui a su capturer tous les moments importants avec beaucoup de sensibilité.",
                },
                {
                  name: "Thomas D.",
                  text: "Séance photo en famille réussie ! Les enfants étaient à l'aise et les photos sont naturelles et pleines d'émotions. Je recommande vivement !",
                },
                {
                  name: "Sophie M.",
                  text: "Un talent exceptionnel pour capturer la lumière et les expressions. Mes portraits professionnels ont dépassé toutes mes attentes.",
                },
              ].map((testimonial, i) => (
                <div key={i} className="rounded-lg bg-zinc-800 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">Contact</h2>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-lg text-white/80 mb-8">
                  Vous souhaitez réserver une séance photo ou discuter d'un projet ? N'hésitez pas à me contacter.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-white/60" />
                    <span>contact@photostudio.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-white/60" />
                    <span>123 Rue de la Photographie, 75000 Paris</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Instagram className="h-6 w-6 text-white/60" />
                    <span>@photostudio</span>
                  </div>
                </div>
              </div>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                      placeholder="Votre email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                    placeholder="Sujet de votre message"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <Button size="lg" className="w-full sm:w-auto">
                  Envoyer le message
                </Button>
              </form>
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
