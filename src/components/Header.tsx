import { useState } from "react";
import { Calculator, Menu, X, BookOpen, Mail } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export default function Header({ currentPath, navigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Calculateur", path: "/calculateur-taxe-de-sejour", icon: Calculator },
    { label: "Comment calculer ?", path: "/comment-calculer-la-taxe-de-sejour", icon: BookOpen },
    { label: "Contact", path: "/contact", icon: Mail },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fbfbfb] border-b border-black/10 backdrop-blur-md bg-opacity-95 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-stretch">
          {/* Logo */}
          <div className="flex items-center py-2">
            <button
              onClick={() => handleLinkClick("/")}
              className="flex items-center gap-2 text-xl font-black text-black tracking-tighter hover:opacity-90 cursor-pointer"
            >
              <div className="bg-[#d1121d] text-white p-2 flex items-center justify-center">
                <Calculator className="h-5 w-5" />
              </div>
              <span>
                SEJOUR<span className="text-[#d1121d]">TAXE</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-stretch">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`px-5 flex items-center text-xs uppercase tracking-wider font-extrabold transition-all duration-150 cursor-pointer border-r border-black/5 ${
                    isActive
                      ? "bg-[#d1121d] text-white"
                      : "text-black hover:text-[#d1121d] hover:bg-black/5"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="flex items-center pl-4">
              <button
                onClick={() => handleLinkClick("/calculateur-taxe-de-sejour")}
                className="bg-black text-white hover:bg-[#d1121d] px-5 py-2.5 text-xs uppercase tracking-wider font-black transition-all cursor-pointer"
              >
                Calculer ma taxe
              </button>
            </div>
          </nav>

          {/* Mobile Actions: Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-black hover:text-[#d1121d] hover:bg-black/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-black/10 bg-[#fbfbfb] px-4 pt-2 pb-4 space-y-1 transition-all">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-black transition-colors ${
                  isActive
                    ? "bg-[#d1121d] text-white"
                    : "text-black hover:text-[#d1121d] hover:bg-black/5"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-black/5">
            <button
              onClick={() => handleLinkClick("/calculateur-taxe-de-sejour")}
              className="w-full text-center bg-black text-white hover:bg-[#d1121d] py-3 text-xs uppercase tracking-wider font-black"
            >
              Calculer ma taxe de séjour
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
