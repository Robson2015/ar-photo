"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed w-full md:sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-4 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/ar-photo.png"
          alt="logo"
          width={120}
          height={80}
          className="object-cover"
        />
      </div>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center gap-6"> 
        <Link href="/" className="text-sm font-medium hover:text-white/70">Accueil</Link>
        <Link href="/gallery" className="text-sm font-medium hover:text-white/70">Galerie</Link>
        <Link href="/about" className="text-sm font-medium hover:text-white/70">À propos</Link>
      </nav>

      {/* Réservation Desktop */}
      <Button variant="outline" size="sm" className="!text-black hidden  md:inline-block">
        <Link href="/contact" className="text-sm font-medium hover:text-white/70"><span className="!text-black">Me contacter </span> </Link>       
      </Button>

      {/* Menu Burger Mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Ouvrir le menu</span>
      </Button>

      {/* Overlay + Sidebar */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      <div
       className={clsx(
        "fixed right-0 top-0 h-screen w-3/4 max-w-xs bg-black z-50 px-6 py-8 flex flex-col space-y-6 shadow-lg transition-all duration-300 ease-in-out",
        open ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
      )}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <Link href="/" onClick={() => setOpen(false)} className="text-white text-lg">Accueil</Link>
        <Link href="#gallery" onClick={() => setOpen(false)} className="text-white text-lg">Galerie</Link>
        <Link href="#about" onClick={() => setOpen(false)} className="text-white text-lg">À propos</Link>
        <Link href="#contact" onClick={() => setOpen(false)} className="text-white text-lg">Contact</Link>
        <Button className="mt-6">Réserver une séance</Button>
      </div>
    </header>
  )
}
