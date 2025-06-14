'use client'

import { useState } from 'react'
import { ArrowLeft, Calendar, Clock, Target, Dumbbell, Users, Play, CheckCircle, Star, Download, Share2, Heart } from 'lucide-react'
import Link from 'next/link'

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  notes?: string
}

interface Workout {
  day: string
  title: string
  duration: string
  exercises: Exercise[]
}

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
  instructor: string
  workouts: Workout[]
  overview: string
  benefits: string[]
  requirements: string[]
}

// Données simulées pour le programme
const programData: Program = {
  id: '1',
  title: 'Programme Débutant Full Body',
  description: 'Un programme complet pour débuter la musculation en toute sécurité avec des exercices fondamentaux',
  duration: '8 semaines',
  level: 'Débutant',
  category: 'Full Body',
  workoutsPerWeek: 3,
  equipment: ['Haltères', 'Banc', 'Barre'],
  goals: ['Prise de muscle', 'Force', 'Technique'],
  image: '🏋️‍♂️',
  rating: 4.8,
  participants: 1250,
  instructor: 'Coach Sarah Martin',
  overview: 'Ce programme de 8 semaines est spécialement conçu pour les débutants qui souhaitent s\'initier à la musculation de manière progressive et sécurisée. Chaque séance travaille l\'ensemble du corps avec des exercices fondamentaux qui vous permettront de développer une base solide.',
  benefits: [
    'Apprentissage des mouvements de base',
    'Développement de la force fonctionnelle',
    'Amélioration de la posture',
    'Augmentation de la masse musculaire',
    'Boost du métabolisme',
    'Confiance en soi renforcée'
  ],
  requirements: [
    'Aucune expérience préalable requise',
    'Accès à une salle de sport ou équipement de base',
    '3 séances par semaine',
    'Motivation et régularité'
  ],
  workouts: [
    {
      day: 'Jour 1',
      title: 'Full Body A',
      duration: '45-60 min',
      exercises: [
        { name: 'Échauffement cardio', sets: 1, reps: '10 min', rest: '-', notes: 'Vélo ou tapis de course' },
        { name: 'Squat avec haltères', sets: 3, reps: '12-15', rest: '60s', notes: 'Gardez le dos droit' },
        { name: 'Développé couché haltères', sets: 3, reps: '10-12', rest: '90s', notes: 'Contrôlez la descente' },
        { name: 'Rowing haltère', sets: 3, reps: '12-15', rest: '60s', notes: 'Serrez les omoplates' },
        { name: 'Développé militaire assis', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Curl biceps', sets: 2, reps: '12-15', rest: '45s' },
        { name: 'Extension triceps', sets: 2, reps: '12-15', rest: '45s' },
        { name: 'Planche', sets: 3, reps: '30-45s', rest: '60s' }
      ]
    },
    {
      day: 'Jour 2',
      title: 'Full Body B',
      duration: '45-60 min',
      exercises: [
        { name: 'Échauffement dynamique', sets: 1, reps: '10 min', rest: '-' },
        { name: 'Soulevé de terre roumain', sets: 3, reps: '10-12', rest: '90s', notes: 'Gardez la barre proche du corps' },
        { name: 'Développé incliné haltères', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Tirage horizontal', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Fentes alternées', sets: 3, reps: '10 par jambe', rest: '60s' },
        { name: 'Élévations latérales', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Curl marteau', sets: 2, reps: '12-15', rest: '45s' },
        { name: 'Dips assistés', sets: 2, reps: '8-12', rest: '60s' }
      ]
    },
    {
      day: 'Jour 3',
      title: 'Full Body C',
      duration: '45-60 min',
      exercises: [
        { name: 'Échauffement articulaire', sets: 1, reps: '10 min', rest: '-' },
        { name: 'Goblet squat', sets: 3, reps: '15-20', rest: '60s', notes: 'Descendez bien bas' },
        { name: 'Pompes (adaptées)', sets: 3, reps: '8-15', rest: '60s', notes: 'Sur genoux si nécessaire' },
        { name: 'Rowing inversé', sets: 3, reps: '10-15', rest: '60s' },
        { name: 'Step-ups', sets: 3, reps: '10 par jambe', rest: '60s' },
        { name: 'Pike push-ups', sets: 2, reps: '8-12', rest: '60s' },
        { name: 'Curl concentré', sets: 2, reps: '12-15', rest: '45s' },
        { name: 'Gainage latéral', sets: 2, reps: '20-30s par côté', rest: '45s' }
      ]
    }
  ]
}

export default function ProgramDetail() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedWorkout, setSelectedWorkout] = useState(0)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const program = programData // En réalité, on récupérerait les données selon params.id

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/programs" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="h-6 w-6" />
              <span>Retour aux programmes</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">FitAI Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite ? 'bg-red-500/30 text-red-400' : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Program Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Program Image */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-2xl p-12 text-center">
                <div className="text-8xl mb-4">{program.image}</div>
                <div className="flex items-center justify-center space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="font-semibold">{program.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{program.participants} participants</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Info */}
            <div className="lg:w-2/3">
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  program.level === 'Débutant' ? 'bg-green-500/30 text-green-200' :
                  program.level === 'Intermédiaire' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {program.level}
                </span>
                <span className="text-purple-400 font-semibold">{program.category}</span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">{program.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{program.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Clock className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{program.duration}</div>
                  <div className="text-gray-400 text-sm">Durée</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Calendar className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{program.workoutsPerWeek}/sem</div>
                  <div className="text-gray-400 text-sm">Séances</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{program.goals.length}</div>
                  <div className="text-gray-400 text-sm">Objectifs</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Dumbbell className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{program.equipment.length}</div>
                  <div className="text-gray-400 text-sm">Équipements</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    isEnrolled
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <CheckCircle className="h-6 w-6" />
                      <span>Inscrit</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-6 w-6" />
                      <span>Commencer le programme</span>
                    </>
                  )}
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Télécharger PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8">
          <div className="flex border-b border-white/20">
            {[
              { id: 'overview', label: 'Aperçu' },
              { id: 'workouts', label: 'Séances' },
              { id: 'instructor', label: 'Coach' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Description du programme</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{program.overview}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Bénéfices</h4>
                    <ul className="space-y-2">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3 text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Prérequis</h4>
                    <ul className="space-y-2">
                      {program.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center space-x-3 text-gray-300">
                          <Target className="h-5 w-5 text-purple-400 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Équipement nécessaire</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="bg-purple-500/30 text-purple-200 px-4 py-2 rounded-lg font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Objectifs</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.goals.map((goal, index) => (
                      <span
                        key={index}
                        className="bg-green-500/30 text-green-200 px-4 py-2 rounded-lg font-semibold"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Workouts Tab */}
            {activeTab === 'workouts' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Séances d'entraînement</h3>
                
                {/* Workout Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {program.workouts.map((workout, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedWorkout(index)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        selectedWorkout === index
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/20 text-gray-300 hover:bg-white/30'
                      }`}
                    >
                      {workout.day}
                    </button>
                  ))}
                </div>

                {/* Selected Workout */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-white">{program.workouts[selectedWorkout].title}</h4>
                      <p className="text-gray-400">{program.workouts[selectedWorkout].duration}</p>
                    </div>
                    <Link
                      href={`/workout/program-${program.id}-day-${selectedWorkout + 1}`}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                    >
                      <Play className="h-5 w-5" />
                      <span>Commencer</span>
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {program.workouts[selectedWorkout].exercises.map((exercise, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-white mb-1">{exercise.name}</h5>
                          {exercise.notes && (
                            <p className="text-sm text-gray-400">{exercise.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-300">
                          <div className="text-center">
                            <div className="font-semibold text-white">{exercise.sets}</div>
                            <div>séries</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-white">{exercise.reps}</div>
                            <div>reps</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-white">{exercise.rest}</div>
                            <div>repos</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Instructor Tab */}
            {activeTab === 'instructor' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Votre coach</h3>
                
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-3xl">
                      👩‍💼
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{program.instructor}</h4>
                      <p className="text-purple-400">Coach certifiée • 8 ans d&apos;expérience</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-white">4.9</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">5,200+ étudiants</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">À propos</h5>
                      <p className="text-gray-300">
                        Sarah est une coach certifiée avec plus de 8 ans d'expérience dans l'accompagnement 
                        de débutants. Elle se spécialise dans l'apprentissage des mouvements fondamentaux 
                        et la progression sécurisée.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-white mb-2">Spécialisations</h5>
                      <div className="flex flex-wrap gap-2">
                        {['Musculation débutant', 'Technique', 'Prévention blessures', 'Motivation'].map((spec, index) => (
                          <span key={index} className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-lg text-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-white mb-2">Certifications</h5>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Certified Strength and Conditioning Specialist (CSCS)</li>
                        <li>• Personal Trainer Certification (NASM)</li>
                        <li>• Corrective Exercise Specialist</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}