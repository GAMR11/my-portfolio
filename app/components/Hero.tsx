import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

interface HeroData {
  name?: string
  title?: string
  bio?: string
  github?: string
  linkedin?: string
  email?: string
}

interface HeroProps {
  data?: HeroData
}

export default function Hero({ data }: HeroProps) {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {data?.name || 'Tu Nombre'}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-600 mb-6">
            {data?.title || 'Desarrollador Web Full Stack'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {data?.bio || 'Apasionado por crear experiencias web excepcionales y soluciones innovadoras.'}
          </p>
          
          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#proyectos" className="btn-primary">
              Ver Proyectos
            </a>
            <a href="#contacto" className="btn-secondary">
              Contáctame
            </a>
          </div>

          {/* Redes Sociales */}
          <div className="flex gap-6 justify-center">
            <a href={data?.github || '#'} target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-blue-600 transition">
              <FaGithub size={32} />
            </a>
            <a href={data?.linkedin || '#'} target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-600 transition">
              <FaLinkedin size={32} />
            </a>
            <a href={`mailto:${data?.email || ''}`}
               className="text-gray-600 hover:text-blue-600 transition">
              <FaEnvelope size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}