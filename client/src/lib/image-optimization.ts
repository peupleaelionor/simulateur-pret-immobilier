/**
 * Image optimization utilities
 * Provides lazy-loading and responsive image handling
 */

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Lazy load images using Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        const src = target.dataset.src;
        if (src) {
          target.src = src;
          target.removeAttribute('data-src');
        }
        observer.unobserve(target);
      }
    });
  });

  observer.observe(img);
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(baseSrc: string, sizes: number[]): string {
  return sizes
    .map((size) => {
      const ext = baseSrc.split('.').pop();
      const base = baseSrc.replace(`.${ext}`, '');
      return `${base}-${size}w.${ext} ${size}w`;
    })
    .join(', ');
}

/**
 * Convert image to WebP format (client-side check)
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

/**
 * Get optimized image URL
 */
export function getOptimizedImageUrl(src: string): string {
  if (supportsWebP()) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return src;
}
