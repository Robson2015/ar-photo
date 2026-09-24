import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const ADMIN_COOKIE_NAME = "ar_photo_admin"

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "arphoto2026"
}

export function isAdminAuthenticated() {
  const cookieStore = cookies()
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === "true"
}

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    redirect("/login")
  }
}
