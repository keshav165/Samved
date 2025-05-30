import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../contexts/AuthContext';
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Clock, 
  User, 
  Calendar, 
  CheckCircle, 
  ShoppingCart, 
  Star,
  Video,
  Map,
  ArrowRight,
  Plus
} from 'lucide-react';
import AnimatedCharacter from '../components/AnimatedCharacter';

const Services: React.FC = () => {
  const navigate = useNavigate();
  
  const { isAuthenticated } = useAuthContext();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const services = [
    {
      id: 1,
      title: 'One-on-One Therapy Session',
      description: 'Personal therapy session with a certified specialist tailored to your child\'s specific needs.',
      price: 75,
      duration: '45 minutes',
      format: 'Video Call',
      availability: 'Mon-Fri, 9AM-5PM',
      featured: true,
      imageUrl: 'https://images.pexels.com/photos/7551438/pexels-photo-7551438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      title: 'Parent Guidance Consultation',
      description: 'Expert advice for parents on supporting their child\'s development and implementing effective strategies at home.',
      price: 60,
      duration: '60 minutes',
      format: 'Video Call',
      availability: 'Mon-Sat, 10AM-6PM',
      imageUrl: 'https://images.pexels.com/photos/3768129/pexels-photo-3768129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'Weekly Support Group',
      description: 'Join other parents and children in a supportive group environment led by experienced facilitators.',
      price: 45,
      duration: '90 minutes',
      format: 'Video Call',
      availability: 'Tuesdays & Thursdays, 7PM-8:30PM',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 4,
      title: 'In-Person Assessment',
      description: 'Comprehensive in-person evaluation to assess your child\'s strengths, challenges, and developmental progress.',
      price: 150,
      duration: '120 minutes',
      format: 'In-Person',
      availability: 'By Appointment',
      imageUrl: 'https://images.pexels.com/photos/3771107/pexels-photo-3771107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      title: 'School Transition Support',
      description: 'Guidance and strategies to help your child successfully transition between schools or educational settings.',
      price: 85,
      duration: '60 minutes',
      format: 'Video Call or In-Person',
      availability: 'Weekdays, 3PM-6PM',
      imageUrl: 'https://images.pexels.com/photos/8535214/pexels-photo-8535214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 6,
      title: 'Monthly Development Workshop',
      description: 'Interactive workshop covering specific developmental areas with practical activities and resources.',
      price: 35,
      duration: '120 minutes',
      format: 'Video Call',
      availability: 'First Saturday of each month, 10AM-12PM',
      imageUrl: 'https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  
  const featuredServices = services.filter(service => service.featured);
  console.log('Featured Services:', featuredServices);
  
  const addToCart = (serviceId: number) => {
    if (!cartItems.includes(serviceId)) {
      setCartItems([...cartItems, serviceId]);
    }
  };
  
  const removeFromCart = (serviceId: number) => {
    setCartItems(cartItems.filter(id => id !== serviceId));
  };
  
  const isInCart = (serviceId: number) => {
    return cartItems.includes(serviceId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Professional Services</h1>
          <p className="text-gray-600">
            Expert therapy and support for children and parents
          </p>
        </div>
        
        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingCart className="text-primary-600 mr-3" size={24} />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
                  <p className="text-gray-600 text-sm">{cartItems.length} item(s) selected</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <p className="text-sm text-gray-600">Total:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${cartItems.reduce((total, id) => {
                      const service = services.find(s => s.id === id);
                      return total + (service?.price || 0);
                    }, 0)}
                  </p>
                </div>
                <Link 
                  to="/checkout" 
                  className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Featured Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredServices.map(service => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback image if the main image fails to load
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80';
                      }}
                    />
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                          Featured
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={16} className="mr-2 text-primary-500" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Video size={16} className="mr-2 text-primary-500" />
                          <span>{service.format}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2 text-primary-500" />
                          <span>{service.availability}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-800">${service.price}</div>
                      {isInCart(service.id) ? (
                        <button
                          onClick={() => removeFromCart(service.id)}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(service.id)}
                          className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* All Services */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">All Services</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}    
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      <Clock size={12} className="mr-1" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {service.format === 'Video Call' ? (
                        <Video size={12} className="mr-1" />
                      ) : (
                        <Map size={12} className="mr-1" />
                      )}
                      <span>{service.format}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-800">${service.price}</div>
                    {isInCart(service.id) ? (
                      <button
                        onClick={() => removeFromCart(service.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(service.id)}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-primary-200 transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Therapist CTA */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Meet Our Expert Therapists
                </h2>
                <p className="text-primary-100 mb-6">
                  Our team of certified specialists is dedicated to supporting your child's unique journey. Schedule a free 15-minute consultation to find the right match.
                </p>
                <div>
                  <button 
                    onClick={() => setShowConsultationModal(true)}
                    className="bg-white text-primary-700 px-6 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors inline-flex items-center"
                  >
                    Book a Free Consultation <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="hidden md:block relative">
                <img
                  src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Therapist working with child"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-purple-900 bg-opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Modal */}
        {showConsultationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
              <button 
                onClick={() => setShowConsultationModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Schedule a Free Consultation</h3>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours to schedule your free 15-minute consultation.</p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Tell us about your needs..."
                  ></textarea>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Request Consultation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Services;