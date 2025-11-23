'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Mi Portafolio
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition">Inicio</a>
            <a href="#experiencia" className="text-gray-700 hover:text-blue-600 transition">Experiencia</a>
            <a href="#proyectos" className="text-gray-700 hover:text-blue-600 transition">Proyectos</a>
            <a href="#habilidades" className="text-gray-700 hover:text-blue-600 transition">Habilidades</a>
            <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition">Contacto</a>
          </div>

          {/* Botón Mobile */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#inicio" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md">Inicio</a>
            <a href="#experiencia" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md">Experiencia</a>
            <a href="#proyectos" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md">Proyectos</a>
            <a href="#habilidades" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md">Habilidades</a>
            <a href="#contacto" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md">Contacto</a>
          </div>
        </div>
      )}
    </nav>
  )
}