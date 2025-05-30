import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedCharacter from '../components/AnimatedCharacter';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-colors">
      <button
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-neutral-800">{question}</h3>
        <ChevronRight 
          size={20} 
          className={`text-neutral-500 transition-transform ${isOpen ? 'transform rotate-90' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-0">
          <div className="text-gray-600">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

const LandingPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Nurturing Growth Through 
              <span className="text-primary-50"> Holistic Development</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              SamVed provides compassionate support and engaging resources to help autistic children thrive and reach their full potential.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/signup" className="bg-white text-primary-700 py-3 px-8 rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center justify-center hover:shadow-md">
                Get Started Today <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/login" className="bg-transparent text-white py-3 px-6 rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-colors border border-white border-opacity-30 flex items-center justify-center">
                Sign In
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10"
            >
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Children learning together" 
                className="rounded-lg shadow-xl max-w-full"
              />
              <AnimatedCharacter className="absolute -bottom-10 -left-10" />
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary-300 rounded-full opacity-20 blur-3xl"></div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Mission</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We're dedicated to providing supportive, accessible resources for autistic children and their families, fostering growth, independence, and joy through holistic development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <motion.div 
              className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Personalized Learning</h3>
              <p className="text-neutral-600">
                Tailored educational resources that adapt to each child's unique needs, learning style, and pace.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-secondary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-secondary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Family Support</h3>
              <p className="text-neutral-600">
                Comprehensive resources for parents and caregivers to better understand and support their child's development.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Expert Guidance</h3>
              <p className="text-neutral-600">
                Access to certified therapists and specialists who provide professional guidance and personalized care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">What We Offer</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              SamVed provides a comprehensive platform of tools, games, and services designed specifically for autistic children and their families.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
                <span className="bg-primary-50 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-bold">1</span>
                </span>
                Interactive Learning Games
              </h3>
              <p className="text-neutral-600 mb-4">
                Engaging games designed to develop mathematical skills, emotional regulation, and provide calming sensory experiences.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Basic math and numeracy games</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Anxiety management and emotional regulation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Calming sounds and sensory activities</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
                <span className="bg-secondary-50 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-secondary-600 font-bold">2</span>
                </span>
                Professional Services
              </h3>
              <p className="text-neutral-600 mb-4">
                Access to qualified therapists and specialized support for both children and parents.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">One-on-one therapy sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Group support meetings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Parent-therapist consultations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
                <span className="bg-emerald-50 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-emerald-600 font-bold">3</span>
                </span>
                Progress Tracking
              </h3>
              <p className="text-neutral-600 mb-4">
                Comprehensive dashboards for parents and children to monitor development and achievements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Visual progress charts and milestones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Personalized development insights</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Achievement rewards and motivation system</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
                <span className="bg-amber-50 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-amber-600 font-bold">4</span>
                </span>
                Parental Controls & Support
              </h3>
              <p className="text-neutral-600 mb-4">
                Tools for parents to customize the experience and communicate with specialists.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Content and screen time management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Direct messaging with therapists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-neutral-600">Resource library for parents</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/signup" className="inline-flex items-center bg-primary-600 text-white py-3 px-6 rounded-full font-medium hover:bg-primary-700 transition-colors hover:shadow-md">
              Explore All Features <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">What Parents Say</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Hear from families who have experienced positive changes through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-primary-50 p-6 rounded-xl border border-primary-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Parent testimonial" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">Sarah Johnson</h4>
                  <p className="text-sm text-neutral-500">Parent of Alex, 8</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "SamVed has been transformative for my son. The math games have made learning fun, and his anxiety levels have decreased significantly with the calming exercises."
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary-50 p-6 rounded-xl border border-secondary-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Parent testimonial" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">Michael Roberts</h4>
                  <p className="text-sm text-neutral-500">Parent of Emma, 6</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "The therapist chat feature has been invaluable. Having expert guidance at our fingertips has helped us navigate challenging moments with confidence."
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-emerald-50 p-6 rounded-xl border border-emerald-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Parent testimonial" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">Jennifer Patel</h4>
                  <p className="text-sm text-neutral-500">Parent of Ravi, 9</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "I love being able to track my son's progress. Seeing his achievements and growth areas helps me understand how to better support him at home."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Find answers to common questions about our platform and services.
            </p>
          </div>
          
          <div className="space-y-6">
            <FAQItem 
              question="How can SamVed help my autistic child?"
              answer="SamVed offers specialized games and activities designed to develop various skills, from math to emotional regulation. Our platform also provides access to professional therapists and a supportive community, creating a holistic approach to your child's development."
            />
            
            <FAQItem 
              question="What age range is suitable for SamVed?"
              answer="Our platform is designed for children aged 4-12, with content and activities tailored to different developmental stages. The games and resources adapt to your child's specific needs and abilities."
            />
            
            <FAQItem 
              question="How do the parental controls work?"
              answer="Parents have access to a dedicated dashboard where they can monitor their child's activity, set screen time limits, approve content, and track progress. You can customize the experience based on your child's unique needs and your family's preferences."
            />
            
            <FAQItem 
              question="Are the therapists qualified to work with autistic children?"
              answer="Yes, all therapists on our platform are licensed professionals with specialized training and experience in working with autistic children. We carefully vet each therapist to ensure they meet our high standards of expertise and compassionate care."
            />
            
            <FAQItem 
              question="How secure is my child's information on the platform?"
              answer="We take privacy and security very seriously. All data is encrypted and stored securely following industry best practices. We never share your child's information with third parties without explicit consent, and we comply with all relevant data protection regulations."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-primary-50 mb-8 max-w-3xl mx-auto">
              Join thousands of families who have experienced positive changes through our holistic approach to supporting autistic children.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-white text-primary-700 py-3 px-8 rounded-full font-medium hover:bg-opacity-90 transition-all hover:shadow-md">
                Create an Account
              </Link>
              <Link to="/contact" className="bg-transparent text-white py-3 px-8 rounded-full font-medium border border-white border-opacity-30 hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;