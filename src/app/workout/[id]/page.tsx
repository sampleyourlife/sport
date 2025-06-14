'use client'

import { useState } from 'react'
import { ArrowLeft, Clock, Target, Dumbbell, Play, RotateCcw, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Exercise {
  id: number
  name: string
  sets: number
  reps: string
  rest: string
  instructions: string
  muscleGroups: string[]
}

interface WorkoutDetail {
  id: string
  title: string
  duration: string
  difficulty: string
  description: string
  exercises: Exercise[]
}

// Données simulées
const workoutData: WorkoutDetail = {
  id: '1',
  title: 'Séance Pectoraux & Triceps',
  duration: '45 min',
  difficulty: 'Intermédiaire',
  description: 'Une séance complète pour développer la force et le volume des pectoraux et triceps.',
  exercises: [
    {
      id: 1,
      name: 'Développé couché',
      sets: 4,
      reps: '8-10',
      rest: '2-3 min',
      instructions: 'Allongez-vous sur le banc, saisissez la barre avec une prise légèrement plus large que les épaules. Descendez la barre jusqu\'à la poitrine puis poussez vers le haut.',
      muscleGroups: ['Pectoraux', 'Triceps', 'Deltoïdes antérieurs']
    },
    {
      id: 2,
      name: 'Développé incliné haltères',
      sets: 3,
      reps: '10-12',
      rest: '90 sec',
      instructions: 'Sur un banc incliné à 30-45°, tenez un haltère dans chaque main. Poussez les haltères vers le haut en contractant les pectoraux.',
      muscleGroups: ['Pectoraux supérieurs', 'Triceps']
    },
    {
      id: 3,
      name: 'Dips',
      sets: 3,
      reps: '12-15',
      rest: '90 sec',
      instructions: 'Suspendez-vous aux barres parallèles, descendez en fléchissant les coudes puis remontez en poussant.',
      muscleGroups: ['Triceps', 'Pectoraux inférieurs']
    },
    {
      id: 4,
      name: 'Extension triceps couché',
      sets: 3,
      reps: '12-15',
      rest: '60 sec',
      instructions: 'Allongé sur le banc, tenez une barre EZ au-dessus de la poitrine. Fléchissez uniquement les coudes pour descendre la barre vers le front.',
      muscleGroups: ['Triceps']
    },
    {
      id: 5,
      name: 'Pompes diamant',
      sets: 2,
      reps: 'Max',
      rest: '60 sec',
      instructions: 'En position de pompe, formez un diamant avec vos mains. Effectuez des pompes en gardant les coudes près du corps.',
      muscleGroups: ['Triceps', 'Pectoraux']
    }
  ]
}

export default function WorkoutDetail() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [timer, setTimer] = useState(0)

  const workout = workoutData // En réalité, on récupérerait les données selon params.id

  const startWorkout = () => {
    setIsWorkoutStarted(true)
    setCurrentExercise(0)
  }

  const completeExercise = (exerciseId: number) => {
    setCompletedExercises(prev => [...prev, exerciseId])
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Workout Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white mb-4">{workout.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{workout.description}</p>
            
            <div className="flex justify-center space-x-8 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <span className="text-white">{workout.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-400" />
                <span className="text-white">{workout.difficulty}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-5 w-5 text-purple-400" />
                <span className="text-white">{workout.exercises.length} exercices</span>
              </div>
            </div>

            {!isWorkoutStarted ? (
              <button
                onClick={startWorkout}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <Play className="h-6 w-6" />
                <span>Commencer la séance</span>
              </button>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{formatTime(timer)}</div>
                <div className="text-purple-400">Exercice {currentExercise + 1} sur {workout.exercises.length}</div>
              </div>
            )}
          </div>
        </div>

        {/* Exercise List */}
        <div className="grid gap-6">
          {workout.exercises.map((exercise, index) => {
            const isCompleted = completedExercises.includes(exercise.id)
            const isCurrent = isWorkoutStarted && index === currentExercise
            
            return (
              <div
                key={exercise.id}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 ${
                  isCurrent 
                    ? 'border-purple-400 bg-purple-500/20 scale-105' 
                    : isCompleted 
                    ? 'border-green-400 bg-green-500/20'
                    : 'border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
                      {isCompleted && <CheckCircle className="h-6 w-6 text-green-400" />}
                    </div>
                    
                    <div className="flex space-x-6 mb-4">
                      <div className="text-gray-300">
                        <span className="font-semibold">Séries:</span> {exercise.sets}
                      </div>
                      <div className="text-gray-300">
                        <span className="font-semibold">Répétitions:</span> {exercise.reps}
                      </div>
                      <div className="text-gray-300">
                        <span className="font-semibold">Repos:</span> {exercise.rest}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-300 mb-2">{exercise.instructions}</p>
                      <div className="flex flex-wrap gap-2">
                        {exercise.muscleGroups.map((muscle, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {isCurrent && (
                    <button
                      onClick={() => completeExercise(exercise.id)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span>Terminer</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Workout Complete */}
        {isWorkoutStarted && completedExercises.length === workout.exercises.length && (
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/50 mt-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Séance terminée !</h2>
            <p className="text-gray-300 mb-6">Félicitations ! Vous avez terminé votre séance en {formatTime(timer)}.</p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Retour à l&apos;accueil
              </Link>
              <button
                onClick={() => {
                  setIsWorkoutStarted(false)
                  setCompletedExercises([])
                  setCurrentExercise(0)
                  setTimer(0)
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Recommencer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}