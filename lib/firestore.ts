import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from './firebase'

const PORTFOLIO_DOC = 'porfolio/data'

// Tipos
export interface HeroData {
  name: string
  title: string
  bio: string
  email: string
  github: string
  linkedin: string
}

export interface Experience {
  id: string
  position: string
  company: string
  period: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string  // ← NUEVO
}

export interface Skill {
  id: string
  name: string
  icon: string
  level: string
}

export interface PortfolioData {
  hero: HeroData
  experiences: Experience[]
  projects: Project[]
  skills: Skill[]
}

// Obtener todos los datos del portafolio
export async function getPortfolioData(): Promise<PortfolioData | null> {
  try {
    const docRef = doc(db, PORTFOLIO_DOC)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData
    }
    return null
  } catch (error) {
    console.error('Error obteniendo datos:', error)
    throw error
  }
}

// Actualizar Hero
export async function updateHero(heroData: HeroData) {
  try {
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, { hero: heroData })
  } catch (error) {
    console.error('Error actualizando hero:', error)
    throw error
  }
}

// CRUD Experiencias
export async function addExperience(experience: Omit<Experience, 'id'>) {
  try {
    const newExperience = {
      ...experience,
      id: Date.now().toString()
    }
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, {
      experiences: arrayUnion(newExperience)
    })
    return newExperience
  } catch (error) {
    console.error('Error agregando experiencia:', error)
    throw error
  }
}

export async function updateExperience(experience: Experience) {
  try {
    const data = await getPortfolioData()
    if (!data) return
    
    const updatedExperiences = data.experiences.map(exp => 
      exp.id === experience.id ? experience : exp
    )
    
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, { experiences: updatedExperiences })
  } catch (error) {
    console.error('Error actualizando experiencia:', error)
    throw error
  }
}

export async function deleteExperience(experienceId: string) {
  try {
    const data = await getPortfolioData()
    if (!data) return
    
    const experienceToDelete = data.experiences.find(exp => exp.id === experienceId)
    if (!experienceToDelete) return
    
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, {
      experiences: arrayRemove(experienceToDelete)
    })
  } catch (error) {
    console.error('Error eliminando experiencia:', error)
    throw error
  }
}

// CRUD Proyectos
export async function addProject(project: Omit<Project, 'id'>) {
  try {
    const newProject = {
      ...project,
      id: Date.now().toString()
    }
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, {
      projects: arrayUnion(newProject)
    })
    return newProject
  } catch (error) {
    console.error('Error agregando proyecto:', error)
    throw error
  }
}

export async function updateProject(project: Project) {
  try {
    const data = await getPortfolioData()
    if (!data) return
    
    const updatedProjects = data.projects.map(proj => 
      proj.id === project.id ? project : proj
    )
    
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, { projects: updatedProjects })
  } catch (error) {
    console.error('Error actualizando proyecto:', error)
    throw error
  }
}

export async function deleteProject(projectId: string) {
  try {
    const data = await getPortfolioData()
    if (!data) return
    
    const projectToDelete = data.projects.find(proj => proj.id === projectId)
    if (!projectToDelete) return
    
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, {
      projects: arrayRemove(projectToDelete)
    })
  } catch (error) {
    console.error('Error eliminando proyecto:', error)
    throw error
  }
}

// CRUD Habilidades
export async function addSkill(skill: Omit<Skill, 'id'>) {
  try {
    const newSkill = {
      ...skill,
      id: Date.now().toString()
    }
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, {
      skills: arrayUnion(newSkill)
    })
    return newSkill
  } catch (error) {
    console.error('Error agregando habilidad:', error)
    throw error
  }
}

export async function updateSkill(skill: Skill) {
  try {
    const data = await getPortfolioData()
    if (!data) return
    
    const updatedSkills = data.skills.map(sk => 
      sk.id === skill.id ? skill : sk
    )
    
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, { skills: updatedSkills })
  } catch (error) {
    console.error('Error actualizando habilidad:', error)
    throw error
  }
}

export async function deleteSkill(skillId: string) {
  try {
    const data = await getPortfolioData()
    if (!data) return
    
    const skillToDelete = data.skills.find(sk => sk.id === skillId)
    if (!skillToDelete) return
    
    const docRef = doc(db, PORTFOLIO_DOC)
    await updateDoc(docRef, {
      skills: arrayRemove(skillToDelete)
    })
  } catch (error) {
    console.error('Error eliminando habilidad:', error)
    throw error
  }
}