import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = rawSubtotal * appliedDiscount;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const freeShippingThreshold = 75;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || rawSubtotal === 0 ? 0 : 7.95;
  const finalTotal = subtotalAfterDiscount + shippingCost;
  const progressPercent = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GLOW10') {
      setAppliedDiscount(0.1);
      setPromoSuccess('10% botanical discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try code: GLOW10');
      setPromoSuccess('');
    }
  };

  const handleCheckout = () => {
    setIsOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
      setIsOrderPlaced(false);
      onClose();
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id="cart-drawer-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-[#1D140DE6]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DDD0] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        >
          {/* Top Header */}
          <div className="p-6 border-b border-[#EAE1D4] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2.5">
              <span className="font-serif-luxury text-xl font-bold text-[#2A1E16]">
                Your Skincare Ritual
              </span>
              <span className="text-xs bg-[#EAE1D4] text-[#4A3B31] px-2 py-0.5 rounded-full font-semibold">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 text-[#6D5E53] hover:text-[#2A1E16] hover:bg-[#F2ECE3] rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#F2ECE3] px-6 py-3.5 border-b border-[#E7DDD0]">
            <div className="flex items-center justify-between text-xs text-[#4A3B31] mb-1.5 font-medium">
              <span>
                {isFreeShipping ? (
                  <span className="text-[#5A735A] font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Unlocked Complimentary Botanical Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#8C6239]">${(freeShippingThreshold - rawSubtotal).toFixed(2)}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-semibold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#E0D4C5] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#8C6239] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isOrderPlaced ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E5ECE5] text-[#5A735A] mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#2A1E16]">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs sm:text-sm text-[#66564B] max-w-xs mx-auto">
                  Your fresh batch of living botanical formulas is being gently hand-packed into protected amber glass. Thank you!
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DF] mx-auto flex items-center justify-center text-[#8C6239]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#2A1E16]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs sm:text-sm text-[#736357] max-w-xs mx-auto">
                  Explore our cold-pressed serums and nourishing crèmes to begin your glowing skin ritual.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#3D2C1E] text-[#FAF7F2] rounded-full text-xs font-semibold hover:bg-[#2A1D13] transition-colors cursor-pointer"
                >
                  Discover Formulations
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  id={`cart-item-${item.product.id}`}
                  className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E9DFD3] flex gap-3 shadow-2xs"
                >
                  <div className="relative w-18 h-18 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg border border-[#EFE8DF] bg-[#F7F3ED]"
                    />
                    <div className="absolute top-1 left-1 z-10 scale-75 origin-top-left">
                      <BrandLogo variant="stamp" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <BrandLogo variant="badge" />
                            {item.product.isSpecialOffer ? (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFF9F2] bg-gradient-to-r from-[#8C6239] to-[#5C3F24] px-1.5 py-0.5 rounded border border-[#DFC8AE] flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5 text-[#FFDF78]" />
                                Special Offer
                              </span>
                            ) : item.product.badge ? (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6239] bg-[#FAF3E7] px-1.5 py-0.5 rounded border border-[#EADBCA]">
                                {item.product.badge}
                              </span>
                            ) : null}
                            {item.product.category === 'sunscreen' && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6239] bg-[#FAF3E7] px-1.5 py-0.5 rounded border border-[#DFC8AE]">
                                Haute SPF
                              </span>
                            )}
                            {item.product.category === 'creams' && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7A4E24] bg-[#F5EDE1] px-1.5 py-0.5 rounded border border-[#DFC8AE]">
                                Bio-Crème
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif-luxury text-sm font-bold text-[#2A1E16] line-clamp-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#99877A] hover:text-[#B84030] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#8C7B6F] mt-0.5">{item.product.size}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E2D6C8] rounded-md bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 text-[#4A3B31] hover:text-[#2A1E16] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold px-2.5 text-[#2A1E16]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 text-[#4A3B31] hover:text-[#2A1E16] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif-luxury font-bold text-sm text-[#2A1E16] block">
                          ${item.product.price * item.quantity}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-[10px] text-[#9E8E81] line-through block">
                            ${item.product.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Order Summary & Checkout */}
          {items.length > 0 && !isOrderPlaced && (
            <div className="p-6 bg-[#FFFFFF] border-t border-[#EAE1D4] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (Try GLOW10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs uppercase tracking-wider rounded-lg bg-[#FAF7F2] border border-[#E2D6C8] focus:outline-none focus:border-[#8C6239]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F2ECE3] hover:bg-[#E5DACE] text-[#3D2C1E] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-[#5A735A] font-medium">{promoSuccess}</p>
                )}
                {promoError && (
                  <p className="text-[11px] text-[#C24E3A] font-medium">{promoError}</p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#5C4C40]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${rawSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#5A735A]">
                    <span>Botanical 10% Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="pt-2 border-t border-[#EFE8DF] flex justify-between text-base font-bold text-[#2A1E16]">
                  <span className="font-serif-luxury">Total</span>
                  <span className="font-serif-luxury text-lg text-[#8C6239]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleCheckout}
                className="w-full py-4 bg-[#8C6239] hover:bg-[#734E2B] text-[#FAF7F2] rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7A6D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5A735A]" />
                <span>Encrypted 256-bit checkout • 30-Day Glow Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
