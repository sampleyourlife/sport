'use client'

import { useState } from 'react'
import { ArrowLeft, Calendar, Clock, Dumbbell, Users, Zap, Filter } from 'lucide-react'
import Link from 'next/link'

interface Program {
  id: string
  title: string
  description: string
  duration: string
  level: string
  category: string
  workoutsPerWeek: number
  equipment: string[]
  goals: string[]
  image: string
  rating: number
  participants: number
}

const programs: Program[] = [
  {
    id: '1',
    title: 'Programme Débutant Full Body',
    description: 'Un programme complet pour débuter la musculation en toute sécurité',
    duration: '8 semaines',
    level: 'Débutant',
    category: 'Full Body',
    workoutsPerWeek: 3,
    equipment: ['Haltères', 'Banc'],
    goals: ['Prise de muscle', 'Force'],
    image: '🏋️‍♂️',
    rating: 4.8,
    participants: 1250
  },
  {
    id: '2',
    title: 'Push Pull Legs Intermédiaire',
    description: 'Programme classique PPL pour développer force et volume musculaire',
    duration: '12 semaines',
    level: 'Intermédiaire',
    category: 'Push/Pull/Legs',
    workoutsPerWeek: 6,
    equipment: ['Barre', 'Haltères', 'Machines'],
    goals: ['Hypertrophie', 'Force'],
    image: '💪',
    rating: 4.9,
    participants: 2100
  },
  {
    id: '3',
    title: 'Cardio HIIT Perte de Poids',
    description: 'Entraînements intensifs pour brûler les graisses rapidement',
    duration: '6 semaines',
    level: 'Tous niveaux',
    category: 'Cardio',
    workoutsPerWeek: 4,
    equipment: ['Poids du corps'],
    goals: ['Perte de poids', 'Endurance'],
    image: '🔥',
    rating: 4.7,
    participants: 890
  },
  {
    id: '4',
    title: 'Powerlifting Avancé',
    description: 'Programme spécialisé pour améliorer vos performances aux 3 mouvements',
    duration: '16 semaines',
    level: 'Avancé',
    category: 'Force',
    workoutsPerWeek: 4,
    equipment: ['Barre olympique', 'Rack', 'Banc'],
    goals: ['Force maximale', 'Technique'],
    image: '🏆',
    rating: 4.9,
    participants: 450
  },
  {
    id: '5',
    title: 'Yoga & Mobilité',
    description: 'Améliorez votre flexibilité et votre bien-être mental',
    duration: '4 semaines',
    level: 'Tous niveaux',
    category: 'Bien-être',
    workoutsPerWeek: 5,
    equipment: ['Tapis de yoga'],
    goals: ['Flexibilité', 'Relaxation'],
    image: '🧘‍♀️',
    rating: 4.6,
    participants: 670
  },
  {
    id: '6',
    title: 'Calisthenics Progression',
    description: 'Maîtrisez les mouvements au poids du corps progressivement',
    duration: '10 semaines',
    level: 'Intermédiaire',
    category: 'Calisthenics',
    workoutsPerWeek: 4,
    equipment: ['Barre de traction', 'Barres parallèles'],
    goals: ['Force fonctionnelle', 'Agilité'],
    image: '🤸‍♂️',
    rating: 4.8,
    participants: 780
  }
]

export default function Programs() {
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous')
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')
  const [searchTerm, setSearchTerm] = useState('')

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé']
  const categories = ['Toutes', 'Full Body', 'Push/Pull/Legs', 'Cardio', 'Force', 'Bien-être', 'Calisthenics']

  const filteredPrograms = programs.filter(program => {
    const matchesLevel = selectedLevel === 'Tous' || program.level === selectedLevel
    const matchesCategory = selectedCategory === 'Toutes' || program.category === selectedCategory
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesLevel && matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="h-6 w-6" />
              <span>Retour</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">FitAI Pro</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Mes Programmes</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Profil</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Programmes d&apos;<span className="text-purple-400">Entraînement</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Découvrez nos programmes conçus par des experts pour tous les niveaux
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un programme..."
                className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400 transition-colors"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-white/20 text-white rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400"
              >
                {levels.map(level => (
                  <option key={level} value={level} className="text-black">{level}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/20 text-white rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="text-black">{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
            >
              {/* Program Image/Icon */}
              <div className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 p-8 text-center">
                <div className="text-6xl mb-4">{program.image}</div>
                <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{program.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{program.participants}</span>
                  </div>
                </div>
              </div>

              {/* Program Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    program.level === 'Débutant' ? 'bg-green-500/30 text-green-200' :
                    program.level === 'Intermédiaire' ? 'bg-yellow-500/30 text-yellow-200' :
                    'bg-red-500/30 text-red-200'
                  }`}>
                    {program.level}
                  </span>
                  <span className="text-purple-400 text-sm font-semibold">{program.category}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {program.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {program.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="h-4 w-4" />
                      <span>{program.workoutsPerWeek}/semaine</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {program.goals.slice(0, 2).map((goal, index) => (
                      <span
                        key={index}
                        className="bg-purple-500/30 text-purple-200 px-2 py-1 rounded text-xs"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={`/programs/${program.id}`}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold text-center transition-all duration-200"
                  >
                    Voir détails
                  </Link>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg transition-all duration-200">
                    <Zap className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-4">Aucun programme trouvé</h3>
            <p className="text-gray-300 mb-6">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => {
                setSelectedLevel('Tous')
                setSelectedCategory('Toutes')
                setSearchTerm('')
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30 mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Créez votre programme personnalisé</h2>
          <p className="text-gray-300 mb-6">
            Utilisez notre IA pour générer un programme adapté à vos objectifs spécifiques
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200"
          >
            <Zap className="h-6 w-6" />
            <span>Générer avec l&apos;IA</span>
          </Link>
        </div>
      </div>
    </div>
  )
}