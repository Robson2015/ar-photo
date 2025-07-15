import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
    
export default function Contact() {    
    return (
    <>
        
        
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">Contact</h2>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-lg text-white/80 mb-8">
                  Vous souhaitez réserver une séance photo ou discuter d'un projet ? N'hésitez pas à me contacter.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-white/60" />
                    <span>robson201445@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-white/60" />
                    <span>AKD III 194 Alakamisy Fenoarivo</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Instagram className="h-6 w-6 text-white/60" />
                    <span>@andryrobson</span>
                  </div>
                </div>
              </div>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                      placeholder="Votre email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                    placeholder="Sujet de votre message"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 focus:border-white focus:outline-none"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <Button size="lg" className="w-full sm:w-auto">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </section>
    </>
    )
}
    
