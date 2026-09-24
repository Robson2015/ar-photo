const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "")

export function getPhotoUrl(path: string | null | undefined) {
  if (!path) return "/placeholder.svg"
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  if (!supabaseUrl) return "/placeholder.svg"

  const encodedPath = path.split("/").map(encodeURIComponent).join("/")
  return `${supabaseUrl}/storage/v1/object/public/photos/${encodedPath}`
}
