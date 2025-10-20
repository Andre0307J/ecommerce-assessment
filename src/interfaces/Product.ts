// src/interfaces/Product.ts
export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  discountPercentage: number;
  images: ProductImage[];
}
