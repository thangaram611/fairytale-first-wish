import { motion, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import Picture from "@/components/Picture";

// AVIF imports
import cloudOneAvif from "@/assets/avif/isolated-cloud-one.avif";
import cloudTwoAvif from "@/assets/avif/isolated-cloud-two.avif";
import cloudThreeAvif from "@/assets/avif/isolated-cloud-three.avif";

// WebP fallback imports
import cloudOneWebp from "@/assets/webp/isolated-cloud-one.webp";
import cloudTwoWebp from "@/assets/webp/isolated-cloud-two.webp";
import cloudThreeWebp from "@/assets/webp/isolated-cloud-three.webp";

interface CloudLayersProps {
  scrollY: number;
}

const CloudLayers = ({ scrollY }: CloudLayersProps) => {
  const scrollYMotion = useMotionValue(0);

  useEffect(() => {
    scrollYMotion.set(scrollY);
  }, [scrollY, scrollYMotion]);

  // Far clouds move slower (parallax effect) - responsive from start of scroll
  const layer1Y = useTransform(scrollYMotion, [0, 1000], [0, 50]);    // Slowest - far background
  const layer2Y = useTransform(scrollYMotion, [0, 1000], [0, 100]);   // Medium-slow
  const layer3Y = useTransform(scrollYMotion, [0, 1000], [0, 200]);   // Medium-fast
  const layer5Y = useTransform(scrollYMotion, [0, 1000], [0, 300]);   // Fastest - closest to viewer

  return (
    <>
      {/* Cloud layer 1 - Slow moving, top */}
      <motion.div 
        className="fixed min-h-[100dvh] inset-0 overflow-hidden z-10 pointer-events-none"
        style={{ 
          y: layer1Y,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Picture 
          avifSrc={cloudOneAvif}
          webpSrc={cloudOneWebp}
          alt="" 
          className="absolute top-[5%] left-[5%] w-[35%] h-auto object-contain opacity-70"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudTwoAvif}
          webpSrc={cloudTwoWebp}
          alt="" 
          className="absolute top-[15%] right-[10%] w-[30%] h-auto object-contain opacity-60"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudThreeAvif}
          webpSrc={cloudThreeWebp}
          alt="" 
          className="absolute top-[10%] left-[40%] w-[28%] h-auto object-contain opacity-65"
          style={{ mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* Cloud layer 2 - Medium speed, middle */}
      <motion.div 
        className="fixed min-h-[100dvh] inset-0 overflow-hidden z-11 pointer-events-none"
        style={{ 
          y: layer2Y,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Picture 
          avifSrc={cloudOneAvif}
          webpSrc={cloudOneWebp}
          alt="" 
          className="absolute top-[30%] left-[15%] w-[40%] h-auto object-contain opacity-80"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudTwoAvif}
          webpSrc={cloudTwoWebp}
          alt="" 
          className="absolute top-[25%] right-[5%] w-[35%] h-auto object-contain opacity-75"
          style={{ mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* Cloud layer 3 - Faster, bottom */}
      <motion.div 
        className="fixed min-h-[100dvh] inset-0 overflow-hidden z-12 pointer-events-none"
        style={{ 
          y: layer3Y,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Picture 
          avifSrc={cloudTwoAvif}
          webpSrc={cloudTwoWebp}
          alt="" 
          className="absolute top-[60%] left-[8%] w-[38%] h-auto object-contain opacity-85"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudOneAvif}
          webpSrc={cloudOneWebp}
          alt="" 
          className="absolute top-[70%] right-[12%] w-[32%] h-auto object-contain opacity-70"
          style={{ mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* Cloud layer 5 - In front of castle, slow parallax */}
      <motion.div 
        className="fixed min-h-[100dvh] inset-0 overflow-hidden z-25 pointer-events-none"
        style={{ 
          y: layer5Y,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Picture 
          avifSrc={cloudOneAvif}
          webpSrc={cloudOneWebp}
          alt="" 
          className="absolute top-[35%] left-[5%] w-[38%] h-auto object-contain opacity-85"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudThreeAvif}
          webpSrc={cloudThreeWebp}
          alt="" 
          className="absolute top-[55%] right-[8%] w-[42%] h-auto object-contain opacity-80"
          style={{ mixBlendMode: 'screen' }}
        />
      </motion.div>
    </>
  );
};

export default CloudLayers;
