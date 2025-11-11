import { useState, useEffect } from "react";
import Picture from "@/components/Picture";

// AVIF imports
import castleAvif from "@/assets/avif/castle.avif";

// WebP fallback imports
import castleWebp from "@/assets/webp/castle.webp";

interface CastleLayerProps {
  scrollY: number;
}

const CastleLayer = ({ scrollY }: CastleLayerProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Castle parallax calculations optimized for mobile scrolling
  let initialTranslateY_vh: number;
  let scaleMultiplier: number;
  let baseScale: number;
  let translateSpeed: number;

  if (windowWidth <= 768) {
    // Mobile: Reduced initial position and faster parallax for quicker reveal
    initialTranslateY_vh = 50; 
    translateSpeed = 2.2;
    scaleMultiplier = 0.0012;
    baseScale = 1.15;
  } else if (windowWidth <= 1024) {
    // Tablet: Moderate adjustments
    initialTranslateY_vh = 50;
    translateSpeed = 1.6;
    scaleMultiplier = 0.001;
    baseScale = 1.0;
  } else {
    // Desktop: Keep original smooth experience
    initialTranslateY_vh = 50;
    translateSpeed = 1;
    scaleMultiplier = 0.0006;
    baseScale = 1.0;
  }

  // Convert vh to pixels for consistent calculations across devices
  const initialTranslateY_px = (initialTranslateY_vh * windowHeight) / 100;
  const stopScrollY = initialTranslateY_px / translateSpeed;
  const translateY_px = Math.max(0, initialTranslateY_px - scrollY * translateSpeed);
  const translateY_vh = (translateY_px / windowHeight) * 100;
  const scrollPastStopPoint = Math.max(0, scrollY - stopScrollY);
  
  const scale = baseScale + scrollPastStopPoint * scaleMultiplier;

  const castleParallaxStyle = {
    bottom: windowWidth <= 768 ? '-40dvh' : windowWidth <= 1024 ? '-20dvh' : '0dvh',
    transform: `translateY(${translateY_vh}vh) scale(${scale})`,
    willChange: 'transform',
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 flex justify-center z-20"
      style={castleParallaxStyle}
    >
      <Picture 
        avifSrc={castleAvif}
        webpSrc={castleWebp}
        alt="Fairy tale castle" 
        className="w-auto h-[180vh] md:h-[150vh] lg:h-[120vh] object-contain drop-shadow-2xl brightness-110 contrast-105"
        style={{
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
        }}
      />
    </div>
  );
};

export default CastleLayer;
