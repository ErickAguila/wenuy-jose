import { MountainIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white text-white p-4 absolute top-0 left-0 right-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MountainIcon className="h-6 w-6 text-gray-500" />
          <span className="text-2xl font-bold text-gray-500">Wenüy Jose</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#reserva" className="hover:underline text-gray-500">Reserva</a></li>
            <li><a href="#promociones" className="hover:underline text-gray-500">Promociones</a></li>
            <li><a href="#galeria" className="hover:underline text-gray-500">Galería</a></li>
            <li><a href="#contacto" className="hover:underline text-gray-500">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

