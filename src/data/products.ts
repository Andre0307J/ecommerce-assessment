// products.ts
import type { Product } from "@/interfaces/Product";
import product1 from "@/assets/image-product-1.jpg";
import product2 from "@/assets/image-product-2.jpg";
import product3 from "@/assets/image-product-3.jpg";
import product4 from "@/assets/image-product-4.jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    description:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: 125.0,
    oldPrice: 250.0,
    discountPercentage: 50,
    images: [
      { src: product1, alt: "A pair of sneakers shown from the side." },
      { src: product2, alt: "A pair of sneakers on two rocks." },
      { src: product3, alt: "A top-down view of one sneaker." },
      { src: product4, alt: "A side view of one sneaker on a rock." },
    ],
  },
];
