import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenContact,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'contact') {
      onOpenContact();
    } else {
      onNavigate(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div 
        id="announcement-bar" 
        className="bg-[#2D2118] text-[#F3ECE2] text-xs py-2 px-4 text-center tracking-wider flex items-center justify-center gap-2 font-medium"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>Complimentary cellular peptide travel elixir on all orders over ₹5,000 • Use code <strong className="text-[#E7C673] underline decoration-[#E7C673]/50 underline-offset-2">GLOW10</strong> for 10% off</span>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        id="main-navbar"
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD5] py-3.5' 
            : 'bg-[#FAF7F2]/90 backdrop-blur-xs py-4 border-b border-[#EAE3DA]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on Top Left */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#3D2C1E] flex items-center justify-center text-[#D4AF37] shadow-xs group-hover:bg-[#2C1F15] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22C12 22 4 17 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10C20 17 12 22 12 22Z" />
                <path d="M12 7V16" />
                <path d="M9 11L12 8L15 11" />
              </svg>
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#2B1F17] block leading-none">
                Glow & Grow
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6239] font-medium block mt-0.5">
                Skincare
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-[#4A3B32]">
            <button 
              id="nav-link-home"
              onClick={() => handleLinkClick('hero')} 
              className="hover:text-[#8C6239] transition-colors py-1 cursor-pointer"
            >
              Home
            </button>
            <button 
              id="nav-link-shop"
              onClick={() => handleLinkClick('products')} 
              className="hover:text-[#8C6239] transition-colors py-1 cursor-pointer"
            >
              Shop All
            </button>
            <button 
              id="nav-link-about"
              onClick={() => handleLinkClick('story')} 
              className="hover:text-[#8C6239] transition-colors py-1 cursor-pointer"
            >
              About Us
            </button>
            <button 
              id="nav-link-reviews"
              onClick={() => handleLinkClick('reviews')} 
              className="hover:text-[#8C6239] transition-colors py-1 cursor-pointer"
            >
              Reviews
            </button>
            <button 
              id="nav-link-contact"
              onClick={() => handleLinkClick('contact')} 
              className="hover:text-[#8C6239] transition-colors py-1 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Right Action Icons: Search & Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Button */}
            <button
              id="nav-search-button"
              onClick={onOpenSearch}
              aria-label="Search botanical products"
              className="p-2 text-[#4A3B32] hover:text-[#8C6239] hover:bg-[#F2ECE3] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              id="nav-cart-button"
              onClick={onOpenCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative p-2 text-[#4A3B32] hover:text-[#8C6239] hover:bg-[#F2ECE3] rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span 
                  id="cart-badge-count"
                  className="absolute -top-0.5 -right-0.5 bg-[#8C6239] text-[#FAF7F2] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-200"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A3B32] hover:text-[#8C6239] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-panel"
            className="md:hidden bg-[#FAF7F2] border-b border-[#E8DFD5] px-6 py-6 shadow-xl space-y-4 text-base font-medium text-[#3A2D25] animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col space-y-3">
              <button 
                id="mobile-nav-home"
                onClick={() => handleLinkClick('hero')} 
                className="text-left py-2 border-b border-[#EFE8DF] hover:text-[#8C6239] transition-colors"
              >
                Home
              </button>
              <button 
                id="mobile-nav-shop"
                onClick={() => handleLinkClick('products')} 
                className="text-left py-2 border-b border-[#EFE8DF] hover:text-[#8C6239] transition-colors"
              >
                Shop All
              </button>
              <button 
                id="mobile-nav-about"
                onClick={() => handleLinkClick('story')} 
                className="text-left py-2 border-b border-[#EFE8DF] hover:text-[#8C6239] transition-colors"
              >
                About Us
              </button>
              <button 
                id="mobile-nav-reviews"
                onClick={() => handleLinkClick('reviews')} 
                className="text-left py-2 border-b border-[#EFE8DF] hover:text-[#8C6239] transition-colors"
              >
                Reviews
              </button>
              <button 
                id="mobile-nav-contact"
                onClick={() => handleLinkClick('contact')} 
                className="text-left py-2 hover:text-[#8C6239] transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="pt-2">
              <button
                id="mobile-nav-cta-btn"
                onClick={() => handleLinkClick('products')}
                className="w-full py-3 bg-[#3D2C1E] hover:bg-[#2A1D13] text-[#FAF7F2] rounded-full text-sm font-semibold tracking-wide transition-colors"
              >
                Shop the Collection
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
