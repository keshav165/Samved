import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, UserCog, User } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { signInWithEmail } from '../lib/supabase';
import AnimatedCharacter from '../components/AnimatedCharacter';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isParentLogin, setIsParentLogin] = useState(true);
  
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      const { error } = await signInWithEmail(email, password);
      
      if (error) throw error;
      
      // The AuthProvider will handle the redirect after successful login
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-lg mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}   
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {isParentLogin ? 'Parent Login' : 'Child Login'}
              </h1>
              <p className="text-gray-600">
                {isParentLogin ? 'Sign in to manage your child\'s account' : 'Sign in to start learning'}
              </p>
              
              {/* Toggle Button */}
              <div className="mt-4 inline-flex items-center bg-gray-100 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setIsParentLogin(true)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isParentLogin 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <UserCog className="mr-2" size={16} />
                  Parent
                </button>
                <button
                  type="button"
                  onClick={() => setIsParentLogin(false)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !isParentLogin 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <User className="mr-2" size={16} />
                  Child
                </button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {isParentLogin ? 'Parent Email' : 'Username or Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder={isParentLogin ? 'Enter parent email' : 'Enter username or email'}
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
                    placeholder="Enter your password"
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
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
                    Forgot Password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                  isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Home</span>
            </Link>
            <AnimatedCharacter />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;