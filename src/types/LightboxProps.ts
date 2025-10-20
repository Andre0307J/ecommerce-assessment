import type { ProductImage } from "@/interfaces/Product";

// src/interfaces/LightboxProps.ts
export interface LightboxProps {
  isOpen: boolean;
  images: ProductImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (idx: number) => void;
}
