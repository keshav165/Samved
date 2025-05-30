import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Services from './pages/Services';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Components
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="h-full"
          >
            <LandingPage />
          </motion.div>
        } />
        
        <Route path="/login" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="h-full"
          >
            <Login />
          </motion.div>
        } />
        
        <Route path="/signup" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="h-full"
          >
            <Signup />
          </motion.div>
        } />
        
        {/* Protected Routes */}
        <Route element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="h-full"
          >
            <ProtectedRoute />
          </motion.div>
        }>
          <Route path="/dashboard" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              className="h-full"
            >
              <Dashboard />
            </motion.div>
          } />
          
          <Route path="/games" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              className="h-full"
            >
              <Games />
            </motion.div>
          } />
          
          <Route path="/services" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              className="h-full"
            >
              <Services />
            </motion.div>
          } />
          
          <Route path="/checkout" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              className="h-full"
            >
              <Checkout />
            </motion.div>
          } />
        </Route>
        
        <Route path="*" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="h-full"
          >
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </StrictMode>
  );
}

export default App;