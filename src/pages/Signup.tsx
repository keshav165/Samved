import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'child'>('parent');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Using the auth context to ensure we're properly authenticated after signup
  useAuthContext();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) throw error;
      
      // If signup is successful, update the user's role in the profiles table
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role })
          .eq('id', data.user.id);
          
        if (profileError) throw profileError;
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create an account');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join SamVed and start your journey today</p>
            </div>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
                <div className="flex space-x-4">
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="role"
                      value="parent"
                      checked={role === 'parent'}
                      onChange={() => setRole('parent')}
                      className="sr-only"
                    />
                    <div className={`
                      p-3 border rounded-lg text-center cursor-pointer transition-colors
                      ${role === 'parent' 
                        ? 'bg-purple-50 border-purple-500 text-purple-700' 
                        : 'border-gray-300 hover:border-purple-300'}
                    `}>
                      <span className="font-medium">Parent</span>
                    </div>
                  </label>
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="role"
                      value="child"
                      checked={role === 'child'}
                      onChange={() => setRole('child')}
                      className="sr-only"
                    />
                    <div className={`
                      p-3 border rounded-lg text-center cursor-pointer transition-colors
                      ${role === 'child' 
                        ? 'bg-purple-50 border-purple-500 text-purple-700' 
                        : 'border-gray-300 hover:border-purple-300'}
                    `}>
                      <span className="font-medium">Child</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle size={12} className={`mr-1 ${password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`} />
                    <span>Minimum 8 characters</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" required />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                  isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Home</span>
            </Link>
            <div className="w-32 h-32 flex items-center justify-center">
              <CheckCircle className="w-24 h-24 text-green-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;