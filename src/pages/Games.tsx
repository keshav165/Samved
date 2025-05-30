import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../contexts/AuthContext';
import { 
  Brain, 
  Sparkles, 
  Music, 
  Calculator, 
  Heart, 
  Target, 
  Volume2, 
  ChevronRight,
  Star,
  Clock
} from 'lucide-react';

const Games: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const categories = [
    { id: 'math', name: 'Math Skills', icon: Calculator, color: 'blue' },
    { id: 'emotions', name: 'Emotional Skills', icon: Heart, color: 'red' },
    { id: 'focus', name: 'Focus & Attention', icon: Target, color: 'green' },
    { id: 'calming', name: 'Calming Activities', icon: Volume2, color: 'purple' },
  ];
  
  const games = [
    {
      id: 1,
      title: 'Number Friends',
      description: 'Learn basic addition and subtraction with friendly characters.',
      category: 'math',
      difficulty: 'Easy',
      time: '10-15 min',
      rating: 4.8,
      popular: true,
      imageUrl: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      title: 'Shape Sorter',
      description: 'Match shapes and colors while learning counting skills.',
      category: 'math',
      difficulty: 'Easy',
      time: '5-10 min',
      rating: 4.5,
      imageUrl: 'https://images.pexels.com/photos/1619344/pexels-photo-1619344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'Feeling Friends',
      description: 'Learn to identify and express emotions with animated characters.',
      category: 'emotions',
      difficulty: 'Medium',
      time: '10-15 min',
      rating: 4.9,
      popular: true,
      imageUrl: 'https://images.pexels.com/photos/6311440/pexels-photo-6311440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      title: 'Breathing Bubbles',
      description: 'Practice deep breathing techniques with interactive bubbles.',
      category: 'calming',
      difficulty: 'Easy',
      time: '5 min',
      rating: 4.7,
      imageUrl: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      title: 'Forest Sounds',
      description: 'Calming nature sounds with beautiful forest visuals.',
      category: 'calming',
      difficulty: 'Easy',
      time: '10-30 min',
      rating: 4.6,
      imageUrl: 'https://images.pexels.com/photos/128234/pexels-photo-128234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 6,
      title: 'Attention Safari',
      description: 'Find hidden animals and objects to improve focus and attention.',
      category: 'focus',
      difficulty: 'Medium',
      time: '10-15 min',
      rating: 4.4,
      imageUrl: 'https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 7,
      title: 'Math Challenge',
      description: 'Test your math skills with increasingly difficult number problems.',
      category: 'math',
      difficulty: 'Hard',
      time: '15-20 min',
      rating: 4.3,
      imageUrl: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 8,
      title: 'Emotion Stories',
      description: 'Interactive stories that help identify and process different emotions.',
      category: 'emotions',
      difficulty: 'Medium',
      time: '15-20 min',
      rating: 4.7,
      imageUrl: 'https://images.pexels.com/photos/5756743/pexels-photo-5756743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  
  const filteredGames = filterCategory
    ? games.filter(game => game.category === filterCategory)
    : games;
  
  const popularGames = games.filter(game => game.popular);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Educational Games</h1>
          <p className="text-gray-600">
            Interactive games and activities designed for development and fun
          </p>
        </div>
        
        {/* Popular Games */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Popular Activities</h2>
            <button className="text-purple-600 font-medium flex items-center hover:text-purple-700 transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularGames.map(game => (
              <motion.div
                key={game.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-xs font-medium text-yellow-700">{game.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{game.time}</span>
                    </div>
                    <Link
                      to={`/games/${game.id}`}
                      className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition-colors"
                    >
                      Play Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterCategory === null
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilterCategory(null)}
            >
              All Categories
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                  filterCategory === category.id
                    ? `bg-${category.color}-600 text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setFilterCategory(category.id)}
              >
                <category.icon size={16} className="mr-1" />
                {category.name}
              </button>
            ))}
          </div>
        </section>
        
        {/* Games Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <motion.div
                key={game.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{game.title}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star size={14} className="mr-0.5" fill="currentColor" />
                      <span className="text-xs">{game.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs mb-3">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {game.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{game.time}</span>
                    </div>
                    <Link
                      to={`/games/${game.id}`}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs hover:bg-purple-200 transition-colors"
                    >
                      Play
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Games;