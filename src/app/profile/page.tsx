'use client'

import { useState } from 'react'
import { ArrowLeft, User, Settings, Trophy, Calendar, Target, Dumbbell, TrendingUp, Edit3, Save, X, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface UserStats {
  totalWorkouts: number
  currentStreak: number
  totalTime: string
  favoriteCategory: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  progress?: number
  maxProgress?: number
}

interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  deadline: string
  category: string
}

interface UserProfile {
  name: string
  email: string
  joinDate: string
  level: string
  avatar: string
  bio: string
  goals: string[]
  preferences: {
    workoutDays: string[]
    preferredTime: string
    fitnessLevel: string
    equipment: string[]
  }
}

const userData: UserProfile = {
  name: 'Vincent Martin',
  email: 'vincent.martin@email.com',
  joinDate: '2024-01-15',
  level: 'Intermédiaire',
  avatar: '👨‍💼',
  bio: 'Passionné de fitness depuis 3 ans, je me concentre sur la prise de masse et l\'amélioration de ma force.',
  goals: ['Prise de masse', 'Force', 'Endurance'],
  preferences: {
    workoutDays: ['Lundi', 'Mercredi', 'Vendredi', 'Samedi'],
    preferredTime: 'Matin (6h-9h)',
    fitnessLevel: 'Intermédiaire',
    equipment: ['Haltères', 'Barre', 'Machines', 'Poids du corps']
  }
}

const userStats: UserStats = {
  totalWorkouts: 127,
  currentStreak: 12,
  totalTime: '89h 30min',
  favoriteCategory: 'Push/Pull/Legs'
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Premier pas',
    description: 'Première séance terminée',
    icon: '🎯',
    unlockedAt: '2024-01-16'
  },
  {
    id: '2',
    title: 'Régularité',
    description: '7 jours consécutifs',
    icon: '🔥',
    unlockedAt: '2024-01-23'
  },
  {
    id: '3',
    title: 'Centurion',
    description: '100 séances terminées',
    icon: '💯',
    unlockedAt: '2024-11-15'
  },
  {
    id: '4',
    title: 'Marathonien',
    description: 'Plus de 50h d\'entraînement',
    icon: '⏱️',
    unlockedAt: '2024-10-20'
  },
  {
    id: '5',
    title: 'En cours...',
    description: 'Atteindre 150 séances',
    icon: '🏆',
    unlockedAt: '',
    progress: 127,
    maxProgress: 150
  }
]

