import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { getAvifSupport } from '@/lib/image-support';

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  avifSrc: string;
  webpSrc: string;
  alt: string;
}

/**
 * Picture component that uses AVIF with WebP fallback
 * Detects browser support and loads only the appropriate format
 */
const Picture = ({ avifSrc, webpSrc, alt, ...imgProps }: PictureProps) => {
  const [imageSrc, setImageSrc] = useState<string>(webpSrc);

  useEffect(() => {
    getAvifSupport().then((supportsAvif) => {
      setImageSrc(supportsAvif ? avifSrc : webpSrc);
    });
  }, [avifSrc, webpSrc]);

  return <img src={imageSrc} alt={alt} {...imgProps} />;
};

export default Picture;
