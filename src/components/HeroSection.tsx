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
      <div className="text-center animate-fade-in max-w-4xl flex-1 flex flex-col justify-center">
        <div className="relative inline-block mb-10 sm:mb-12 md:mb-14">
          <div 
            className="absolute -inset-12 md:-inset-16"
            style={{
              animation: 'crownGlow 3s ease-in-out infinite',
              background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.2) 30%, rgba(255,215,0,0.1) 60%, transparent 100%)',
              filter: 'blur(20px)',
            }}
          />
          <Picture 
            avifSrc={crownAvif}
            webpSrc={crownWebp}
            alt="Crown" 
            className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto object-contain"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.2))'
            }}
          />
        </div>
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-wide mb-4 sm:mb-6 px-2"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: '#FFD700',
            textShadow: '4px 4px 8px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.4)',
          }}
        >
          {invitationDetails.babyName}
        </h1>
        <p 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#FFF',
            textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
          }}
        >
          is turning ONE!
        </p>
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8 mb-12 lg:mb-16">
          <p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold px-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#FFF',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            {invitationDetails.age} Birthday Celebration
          </p>
        </div>
      </div>

      {/* Details Button */}
      <button
        onClick={onDetailsClick}
        className="group flex flex-col items-center gap-2 mt-auto"
      >
        <div className="relative px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <span 
            className="text-base sm:text-lg md:text-xl font-bold text-white"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            ✨ Click here for details ✨
          </span>
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        {/* Scroll Arrow */}
        <svg 
          className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-bounce"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
