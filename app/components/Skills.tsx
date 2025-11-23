interface Skill {
    name: string
    icon?: string
    level: string
  }
  
  interface SkillsProps {
    skills?: Skill[]
  }
  
  export default function Skills({ skills = [] }: SkillsProps) {
    return (
      <section id="habilidades" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Habilidades Técnicas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No hay habilidades disponibles</p>
            ) : (
              skills.map((skill, index) => (
                <div key={index} className="card text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">{skill.icon || '💻'}</div>
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  <p className="text-sm text-gray-500">{skill.level}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    )
  }