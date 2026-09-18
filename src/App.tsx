import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BrandStory } from './components/BrandStory';
import { ReviewsSection } from './components/ReviewsSection';
import { NewsletterFooter } from './components/NewsletterFooter';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Start with 1 default item so the user can immediately experience the cart drawer
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-hide toast after 2.5 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setToastMessage(`Added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} to your ritual`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C221E] flex flex-col selection:bg-[#E4D5C5] selection:text-[#251A12]">
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-[#3D2C1E] text-[#FAF7F2] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#523C2B] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm"
        >
          <CheckCircle className="w-5 h-5 text-[#7CAE7C] shrink-0" />
          <span className="text-xs font-medium leading-tight">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-auto text-xs underline font-semibold text-[#D4AF37] hover:text-[#FFFFFF] cursor-pointer shrink-0"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Homepage Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onShopClick={() => scrollToSection('products')}
          onStoryClick={() => scrollToSection('story')}
        />

        {/* 2. Featured Products Grid (25 Formulations) */}
        <FeaturedProducts
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 3. Brand Story Section */}
        <BrandStory />

        {/* 4. Customer Reviews Section */}
        <ReviewsSection />
      </main>

      {/* 5. Footer with Newsletter */}
      <NewsletterFooter
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Interactive Drawers and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating Fast Cart Button for mobile & easy checkout accessibility */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          id="floating-cart-trigger"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-[#8C6239] hover:bg-[#724D29] text-[#FAF7F2] p-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          aria-label="Open cart drawer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs font-bold bg-[#FAF7F2] text-[#3D2C1E] w-5 h-5 rounded-full flex items-center justify-center">
            {totalCartCount}
          </span>
        </button>
      )}
    </div>
  );
}
