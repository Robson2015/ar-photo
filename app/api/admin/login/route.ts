import { NextResponse } from "next/server"

import { ADMIN_COOKIE_NAME, getAdminPassword } from "@/lib/admin"

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== getAdminPassword()) {
    return NextResponse.json(
      { error: "Mot de passe incorrect." },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "true",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })

  return response
}
