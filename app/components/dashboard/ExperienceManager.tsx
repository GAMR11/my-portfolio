'use client'
import { useState } from 'react'
import { Experience, addExperience, updateExperience, deleteExperience } from '@/lib/firestore'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

interface ExperienceManagerProps {
  experiences: Experience[]
  onUpdate: () => void
}

export default function ExperienceManager({ experiences, onUpdate }: ExperienceManagerProps) {
  // Asegurar que experiences sea un array válido con IDs
  const validExperiences = Array.isArray(experiences) ? experiences.filter(exp => exp && exp.id) : []
  
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    position: '',
    company: '',
    period: '',
    description: ''
  })

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      period: '',
      description: ''
    })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addExperience(formData)
      resetForm()
      onUpdate()
    } catch (error) {
      alert('Error al agregar experiencia')
    }
  }

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id)
    setFormData({
      position: exp.position,
      company: exp.company,
      period: exp.period,
      description: exp.description
    })
    setIsAdding(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    
    try {
      await updateExperience({ ...formData, id: editingId })
      resetForm()
      onUpdate()
    } catch (error) {
      alert('Error al actualizar experiencia')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta experiencia?')) return
    
    try {
      await deleteExperience(id)
      onUpdate()
    } catch (error) {
      alert('Error al eliminar experiencia')
    }
  }

  return (
    <div className="space-y-6">
      {/* Botón Agregar - siempre visible cuando no hay formulario activo */}
      {!isAdding && !editingId && (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <FaPlus /> Nueva Experiencia
        </button>
      )}

      {/* Formulario */}
      {(isAdding || editingId) && (
        <form onSubmit={editingId ? handleUpdate : handleAdd} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-bold text-lg">
            {editingId ? 'Editar Experiencia' : 'Nueva Experiencia'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Periodo</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="Ej: 2020 - 2023"
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

      {/* Lista */}
      <div className="space-y-4">
        {validExperiences.map((exp) => (
          <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <h4 className="font-bold text-lg">{exp.position}</h4>
                <p className="text-blue-600 font-semibold">{exp.company}</p>
                <p className="text-gray-500 text-sm">{exp.period}</p>
                <p className="text-gray-600 mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(exp)}
                  className="text-blue-600 hover:text-blue-700 p-2"
                  title="Editar"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                  title="Eliminar"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {validExperiences.length === 0 && (
          <p className="text-center text-gray-500 py-8">No hay experiencias agregadas</p>
        )}
      </div>
    </div>
  )
}