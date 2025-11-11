import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ConfettiEffect from "@/components/ConfettiEffect";
import CloudLayers from "@/components/CloudLayers";
import CastleLayer from "@/components/CastleLayer";
import HeroSection from "@/components/HeroSection";
import DetailsSection from "@/components/DetailsSection";
import { getAvifSupport, preloadImage } from "@/lib/image-support";

// AVIF imports for preloading
import castleAvif from "@/assets/avif/castle.avif";
import cloudOneAvif from "@/assets/avif/isolated-cloud-one.avif";
import cloudTwoAvif from "@/assets/avif/isolated-cloud-two.avif";
import cloudThreeAvif from "@/assets/avif/isolated-cloud-three.avif";
import crownAvif from "@/assets/avif/crown.avif";

// WebP fallback imports for preloading
import castleWebp from "@/assets/webp/castle.webp";
import cloudOneWebp from "@/assets/webp/isolated-cloud-one.webp";
import cloudTwoWebp from "@/assets/webp/isolated-cloud-two.webp";
import cloudThreeWebp from "@/assets/webp/isolated-cloud-three.webp";
import crownWebp from "@/assets/webp/crown.webp";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const detailsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDetails = () => {
    detailsSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Preload images - load only AVIF or WebP based on browser support
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Check AVIF support first
        const supportsAvif = await getAvifSupport();
        
        // Define images with both formats
        const imagesToLoad = [
          { avif: castleAvif, webp: castleWebp },
          { avif: cloudOneAvif, webp: cloudOneWebp },
          { avif: cloudTwoAvif, webp: cloudTwoWebp },
          { avif: cloudThreeAvif, webp: cloudThreeWebp },
          { avif: crownAvif, webp: crownWebp }
        ];

        // Load only the supported format
        const imagePromises = imagesToLoad.map(({ avif, webp }) => 
          preloadImage(supportsAvif ? avif : webp)
        );

        await Promise.all(imagePromises);
        
        // Add a small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 300);
      } catch (error) {
        console.error('Error loading images:', error);
        // Still show content even if images fail to load
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

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
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden" style={{ touchAction: 'pan-y' }}>
      {/* Confetti Effects */}
      <ConfettiEffect />

      {/* Base gradient background - baby pink to lilac - z-index: 0 */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-100 via-pink-200 to-purple-200 z-0" />
      
      {/* Cloud layers with parallax effect */}
      <CloudLayers scrollY={scrollY} />
      
      {/* Castle layer */}
      <CastleLayer scrollY={scrollY} />
      
      {/* Gradient overlay for depth - z-index: 30 */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-300/40 to-purple-500/80 pointer-events-none z-30" />
      
      {/* Content - z-index: 40 */}
      <div className="relative z-40">
        {/* Hero Section - Name Reveal */}
        <HeroSection onDetailsClick={scrollToDetails} />

        {/* Details Section */}
        <DetailsSection ref={detailsSectionRef} />

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
