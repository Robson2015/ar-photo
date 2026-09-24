  
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [

  {
    src: "/photo2.jpg",
    alt: "Couple pendant une cérémonie de mariage",
    label: "Mariage | Émotion",
  },
    {
    src: "/photo1.jpg",
    alt: "Portrait photographique principal",
    label: "Photographie | Madagascar",
  },
    {
    src: "/photo3.jpg",
    alt: "Paysage lumineux au lever du soleil",
    label: "Paysage | Lumière",
  },


]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const goToSlide = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length)
  }

  return (
    <section
      className="relative flex min-h-[92vh] w-full items-end overflow-hidden sm:min-h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          quality={70}
          className={`hero-slide object-cover ${index === activeSlide ? "hero-slide-active" : "hero-slide-hidden"}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.08)_0%,rgba(8,8,7,0.28)_38%,rgba(8,8,7,0.94)_100%)]" />
      <div className="relative z-10 w-full px-6 pb-16 pt-32 sm:px-12 sm:pb-24 lg:px-20">
        <p className="eyebrow reveal-up">{slides[activeSlide].label}</p>
        <h1 className="display-font reveal-up reveal-delay-1 mt-4 max-w-5xl text-6xl font-semibold leading-[0.88] tracking-tight text-[#f5f1e8] sm:text-8xl lg:text-[7.5rem]">
          Des instants capturés avec passion
        </h1>
        <p className="reveal-up reveal-delay-2 mt-7 max-w-lg text-base leading-7 text-white/75 ">
          Je photographie ce qui m’inspire, avec mon téléphone ou mon appareil photo, pour garder une trace des moments qui comptent.
        </p>
        <div className="reveal-up reveal-delay-3 mt-9 flex flex-wrap gap-4">
          <Button size="lg" className="rounded-full bg-[#d6b36a] px-7 text-[#0b0b0a] hover:bg-[#e4c47f]">
            <Link href="/gallery">Voir la galerie</Link>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full border-white/40 bg-transparent px-7 text-white hover:bg-white hover:text-[#0b0b0a]">
            <Link href="/contact">Me contacter</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-7 right-6 z-20 flex items-center gap-3 sm:right-12 lg:right-20">
        <Button
          variant="outline"
          size="icon"
          aria-label="Image précédente"
          className="rounded-full border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-white hover:text-[#0b0b0a]"
          onClick={() => goToSlide(activeSlide - 1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2" aria-label={`Image ${activeSlide + 1} sur ${slides.length}`}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Afficher l'image ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`h-1 transition-all duration-300 ${index === activeSlide ? "w-10 bg-[#d6b36a]" : "w-5 bg-white/40 hover:bg-white"}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Image suivante"
          className="rounded-full border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-white hover:text-[#0b0b0a]"
          onClick={() => goToSlide(activeSlide + 1)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}

