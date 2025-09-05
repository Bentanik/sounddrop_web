import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RGB = { r: number; g: number; b: number };

export function rgbaString(rgb: RGB, alpha: number): string {
  const { r, g, b } = rgb;
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
}

export async function extractDominantColorFromImage(src: string): Promise<RGB> {
  return new Promise<RGB>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.loading = "eager";
    img.src = src;

    img.onerror = () =>
      reject(new Error("Failed to load image for color extraction"));
    img.onload = () => {
      const width = Math.min(64, img.naturalWidth || img.width);
      const height = Math.min(64, img.naturalHeight || img.height);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve({ r: 128, g: 128, b: 128 });
      ctx.drawImage(img, 0, 0, width, height);
      try {
        const { data } = ctx.getImageData(0, 0, width, height);
        let r = 0,
          g = 0,
          b = 0,
          count = 0;
        const step = 4 * 4; // sample every 4th pixel
        for (let i = 0; i < data.length; i += step) {
          const alpha = data[i + 3];
          if (alpha < 16) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count === 0) return resolve({ r: 128, g: 128, b: 128 });
        resolve({ r: r / count, g: g / count, b: b / count });
      } catch {
        resolve({ r: 128, g: 128, b: 128 });
      }
    };
  });
}
