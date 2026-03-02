import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/#tabla", label: "Comparativa" },
    { to: "/ruta-aprendizaje", label: "Ruta de Aprendizaje" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-950/90 backdrop-blur-lg border-b border-white/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              AI<span className="gradient-text">Video</span>Guide
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className={`text-sm font-medium transition-colors hover:text-violet-400 ${
                  location.pathname === link.to ? "text-violet-400" : "text-gray-300"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#tabla"
              className="btn-primary text-sm py-2 px-4"
            >
              Ver Herramientas
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-gray-300 hover:text-violet-400 transition-colors py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/#tabla" className="btn-primary text-sm py-2 text-center mt-2">
              Ver Herramientas
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
