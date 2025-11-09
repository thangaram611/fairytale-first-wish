import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Crown, Sparkles, MapPin, Calendar, Clock } from "lucide-react";
import castleBackground from "@/assets/castle-background.jpg";
import castleDreamy from "@/assets/castle-dreamy.jpg";

const Index = () => {
  const [revealedSections, setRevealedSections] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Update these details as needed
  const invitationDetails = {
    babyName: "Princess Emma",
    age: "1st",
    date: "December 25, 2025",
    time: "4:00 PM onwards",
    venue: "Royal Garden Palace, 123 Fairytale Lane, Dream City",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (revealedSections < 6) {
        setRevealedSections(revealedSections + 1);
        
        // Trigger confetti on name reveal (section 1)
        if (revealedSections === 2) {
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

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
              colors: ['#FFB6D9', '#E4A5D5', '#FFD700', '#FFF0F5']
            });
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
              colors: ['#FFB6D9', '#E4A5D5', '#FFD700', '#FFF0F5']
            });
          }, 250);
        }
        
        // Auto-scroll to new section
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }, revealedSections === 0 ? 2500 : 2000);

    return () => clearTimeout(timer);
  }, [revealedSections]);

  const sections = [
    {
      title: "Once upon a time...",
      content: "A magical celebration awaits",
      icon: <Sparkles className="w-12 h-12 text-princess-gold animate-sparkle" />,
      background: castleDreamy,
    },
    {
      title: invitationDetails.babyName,
      content: "is turning ONE!",
      icon: <Crown className="w-16 h-16 text-princess-gold animate-float" />,
      background: castleBackground,
      isNameReveal: true,
    },
    {
      title: `${invitationDetails.age} Birthday Celebration`,
      content: "Join us for a royal party",
      icon: <span className="text-6xl animate-float">🎂</span>,
      background: castleDreamy,
    },
    {
      title: "When",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Calendar className="w-6 h-6 text-princess-gold" />
            <span className="text-2xl font-semibold">{invitationDetails.date}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-princess-gold" />
            <span className="text-xl">{invitationDetails.time}</span>
          </div>
        </div>
      ),
      background: castleBackground,
    },
    {
      title: "Where",
      content: (
        <div className="flex flex-col items-center gap-3">
          <MapPin className="w-8 h-8 text-princess-gold" />
          <p className="text-xl text-center max-w-md leading-relaxed">
            {invitationDetails.venue}
          </p>
        </div>
      ),
      background: castleDreamy,
    },
    {
      title: "...and they celebrated happily ever after",
      content: "We can't wait to see you there! 👑✨",
      icon: <span className="text-6xl animate-float">🎉</span>,
      background: castleBackground,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Parallax Background Images */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${castleDreamy})`,
            backgroundAttachment: 'fixed',
            transform: 'translateZ(0)',
          }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${castleBackground})`,
            backgroundAttachment: 'fixed',
            transform: 'translateZ(0)',
            opacity: revealedSections > 2 ? 0.6 : 0,
          }}
        />
      </div>
      <div className="fixed inset-0 bg-gradient-to-b from-princess-pink/30 via-princess-lilac/20 to-princess-light/40" />
      
      {/* Content */}
      <div 
        ref={scrollRef}
        className="relative z-10 overflow-y-auto h-screen scroll-smooth"
      >
        <div className="min-h-screen flex flex-col items-center justify-center space-y-24 py-20 px-4">
          {sections.slice(0, revealedSections).map((section, index) => (
            <div
              key={index}
              className="text-center animate-fade-in w-full max-w-4xl"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Icon */}
              {section.icon && (
                <div className="mb-6 flex justify-center drop-shadow-lg">
                  {section.icon}
                </div>
              )}
              
              {/* Title */}
              <h1 
                className={`mb-6 font-bold tracking-wide drop-shadow-lg ${
                  section.isNameReveal 
                    ? 'text-6xl md:text-8xl' 
                    : 'text-4xl md:text-6xl'
                }`}
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  color: 'hsl(var(--princess-gold))',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.5), 0 0 10px rgba(0,0,0,0.8)',
                }}
              >
                {section.title}
              </h1>
              
              {/* Content */}
              <div 
                className="text-2xl md:text-3xl font-semibold drop-shadow-md"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: '#1a1a1a',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.8), 1px 1px 2px rgba(255,255,255,0.9)',
                }}
              >
                {section.content}
              </div>

              {/* Separator */}
              {index < revealedSections - 1 && (
                <div className="mt-12 flex justify-center">
                  <Sparkles className="w-8 h-8 text-princess-gold opacity-60 animate-sparkle" />
                </div>
              )}
            </div>
          ))}

          {/* Progress Dots */}
          {revealedSections > 0 && (
            <div className="flex justify-center gap-2 pb-8">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    index < revealedSections
                      ? 'bg-princess-gold w-8'
                      : 'bg-muted/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-princess-gold opacity-30 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
