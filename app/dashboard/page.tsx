'use client'
import { useState, useEffect } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaBriefcase, FaProjectDiagram, FaCode, FaSignOutAlt, FaHome } from 'react-icons/fa'
import Link from 'next/link'
import { getPortfolioData, PortfolioData } from '@/lib/firestore'
import HeroEditor from '../components/dashboard/HeroEditor'
import ExperienceManager from '../components/dashboard/ExperienceManager'
import ProjectManager from '../components/dashboard/ProjectManager'
import SkillManager from '../components/dashboard/SkillManager'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('perfil')
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'perfil', name: 'Perfil', icon: FaUser },
    { id: 'experiencia', name: 'Experiencia', icon: FaBriefcase },
    { id: 'proyectos', name: 'Proyectos', icon: FaProjectDiagram },
    { id: 'habilidades', name: 'Habilidades', icon: FaCode },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await getPortfolioData()
      setPortfolioData(data)
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <Link href="/" className="text-blue-600 hover:text-primary-600 flex items-center gap-2 text-sm">
                  <FaHome /> Ver Portafolio
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  <FaSignOutAlt /> Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {tabs.find(t => t.id === activeTab)?.name}
                </h2>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                  </div>
                ) : (
                  <>
                    {activeTab === 'perfil' && portfolioData && (
                      <HeroEditor initialData={portfolioData.hero} onSave={loadData} />
                    )}

                    {activeTab === 'experiencia' && portfolioData && (
                      <ExperienceManager 
                        experiences={portfolioData.experiences} 
                        onUpdate={loadData} 
                      />
                    )}

                    {activeTab === 'proyectos' && portfolioData && (
                      <ProjectManager 
                        projects={portfolioData.projects} 
                        onUpdate={loadData} 
                      />
                    )}

                    {activeTab === 'habilidades' && portfolioData && (
                      <SkillManager 
                        skills={portfolioData.skills} 
                        onUpdate={loadData} 
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}