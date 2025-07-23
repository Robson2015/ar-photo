'use client'

import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { Mail, MapPin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const form = formRef.current
    if (!form) return

    try {
      const result = await emailjs.sendForm(
        "service_d3adu1l",              // Ton ID service EmailJS
        "template_1i7u71i",             // Ton ID template EmailJS
        form,
        "ot5k0mWs_CUXlG-bJ"             // Ta clé publique EmailJS
      )
      if (result.status === 200) {
        setSuccess(true)
        form.reset()
      } else {
        setError("Erreur lors de l'envoi du message.")
      }
    } catch (err) {
      console.error("EmailJS error:", err)
      setError("Une erreur est survenue. Réessayez plus tard.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <div className="mt-6 mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-12 text-center">
            Contact
          </h1>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-lg text-white/80 mb-8">
                Vous souhaitez réserver une séance photo ou discuter d'un projet ?
              </p>
              <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-white/60" />
                <a
                  href="mailto:robson201445@gmail.com"
                  className="text-white hover:underline"
                >
                  robson201445@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-white/60" />
                <span>AKD III 194 Alakamisy Fenoarivo</span>
              </div>

              <div className="flex items-center gap-4">
                <Instagram className="h-6 w-6 text-white/60" />
                <a
                  href="https://www.instagram.com/andryrobson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  @andryrobson
                </a>
              </div>

              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white/60"
                >
                  <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.78 19.78 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.12.81.31 1.6.57 2.36a2 2 0 0 1-.45 2.11L9.91 11a16 16 0 0 0 6.09 6.09l1.81-1.81a2 2 0 0 1 2.11-.45c.76.26 1.55.45 2.36.57a2 2 0 0 1 1.72 2z" />
                </svg>
                <a
                  href="tel:0344562113"
                  className="text-white hover:underline"
                >
                  (+261) 34 45 621 13
                </a>
              </div>
            </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="text-sm font-medium">
                    Prénom
                  </label>
                  <input
                    name="firstname"
                    required
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2"
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="surname" className="text-sm font-medium">
                    Nom
                  </label>
                  <input
                    name="surname"
                    required
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2"
                  placeholder="Votre email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2"
                  placeholder="Votre numero téléphone"
                />
              </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2"
                  placeholder="Votre message"
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Envoyer
              </Button>

              {error && <p className="text-red-500">{error}</p>}
              {success && (
                <p className="text-green-500">Message envoyé avec succès !</p>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
