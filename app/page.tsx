'use client'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'
import { getPortfolioData, PortfolioData } from '@/lib/firestore'

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await getPortfolioData()
      if (data) {
        setPortfolioData(data)
      }
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando portafolio...</p>
        </div>
      </div>
    )
  }

  return (
    <main>
      <Navbar />
      <Hero data={portfolioData?.hero} />
      <Experience experiences={portfolioData?.experiences || []} />
      <Projects projects={portfolioData?.projects || []} />
      <Skills skills={portfolioData?.skills || []} />
      <Footer />
    </main>
  )
}