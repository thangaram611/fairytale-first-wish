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
  return (
    <>
      {/* Cloud layer 1 - Slow moving, top left */}
      <div 
        className="fixed inset-0 overflow-hidden z-10 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: 'transform',
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
      </div>

      {/* Cloud layer 2 - Medium speed, middle */}
      <div 
        className="fixed inset-0 overflow-hidden z-11 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.35}px)`,
          willChange: 'transform',
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
        <Picture 
          avifSrc={cloudThreeAvif}
          webpSrc={cloudThreeWebp}
          alt="" 
          className="hidden md:block absolute top-[50%] left-[50%] w-[25%] h-auto object-contain opacity-50 -translate-x-1/2"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudOneAvif}
          webpSrc={cloudOneWebp}
          alt="" 
          className="hidden md:block absolute top-[45%] right-[20%] w-[30%] h-auto object-contain opacity-70"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Cloud layer 3 - Faster, bottom */}
      <div 
        className="fixed inset-0 overflow-hidden z-12 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: 'transform',
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
        <Picture 
          avifSrc={cloudThreeAvif}
          webpSrc={cloudThreeWebp}
          alt="" 
          className="hidden md:block absolute top-[65%] left-[45%] w-[35%] h-auto object-contain opacity-75"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Cloud layer 4 - Very slow, far background - hidden on mobile */}
      <div 
        className="hidden md:block fixed inset-0 overflow-hidden z-13 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          willChange: 'transform',
        }}
      >
        <Picture 
          avifSrc={cloudTwoAvif}
          webpSrc={cloudTwoWebp}
          alt="" 
          className="absolute top-[40%] left-[30%] w-[45%] h-auto object-contain opacity-40"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudOneAvif}
          webpSrc={cloudOneWebp}
          alt="" 
          className="absolute top-[55%] right-[25%] w-[40%] h-auto object-contain opacity-45"
          style={{ mixBlendMode: 'screen' }}
        />
        <Picture 
          avifSrc={cloudThreeAvif}
          webpSrc={cloudThreeWebp}
          alt="" 
          className="absolute top-[48%] left-[60%] w-[42%] h-auto object-contain opacity-42"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Cloud layer 5 - In front of castle, slow parallax */}
      <div 
        className="fixed inset-0 overflow-hidden z-25 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          willChange: 'transform',
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
      </div>
    </>
  );
};

export default CloudLayers;
