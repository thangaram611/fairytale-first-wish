import { useEffect, useMemo } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import Picture from "@/components/Picture";

// AVIF imports
import castleAvif from "@/assets/avif/castle.avif";

// WebP fallback imports
import castleWebp from "@/assets/webp/castle.webp";

interface CastleLayerProps {
  scrollY: number;
}

const CastleLayer = ({ scrollY }: CastleLayerProps) => {
  const scrollYMotion = useMotionValue(0);
  
  useEffect(() => {
    scrollYMotion.set(scrollY);
  }, [scrollY, scrollYMotion]);

  // Mobile-optimized parallax configuration
  const initialTranslateY_vh = 50; // Start much lower - castle mostly below viewport
  const translateSpeed = 1.5; // Slower translation for more visible movement
  const scaleMultiplier = 0.0008;
  const baseScale = 1.0;
  const windowHeight = window.innerHeight;
  const initialTranslateY_px = (initialTranslateY_vh * windowHeight) / 100;

  // Transform calculations using Framer Motion
  const translateY = useTransform(
    scrollYMotion,
    [0, initialTranslateY_px / translateSpeed],
    [initialTranslateY_vh, -150] // Translate from 50vh down to -25vh (up into view)
  );

  const scale = useTransform(
    scrollYMotion,
    (value) => {
      const stopScrollY = initialTranslateY_px / translateSpeed;
      const scrollPastStopPoint = Math.max(0, value - stopScrollY);
      return baseScale + scrollPastStopPoint * scaleMultiplier;
    }
  );

  return (
    <motion.div 
      className="fixed min-h-[100dvh] bottom-0 left-0 right-0 flex justify-center z-20"
      style={{
        bottom: '-80vh', // Start much lower to work with increased translateY
        y: translateY,
        scale: scale,
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      <Picture 
        avifSrc={castleAvif}
        webpSrc={castleWebp}
        alt="Fairy tale castle" 
        className="w-auto h-[180vh] object-contain drop-shadow-2xl brightness-110 contrast-105"
        style={{
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
        }}
      />
    </motion.div>
  );
};

export default CastleLayer;
