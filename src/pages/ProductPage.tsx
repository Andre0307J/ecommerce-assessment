import { useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/interfaces/Product";
import { useCart } from "@/context/CartContext";
import Lightbox from "@/components/Lightbox";

const ProductPage = () => {
  const product: Product = products[0];
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-16 px-6 py-12 max-w-6xl mx-auto">
      {/* LEFT - IMAGE GALLERY */}
      <div>
        {/* Main image */}
        <img
          src={product.images[currentIndex].src}
          alt={product.images[currentIndex].alt}
          className="w-full rounded-2xl mb-6 cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`rounded-xl overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-orange ${
                currentIndex === index
                  ? "border-orange opacity-75"
                  : "border-transparent"
              }`}
            >
              <img src={img.src} alt={img.alt} />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT - PRODUCT DETAILS */}
      <div className="flex flex-col justify-center">
        <p className="uppercase text-orange font-bold text-sm tracking-wider mb-2">
          Sneaker Company
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-veryDarkBlue mb-6">
          {product.name}
        </h1>
        <p className="text-darkGrayishBlue mb-6">{product.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between mb-6 md:flex-col md:items-start">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-veryDarkBlue">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="bg-paleOrange text-orange font-bold px-2 rounded-md">
                {product.discountPercentage}%
              </span>
            )}
          </div>
          {product.discountPercentage > 0 && (
            <span className="text-grayishBlue line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity + Add to cart */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Quantity selector */}
          <div className="flex items-center bg-lightGrayishBlue rounded-lg">
            <button
              type="button"
              className="px-4 py-3 text-orange font-bold text-lg"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-6" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className="px-4 py-3 text-orange font-bold text-lg"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            className="bg-orange hover:bg-orange/80 text-white font-bold w-full md:w-auto px-8 py-3 rounded-lg shadow-lg flex items-center justify-center gap-3"
            onClick={handleAddToCart}
          >
            <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.02-15.42L17.39 6.92l-13.45.79L2.924 4.39l16.069-.962Z" fill="currentColor" fillRule="nonzero"/></svg>
            Add to cart
          </button>
        </div>
      </div>

      {/* Lightbox (exclusive to images) */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={product.images}
        currentIndex={currentIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </main>
  );
};

export default ProductPage;
