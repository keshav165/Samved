import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Logo size={36} />
          <span className="text-primary-600 font-bold text-xl">SamVed</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {!isAuthenticated && (
            <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                Dashboard
              </Link>
              <Link to="/games" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                Games
              </Link>
              <Link to="/services" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                Services
              </Link>
            </>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-right">
                <div className="font-medium text-gray-700">
                  {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {user?.user_metadata?.role || 'student'}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 px-6 py-4 bg-neutral-50 rounded-lg border border-neutral-100">
              {!isAuthenticated && (
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              )}
              
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/games"
                    className="text-gray-600 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Games
                  </Link>
                  <Link
                    to="/services"
                    className="text-gray-600 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </Link>
                </>
              )}
              
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-600 py-2">
                    <User size={16} />
                    <div>
                      <div className="font-medium">
                        {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user?.user_metadata?.role || 'student'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 py-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;