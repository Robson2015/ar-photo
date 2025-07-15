import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
    
export default function Testimonial() {    
    return (
    <>
        
        <section id="testimonials" className="py-16 bg-zinc-900 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">Témoignages</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Marie L.",
                  text: "Des photos magnifiques pour notre mariage ! Un vrai professionnel qui a su capturer tous les moments importants avec beaucoup de sensibilité.",
                },
                {
                  name: "Thomas D.",
                  text: "Séance photo en famille réussie ! Les enfants étaient à l'aise et les photos sont naturelles et pleines d'émotions. Je recommande vivement !",
                },
                {
                  name: "Sophie M.",
                  text: "Un talent exceptionnel pour capturer la lumière et les expressions. Mes portraits professionnels ont dépassé toutes mes attentes.",
                },
              ].map((testimonial, i) => (
                <div key={i} className="rounded-lg bg-zinc-800 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </>
    )
}
    
