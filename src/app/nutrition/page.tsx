'use client'

import { useState } from 'react'
import { ArrowLeft, Apple, Calculator, Target, TrendingUp, Plus, Minus, Search } from 'lucide-react'
import Link from 'next/link'

interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  category: string
}

interface MealEntry {
  food: Food
  quantity: number
  unit: string
}

interface DailyGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

const foods: Food[] = [
  {
    id: '1',
    name: 'Blanc de poulet',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    category: 'Protéines'
  },
  {
    id: '2',
    name: 'Riz basmati cuit',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    category: 'Glucides'
  },
  {
    id: '3',
    name: 'Avocat',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    fiber: 7,
    category: 'Lipides'
  },
  {
    id: '4',
    name: 'Banane',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    category: 'Fruits'
  },
  {
    id: '5',
    name: 'Œufs entiers',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    category: 'Protéines'
  },
  {
    id: '6',
    name: 'Flocons d\'avoine',
    calories: 389,
    protein: 17,
    carbs: 66,
    fat: 7,
    fiber: 10,
    category: 'Glucides'
  },
  {
    id: '7',
    name: 'Saumon',
    calories: 208,
    protein: 25,
    carbs: 0,
    fat: 12,
    fiber: 0,
    category: 'Protéines'
  },
  {
    id: '8',
    name: 'Brocolis',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    category: 'Légumes'
  }
]

const dailyGoals: DailyGoals = {
  calories: 2500,
  protein: 150,
  carbs: 300,
  fat: 80,
  fiber: 25
}