const goals: Goal[] = [
  {
    id: '1',
    title: 'Développé couché',
    target: 100,
    current: 85,
    unit: 'kg',
    deadline: '2024-12-31',
    category: 'Force'
  },
  {
    id: '2',
    title: 'Poids corporel',
    target: 80,
    current: 76,
    unit: 'kg',
    deadline: '2024-12-31',
    category: 'Prise de masse'
  },
  {
    id: '3',
    title: 'Séances par mois',
    target: 16,
    current: 14,
    unit: 'séances',
    deadline: '2024-12-31',
    category: 'Régularité'
  }
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userData)
  const [newGoal, setNewGoal] = useState({ title: '', target: '', unit: '', deadline: '', category: '' })
  const [showAddGoal, setShowAddGoal] = useState(false)

  const handleSaveProfile = () => {
    // Ici on sauvegarderait les données
    setIsEditing(false)
  }

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.unit) {
      // Ajouter le nouvel objectif
      setNewGoal({ title: '', target: '', unit: '', deadline: '', category: '' })
      setShowAddGoal(false)
    }
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
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isEditing ? <X className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
              <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-6xl">
                {userData.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                <Trophy className="h-6 w-6" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="text-3xl font-bold bg-white/20 text-white rounded-lg px-4 py-2 w-full md:w-auto"
                  />
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                    className="w-full bg-white/20 text-gray-300 rounded-lg px-4 py-2 resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>Sauvegarder</span>
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                  <p className="text-purple-400 font-semibold mb-2">{userData.level}</p>
                  <p className="text-gray-300 mb-4">{userData.bio}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    {userData.goals.map((goal, index) => (
                      <span key={index} className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                        {goal}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400">Membre depuis {new Date(userData.joinDate).toLocaleDateString('fr-FR')}</p>
                </>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{userStats.totalWorkouts}</div>
                <div className="text-gray-400 text-sm">Séances</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">{userStats.currentStreak}</div>
                <div className="text-gray-400 text-sm">Jours consécutifs</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.totalTime}</div>
                <div className="text-gray-400 text-sm">Temps total</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-purple-400">PPL</div>
                <div className="text-gray-400 text-sm">Favori</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8">
          <div className="flex border-b border-white/20">
            {[
              { id: 'overview', label: 'Aperçu', icon: User },
              { id: 'goals', label: 'Objectifs', icon: Target },
              { id: 'achievements', label: 'Succès', icon: Trophy },
              { id: 'settings', label: 'Paramètres', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Statistiques détaillées</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Calendar className="h-8 w-8 text-blue-400" />
                        <div>
                          <div className="text-2xl font-bold text-white">{userStats.totalWorkouts}</div>
                          <div className="text-gray-400">Séances totales</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">+12 ce mois-ci</div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <TrendingUp className="h-8 w-8 text-green-400" />
                        <div>
                          <div className="text-2xl font-bold text-white">{userStats.currentStreak}</div>
                          <div className="text-gray-400">Série actuelle</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">Record: 18 jours</div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Dumbbell className="h-8 w-8 text-purple-400" />
                        <div>
                          <div className="text-2xl font-bold text-white">85kg</div>
                          <div className="text-gray-400">Développé couché</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">+5kg ce mois</div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Trophy className="h-8 w-8 text-yellow-400" />
                        <div>
                          <div className="text-2xl font-bold text-white">{achievements.filter(a => a.unlockedAt).length}</div>
                          <div className="text-gray-400">Succès débloqués</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">Sur {achievements.length} total</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Activité récente</h3>
                  <div className="space-y-4">
                    {[
                      { date: 'Aujourd\'hui', workout: 'Push - Pectoraux & Épaules', duration: '1h 15min' },
                      { date: 'Hier', workout: 'Pull - Dos & Biceps', duration: '1h 05min' },
                      { date: 'Il y a 2 jours', workout: 'Legs - Jambes & Fessiers', duration: '1h 30min' },
                      { date: 'Il y a 3 jours', workout: 'Push - Pectoraux & Triceps', duration: '1h 10min' }
                    ].map((activity, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{activity.workout}</div>
                          <div className="text-gray-400 text-sm">{activity.date}</div>
                        </div>
                        <div className="text-purple-400 font-semibold">{activity.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Goals Tab */}
            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Mes objectifs</h3>
                  <button
                    onClick={() => setShowAddGoal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Ajouter</span>
                  </button>
                </div>

                {showAddGoal && (
                  <div className="bg-white/10 rounded-xl p-6 border border-purple-400/30">
                    <h4 className="text-lg font-bold text-white mb-4">Nouvel objectif</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Titre de l'objectif"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                        className="bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400"
                      />
                      <select
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                        className="bg-white/20 text-white rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400"
                      >
                        <option value="" className="text-black">Catégorie</option>
                        <option value="Force" className="text-black">Force</option>
                        <option value="Prise de masse" className="text-black">Prise de masse</option>
                        <option value="Endurance" className="text-black">Endurance</option>
                        <option value="Régularité" className="text-black">Régularité</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Objectif"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                        className="bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400"
                      />
                      <input
                        type="text"
                        placeholder="Unité (kg, reps, etc.)"
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                        className="bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400"
                      />
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                        className="bg-white/20 text-white rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleAddGoal}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Ajouter
                      </button>
                      <button
                        onClick={() => setShowAddGoal(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid gap-6">
                  {goals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100
                    return (
                      <div key={goal.id} className="bg-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-white">{goal.title}</h4>
                            <span className="text-purple-400 text-sm">{goal.category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              {goal.current} / {goal.target} {goal.unit}
                            </div>
                            <div className="text-gray-400 text-sm">
                              Échéance: {new Date(goal.deadline).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Progression</span>
                            <span className="text-white font-semibold">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button className="text-red-400 hover:text-red-300 p-2 transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Succès et réalisations</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`rounded-xl p-6 border ${
                        achievement.unlockedAt
                          ? 'bg-white/10 border-yellow-400/30'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`text-4xl ${
                          achievement.unlockedAt ? 'grayscale-0' : 'grayscale'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-lg font-bold ${
                            achievement.unlockedAt ? 'text-white' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${
                            achievement.unlockedAt ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      
                      {achievement.progress !== undefined && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Progression</span>
                            <span className="text-white font-semibold">
                              {achievement.progress} / {achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(achievement.progress! / achievement.maxProgress!) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {achievement.unlockedAt && (
                        <div className="text-yellow-400 text-sm">
                          Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">Paramètres</h3>
                
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Préférences d&apos;entraînement</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Niveau de fitness</label>
                        <select className="w-full bg-white/20 text-white rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400">
                          <option value="Débutant" className="text-black">Débutant</option>
                          <option value="Intermédiaire" className="text-black" selected>Intermédiaire</option>
                          <option value="Avancé" className="text-black">Avancé</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Horaire préféré</label>
                        <select className="w-full bg-white/20 text-white rounded-lg px-4 py-3 outline-none border border-white/30 focus:border-purple-400">
                          <option value="Matin" className="text-black" selected>Matin (6h-9h)</option>
                          <option value="Midi" className="text-black">Midi (11h-14h)</option>
                          <option value="Soir" className="text-black">Soir (17h-20h)</option>
                          <option value="Nuit" className="text-black">Nuit (20h-23h)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Jours d&apos;entraînement</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
                            <button
                              key={day}
                              className={`py-2 px-3 rounded-lg font-semibold transition-colors ${
                                [0, 2, 4, 5].includes(index)
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-white/20 text-gray-400 hover:bg-white/30'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Notifications</h4>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Rappels d\'entraînement', enabled: true },
                        { label: 'Nouveaux programmes', enabled: true },
                        { label: 'Succès débloqués', enabled: true },
                        { label: 'Conseils quotidiens', enabled: false }
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-300">{setting.label}</span>
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.enabled ? 'bg-purple-600' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                setting.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Compte</h4>
                    
                    <div className="space-y-4">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                        Changer le mot de passe
                      </button>
                      <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors">
                        Exporter mes données
                      </button>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors">
                        Supprimer le compte
                      </button>
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