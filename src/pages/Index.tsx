import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { MapPin, Calendar, Clock } from "lucide-react";
import castlePng from "@/assets/castle.png";
import { invitationDetails, metadata } from "@/config/metadata";
import cloudOne from "@/assets/isolated-cloud-one.png";
import cloudTwo from "@/assets/isolated-cloud-two.png";
import cloudThree from "@/assets/isolated-cloud-three.png";
import crownPng from "@/assets/crown.png";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isClosingVisible, setIsClosingVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const closingTextRef = useRef<HTMLParagraphElement>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDetails = () => {
    detailsSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    const imagesToLoad = [
      castlePng,
      cloudOne,
      cloudTwo,
      cloudThree,
      crownPng
    ];


    const imagePromises = imagesToLoad.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        // Add a small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
        // Still show content even if images fail to load
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Trigger confetti on page load - using requestAnimationFrame for smooth performance
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const screenWidth = window.innerWidth;
    const scalarSize = screenWidth < 768 ? 0.8 : screenWidth < 1024 ? 1.2 : screenWidth < 1440 ? 1.5 : 1.8;
    const defaults = { 
      startVelocity: isMobile ? 25 : 30, 
      spread: isMobile ? 100 : 120, 
      ticks: 60, 
      zIndex: 0, 
      scalar: scalarSize 
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    let animationFrameId: number;
    let lastTime = Date.now();
    const intervalTime = 250;

    const animate = () => {
      const currentTime = Date.now();
      const timeLeft = animationEnd - currentTime;

      if (timeLeft <= 0) {
        return;
      }

      // Only trigger confetti at intervals using RAF
      if (currentTime - lastTime >= intervalTime) {
        const particleCount = isMobile ? 15 * (timeLeft / duration) : 25 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FF1493', '#FF69B4', '#FFD700', '#FF6347', '#9370DB', '#00CED1', '#FF1493']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FF1493', '#FF69B4', '#FFD700', '#FF6347', '#9370DB', '#00CED1', '#FF1493']
        });
        confetti({
          ...defaults,
          particleCount: particleCount * 0.4,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#FF1493', '#FFD700', '#9370DB', '#00CED1']
        });
        
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    // Rocket fireworks that launch after initial confetti - optimized for mobile
    const rocketDelay = setTimeout(() => {
      const launchTwoRockets = () => {
        // Launch rockets - 1 at a time on mobile, 2 on desktop
        const rocketCount = isMobile ? 1 : 2;
        for (let i = 0; i < rocketCount; i++) {
          const originX = Math.random() * 0.6 + 0.2; // Random position between 20% and 80%
          const colors = [
            ['#FF1493', '#FF69B4', '#FFD700'],
            ['#9370DB', '#00CED1', '#FFD700'],
            ['#FF6347', '#FFD700', '#FF1493'],
            ['#00CED1', '#9370DB', '#FF69B4']
          ];
          const rocketColors = colors[Math.floor(Math.random() * colors.length)];
          
          // Random timing for this specific rocket
          const launchDelay = Math.random() * 800; // 0-800ms delay
          
          setTimeout(() => {
            // Calculate trajectory angle (slightly angled, not perfectly vertical)
            const trajectoryAngle = 85 + (Math.random() * 10 - 5); // 80-90 degrees (mostly upward with slight variation)
            const horizontalDrift = (Math.random() - 0.5) * 0.08; // Slight horizontal drift
            
            // Launch effect (rocket going up) - thinner rocket
            const duration = 1200;
            const animationEnd = Date.now() + duration;
            let currentY = 1.0;
            let currentX = originX;
            let finalX = originX;
            let finalY = 0.3;
            
            const frame = () => {
              const progress = 1 - (animationEnd - Date.now()) / duration;
              currentY = 1.0 - (progress * 0.7); // Move from bottom (1.0) to top (0.3)
              currentX = originX + (horizontalDrift * progress); // Apply drift over time
              
              // Store final position
              finalX = currentX;
              finalY = currentY;
              
              confetti({
                particleCount: 1,
                angle: trajectoryAngle,
                spread: 3,
                startVelocity: 0,
                decay: 0.96,
                scalar: 0.6,
                origin: { x: currentX, y: currentY },
                colors: rocketColors, // Use blast colors for rocket trail
                zIndex: 0,
                gravity: 0,
                drift: 0,
                ticks: 30
              });

              if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
              }
            };
            frame();

            // Explosion at the top - use final position, burst in all directions
            setTimeout(() => {
              const screenWidth = window.innerWidth;
              const explosionScalar = screenWidth < 768 ? 0.9 : screenWidth < 1024 ? 1.3 : screenWidth < 1440 ? 1.6 : 2.0;
              
              // Main explosion burst - 360 degrees
              confetti({
                particleCount: 80,
                angle: 90,
                spread: 360,
                startVelocity: isMobile ? 30 : 45,
                decay: 0.91,
                scalar: explosionScalar,
                origin: { x: finalX, y: finalY },
                colors: rocketColors,
                zIndex: 0,
                gravity: 1,
                drift: 0,
                ticks: 200
              });
              
              // Secondary burst - smaller particles, more spread
              if (!isMobile) {
                setTimeout(() => {
                confetti({
                  particleCount: 50,
                  angle: 90,
                  spread: 360,
                  startVelocity: 30,
                  decay: 0.94,
                  scalar: explosionScalar * 0.7,
                  origin: { x: finalX, y: finalY },
                  colors: rocketColors,
                  zIndex: 0,
                  gravity: 1.2,
                  ticks: 150
                });
              }, 200);
              }
            }, duration);
          }, launchDelay);
        }
      };

      // Launch first set immediately
      launchTwoRockets();
      
      // Launch second set with random timing
      setTimeout(launchTwoRockets, 2000 + Math.random() * 1000);
      
      // Launch third set with random timing
      setTimeout(launchTwoRockets, 4500 + Math.random() * 1000);
    }, isMobile ? 2500 : 3500); // Start after initial confetti

    return () => clearTimeout(rocketDelay);
  }, [isMobile]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  }, [closingTextRef]);

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-purple-200">
        <div className="text-center space-y-8">
          {/* Simple Crown */}
          <div className="text-7xl">
            👑
          </div>
          
          {/* Loading Text and Spinner */}
          <div className="space-y-6">
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                color: '#D4AF37',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Preparing the Castle...
            </h2>
            
            {/* Elegant Spinner */}
            <div className="flex justify-center">
              <div 
                className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"
                style={{
                  borderTopColor: '#D4AF37',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ touchAction: 'pan-y' }}>
      {/* Base gradient background - baby pink to lilac - z-index: 0 */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-100 via-pink-200 to-purple-200 z-0" />
      
      {/* Cloud layers with parallax effect - z-index: 10-15 */}
      {/* Cloud layer 1 - Slow moving, top left */}
      <div 
        className="fixed inset-0 overflow-hidden z-10 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * (isMobile ? 0.1 : 0.2)}px)`,
          willChange: 'transform',
        }}
      >
        <img 
          src={cloudOne} 
          alt="" 
          className="absolute top-[5%] left-[5%] w-[35%] h-auto object-contain opacity-70"
          style={{ mixBlendMode: 'screen' }}
        />
        <img 
          src={cloudTwo} 
          alt="" 
          className="absolute top-[15%] right-[10%] w-[30%] h-auto object-contain opacity-60"
          style={{ mixBlendMode: 'screen' }}
        />
        <img 
          src={cloudThree} 
          alt="" 
          className="absolute top-[10%] left-[40%] w-[28%] h-auto object-contain opacity-65"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Cloud layer 2 - Medium speed, middle */}
      <div 
        className="fixed inset-0 overflow-hidden z-11 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * (isMobile ? 0.15 : 0.35)}px)`,
          willChange: 'transform',
        }}
      >
        <img 
          src={cloudOne} 
          alt="" 
          className="absolute top-[30%] left-[15%] w-[40%] h-auto object-contain opacity-80"
          style={{ mixBlendMode: 'screen' }}
        />
        <img 
          src={cloudTwo} 
          alt="" 
          className="absolute top-[25%] right-[5%] w-[35%] h-auto object-contain opacity-75"
          style={{ mixBlendMode: 'screen' }}
        />
        {!isMobile && (
          <>
            <img 
              src={cloudThree} 
              alt="" 
              className="absolute top-[50%] left-[50%] w-[25%] h-auto object-contain opacity-50 -translate-x-1/2"
              style={{ mixBlendMode: 'screen' }}
            />
            <img 
              src={cloudOne} 
              alt="" 
              className="absolute top-[45%] right-[20%] w-[30%] h-auto object-contain opacity-70"
              style={{ mixBlendMode: 'screen' }}
            />
          </>
        )}
      </div>

      {/* Cloud layer 3 - Faster, bottom */}
      <div 
        className="fixed inset-0 overflow-hidden z-12 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * (isMobile ? 0.2 : 0.5)}px)`,
          willChange: 'transform',
        }}
      >
        <img 
          src={cloudTwo} 
          alt="" 
          className="absolute top-[60%] left-[8%] w-[38%] h-auto object-contain opacity-85"
          style={{ mixBlendMode: 'screen' }}
        />
        <img 
          src={cloudOne} 
          alt="" 
          className="absolute top-[70%] right-[12%] w-[32%] h-auto object-contain opacity-70"
          style={{ mixBlendMode: 'screen' }}
        />
        {!isMobile && (
          <img 
            src={cloudThree} 
            alt="" 
            className="absolute top-[65%] left-[45%] w-[35%] h-auto object-contain opacity-75"
            style={{ mixBlendMode: 'screen' }}
          />
        )}
      </div>

      {/* Cloud layer 4 - Very slow, far background - reduced on mobile */}
      {!isMobile && (
        <div 
          className="fixed inset-0 overflow-hidden z-13 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            willChange: 'transform',
          }}
        >
          <img 
            src={cloudTwo} 
            alt="" 
            className="absolute top-[40%] left-[30%] w-[45%] h-auto object-contain opacity-40"
            style={{ mixBlendMode: 'screen' }}
          />
          <img 
            src={cloudOne} 
            alt="" 
            className="absolute top-[55%] right-[25%] w-[40%] h-auto object-contain opacity-45"
            style={{ mixBlendMode: 'screen' }}
          />
          <img 
            src={cloudThree} 
            alt="" 
            className="absolute top-[48%] left-[60%] w-[42%] h-auto object-contain opacity-42"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>
      )}
      
      {/* Castle layer - z-index: 20 */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{
          transform: `translateY(${scrollY * (isMobile ? -0.09 : -0.3)}px) scale(${1 + scrollY * 0.0003})`,
          willChange: 'transform',
          bottom: 'auto',
          top: isMobile ? '20vh' : '25vh',
        }}
      >
        <img 
          src={castlePng} 
          alt="Fairy tale castle" 
          className="w-auto object-contain drop-shadow-2xl"
          style={{
            height: isMobile ? '120vh' : window.innerWidth < 1024 ? '110vh' : window.innerWidth < 1440 ? '105vh' : '100vh',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) brightness(1.1) contrast(1.05)',
            opacity: 1,
          }}
        />
      </div>

      {/* Cloud layer 5 - In front of castle, slow parallax - z-index: 25 */}
      <div 
        className="fixed inset-0 overflow-hidden z-25 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * (isMobile ? 0.18 : 0.4)}px)`,
          willChange: 'transform',
        }}
      >
        <img 
          src={cloudOne} 
          alt="" 
          className="absolute top-[35%] left-[5%] w-[38%] h-auto object-contain opacity-85"
          style={{ mixBlendMode: 'screen' }}
        />
        <img 
          src={cloudThree} 
          alt="" 
          className="absolute top-[55%] right-[8%] w-[42%] h-auto object-contain opacity-80"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>
      
      {/* Gradient overlay for depth - z-index: 30 */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-300/40 to-purple-500/80 pointer-events-none z-30" />
      
      {/* Content - z-index: 40 */}
      <div className="relative z-40">
        {/* Hero Section - Name Reveal */}
        <section className="relative min-h-[100dvh] flex items-center justify-center px-4">
          <div className="text-center animate-fade-in max-w-4xl">
            <div className="relative inline-block mb-10 sm:mb-12 md:mb-14">
              <div 
                className="absolute -inset-12 md:-inset-16"
                style={{
                  animation: 'crownGlow 3s ease-in-out infinite',
                  background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.2) 30%, rgba(255,215,0,0.1) 60%, transparent 100%)',
                  filter: 'blur(20px)',
                }}
              />
              <img 
                src={crownPng} 
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
            <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
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
            onClick={scrollToDetails}
            className="absolute bottom-8 w-full sm:bottom-12 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2"
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
                className="absolute inset-0 rounded-full bg-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
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

        {/* Details Section */}
        <section ref={detailsSectionRef} className="min-h-screen min-h-[100dvh] flex items-center justify-center px-4 py-20">
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

        {/* Made with Love Section - At the very bottom */}
        <section className="relative py-8 text-center">
          <p 
            className="text-sm md:text-base font-medium"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#FFF',
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
              opacity: 0.85,
            }}
          >
            Made with 💖 for our little princess
          </p>
        </section>
      </div>
    </div>
  );
};

export default Index;
