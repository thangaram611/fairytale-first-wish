import { useState, useEffect, useRef, forwardRef } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { invitationDetails } from "@/config/metadata";

const DetailsSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [isClosingVisible, setIsClosingVisible] = useState(false);
  const closingTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsClosingVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const currentRef = closingTextRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={ref} className="min-h-[100dvh] flex items-center justify-center px-4 py-5">
      <div className="max-w-4xl w-full space-y-16">
        {/* When Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-3 sm:border-4 border-yellow-400 animate-fade-in">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            When
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 flex-shrink-0" />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
                {invitationDetails.date}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 flex-shrink-0" />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
                {invitationDetails.time}
              </span>
            </div>
          </div>
        </div>

        {/* Where Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-3 sm:border-4 border-yellow-400 animate-fade-in">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Where
          </h2>
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600 flex-shrink-0" />
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(invitationDetails.venue)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-relaxed text-gray-800 font-medium hover:text-pink-600 transition-colors duration-200 cursor-pointer underline decoration-pink-400 decoration-2 hover:decoration-pink-600 px-2"
            >
              {invitationDetails.venue}
            </a>
          </div>
        </div>

        {/* Closing Message */}
        <div className="text-center py-8 sm:py-12 px-2">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#FFD700',
              textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(255,215,0,0.4)',
            }}
          >
            ...and they celebrated happily ever after
          </h2>
          <p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#FFF',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            <span 
              ref={closingTextRef}
              className="inline-block transition-transform duration-1000 ease-in-out"
              style={{
                animation: isClosingVisible ? 'breathe 3s ease-in-out infinite' : 'none',
              }}
            >
              👑✨ We can't wait to see you there! 👑✨
            </span>
          </p>
        </div>
      </div>
    </section>
  );
});

DetailsSection.displayName = "DetailsSection";

export default DetailsSection;
