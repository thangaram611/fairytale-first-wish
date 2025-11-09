import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, MapPin, Calendar, Clock } from "lucide-react";
import castlePng from "@/assets/castle.png";
import { invitationDetails, metadata } from "@/config/metadata";
import cloudOne from "@/assets/isolated-cloud-one.png";
import cloudTwo from "@/assets/isolated-cloud-two.png";
import cloudThree from "@/assets/isolated-cloud-three.png";
import crownPng from "@/assets/crown.png";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isClosingVisible, setIsClosingVisible] = useState(false);
  const closingTextRef = useRef<HTMLParagraphElement>(null);

  // Set dynamic meta tags
  useEffect(() => {
    // Update document title
    document.title = metadata.title;

    // Update or create meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Set standard meta tags
    setMetaTag('description', metadata.description);
    setMetaTag('author', metadata.author);

    // Set Open Graph tags
    setMetaTag('og:title', metadata.og.title, true);
    setMetaTag('og:description', metadata.og.description, true);
    setMetaTag('og:type', metadata.og.type, true);
    setMetaTag('og:image', metadata.og.image, true);

    // Set Twitter tags
    setMetaTag('twitter:card', metadata.twitter.card);
    setMetaTag('twitter:site', metadata.twitter.site);
    setMetaTag('twitter:image', metadata.twitter.image);
  }, []);

  useEffect(() => {
    // Trigger confetti on page load
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 80, zIndex: 0, scalar: 1.8 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
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
        particleCount: particleCount * 0.5,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF1493', '#FFD700', '#9370DB', '#00CED1']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Rocket fireworks that launch after initial confetti
    const rocketDelay = setTimeout(() => {
      const launchTwoRockets = () => {
        // Launch two rockets simultaneously
        for (let i = 0; i < 2; i++) {
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

            // Explosion at the top - use final position
            setTimeout(() => {
              confetti({
                particleCount: 100,
                angle: 90,
                spread: 360,
                startVelocity: 45,
                decay: 0.9,
                scalar: 1.5,
                origin: { x: finalX, y: finalY },
                colors: rocketColors,
                zIndex: 0
              });
              // Secondary burst
              setTimeout(() => {
                confetti({
                  particleCount: 50,
                  angle: 90,
                  spread: 180,
                  startVelocity: 30,
                  decay: 0.92,
                  scalar: 1.3,
                  origin: { x: finalX, y: finalY },
                  colors: rocketColors,
                  zIndex: 0
                });
              }, 200);
            }, duration);
          }, launchDelay);
        }
      };

      // Launch first pair immediately
      launchTwoRockets();
      
      // Launch second pair with random timing
      setTimeout(launchTwoRockets, 2000 + Math.random() * 1000);
      
      // Launch third pair with random timing
      setTimeout(launchTwoRockets, 4500 + Math.random() * 1000);
    }, 3500); // Start after initial confetti

    return () => clearTimeout(rocketDelay);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsClosingVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (closingTextRef.current) {
      observer.observe(closingTextRef.current);
    }

    return () => {
      if (closingTextRef.current) {
        observer.unobserve(closingTextRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Base gradient background - baby pink to lilac - z-index: 0 */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-100 via-pink-200 to-purple-200 z-0" />
      
      {/* Cloud layers with parallax effect - z-index: 10-15 */}
      {/* Cloud layer 1 - Slow moving, top left */}
      <div 
        className="fixed inset-0 overflow-hidden z-10 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'transform 0.1s ease-out',
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
          transform: `translateY(${scrollY * 0.35}px)`,
          transition: 'transform 0.1s ease-out',
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
      </div>

      {/* Cloud layer 3 - Faster, bottom */}
      <div 
        className="fixed inset-0 overflow-hidden z-12 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
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
        <img 
          src={cloudThree} 
          alt="" 
          className="absolute top-[65%] left-[45%] w-[35%] h-auto object-contain opacity-75"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Cloud layer 4 - Very slow, far background */}
      <div 
        className="fixed inset-0 overflow-hidden z-13 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.1s ease-out',
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
      
      {/* Castle layer - z-index: 20 */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{
          transform: `translateY(${scrollY * -0.3}px) scale(${1 + scrollY * 0.0003})`,
          transition: 'transform 0.1s ease-out',
          bottom: 'auto',
          top: '25vh',
        }}
      >
        <img 
          src={castlePng} 
          alt="Fairy tale castle" 
          className="w-auto h-[100vh] object-contain drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) brightness(1.1) contrast(1.05)',
            opacity: 1,
          }}
        />
      </div>

      {/* Cloud layer 5 - In front of castle, slow parallax - z-index: 25 */}
      <div 
        className="fixed inset-0 overflow-hidden z-25 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          transition: 'transform 0.1s ease-out',
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
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center animate-fade-in max-w-4xl">
            <div className="relative inline-block">
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
                className="relative w-32 h-32 md:w-40 md:h-40 mx-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.2))'
                }}
              />
            </div>
            <h1 
              className="text-7xl md:text-9xl font-bold tracking-wide mb-6"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                color: '#FFD700',
                textShadow: '4px 4px 8px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.4)',
              }}
            >
              {invitationDetails.babyName}
            </h1>
            <p 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#FFF',
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              }}
            >
              is turning ONE!
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <p 
                className="text-3xl md:text-4xl font-semibold"
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
        </section>

        {/* Details Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full space-y-16">
            {/* When Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-400 animate-fade-in">
              <h2 
                className="text-4xl md:text-5xl font-bold text-center mb-8"
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  color: '#D4AF37',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                When
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Calendar className="w-8 h-8 text-pink-600" />
                  <span className="text-3xl md:text-4xl font-semibold text-gray-800">
                    {invitationDetails.date}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Clock className="w-8 h-8 text-pink-600" />
                  <span className="text-2xl md:text-3xl font-semibold text-gray-700">
                    {invitationDetails.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Where Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-400 animate-fade-in">
              <h2 
                className="text-4xl md:text-5xl font-bold text-center mb-8"
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  color: '#D4AF37',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Where
              </h2>
              <div className="flex flex-col items-center gap-4">
                <MapPin className="w-10 h-10 text-pink-600" />
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(invitationDetails.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl text-center leading-relaxed text-gray-800 font-medium hover:text-pink-600 transition-colors duration-200 cursor-pointer underline decoration-pink-400 decoration-2 hover:decoration-pink-600"
                >
                  {invitationDetails.venue}
                </a>
              </div>
            </div>

            {/* Closing Message */}
            <div className="text-center py-12">
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  color: '#FFD700',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(255,215,0,0.4)',
                }}
              >
                ...and they celebrated happily ever after
              </h2>
              <p 
                className="text-3xl md:text-4xl font-semibold"
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

      {/* Decorative Sparkles - z-index: 50 */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300 opacity-40 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${Math.random() * 24 + 12}px`,
              height: `${Math.random() * 24 + 12}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
