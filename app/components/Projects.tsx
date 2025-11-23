import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Image from 'next/image'

interface Project {
  name: string
  description: string
  technologies?: string[]
  github?: string
  demo?: string
  image?: string
}

interface ProjectsProps {
  projects?: Project[]
}

export default function Projects({ projects = [] }: ProjectsProps) {
  return (
    <section id="proyectos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Proyectos Destacados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No hay proyectos disponibles</p>
          ) : (
            projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                {/* Imagen del proyecto */}
                {project.image && (
                  <div className="relative w-full h-48 bg-gray-100">
                    <Image 
                      src={project.image} 
                      alt={project.name}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* Título */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  
                  {/* Descripción */}
                  <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                  
                  {/* Tecnologías */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Tecnologías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Enlaces */}
                  <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1 text-sm font-medium"
                      >
                        <FaGithub size={18} /> Código
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1 text-sm font-medium"
                      >
                        <FaExternalLinkAlt size={16} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}