import { NextResponse } from "next/server"

import { isAdminAuthenticated } from "@/lib/admin"

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