export default function Nutrition() {
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast')
  const [meals, setMeals] = useState<{
    breakfast: MealEntry[]
    lunch: MealEntry[]
    dinner: MealEntry[]
    snacks: MealEntry[]
  }>({
    breakfast: [
      { food: foods[5], quantity: 50, unit: 'g' },
      { food: foods[3], quantity: 1, unit: 'unité' }
    ],
    lunch: [
      { food: foods[0], quantity: 150, unit: 'g' },
      { food: foods[1], quantity: 80, unit: 'g' },
      { food: foods[7], quantity: 100, unit: 'g' }
    ],
    dinner: [
      { food: foods[6], quantity: 120, unit: 'g' },
      { food: foods[1], quantity: 60, unit: 'g' }
    ],
    snacks: [
      { food: foods[3], quantity: 1, unit: 'unité' }
    ]
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [showFoodSearch, setShowFoodSearch] = useState(false)

  const categories = ['Toutes', 'Protéines', 'Glucides', 'Lipides', 'Fruits', 'Légumes']
  
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Toutes' || food.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const calculateTotals = () => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    
    Object.values(meals).forEach(meal => {
      meal.forEach(entry => {
        const multiplier = entry.quantity / 100 // Assuming values are per 100g
        totals.calories += entry.food.calories * multiplier
        totals.protein += entry.food.protein * multiplier
        totals.carbs += entry.food.carbs * multiplier
        totals.fat += entry.food.fat * multiplier
        totals.fiber += entry.food.fiber * multiplier
      })
    })
    
    return totals
  }

  const totals = calculateTotals()

  const addFoodToMeal = (food: Food) => {
    const newEntry: MealEntry = { food, quantity: 100, unit: 'g' }
    setMeals(prev => ({
      ...prev,
      [selectedMeal]: [...prev[selectedMeal], newEntry]
    }))
    setShowFoodSearch(false)
  }

  const updateQuantity = (mealType: string, index: number, newQuantity: number) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType as keyof typeof prev].map((entry, i) => 
        i === index ? { ...entry, quantity: Math.max(0, newQuantity) } : entry
      )
    }))
  }

  const removeFromMeal = (mealType: string, index: number) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType as keyof typeof prev].filter((_, i) => i !== index)
    }))
  }

  const mealNames = {
    breakfast: 'Petit-déjeuner',
    lunch: 'Déjeuner', 
    dinner: 'Dîner',
    snacks: 'Collations'
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
              <Apple className="h-8 w-8 text-green-400" />
              <h1 className="text-2xl font-bold text-white">Nutrition</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Recettes</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Historique</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Daily Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Aperçu quotidien</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Calories */}
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(totals.calories)}
              </div>
              <div className="text-gray-400 text-sm mb-2">/ {dailyGoals.calories}</div>
              <div className="text-orange-400 font-semibold">Calories</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totals.calories / dailyGoals.calories) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Protein */}
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(totals.protein)}g
              </div>
              <div className="text-gray-400 text-sm mb-2">/ {dailyGoals.protein}g</div>
              <div className="text-red-400 font-semibold">Protéines</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-red-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totals.protein / dailyGoals.protein) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Carbs */}
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(totals.carbs)}g
              </div>
              <div className="text-gray-400 text-sm mb-2">/ {dailyGoals.carbs}g</div>
              <div className="text-blue-400 font-semibold">Glucides</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totals.carbs / dailyGoals.carbs) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Fat */}
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(totals.fat)}g
              </div>
              <div className="text-gray-400 text-sm mb-2">/ {dailyGoals.fat}g</div>
              <div className="text-yellow-400 font-semibold">Lipides</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totals.fat / dailyGoals.fat) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Fiber */}
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(totals.fiber)}g
              </div>
              <div className="text-gray-400 text-sm mb-2">/ {dailyGoals.fiber}g</div>
              <div className="text-green-400 font-semibold">Fibres</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totals.fiber / dailyGoals.fiber) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Planning */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8">
          <div className="flex border-b border-white/20">
            {Object.entries(mealNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedMeal(key as 'breakfast' | 'lunch' | 'dinner' | 'snacks')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  selectedMeal === key
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{mealNames[selectedMeal]}</h3>
              <button
                onClick={() => setShowFoodSearch(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Ajouter un aliment</span>
              </button>
            </div>

            {/* Current Meal Items */}
            <div className="space-y-4">
              {meals[selectedMeal].map((entry, index) => {
                const calories = (entry.food.calories * entry.quantity) / 100
                const protein = (entry.food.protein * entry.quantity) / 100
                const carbs = (entry.food.carbs * entry.quantity) / 100
                const fat = (entry.food.fat * entry.quantity) / 100
                
                return (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{entry.food.name}</h4>
                      <button
                        onClick={() => removeFromMeal(selectedMeal, index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(selectedMeal, index, entry.quantity - 10)}
                          className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="bg-white/20 px-4 py-2 rounded-lg">
                          <span className="text-white font-semibold">{entry.quantity} {entry.unit}</span>
                        </div>
                        <button
                          onClick={() => updateQuantity(selectedMeal, index, entry.quantity + 10)}
                          className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-white font-semibold">{Math.round(calories)} cal</div>
                        <div className="text-gray-400 text-sm">
                          P: {Math.round(protein)}g | G: {Math.round(carbs)}g | L: {Math.round(fat)}g
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {meals[selectedMeal].length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🍽️</div>
                  <p className="text-gray-400">Aucun aliment ajouté pour ce repas</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Food Search Modal */}
        {showFoodSearch && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl border border-white/20 w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">Ajouter un aliment</h3>
                  <button
                    onClick={() => setShowFoodSearch(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Rechercher un aliment..."
                      className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 outline-none border border-white/30 focus:border-purple-400 transition-colors"
                    />
                  </div>
                  
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
              
              <div className="p-6 overflow-y-auto max-h-96">
                <div className="grid gap-4">
                  {filteredFoods.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => addFoodToMeal(food)}
                      className="bg-white/10 hover:bg-white/20 rounded-lg p-4 cursor-pointer transition-all duration-200 border border-white/10 hover:border-purple-400/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{food.name}</h4>
                        <span className="bg-purple-500/30 text-purple-200 px-2 py-1 rounded text-sm">
                          {food.category}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-orange-400 font-semibold">{food.calories}</div>
                          <div className="text-gray-400">cal</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-400 font-semibold">{food.protein}g</div>
                          <div className="text-gray-400">prot</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-semibold">{food.carbs}g</div>
                          <div className="text-gray-400">gluc</div>
                        </div>
                        <div className="text-center">
                          <div className="text-yellow-400 font-semibold">{food.fat}g</div>
                          <div className="text-gray-400">lip</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 font-semibold">{food.fiber}g</div>
                          <div className="text-gray-400">fib</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredFoods.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-400">Aucun aliment trouvé</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <Calculator className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Calculateur de macros</h3>
            <p className="text-gray-300 mb-4">Calculez vos besoins nutritionnels personnalisés</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Calculer
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Objectifs personnalisés</h3>
            <p className="text-gray-300 mb-4">Définissez vos objectifs nutritionnels</p>
            <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Configurer
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Suivi des progrès</h3>
            <p className="text-gray-300 mb-4">Analysez votre évolution nutritionnelle</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Voir les stats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}