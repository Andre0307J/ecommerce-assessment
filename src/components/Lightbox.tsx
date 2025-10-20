import type { ProductImage } from "@/interfaces/Product";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface LightboxProps {
  isOpen: boolean;
  images: ProductImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-orange transition" title="Close lightbox" aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Prev button */}
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 text-white hover:text-orange transition" title="Previous image" aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Next button */}
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-4 text-white hover:text-orange transition" title="Next image" aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Main image with drag + momentum */}
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-h-[70vh] max-w-[90vw] rounded-lg select-none mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            drag="x"
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const swipeDistance = info.offset.x;
              const swipeVelocity = info.velocity.x;
              const swipePower = Math.abs(swipeDistance) * Math.abs(swipeVelocity);

              if (swipeDistance < -100 || (swipeVelocity < -500 && swipePower > 20000)) {
                onNavigate((currentIndex + 1) % images.length);
              } else if (swipeDistance > 100 || (swipeVelocity > 500 && swipePower > 20000)) {
                onNavigate((currentIndex - 1 + images.length) % images.length);
              }
            }}
          />

          {/* Thumbnail carousel (swipeable on mobile) */}
          <motion.div
            className="flex gap-3 overflow-x-auto max-w-full px-2 py-2 rounded-lg bg-black/30"
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.3}
          >
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onNavigate(index)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition 
                  ${currentIndex === index ? "border-orange opacity-80" : "border-transparent"}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-16 h-16 object-cover"
                />
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}