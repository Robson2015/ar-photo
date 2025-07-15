import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Instagram, Mail, MapPin } from "lucide-react"
    
export default function Footer() {    
    return (
    <>
        <footer className="border-t border-white/10 bg-black px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
                <p className="text-sm text-white/60">© 2025 Photo Studio. Tous droits réservés.</p>
            </div>
            <div className="flex gap-6">
                <a href="#" className="text-white/60 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white">
                <span className="sr-only">Facebook</span>
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
                    className="h-5 w-5"
                >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-white">
                <span className="sr-only">Twitter</span>
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
                    className="h-5 w-5"
                >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                </a>
            </div>
            </div>
        </footer>
    </>
    )
}
    
