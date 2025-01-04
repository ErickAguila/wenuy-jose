'use client'
import { useState } from 'react'
import { MountainIcon, Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white text-gray-400 p-4 absolute top-0 left-0 right-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MountainIcon className="h-6 w-6 text-gray-400" />
          <span className="text-2xl font-bold text-gray-400">Hotel Paradise</span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><a href="#reserva" className="hover:underline text-gray-400">Reserva</a></li>
            <li><a href="#promociones" className="hover:underline text-gray-400">Promociones</a></li>
            <li><a href="#galeria" className="hover:underline text-gray-400">Galería</a></li>
            <li><a href="#contacto" className="hover:underline text-gray-400">Contacto</a></li>
          </ul>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li><a href="#reserva" className="block hover:underline text-gray-400" onClick={() => setIsMenuOpen(false)}>Reserva</a></li>
            <li><a href="#promociones" className="block hover:underline text-gray-400" onClick={() => setIsMenuOpen(false)}>Promociones</a></li>
            <li><a href="#galeria" className="block hover:underline text-gray-400" onClick={() => setIsMenuOpen(false)}>Galería</a></li>
            <li><a href="#contacto" className="block hover:underline text-gray-400" onClick={() => setIsMenuOpen(false)}>Contacto</a></li>
          </ul>
        </nav>
      )}
    </header>

  )
}

