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
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#0b0b0a]/75 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12">
      {/* Logo */}
      <div className="flex items-center gap-2">
      <Link href="/" onClick={() => setOpen(false)}>
        <Image
          src="/ar-photo.png"
          alt="logo"
          width={120}
          height={80}
          className="h-12 w-auto object-contain"
        />
        </Link>
      </div>

      {/* Menu Desktop */}
      <nav className="hidden items-center gap-8 md:flex"> 
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[#d6b36a]">Accueil</Link>
        <Link href="/gallery" className="text-xs font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[#d6b36a]">Galerie</Link>
        <Link href="/about" className="text-xs font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[#d6b36a]">À propos</Link>
      </nav>

      {/* Réservation Desktop */}
      <Button variant="outline" size="sm" className="hidden border-[#d6b36a] bg-[#d6b36a] text-[#0b0b0a] transition-transform hover:scale-105 hover:bg-[#e4c47f] md:inline-flex">
        <Link href="/contact" className="text-xs font-bold uppercase tracking-[0.12em]">Me contacter</Link>       
      </Button>

      {/* Menu Burger Mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10 md:hidden"
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
        "fixed right-0 top-0 z-50 flex h-screen w-3/4 max-w-xs flex-col space-y-6 bg-[#151513] px-6 py-8 shadow-2xl transition-all duration-300 ease-in-out",
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
        <Link href="/gallery" onClick={() => setOpen(false)} className="text-white text-lg">Galerie</Link>
        <Link href="/about" onClick={() => setOpen(false)} className="text-white text-lg">À propos</Link>
        <Button variant="outline" size="sm" className="!text-black">
        <Link href="/contact" className="text-sm font-medium hover:text-white/70"><span className="!text-black">Me contacter </span> </Link>       
      </Button>
      </div>
    </header>
  )
}
