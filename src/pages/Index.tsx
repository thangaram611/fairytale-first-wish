import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Crown, Sparkles, MapPin, Calendar, Clock } from "lucide-react";
import castleBackground from "@/assets/castle-background.jpg";
import castleDreamy from "@/assets/castle-dreamy.jpg";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
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
      if (currentSection < 5) {
        setCurrentSection(currentSection + 1);
        
        // Trigger confetti on name reveal (section 1)
        if (currentSection === 0) {
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
      }
    }, currentSection === 0 ? 2500 : 2000);

    return () => clearTimeout(timer);
  }, [currentSection]);

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

  const currentSectionData = sections[currentSection];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentSectionData.background})`,
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-princess-pink/40 via-princess-lilac/30 to-princess-light/50" />
      
      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          {/* Icon */}
          {currentSectionData.icon && (
            <div className="mb-6 flex justify-center">
              {currentSectionData.icon}
            </div>
          )}
          
          {/* Title */}
          <h1 
            className={`mb-6 font-bold tracking-wide ${
              currentSectionData.isNameReveal 
                ? 'text-6xl md:text-8xl' 
                : 'text-4xl md:text-6xl'
            }`}
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: 'hsl(var(--princess-gold))',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(255,215,0,0.3)',
            }}
          >
            {currentSectionData.title}
          </h1>
          
          {/* Content */}
          <div 
            className="text-2xl md:text-3xl font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'hsl(var(--foreground))',
            }}
          >
            {currentSectionData.content}
          </div>

          {/* Progress Dots */}
          <div className="mt-12 flex justify-center gap-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-500 ${
                  index === currentSection
                    ? 'bg-princess-gold w-8'
                    : index < currentSection
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
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
