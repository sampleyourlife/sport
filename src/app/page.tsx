'use client'

import { useState } from 'react'
import { Search, Dumbbell, Calendar, Zap, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [workoutType, setWorkoutType] = useState<'single' | 'weekly'>('single')
  const [generatedWorkouts, setGeneratedWorkouts] = useState<{
    id: number;
    title: string;
    exercises: string[] | number;
    duration?: string;
    difficulty?: string;
    day?: string;
  }[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateWorkout = async () => {
    if (!searchQuery.trim()) return
    
    setIsGenerating(true)
    // Simulation de génération IA
    setTimeout(() => {
      if (workoutType === 'single') {
        setGeneratedWorkouts([{
          id: 1,
          title: 'Séance Personnalisée',
          exercises: ['Développé couché', 'Squats', 'Tractions'],
          duration: '45 min',
          difficulty: 'Intermédiaire'
        }])
      } else {
        setGeneratedWorkouts([
          { id: 1, day: 'Lundi', title: 'Pectoraux & Triceps', exercises: 5 },
          { id: 2, day: 'Mardi', title: 'Dos & Biceps', exercises: 6 },
          { id: 3, day: 'Mercredi', title: 'Jambes', exercises: 7 },
          { id: 4, day: 'Jeudi', title: 'Épaules', exercises: 5 },
          { id: 5, day: 'Vendredi', title: 'Full Body', exercises: 8 }
        ])
      }
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">FitAI Pro</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Mes Séances</a>
              <Link href="/programs" className="text-gray-300 hover:text-white transition-colors">Programmes</Link>
              <Link href="/nutrition" className="text-gray-300 hover:text-white transition-colors">Nutrition</Link>
              <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">Profil</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section avec barre de recherche */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Générez vos séances avec l&apos;<span className="text-purple-400">IA</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Créez des programmes personnalisés en quelques secondes
          </p>
        </div>

        {/* Barre de recherche style Google */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-2xl">
            <div className="flex items-center">
              <div className="flex-1 flex items-center px-6">
                <Search className="h-6 w-6 text-gray-400 mr-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Séance pectoraux avec haltères, niveau débutant, 45 minutes..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerateWorkout()}
                />
              </div>
              <div className="flex items-center space-x-4 pr-2">
                <select 
                  value={workoutType} 
                  onChange={(e) => setWorkoutType(e.target.value as 'single' | 'weekly')}
                  className="bg-white/20 text-white rounded-lg px-4 py-2 outline-none"
                >
                  <option value="single" className="text-black">Séance unique</option>
                  <option value="weekly" className="text-black">Programme semaine</option>
                </select>
                <button
                  onClick={handleGenerateWorkout}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Génération...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      <span>Générer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Options avancées */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-center">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
              <span>Options avancées (équipements, niveau, durée...)</span>
            </button>
          </div>
        </div>

        {/* Résultats générés */}
        {generatedWorkouts.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              {workoutType === 'single' ? 'Votre séance générée' : 'Votre programme de la semaine'}
            </h3>
            
            <div className={`grid gap-6 ${
              workoutType === 'weekly' ? 'grid-cols-1 md:grid-cols-5' : 'grid-cols-1 md:grid-cols-1 max-w-md mx-auto'
            }`}>
              {generatedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  {workoutType === 'weekly' ? (
                    <>
                      <div className="text-center">
                        <div className="text-purple-400 font-semibold mb-2">{workout.day}</div>
                        <h4 className="text-white font-bold text-lg mb-3">{workout.title}</h4>
                        <div className="text-gray-300 text-sm mb-4">
                          {workout.exercises} exercices
                        </div>
                        <button className="w-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg transition-all duration-200 group-hover:scale-105">
                          Voir détails
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <h4 className="text-white font-bold text-xl mb-4">{workout.title}</h4>
                        <div className="space-y-2 mb-6">
                          {Array.isArray(workout.exercises) ? workout.exercises.map((exercise: string, index: number) => (
                            <div key={index} className="text-gray-300 bg-white/5 rounded-lg p-2">
                              {exercise}
                            </div>
                          )) : null}
                        </div>
                        <div className="flex justify-between text-sm text-gray-400 mb-4">
                          <span>Durée: {workout.duration}</span>
                          <span>Niveau: {workout.difficulty}</span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200">
                          Commencer la séance
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action si pas de résultats */}
        {generatedWorkouts.length === 0 && (
          <div className="text-center mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Programmes Personnalisés</h3>
                <p className="text-gray-300">Créez des programmes sur mesure adaptés à vos objectifs</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">IA Avancée</h3>
                <p className="text-gray-300">Intelligence artificielle gratuite pour optimiser vos entraînements</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Settings className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Critères Avancés</h3>
                <p className="text-gray-300">Spécifiez vos équipements, niveau et préférences</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
