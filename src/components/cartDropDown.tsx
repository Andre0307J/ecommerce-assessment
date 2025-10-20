import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CartDropdown() {
  const { items, removeItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full right-0 mt-4 w-[360px] max-w-[95vw] origin-top-right rounded-lg bg-white shadow-2xl z-10"
    >
      <h3 className="font-bold p-4 border-b border-gray-200">Cart</h3>
      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-center text-darkGrayishBlue font-bold py-12">
            Your cart is empty.
          </p>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <img
                  src={item.thumbnail}
                  alt={item.productName}
                  className="w-12 h-12 rounded-md"
                />
                <div className="flex-grow">
                  <p className="text-darkGrayishBlue">{item.productName}</p>
                  <p className="text-darkGrayishBlue">
                    ${item.price.toFixed(2)} x {item.quantity}{" "}
                    <span className="font-bold text-veryDarkBlue">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                  aria-label={`Remove ${item.productName} from cart`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <Link
              to="/checkout"
              className="block w-full text-center bg-orange text-white font-bold py-3 rounded-lg hover:bg-orange/80"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}