import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CartDropdown from "./cartDropDown";
import logo from "@/assets/logo.svg";
import avatar from "@/assets/image-avatar.png";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <header className="relative bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <div className="flex items-center gap-12">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Sneakers logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="text-darkGrayishBlue hover:text-veryDarkBlue relative after:content-[''] after:absolute after:bottom-[-2.25rem] after:left-0 after:w-full after:h-1 after:bg-orange after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="relative flex items-center gap-6">
          {/* Cart Icon */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label={`Cart with ${totalQuantity} items`}
              className="text-darkGrayishBlue hover:text-veryDarkBlue"
            >
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.02-15.42L17.39 6.92l-13.45.79L2.924 4.39l16.069-.962Z" fill="currentColor" fillRule="nonzero"/></svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
            <AnimatePresence>{isCartOpen && <CartDropdown />}</AnimatePresence>
          </div>

          {/* Avatar */}
          <button className="w-10 h-10 rounded-full border-2 border-transparent hover:border-orange">
            <img src={avatar} alt="User avatar" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 bg-black/75 z-10"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-2/3 h-full bg-white z-20 p-6">
            <button onClick={() => setIsMenuOpen(false)} className="mb-12" title="Close menu">
              <X />
            </button>
            <nav className="flex flex-col gap-4 font-bold">
              {navLinks.map((link) => (
                <NavLink key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
