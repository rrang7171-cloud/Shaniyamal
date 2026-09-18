import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { BrandLogo } from './BrandLogo';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = searchTerm.trim()
    ? products.filter(
        (p) => {
          const term = searchTerm.toLowerCase();
          const isOfferQuery = term.includes('offer') || term.includes('sale') || term.includes('special');
          if (isOfferQuery && p.isSpecialOffer) return true;
          return (
            p.name.toLowerCase().includes(term) ||
            p.tagline.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.keyBotanicals.some((b) => b.toLowerCase().includes(term)) ||
            p.category.toLowerCase().includes(term) ||
            (p.packaging && p.packaging.toLowerCase().includes(term)) ||
            (p.offerDiscountText && p.offerDiscountText.toLowerCase().includes(term))
          );
        }
      )
    : products.slice(0, 4);

  const quickTags = ['Special Offers', 'Sunscreen SPF 50', 'Night Repair Cream', 'Face Oil', 'Sheet Masks', 'Lip Oil', 'Rosewater Mist'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        id="search-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-[#170E08EB]/60 backdrop-blur-xs transition-opacity"
      />

      <div
        id="search-modal-container"
        className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#E9DFD3] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE0D3] bg-[#FFFFFF] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C6239] shrink-0" />
          <input
            ref={inputRef}
            id="search-products-input"
            type="text"
            placeholder="Search serums, crèmes, botanical ingredients (e.g. Rosehip)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#2A1E16] placeholder-[#8A796C] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#8C7A6D] hover:text-[#2A1E16] p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5A4E] hover:text-[#2A1E16] hover:bg-[#F2ECE3] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-6 py-3 bg-[#F4EDE4] border-b border-[#E8DDD0] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#786659] font-medium shrink-0">Popular:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-[#FFFFFF] hover:bg-[#EFE7DC] text-[#4A3B31] border border-[#E5DAD0] transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#716155]">
              <p className="font-serif-luxury text-lg font-bold text-[#2A1E16]">
                No botanical formulas found
              </p>
              <p className="text-xs mt-1">Try searching for Vitamin C, Rosehip, or Creams</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group p-3 rounded-2xl bg-[#FFFFFF] hover:bg-[#FBF8F3] border border-[#EBE1D5] hover:border-[#8C6239]/40 transition-all flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl border border-[#EDE3D6] bg-[#F7F3ED]"
                    />
                    <div className="absolute top-0.5 left-0.5 scale-[0.6] origin-top-left">
                      <BrandLogo variant="stamp" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <BrandLogo variant="badge" />
                      {product.isSpecialOffer ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFF9F2] bg-gradient-to-r from-[#8C6239] to-[#5C3F24] px-1.5 py-0.5 rounded border border-[#DFC8AE]">
                          {product.offerDiscountText || 'Privileged Offer'}
                        </span>
                      ) : product.badge ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6239] bg-[#FAF3E7] px-1.5 py-0.5 rounded border border-[#EADBCA]">
                          {product.badge}
                        </span>
                      ) : null}
                      {product.category === 'sunscreen' && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6239] bg-[#FAF3E7] px-1.5 py-0.5 rounded border border-[#DFC8AE]">
                          Haute SPF
                        </span>
                      )}
                      {product.category === 'creams' && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#7A4E24] bg-[#F5EDE1] px-1.5 py-0.5 rounded border border-[#DFC8AE]">
                          Bio-Crème
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif-luxury text-sm font-bold text-[#2A1E16] group-hover:text-[#8C6239] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#716053] line-clamp-1 font-light">
                      {product.keyBotanicals.join(', ')}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center text-[#D4AF37] text-[10px]">
                        <Star className="w-3 h-3 fill-[#D4AF37]" />
                        <span className="ml-1 font-bold text-[#2A1E16]">{product.rating}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#8C6239]">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-[#9E8E81] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-full bg-[#F4EDE4] text-[#4A3B31] group-hover:bg-[#3D2C1E] group-hover:text-[#FAF7F2] transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
