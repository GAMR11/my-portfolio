export default function Footer() {
    return (
      <footer id="contacto" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¡Hablemos!</h2>
          <p className="text-gray-400 mb-6">
            Estoy disponible para nuevos proyectos y oportunidades
          </p>
          <a href="mailto:gamr130898@gmail.com" className="btn-primary inline-block">
            Enviar Mensaje
          </a>
          <div className="mt-8 text-gray-500 text-sm">
            © {new Date().getFullYear()} Mi Portafolio.
          </div>
        </div>
      </footer>
    )
  }