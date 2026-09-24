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
    return <p className="text-red-500 text-center">Erreur chargement catégories.</p>
  } 

  return (
    <section id="categories" className="border-y border-white/10 bg-[#151513] px-5 py-24 sm:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="eyebrow mb-4">Explorer par univers</p>
          <h2 className="display-font text-5xl font-semibold leading-none sm:text-7xl">Catégories</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
