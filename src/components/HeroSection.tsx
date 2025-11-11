import { motion } from "framer-motion";
import Picture from "@/components/Picture";
import { invitationDetails } from "@/config/metadata";

// AVIF imports
import crownAvif from "@/assets/avif/crown.avif";

// WebP fallback imports
import crownWebp from "@/assets/webp/crown.webp";

interface HeroSectionProps {
  onDetailsClick: () => void;
}

const HeroSection = ({ onDetailsClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-5">
      <motion.div 
        className="text-center max-w-4xl flex-1 flex flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="relative inline-block mb-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
        >
          <Picture 
            avifSrc={crownAvif}
            webpSrc={crownWebp}
            alt="Crown" 
            className="relative w-32 h-32 mx-auto object-contain"
          />
        </motion.div>
        
        <motion.h1 
          className="text-6xl font-bold tracking-wide mb-4 px-2"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: '#FFD700',
            textShadow: '4px 4px 8px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.4)',
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {invitationDetails.babyName}
        </motion.h1>
        
        <motion.p 
          className="text-3xl font-bold mb-4 px-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#FFF',
            textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6), 1px 1px 2px rgba(0,0,0,1)',
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          is to be crowned ONE!
        </motion.p>
        
        <motion.div 
          className="flex items-center justify-center gap-4 mt-6 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p 
            className="text-2xl font-semibold px-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#FFF',
              textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,1)',
            }}
          >
            Join us for the royal celebration!
          </p>
        </motion.div>
      </motion.div>

      {/* Details Button */}
      <motion.button
        onClick={onDetailsClick}
        className="flex flex-col items-center gap-2 mt-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative px-10 py-5 rounded-full shadow-xl">
          <span 
            className="text-lg font-bold text-white"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            ✨ Click here for details ✨
          </span>
        </div>
        
        {/* Scroll Arrow */}
        <motion.svg 
          className="w-8 h-8 text-white"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </motion.svg>
      </motion.button>
    </section>
  );
};

export default HeroSection;
