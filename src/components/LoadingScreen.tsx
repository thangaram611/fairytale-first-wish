import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed min-h-[100dvh] inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-purple-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-8">
        {/* Simple Crown with bounce animation */}
        <motion.div 
          className="text-7xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: 0
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
        >
          👑
        </motion.div>
        
        {/* Loading Text and Spinner */}
        <div className="space-y-6">
          <motion.h2 
            className="text-3xl font-bold px-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Preparing the Castle...
          </motion.h2>
          
          {/* Elegant Spinner */}
          <div className="flex justify-center">
            <motion.div 
              className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full"
              style={{
                borderTopColor: '#D4AF37',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
