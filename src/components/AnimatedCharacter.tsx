import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCharacterProps {
  className?: string;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="w-24 h-24 relative"
      >
        {/* Character body */}
        <div className="absolute w-20 h-20 bg-purple-200 rounded-full left-1/2 transform -translate-x-1/2"></div>
        
        {/* Character face */}
        <div className="absolute w-16 h-16 bg-purple-100 rounded-full top-1 left-1/2 transform -translate-x-1/2">
          {/* Eyes */}
          <div className="absolute w-3 h-3 bg-purple-700 rounded-full top-5 left-3"></div>
          <div className="absolute w-3 h-3 bg-purple-700 rounded-full top-5 right-3"></div>
          
          {/* Smile */}
          <div className="absolute w-8 h-4 border-b-2 border-purple-700 rounded-full bottom-3 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        {/* Character hands */}
        <motion.div
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-5 h-5 bg-purple-200 rounded-full top-10 left-0"
        ></motion.div>
        
        <motion.div
          animate={{
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-5 h-5 bg-purple-200 rounded-full top-10 right-0"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedCharacter;