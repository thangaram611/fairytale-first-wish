/**
 * Detects AVIF image format support in the browser
 * Returns true if AVIF is supported, false otherwise
 */
export async function supportsAvif(): Promise<boolean> {
  if (!createImageBitmap) return false;
  
  const avifData =
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  
  try {
    const blob = await fetch(avifData).then((r) => r.blob());
    await createImageBitmap(blob);
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

/**
 * Cached result of AVIF support detection
 */
let avifSupportCache: boolean | null = null;

/**
 * Gets AVIF support status (cached after first check)
 */
export async function getAvifSupport(): Promise<boolean> {
  if (avifSupportCache !== null) {
    return avifSupportCache;
  }
  
  avifSupportCache = await supportsAvif();
  return avifSupportCache;
}

/**
 * Preload an image and return a promise that resolves when loaded
 */
export function preloadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
