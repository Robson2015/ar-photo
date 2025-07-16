
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import Contact from "@/sections/Contact"
import Hero from "@/sections/Hero"
import About from "@/sections/About"
import Testimonial from "@/sections/Testimonial"
import Category from "@/sections/Category"
import Gallery from "@/sections/Gallery"

export default async function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
       <Header />
       <main className="flex-1">
        <Hero />
        <Gallery />
        <Category />        
        <About />                
        <Testimonial />
        <Contact />       
      </main>
      <Footer />
    </div>
  )
}
