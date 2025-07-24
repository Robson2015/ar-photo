"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase/server"

export default function Category() {
  const [categories, setCategories] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name")
      if (error) {
        console.error("Erreur chargement catégories :", error.message)
        setError(error.message)
      } else {
        setCategories(data || [])
      }
    }

    fetchCategories()
  }, [])

  if (error) {
    return <p className="text-red-500">Erreur chargement catégories.</p>
  } 

  return (
    <section id="categories" className="py-16 bg-zinc-900 px-4 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">
          Catégories
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-md font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
