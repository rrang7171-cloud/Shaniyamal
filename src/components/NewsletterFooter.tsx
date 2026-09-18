import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Copy, Instagram, Facebook, Heart, Sparkles } from 'lucide-react';

interface NewsletterFooterProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

export const NewsletterFooter: React.FC<NewsletterFooterProps> = ({
  onOpenContact,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('GLOW10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <footer className="bg-[#241A13] text-[#FAF7F2] relative overflow-hidden pt-20 pb-12 border-t border-[#3D2C1E]">
      {/* Decorative Warm Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#8C6239]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-[#2F2117] rounded-3xl p-8 sm:p-12 border border-[#483424] mb-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2C1E] text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Botanical Welcome</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFFFF]">
                Join our Circle & Enjoy 10% Off
              </h3>
              <p className="text-[#C5B3A2] text-sm sm:text-base font-light max-w-xl">
                Subscribe to receive seasonal botanical harvest updates, holistic skin ritual guides, and your complimentary 10% welcome voucher on your first order.
              </p>
            </div>

            <div className="lg:col-span-5">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-[#8C7665] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        id="newsletter-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Enter your email address..."
                        className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#1F1610] text-[#FAF7F2] placeholder-[#8A7666] text-sm border border-[#483424] focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>
                    <button
                      id="newsletter-submit-btn"
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-[#8C6239] hover:bg-[#A37446] text-[#FAF7F2] rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md shrink-0"
                    >
                      <span>Claim 10%</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-xs text-[#E58A7A] pl-4">{errorMessage}</p>
                  )}
                  <p className="text-[11px] text-[#8C7665] pl-4">
                    No spam ever. Unsubscribe with one click anytime.
                  </p>
                </form>
              ) : (
                <div className="bg-[#1F1610] p-5 rounded-2xl border border-[#C5A059]/40 space-y-3 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-2 text-[#76A876]">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-semibold text-[#FFFFFF]">Welcome to Glow & Grow!</span>
                  </div>
                  <p className="text-xs text-[#C5B3A2]">
                    Your 10% welcome discount code is ready. Use at checkout:
                  </p>
                  <div className="flex items-center justify-between bg-[#2F2117] px-4 py-2.5 rounded-xl border border-[#483424]">
                    <span className="font-mono font-bold text-base tracking-widest text-[#D4AF37]">
                      GLOW10
                    </span>
                    <button
                      id="copy-newsletter-code-btn"
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#3D2C1E] hover:bg-[#4E3725] text-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#76A876]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3D2C1E] flex items-center justify-center text-[#D4AF37] border border-[#523A26]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-tight text-[#FFFFFF]">
                Glow & Grow
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#AD9C8E] leading-relaxed font-light">
              Conscious botanical skincare formulated with biocompatible oils, organic flower extracts, and sealed inside protective dark amber glass for naturally radiant, vibrant skin.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                id="social-instagram"
                aria-label="Instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#2E2017] hover:bg-[#3D2C1E] text-[#D4AF37] flex items-center justify-center transition-colors border border-[#483424]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                id="social-facebook"
                aria-label="Facebook"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#2E2017] hover:bg-[#3D2C1E] text-[#D4AF37] flex items-center justify-center transition-colors border border-[#483424]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#pinterest"
                id="social-pinterest"
                aria-label="Pinterest"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#2E2017] hover:bg-[#3D2C1E] text-[#D4AF37] flex items-center justify-center transition-colors border border-[#483424]"
              >
                <span className="font-serif font-bold text-xs">P</span>
              </a>
              <a
                href="#tiktok"
                id="social-tiktok"
                aria-label="TikTok"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#2E2017] hover:bg-[#3D2C1E] text-[#D4AF37] flex items-center justify-center transition-colors border border-[#483424]"
              >
                <span className="font-sans font-bold text-[11px]">TT</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Shop Botanical
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#C5B3A2]">
              <li>
                <button
                  id="footer-shop-serums"
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Botanical Serums
                </button>
              </li>
              <li>
                <button
                  id="footer-shop-creams"
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Nourishing Crèmes
                </button>
              </li>
              <li>
                <button
                  id="footer-shop-cleansers"
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Gentle Cleansers
                </button>
              </li>
              <li>
                <button
                  id="footer-shop-elixirs"
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Youth Elixirs
                </button>
              </li>
              <li>
                <button
                  id="footer-shop-all"
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Full Collection
                </button>
              </li>
            </ul>
          </div>

          {/* About & Philosophy */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Philosophy & Ritual
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#C5B3A2]">
              <li>
                <button
                  id="footer-about-us"
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Our Botanical Story
                </button>
              </li>
              <li>
                <button
                  id="footer-amber-story"
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Why Dark Amber Glass
                </button>
              </li>
              <li>
                <button
                  id="footer-reviews"
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Radiant Reviews (2,400+)
                </button>
              </li>
              <li>
                <button
                  id="footer-sustainability"
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Regenerative Farming
                </button>
              </li>
              <li>
                <button
                  id="footer-press"
                  onClick={onOpenContact}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Press & Partnerships
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#C5B3A2]">
              <li>
                <button
                  id="footer-care-contact"
                  onClick={onOpenContact}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Contact Skin Care Team
                </button>
              </li>
              <li>
                <button
                  id="footer-care-consultation"
                  onClick={onOpenContact}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Complimentary Skin Consultation
                </button>
              </li>
              <li>
                <button
                  id="footer-care-shipping"
                  onClick={onOpenContact}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Shipping & Worldwide Delivery
                </button>
              </li>
              <li>
                <button
                  id="footer-care-returns"
                  onClick={onOpenContact}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  30-Day Glow Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  id="footer-care-faqs"
                  onClick={onOpenContact}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  FAQ & Packaging Recycling
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Made with Care, Payment badges */}
        <div className="pt-8 border-t border-[#382619] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A786B]">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Glow & Grow Skincare Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#9E8B7D]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
            <span className="flex items-center gap-1 text-[#C5A059]">
              <Heart className="w-3 h-3 fill-[#C5A059]" /> Clean Beauty
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
