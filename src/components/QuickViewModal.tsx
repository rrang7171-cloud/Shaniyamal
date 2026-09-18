import React, { useState } from 'react';
import { X, Star, Plus, Minus, Check, ShieldCheck, Sparkles, Droplets, ShoppingBag, Sun, Moon, Percent } from 'lucide-react';
import { Product } from '../types';
import { BrandLogo } from './BrandLogo';
import { formatINR } from '../utils/currency';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const isSunscreen = product.category === 'sunscreen';
  const isCream = product.category === 'creams';
  const isOffer = Boolean(product.isSpecialOffer);
  const savings = product.originalPrice && product.originalPrice > product.price 
    ? (product.originalPrice - product.price) 
    : 0;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        id="quickview-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-[#160D07]/75 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div
        id="quickview-modal-content"
        className={`relative bg-[#FAF6F0] rounded-3xl max-w-3xl w-full border shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 ${
          isSunscreen 
            ? 'border-[#D4AF37]/80 ring-1 ring-[#D4AF37]/40' 
            : isCream 
            ? 'border-[#B8860B]/80 ring-1 ring-[#B8860B]/40' 
            : 'border-[#DFCDB7]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#2C1E14] hover:text-[#8C6239] border border-[#E7D6C2] flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Stage */}
          <div className={`relative aspect-square md:aspect-auto flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#E8DDD0] overflow-hidden ${
            isSunscreen
              ? 'bg-gradient-to-b from-[#FFFDF7] via-[#F8EFE0] to-[#ECE0CA]'
              : isCream
              ? 'bg-gradient-to-b from-[#FAF5ED] via-[#F1E5D4] to-[#E6D4BE]'
              : 'bg-gradient-to-b from-[#F7F2EB] to-[#EBE0D2]'
          }`}>
            {/* Our Brand Logo Stamp on Product Image */}
            <div className="absolute top-4 left-4 z-10 drop-shadow-sm">
              <BrandLogo variant="stamp" />
            </div>

            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[380px] w-full object-contain rounded-xl drop-shadow-md transition-transform duration-500 hover:scale-105"
            />

            {/* Badges */}
            {isOffer ? (
              <span className="absolute top-4 right-4 bg-gradient-to-r from-[#8C6239] via-[#A87948] to-[#8C6239] text-[#FFF9F2] border border-[#F3DFC7]/80 text-[10px] font-bold tracking-[0.16em] uppercase px-3.5 py-1 rounded-full shadow-lg z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFDF78]" />
                {product.offerDiscountText || 'Privileged Offer'}
              </span>
            ) : product.badge ? (
              <span className="absolute top-4 right-4 bg-[#1F140D]/95 backdrop-blur-md text-[#F7EDE2] border border-[#D4AF37]/50 text-[10px] font-bold tracking-[0.16em] uppercase px-3.5 py-1 rounded-full shadow-md z-10">
                {product.badge}
              </span>
            ) : null}

            <div className="absolute bottom-4 left-4 right-4 bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-2.5 text-center text-xs text-[#553E2C] border border-[#EAE0D3] shadow-xs flex items-center justify-between">
              <BrandLogo variant="badge" />
              <span className="font-semibold text-[#8C6239] truncate ml-2">
                {product.packaging || 'Architectural Glass Vessel'} • {product.size}
              </span>
            </div>
          </div>

          {/* Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-[#FAF6F0]">
            <div className="space-y-4">
              {/* Brand Certification Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC9]">
                <BrandLogo variant="stamp" />
                <div className="flex items-center gap-1.5">
                  {isOffer && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#976839] bg-[#FFF8EE] border border-[#E9D4BC] px-2 py-0.5 rounded-full">
                      Privileged Curation
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#8C6239] bg-[#FAF3E7] border border-[#EADBCA] px-2.5 py-0.5 rounded-full">
                    Haute Formulation
                  </span>
                  <BrandLogo variant="seal" />
                </div>
              </div>

              {/* Special Offer Ribbon in Modal */}
              {isOffer && (
                <div className="bg-gradient-to-r from-[#2B1B10] via-[#3D2717] to-[#2B1B10] text-[#FAF4EC] px-3.5 py-2 rounded-xl flex items-center justify-between shadow-md border border-[#D4AF37]/40">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFDF78]">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFDF78]" />
                    <span>{product.offerDiscountText || 'Privileged Atelier Offer'}</span>
                  </div>
                  {savings > 0 && (
                    <span className="bg-[#FAF4EC] text-[#3D2717] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      Save ${savings} Today
                    </span>
                  )}
                </div>
              )}

              {/* Category-Specific Haute Luxury Callouts */}
              {isSunscreen && (
                <div className="bg-[#FFFDF7] border border-[#EBDCC5] rounded-xl p-3 text-xs flex items-start gap-2.5 shadow-xs">
                  <Sun className="w-4 h-4 text-[#C1902E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2A1E16] block text-[10.5px] uppercase tracking-wider">
                      Mineral Photoprotection & Optic Glass Decanter
                    </span>
                    <span className="text-[#655243] text-[11px] leading-relaxed block mt-0.5">
                      100% Non-nano zinc physical filter • Invisible cashmere finish • Zero chalkiness or flashback • Blue light & urban smog barrier
                    </span>
                  </div>
                </div>
              )}

              {isCream && (
                <div className="bg-[#FCFAF4] border border-[#E8DAC7] rounded-xl p-3 text-xs flex items-start gap-2.5 shadow-xs">
                  <Moon className="w-4 h-4 text-[#A87948] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2A1E16] block text-[10.5px] uppercase tracking-wider">
                      Circadian Biological Crème & 24k Gold Spatula Ritual
                    </span>
                    <span className="text-[#655243] text-[11px] leading-relaxed block mt-0.5">
                      Double-walled frosted crystal jar • Multi-weight peptides & bio-fermented lipids • Synchronized nocturnal barrier cellular renewal
                    </span>
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-[#DFD0C3]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#231710]">{product.rating}</span>
                  <span className="text-xs text-[#827164]">({product.reviewCount} reviews)</span>
                </div>

                <span className="text-[10px] font-semibold text-[#6E5542] bg-[#F2E7D8] px-2.5 py-0.5 rounded-full border border-[#DFCEBA]">
                  Batch-Certified
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#231710] leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#8C6239] font-medium mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Glass Packaging Badge */}
              {product.packaging && (
                <div className="bg-[#FFFFFF] px-3.5 py-2.5 rounded-xl border border-[#E8DDCE] text-xs text-[#523F30] flex items-start gap-2.5 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#231710] block text-[10px] uppercase tracking-wider">
                      Architectural Vessel & Closure
                    </span>
                    <span className="text-xs text-[#5C4A3C] leading-relaxed">{product.packaging}</span>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-serif-luxury text-3xl font-bold text-[#231710]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#948375] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {savings > 0 && (
                  <span className="text-xs font-bold text-[#8C6239] bg-[#FAF1E3] border border-[#E5D2BA] px-2 py-0.5 rounded-md">
                    Save ${savings}
                  </span>
                )}
                <span className="text-[11px] text-[#8C6239] font-medium ml-1">
                  Tax included • Complimentary Gold Foil Unboxing
                </span>
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-[#5C4C40] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Key Botanicals */}
              <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#EAE0D3]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6239] block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#B8860B]" /> Key Bio-Cellular Actives
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.keyBotanicals.map((botanical) => (
                    <span
                      key={botanical}
                      className="text-xs bg-[#FAF4EC] text-[#59422F] border border-[#E9DEC9] px-2.5 py-1 rounded-md font-medium"
                    >
                      {botanical}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Ritual */}
              <div className="text-xs text-[#6A5A4E] space-y-1">
                <span className="font-bold text-[#231710] block flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#8C6239]" /> The Application Ritual:
                </span>
                <p className="leading-normal font-light">{product.ritual}</p>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-6 mt-6 border-t border-[#EAE0D4] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D9CCBF] rounded-full bg-[#FFFFFF] px-2 py-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#5E4D40] hover:text-[#2A1E16] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold px-3 text-[#231710]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#5E4D40] hover:text-[#2A1E16] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isAdded
                      ? 'bg-[#3C5741] text-[#FFFFFF] ring-2 ring-[#4E6F54]'
                      : isSunscreen || isCream
                      ? 'bg-gradient-to-r from-[#22160F] to-[#3D291C] hover:from-[#352317] hover:to-[#4D3524] text-[#FAF5ED] hover:shadow-lg'
                      : 'bg-[#22160F] hover:bg-[#38261A] text-[#FAF5ED] hover:shadow-lg'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Vanity</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Acquire Formulation • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#867568]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Individually batch-preserved in frosted optic glass & champagne gold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
