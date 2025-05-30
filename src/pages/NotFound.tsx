import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedCharacter from '../components/AnimatedCharacter';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden text-center p-8"
        >
          <div className="mb-6 relative">
            <div className="text-9xl font-bold text-purple-200">404</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <AnimatedCharacter />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="bg-purple-600 text-white py-2 px-6 rounded-full font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="bg-white text-purple-600 py-2 px-6 rounded-full font-medium hover:bg-purple-50 transition-colors border border-purple-200 flex items-center justify-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;