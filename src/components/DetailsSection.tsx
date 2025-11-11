import { useRef, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { invitationDetails } from "@/config/metadata";

const DetailsSection = forwardRef<HTMLDivElement>((props, ref) => {
  const closingTextRef = useRef<HTMLDivElement>(null);
  const isClosingInView = useInView(closingTextRef, { once: false, amount: 0.5 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={ref} className="min-h-[100dvh] flex items-center justify-center px-4 py-5">
      <div className="max-w-4xl w-full space-y-16">
        {/* When Card */}
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-yellow-400"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={cardVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-8"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            When
          </motion.h2>
          <div className="space-y-6">
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Calendar className="w-8 h-8 text-pink-600 flex-shrink-0" />
              <span className="text-2xl font-semibold text-gray-800">
                {invitationDetails.date}
              </span>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Clock className="w-8 h-8 text-pink-600 flex-shrink-0" />
              <span className="text-xl font-semibold text-gray-700">
                {invitationDetails.time}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Where Card */}
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-yellow-400"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={cardVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-8"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Where
          </motion.h2>
          <motion.div 
            className="flex flex-col items-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <MapPin className="w-10 h-10 text-pink-600 flex-shrink-0" />
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(invitationDetails.venue)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-center leading-relaxed text-gray-800 font-medium hover:text-pink-600 transition-colors duration-200 cursor-pointer underline decoration-pink-400 decoration-2 hover:decoration-pink-600 px-2"
            >
              {invitationDetails.venue}
            </a>
          </motion.div>
        </motion.div>

        {/* Dress Code Card */}
        <motion.div 
          className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-purple-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={cardVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-8"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Royal Dress Code
          </motion.h2>
          <div className="space-y-6">
            <motion.p 
              className="text-2xl text-center font-medium italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#6B4A8C',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Join us in our enchanted kingdom dressed in...
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-3 sm:gap-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 bg-pink-200/60 px-3 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-pink-300 shadow-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-300 border-2 border-pink-400 shadow-inner flex-shrink-0"></div>
                <span className="text-base sm:text-xl font-semibold whitespace-nowrap" style={{ color: '#E91E8C' }}>
                  Light Pink
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold flex-shrink-0" style={{ color: '#D4AF37' }}>
                or
              </span>
              <div className="flex items-center gap-2 sm:gap-3 bg-purple-200/60 px-3 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-purple-300 shadow-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-300 border-2 border-purple-400 shadow-inner flex-shrink-0"></div>
                <span className="text-base sm:text-xl font-semibold whitespace-nowrap" style={{ color: '#8B4789' }}>
                  Lilac
                </span>
              </div>
            </motion.div>
            <motion.p 
              className="text-xl text-center font-medium"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#6B4A8C',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              ✨ Party wear attire to match our magical celebration ✨
            </motion.p>
          </div>
        </motion.div>

        {/* Closing Message */}
        <div ref={closingTextRef} className="text-center py-12 px-2">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#FFD700',
              textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(255,215,0,0.4)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            ...and they celebrated happily ever after
          </motion.h2>
          <motion.p 
            className="text-2xl font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#FFF',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: isClosingInView ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.3 },
              scale: { 
                duration: 3,
                repeat: isClosingInView ? Infinity : 0,
                ease: "easeInOut"
              }
            }}
          >
            ✨ We can't wait to see you there! ✨
          </motion.p>
        </div>
      </div>
    </section>
  );
});

DetailsSection.displayName = "DetailsSection";

export default DetailsSection;
