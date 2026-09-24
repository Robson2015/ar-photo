import { Camera, Images, Sparkles } from "lucide-react"
    
export default function Testimonial() {    
    return (
    <>
        
        <section id="testimonials" className="bg-[#151513] px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="eyebrow mb-4">Ma façon de photographier</p>
              <h2 className="display-font text-5xl font-semibold leading-none sm:text-7xl">Une passion en images</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Moments simples",
                  text: "Je photographie les scènes du quotidien, les paysages et les petits instants qui méritent d’être gardés en mémoire.",
                  icon: Images,
                },
                {
                  name: "Téléphone ou APN",
                  text: "Je capture mes images avec le matériel que j’ai sous la main : mon téléphone ou mon appareil photo numérique, selon l’envie et la situation.",
                  icon: Camera,
                },
                {
                  name: "Une émotion authentique",
                  text: "Je ne cherche pas la perfection professionnelle. Je cherche surtout une belle lumière, une ambiance et une émotion sincère.",
                  icon: Sparkles,
                },
                                 
              ].map((testimonial, i) => (
                <div key={i} className="group border border-white/10 bg-[#1c1c19] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6b36a]/50">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b36a]/50 bg-[#d6b36a]/10 text-[#d6b36a] transition-colors duration-300 group-hover:bg-[#d6b36a] group-hover:text-[#0b0b0a]">
                    <testimonial.icon className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#d6b36a]">{testimonial.name}</p>
                  <p className="text-base leading-7 text-white/70">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </>
    )
}
    
