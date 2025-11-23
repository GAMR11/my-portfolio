import { FaBriefcase } from 'react-icons/fa'

interface ExperienceItem {
  position: string
  company: string
  period: string
  description: string
}

interface ExperienceProps {
  experiences?: ExperienceItem[]
}

export default function Experience({ experiences = [] }: ExperienceProps) {
  return (
    <section id="experiencia" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Experiencia Profesional</h2>
        
        <div className="space-y-8">
          {experiences.length === 0 ? (
            <p className="text-center text-gray-500">No hay experiencias disponibles</p>
          ) : (
            experiences.map((exp, index) => (
              <div key={index} className="card flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaBriefcase className="text-blue-600" size={24} />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-blue-600 font-semibold">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-2">{exp.period}</p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}