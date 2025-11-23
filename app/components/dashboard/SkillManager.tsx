'use client'
import { useState } from 'react'
import { Skill, addSkill, updateSkill, deleteSkill } from '@/lib/firestore'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

interface SkillManagerProps {
  skills: Skill[]
  onUpdate: () => void
}

export default function SkillManager({ skills, onUpdate }: SkillManagerProps) {
  // Asegurar que skills sea un array válido con IDs
  const validSkills = Array.isArray(skills) ? skills.filter(skill => skill && skill.id) : []
  
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    icon: '💻',
    level: 'Básico'
  })

  const levels = ['Básico', 'Intermedio', 'Avanzado', 'Experto']
  const commonIcons = ['💻', '⚛️', '🔥', '⚡', '🎨', '📱', '🗄️', '🌐', '🔧', '📦', '🐍', '☕', '🔷', '🟢', '▲']

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '💻',
      level: 'Básico'
    })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addSkill(formData)
      resetForm()
      onUpdate()
    } catch (error) {
      alert('Error al agregar habilidad')
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id)
    setFormData({
      name: skill.name,
      icon: skill.icon,
      level: skill.level
    })
    setIsAdding(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    
    try {
      await updateSkill({ ...formData, id: editingId })
      resetForm()
      onUpdate()
    } catch (error) {
      alert('Error al actualizar habilidad')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta habilidad?')) return
    
    try {
      await deleteSkill(id)
      onUpdate()
    } catch (error) {
      alert('Error al eliminar habilidad')
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
          <FaPlus /> Nueva Habilidad
        </button>
      )}

      {(isAdding || editingId) && (
        <form onSubmit={editingId ? handleUpdate : handleAdd} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-bold text-lg">
            {editingId ? 'Editar Habilidad' : 'Nueva Habilidad'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: JavaScript"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icono</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-20 px-4 py-2 border border-gray-300 rounded-lg text-center text-2xl"
                maxLength={2}
                required
              />
              <span className="text-gray-600 self-center">← Escribe o selecciona un emoji</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {commonIcons.map((icon, idx) => (
                <button
                  key={`icon-${icon}-${idx}`}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`text-2xl p-2 rounded-lg border-2 hover:border-blue-600 ${
                    formData.icon === icon ? 'border-blue-600 bg-primary-50' : 'border-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Dominio</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              required
            >
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {validSkills.map((skill) => (
          <div key={skill.id} className="bg-white border border-gray-200 rounded-lg p-4 text-center relative group">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(skill)}
                className="text-blue-600 hover:text-blue-700 p-1 bg-white rounded shadow"
                title="Editar"
              >
                <FaEdit size={14} />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="text-red-600 hover:text-red-700 p-1 bg-white rounded shadow"
                title="Eliminar"
              >
                <FaTrash size={14} />
              </button>
            </div>
            <div className="text-4xl mb-2">{skill.icon}</div>
            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
            <p className="text-sm text-gray-500">{skill.level}</p>
          </div>
        ))}
        
        {validSkills.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-8">No hay habilidades agregadas</p>
        )}
      </div>
    </div>
  )
}