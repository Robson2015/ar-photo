"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { getPhotoUrl } from "@/lib/storage"

type Category = {
  id: number
  name: string
  slug: string
  image?: string | null
  description?: string | null
  created_at?: string
}

type Photo = {
  id: number
  title: string
  description?: string | null
  filename: string
  category: string
  created_at?: string
}

type View = "dashboard" | "categories" | "photos"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [activeView, setActiveView] = useState<View>("dashboard")

  const [categoryLoading, setCategoryLoading] = useState(false)
  const [photoLoading, setPhotoLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [categories, setCategories] = useState<Category[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [categoryName, setCategoryName] = useState("")
  const [categorySlug, setCategorySlug] = useState("")
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null)
  const [categoryDescription, setCategoryDescription] = useState("")

  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null)
  const [photoTitle, setPhotoTitle] = useState("")
  const [photoDescription, setPhotoDescription] = useState("")
  const [photoCategory, setPhotoCategory] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoError, setPhotoError] = useState("")
  const [photoSuccess, setPhotoSuccess] = useState("")

  async function fetchCategories() {
    const { data, error: fetchError } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      return
    }

    setCategories(data || [])
    if (!photoCategory && (data?.length ?? 0) > 0) {
      setPhotoCategory(data[0].slug)
    }
  }

  async function fetchPhotos() {
    const { data, error: fetchError } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false })

    if (fetchError) {
      setPhotoError(fetchError.message)
      return
    }

    setPhotos(data || [])
  }

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/admin/check", { method: "GET" })
      if (!res.ok) {
        router.push("/login")
        return
      }

      await Promise.all([fetchCategories(), fetchPhotos()])
      setChecking(false)
    }

    checkAuth()
  }, [router])

  function resetCategoryForm() {
    setEditingId(null)
    setCategoryName("")
    setCategorySlug("")
    setCategoryImageFile(null)
    setCategoryDescription("")
  }

  function resetPhotoForm() {
    setEditingPhotoId(null)
    setPhotoTitle("")
    setPhotoDescription("")
    setPhotoFile(null)
    setPhotoError("")
    setPhotoSuccess("")
    if (categories.length > 0) {
      setPhotoCategory(categories[0].slug)
    }
  }

  async function uploadFileToBucket(file: File, folder: string, label: string) {
    const fileExt = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "")
    const safeLabel = label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "image"
    const fileName = `${Date.now()}-${safeLabel}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`

    const { data, error } = await supabase.storage.from("photos").upload(`${folder}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      throw error
    }

    return data.path
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  async function handleCategorySubmit(e: FormEvent) {
    e.preventDefault()
    setCategoryLoading(true)
    setError("")
    setSuccess("")

    if (!categoryName.trim() || !categorySlug.trim()) {
      setError("Le nom et le slug de la catégorie sont obligatoires.")
      setCategoryLoading(false)
      return
    }

    try {
      let uploadedImageUrl: string | null = null
      const currentCategory = categories.find((cat) => cat.id === editingId)

      if (categoryImageFile) {
        const path = await uploadFileToBucket(categoryImageFile, "categories", categorySlug)
        uploadedImageUrl = getPhotoUrl(path)
      } else if (currentCategory) {
        uploadedImageUrl = currentCategory.image || null
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from("categories")
          .update({
            name: categoryName.trim(),
            slug: categorySlug.trim().toLowerCase(),
            image: uploadedImageUrl,
            description: categoryDescription.trim() || null,
          })
          .eq("id", editingId)

        if (updateError) {
          throw updateError
        }

        setSuccess("Catégorie modifiée avec succès.")
      } else {
        const { error: insertError } = await supabase.from("categories").insert([
          {
            name: categoryName.trim(),
            slug: categorySlug.trim().toLowerCase(),
            image: uploadedImageUrl,
            description: categoryDescription.trim() || null,
          },
        ])

        if (insertError) {
          throw insertError
        }

        setSuccess("Catégorie ajoutée avec succès.")
      }

      resetCategoryForm()
      await fetchCategories()
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue.")
    } finally {
      setCategoryLoading(false)
    }
  }

  async function handleCategoryDelete(id: number) {
    const category = categories.find((cat) => cat.id === id)
    if (!category) return

    const confirmed = window.confirm(`Supprimer la catégorie "${category.name}" ?`)
    if (!confirmed) return

    try {
      const { data: categoryPhotos, error: photosFetchError } = await supabase
        .from("photos")
        .select("id, filename")
        .eq("category", category.slug)

      if (photosFetchError) {
        throw photosFetchError
      }

      const { error: photosDeleteError } = await supabase
        .from("photos")
        .delete()
        .eq("category", category.slug)

      if (photosDeleteError) {
        throw photosDeleteError
      }

      const { error: deleteError } = await supabase.from("categories").delete().eq("id", id)
      if (deleteError) {
        throw deleteError
      }

      const filesToRemove = (categoryPhotos || []).map((photo) => photo.filename).filter(Boolean)
      if (category.image) {
        const imagePath = category.image.split("/storage/v1/object/public/photos/")[1]
        if (imagePath) filesToRemove.push(imagePath)
      }
      if (filesToRemove.length > 0) {
        await supabase.storage.from("photos").remove([...new Set(filesToRemove)])
      }

      if (editingId === id) {
        resetCategoryForm()
      }

      setSuccess("Catégorie supprimée.")
      await fetchCategories()
    } catch (err: any) {
      setError(err?.message || "Impossible de supprimer cette catégorie.")
    }
  }

  function handleCategoryEdit(category: Category) {
    setActiveView("categories")
    setEditingId(category.id)
    setCategoryName(category.name)
    setCategorySlug(category.slug)
    setCategoryImageFile(null)
    setCategoryDescription(category.description || "")
    setError("")
    setSuccess("")
  }

  async function handlePhotoSubmit(e: FormEvent) {
    e.preventDefault()
    setPhotoLoading(true)
    setPhotoError("")
    setPhotoSuccess("")

    if (!photoTitle.trim() || !photoCategory) {
      setPhotoError("Le titre et la catégorie sont obligatoires.")
      setPhotoLoading(false)
      return
    }

    try {
      let filePath: string | null = null
      const currentPhoto = photos.find((photo) => photo.id === editingPhotoId)

      if (photoFile) {
        filePath = await uploadFileToBucket(photoFile, "gallery", photoTitle)
      } else if (currentPhoto) {
        filePath = currentPhoto.filename
      }

      if (!filePath) {
        throw new Error("Une image est obligatoire.")
      }

      if (editingPhotoId) {
        const { error: updateError } = await supabase
          .from("photos")
          .update({
            title: photoTitle.trim(),
            description: photoDescription.trim() || null,
            filename: filePath,
            category: photoCategory,
          })
          .eq("id", editingPhotoId)

        if (updateError) {
          throw updateError
        }

        setPhotoSuccess("Photo modifiée avec succès.")
      } else {
        const { error: insertError } = await supabase.from("photos").insert([
          {
            title: photoTitle.trim(),
            description: photoDescription.trim() || null,
            filename: filePath,
            category: photoCategory,
          },
        ])

        if (insertError) {
          throw insertError
        }

        setPhotoSuccess("Photo ajoutée avec succès.")
      }

      resetPhotoForm()
      await fetchPhotos()
    } catch (err: any) {
      setPhotoError(err?.message || "Une erreur est survenue.")
    } finally {
      setPhotoLoading(false)
    }
  }

  async function handlePhotoDelete(id: number) {
    const photo = photos.find((item) => item.id === id)
    if (!photo) return

    const confirmed = window.confirm(`Supprimer la photo "${photo.title}" ?`)
    if (!confirmed) return

    try {
      if (photo.filename) {
        await supabase.storage.from("photos").remove([photo.filename])
      }

      const { error: deleteError } = await supabase.from("photos").delete().eq("id", id)
      if (deleteError) {
        throw deleteError
      }

      if (editingPhotoId === id) {
        resetPhotoForm()
      }

      setPhotoSuccess("Photo supprimée.")
      await fetchPhotos()
    } catch (err: any) {
      setPhotoError(err?.message || "Impossible de supprimer cette photo.")
    }
  }

  function handlePhotoEdit(photo: Photo) {
    setActiveView("photos")
    setEditingPhotoId(photo.id)
    setPhotoTitle(photo.title)
    setPhotoDescription(photo.description || "")
    setPhotoCategory(photo.category)
    setPhotoFile(null)
    setPhotoError("")
    setPhotoSuccess("")
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Vérification de l’accès...
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-white/10 bg-[#111217] p-6 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
              A
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">Portfolio</p>
              <h2 className="text-lg font-semibold">AR Photo</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { key: "dashboard", label: "Tableau de bord" },
              { key: "categories", label: "Catégories" },
              { key: "photos", label: "Photos" },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveView(item.key as View)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                  activeView === item.key
                    ? "bg-white text-black"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs">→</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b border-white/10 bg-[#111217]/80 px-4 py-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">Administration</p>
                <h1 className="mt-1 text-2xl font-bold">Dashboard</h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 sm:block">
                  {categories.length} catégories
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6">
            {activeView === "dashboard" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-[#12141a] p-5">
                    <p className="text-sm text-white/55">Catégories</p>
                    <p className="mt-3 text-3xl font-bold">{categories.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#12141a] p-5">
                    <p className="text-sm text-white/55">Photos</p>
                    <p className="mt-3 text-3xl font-bold">{photos.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#12141a] p-5">
                    <p className="text-sm text-white/55">Statut</p>
                    <p className="mt-3 text-xl font-semibold text-green-400">En ligne</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Aperçu rapide</h2>
                    <button
                      type="button"
                      onClick={() => setActiveView("photos")}
                      className="text-sm text-white/70 hover:text-white"
                    >
                      Voir les photos
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {photos.slice(0, 6).map((photo) => (
                      <div key={photo.id} className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                          <img
                            src={getPhotoUrl(photo.filename)}
                          alt={photo.title}
                          className="h-36 w-full object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium">{photo.title}</p>
                          <p className="mt-1 text-sm text-white/60">{photo.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === "categories" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                  <h2 className="mb-5 text-xl font-semibold">
                    {editingId ? "Modifier la catégorie" : "Ajouter une catégorie"}
                  </h2>

                  <form onSubmit={handleCategorySubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm text-white/80">
                        Nom de la catégorie
                      </label>
                      <input
                        id="name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                        placeholder="Ex: Mariage"
                      />
                    </div>

                    <div>
                      <label htmlFor="slug" className="mb-2 block text-sm text-white/80">
                        Slug
                      </label>
                      <input
                        id="slug"
                        value={categorySlug}
                        onChange={(e) => setCategorySlug(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                        placeholder="Ex: mariage"
                      />
                    </div>

                    <div>
                      <label htmlFor="category-image" className="mb-2 block text-sm text-white/80">
                        Image
                      </label>
                      <input
                        id="category-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCategoryImageFile(e.target.files?.[0] || null)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30 file:mr-4 file:rounded file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-black"
                      />
                      {categoryImageFile ? (
                        <p className="mt-2 text-xs text-white/60">Fichier sélectionné : {categoryImageFile.name}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="category-description" className="mb-2 block text-sm text-white/80">
                        Description
                      </label>
                      <textarea
                        id="category-description"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                        placeholder="Décrivez cette catégorie..."
                      />
                    </div>

                    {error ? <p className="text-sm text-red-400">{error}</p> : null}
                    {success ? <p className="text-sm text-green-400">{success}</p> : null}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={categoryLoading}
                        className="rounded-xl bg-white px-4 py-3 font-semibold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {categoryLoading
                          ? editingId
                            ? "Modification..."
                            : "Ajout..."
                          : editingId
                            ? "Enregistrer"
                            : "Ajouter la catégorie"}
                      </button>

                      {editingId ? (
                        <button
                          type="button"
                          onClick={resetCategoryForm}
                          className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5"
                        >
                          Annuler
                        </button>
                      ) : null}
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-black/20 text-white/80">
                          <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Nom</th>
                            <th className="px-4 py-3">Slug</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center text-white/60">
                                Aucune catégorie ajoutée.
                              </td>
                            </tr>
                          ) : (
                            categories.map((category) => (
                              <tr key={category.id} className="border-t border-white/10 bg-black/10">
                                <td className="px-4 py-3">
                                  {category.image ? (
                                    <img src={category.image} alt={category.name} className="h-16 w-16 rounded-lg object-cover" />
                                  ) : (
                                    <div className="h-16 w-16 rounded-lg bg-zinc-800" />
                                  )}
                                </td>
                                <td className="px-4 py-3 font-medium">{category.name}</td>
                                <td className="px-4 py-3 text-white/70">{category.slug}</td>
                                <td className="px-4 py-3 text-white/70">{category.description || "Aucune description"}</td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleCategoryEdit(category)}
                                      className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-black hover:bg-zinc-200"
                                    >
                                      Modifier
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleCategoryDelete(category.id)}
                                      className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-500/20"
                                    >
                                      Supprimer
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === "photos" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                  <h2 className="mb-5 text-xl font-semibold">
                    {editingPhotoId ? "Modifier la photo" : "Ajouter une photo"}
                  </h2>

                  <form onSubmit={handlePhotoSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="photo-title" className="mb-2 block text-sm text-white/80">
                        Titre
                      </label>
                      <input
                        id="photo-title"
                        value={photoTitle}
                        onChange={(e) => setPhotoTitle(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                        placeholder="Ex: Cérémonie de mariage"
                      />
                    </div>

                    <div>
                      <label htmlFor="photo-category" className="mb-2 block text-sm text-white/80">
                        Catégorie
                      </label>
                      <select
                        id="photo-category"
                        value={photoCategory}
                        onChange={(e) => setPhotoCategory(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="photo-file" className="mb-2 block text-sm text-white/80">
                        Image
                      </label>
                      <input
                        id="photo-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30 file:mr-4 file:rounded file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-black"
                      />
                      {photoFile ? <p className="mt-2 text-xs text-white/60">Fichier sélectionné : {photoFile.name}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="photo-description" className="mb-2 block text-sm text-white/80">
                        Description
                      </label>
                      <textarea
                        id="photo-description"
                        value={photoDescription}
                        onChange={(e) => setPhotoDescription(e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                        placeholder="Décrivez cette photo..."
                      />
                    </div>

                    {photoError ? <p className="text-sm text-red-400">{photoError}</p> : null}
                    {photoSuccess ? <p className="text-sm text-green-400">{photoSuccess}</p> : null}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={photoLoading}
                        className="rounded-xl bg-white px-4 py-3 font-semibold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {photoLoading
                          ? editingPhotoId
                            ? "Modification..."
                            : "Ajout..."
                          : editingPhotoId
                            ? "Enregistrer"
                            : "Ajouter la photo"}
                      </button>

                      {editingPhotoId ? (
                        <button
                          type="button"
                          onClick={resetPhotoForm}
                          className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5"
                        >
                          Annuler
                        </button>
                      ) : null}
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-black/20 text-white/80">
                          <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Titre</th>
                            <th className="px-4 py-3">Catégorie</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {photos.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center text-white/60">
                                Aucune photo ajoutée.
                              </td>
                            </tr>
                          ) : (
                            photos.map((photo) => (
                              <tr key={photo.id} className="border-t border-white/10 bg-black/10">
                                <td className="px-4 py-3">
                                  <img
                                    src={getPhotoUrl(photo.filename)}
                                    alt={photo.title}
                                    className="h-16 w-16 rounded-lg object-cover"
                                  />
                                </td>
                                <td className="px-4 py-3 font-medium">{photo.title}</td>
                                <td className="px-4 py-3 text-white/70">{photo.category}</td>
                                <td className="px-4 py-3 text-white/70">{photo.description || "Aucune description"}</td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handlePhotoEdit(photo)}
                                      className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-black hover:bg-zinc-200"
                                    >
                                      Modifier
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handlePhotoDelete(photo.id)}
                                      className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-500/20"
                                    >
                                      Supprimer
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
