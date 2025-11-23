'use client'
import { useState } from 'react'
import { Project, addProject, updateProject, deleteProject } from '@/lib/firestore'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaImage } from 'react-icons/fa'
import Image from 'next/image'

interface ProjectManagerProps {
  projects: Project[]
  onUpdate: () => void
}

export default function ProjectManager({ projects, onUpdate }: ProjectManagerProps) {
  const validProjects = Array.isArray(projects) ? projects.filter(proj => proj && proj.id) : []
  
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: [],
    github: '',
    demo: '',
    image: ''
  })
  const [techInput, setTechInput] = useState('')
  const [imageError, setImageError] = useState(false)

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: [],
      github: '',
      demo: '',
      image: ''
    })
    setTechInput('')
    setImageError(false)
    setIsAdding(false)
    setEditingId(null)
  }

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      })
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    })
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await addProject(formData)
      resetForm()
      onUpdate()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al agregar proyecto')
    }
  }

  const handleEdit = (proj: Project) => {
    setEditingId(proj.id)
    setFormData({
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies,
      github: proj.github || '',
      demo: proj.demo || '',
      image: proj.image || ''
    })
    setImageError(false)
    setIsAdding(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    
    try {
      await updateProject({ 
        ...formData, 
        id: editingId
      })
      
      resetForm()
      onUpdate()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al actualizar proyecto')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return
    
    try {
      await deleteProject(id)
      onUpdate()
    } catch (error) {
      alert('Error al eliminar proyecto')
    }
  }

  return (
    <div className="space-y-6">
      {!isAdding && !editingId && (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <FaPlus /> Nuevo Proyecto
        </button>
      )}

      {(isAdding || editingId) && (
        <form onSubmit={editingId ? handleUpdate : handleAdd} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-bold text-lg">
            {editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Proyecto</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* URL de Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaImage className="inline mr-2" />
              URL de la Imagen (opcional)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value })
                setImageError(false)
              }}
              placeholder="https://ejemplo.com/imagen-proyecto.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              Puedes usar servicios como <a href="https://imgur.com" target="_blank" className="text-blue-600 hover:underline">Imgur</a>, 
              <a href="https://postimages.org" target="_blank" className="text-blue-600 hover:underline ml-1">PostImages</a>, o 
              <a href="https://imgbb.com" target="_blank" className="text-blue-600 hover:underline ml-1">ImgBB</a> para alojar tus imágenes gratis
            </p>
            
            {/* Preview de la imagen */}
            {formData.image && !imageError && (
              <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                <Image 
                  src={formData.image} 
                  alt="Preview" 
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  unoptimized
                />
              </div>
            )}
            
            {imageError && formData.image && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                ⚠️ No se puede cargar la imagen. Verifica que la URL sea correcta y que la imagen sea accesible públicamente.
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tecnologías</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder="Escribe una tecnología y presiona Enter"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, idx) => (
                <span
                  key={`${tech}-${idx}`}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL (opcional)</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/usuario/repo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demo URL (opcional)</label>
              <input
                type="url"
                value={formData.demo}
                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                placeholder="https://proyecto-demo.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              <FaSave /> Guardar
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              <FaTimes /> Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validProjects.map((proj) => (
          <div key={proj.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {proj.image && (
              <div className="relative w-full h-48 bg-gray-100">
                <Image 
                  src={proj.image} 
                  alt={proj.name}
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
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{proj.name}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(proj)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Editar"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Eliminar"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{proj.description}</p>
              <div className="flex flex-wrap gap-2">
                {proj.technologies.map((tech, idx) => (
                  <span key={`${proj.id}-${tech}-${idx}`} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {validProjects.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-8">No hay proyectos agregados</p>
        )}
      </div>
    </div>
  )
}