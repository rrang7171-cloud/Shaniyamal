import React, { useState, useMemo } from 'react';
import { Star, Eye, ShoppingBag, Check, Sparkles, SlidersHorizontal, ShieldCheck, Award, Sun, Moon, Percent } from 'lucide-react';
import { Product } from '../types';
import { BrandLogo } from './BrandLogo';
import { formatINR } from '../utils/currency';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'atelier' | 'rating' | 'price-desc' | 'price-asc'>('atelier');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Map each product to its permanent Atelier Edition Number (1-25)
  const productEditionMap = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p, idx) => {
      map.set(p.id, idx + 1);
    });
    return map;
  }, [products]);

  const offerCount = useMemo(() => products.filter((p) => p.isSpecialOffer).length, [products]);

  const categories = [
    { id: 'all', label: `All Formulations (${products.length})` },
    { id: 'offers', label: `Privileged Offers (${offerCount})`, isOffer: true },
    { id: 'sunscreen', label: 'Mineral Sunscreens (Haute SPF)' },
    { id: 'creams', label: 'Cellular Bio-Creams (3)' },
    { id: 'serums', label: 'Cellular Serums (4)' },
    { id: 'face-oil', label: 'Botanical Face Oils (3)' },
    { id: 'lip-care', label: 'Lip Sculptors & Oils (3)' },
    { id: 'cleansers', label: 'Cloud & Milky Cleansers (3)' },
    { id: 'masks', label: 'Bio-Cellulose Masks (3)' },
    { id: 'toners', label: 'Essences & Mists (2)' },
    { id: 'elixirs', label: 'Eye Contour Elixir (1)' },
  ];

  const filteredProducts = useMemo(() => {
    let list = selectedCategory === 'all'
      ? [...products]
      : selectedCategory === 'offers'
      ? products.filter((p) => p.isSpecialOffer)
      : products.filter((p) => p.category === selectedCategory);

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    }
    // 'atelier' keeps the pristine curated maison order (N° 01 to N° 25)
    return list;
  }, [products, selectedCategory, sortBy]);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#FAF6F0] relative overflow-hidden">
      {/* Background Decorative Gold Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <div className="absolute top-40 -left-48 w-96 h-96 bg-[#EADCC8]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-48 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Atelier Collection Header - Equal Royal Standing */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE5D6] border border-[#DFCDB7] text-[#694F38] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>The Atelier Archive • 25 Master Formulations</span>
            <span className="w-1 h-1 rounded-full bg-[#B8860B]" />
            <span className="text-[#8C6239]">Equal Royal Standing</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231710] mb-5 tracking-tight">
            Every Formulation. An Individual Masterpiece.
          </h2>
          
          <p className="text-[#685547] text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
            Each formulation in our archive is crafted with equal dedication to cellular biological excellence—engineered with Swiss peptides, botanical extremolytes, and micronized minerals. Preserved in heavy frosted optic glass, fluted decanters, and weighted champagne gold vessels.
          </p>

          {/* Equal Standards Credential Banner */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#5E4B3E]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
              100% Cellular Haute Actives
            </span>
            <span className="hidden sm:inline text-[#D5C4B1]">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-[#B8860B]" />
              Haute Frosted Optic Sunscreens
            </span>
            <span className="hidden sm:inline text-[#D5C4B1]">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-[#B8860B]" />
              Circadian Bio-Creams & Gold Spatula
            </span>
            <span className="hidden sm:inline text-[#D5C4B1]">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-[#B8860B]" />
              Special Privileged Atelier Pricing
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-9">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const isOfferPill = cat.id === 'offers';
              const isSunscreenPill = cat.id === 'sunscreen';
              const isCreamPill = cat.id === 'creams';

              return (
                <button
                  key={cat.id}
                  id={`filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? isOfferPill
                        ? 'bg-gradient-to-r from-[#976B3F] via-[#B8860B] to-[#8C6239] text-[#FFF9F2] shadow-md shadow-[#B8860B]/25 ring-2 ring-[#FFDE7A] scale-[1.04] font-bold'
                        : 'bg-[#22160F] text-[#FAF5ED] shadow-md shadow-[#22160F]/20 ring-1 ring-[#D4AF37]/50 scale-[1.02]'
                      : isOfferPill
                      ? 'bg-[#F9F0E1] text-[#7A4E24] border border-[#E3CCA8] hover:bg-[#F2E4CD] font-semibold'
                      : isSunscreenPill || isCreamPill
                      ? 'bg-[#F4EADA] text-[#4F3D30] hover:bg-[#EBDEC9] hover:text-[#231710] border border-[#DFCEBA]'
                      : 'bg-[#F2E8DC] text-[#554336] hover:bg-[#E9DDD0] hover:text-[#231710] border border-[#E5D6C5]'
                  }`}
                >
                  {isOfferPill && <Sparkles className="w-3.5 h-3.5 text-[#E6A838]" />}
                  {isSunscreenPill && <Sun className="w-3.5 h-3.5 text-[#B8860B]" />}
                  {isCreamPill && <Moon className="w-3.5 h-3.5 text-[#8C6239]" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Atelier Privileged Offers Showcase Ribbon */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#241710] via-[#38261A] to-[#241710] text-[#FAF4EC] border border-[#D4AF37]/45 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#FFDF78]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFDF78]">
                    Atelier Privileged Archive
                  </span>
                  <span className="text-[10px] bg-[#D4AF37]/25 text-[#FFF5E6] border border-[#D4AF37]/50 px-2.5 py-0.5 rounded-full font-bold">
                    Limited Seasonal Offers • Up to 25% Off
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#E2D2C2] mt-1 font-light leading-relaxed">
                  Experience exceptional reductions on our crown formulations: <strong className="font-semibold text-[#FFFFFF]">Solar Silk SPF 50+</strong>, <strong className="font-semibold text-[#FFFFFF]">Midnight Bio-Peptide Crème</strong>, and <strong className="font-semibold text-[#FFFFFF]">Ceramide Lip Butter</strong>.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                id="view-privileged-offers-btn"
                onClick={() => setSelectedCategory('offers')}
                className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                  selectedCategory === 'offers'
                    ? 'bg-[#FFFFFF] text-[#241710]'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C358] hover:to-[#C9971D] text-[#1D120A]'
                }`}
              >
                {selectedCategory === 'offers' ? 'Viewing Offers' : `Explore ${offerCount} Offers`}
              </button>
            </div>
          </div>

          {/* Curation & Sort Control Bar */}
          <div className="mt-8 pt-6 border-t border-[#E8DEC9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#6D5A4C]">
              <span className="font-serif-luxury font-bold text-[#231710] text-sm">
                Showing {filteredProducts.length} of {products.length}
              </span>
              <span className="text-[#C8B7A4]">|</span>
              <span className="text-[#806956]">
                {selectedCategory === 'offers'
                  ? 'Showing special privileged archive formulations'
                  : selectedCategory === 'sunscreen'
                  ? 'Showing architectural frosted optic glass mineral sunscreens'
                  : selectedCategory === 'creams'
                  ? 'Showing circadian bio-peptide & retinal night crèmes'
                  : 'Every item given full Haute Atelier distinction'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C6239]" />
              <span className="text-[#6D5A4C] font-medium">Sort Archive:</span>
              <select
                id="atelier-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFFFF] text-[#2C1F17] font-medium text-xs rounded-lg px-3 py-1.5 border border-[#DFCDB8] focus:outline-none focus:border-[#8C6239] cursor-pointer shadow-xs"
              >
                <option value="atelier">Atelier Order (N° 01 — 25)</option>
                <option value="rating">Highest Acclaim (5.0 ★)</option>
                <option value="price-desc">Price: Haute Reserve First</option>
                <option value="price-asc">Price: Discovery First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid - Equal Royal Presentation with Specialized Haute Sunscreen & Cream Luxury */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            const editionNum = productEditionMap.get(product.id) || 1;
            const editionStr = editionNum < 10 ? `0${editionNum}` : `${editionNum}`;
            const isSunscreen = product.category === 'sunscreen';
            const isCream = product.category === 'creams';
            const isOffer = Boolean(product.isSpecialOffer);
            const savings = product.originalPrice && product.originalPrice > product.price 
              ? (product.originalPrice - product.price) 
              : 0;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 flex flex-col ${
                  isSunscreen
                    ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FFFFFF] to-[#FAF5ED] border border-[#D4AF37]/70 ring-1 ring-[#D4AF37]/35 shadow-[0_6px_26px_-4px_rgba(212,175,55,0.18)] hover:shadow-[0_20px_42px_-6px_rgba(212,175,55,0.32)] hover:border-[#D4AF37]'
                    : isCream
                    ? 'bg-gradient-to-b from-[#FCFAF6] via-[#FFFFFF] to-[#FAF5ED] border border-[#C59B27]/70 ring-1 ring-[#B8860B]/30 shadow-[0_6px_26px_-4px_rgba(139,94,60,0.18)] hover:shadow-[0_20px_42px_-6px_rgba(184,134,11,0.32)] hover:border-[#B8860B]'
                    : isOffer
                    ? 'bg-[#FFFFFF] border border-[#DFC8AE] ring-1 ring-[#8C6239]/25 shadow-[0_4px_22px_-4px_rgba(140,98,57,0.12)] hover:shadow-[0_18px_38px_-6px_rgba(140,98,57,0.24)] hover:border-[#8C6239]'
                    : 'bg-[#FFFFFF] border border-[#E7DCCF] hover:border-[#D4AF37]/80 shadow-[0_4px_20px_-4px_rgba(40,26,16,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(212,175,55,0.22)]'
                }`}
              >
                {/* Haute Luxury Header Strip for Sunscreen or Cream */}
                {isSunscreen && (
                  <div className="px-4 py-1.5 bg-gradient-to-r from-[#FAF1E3] via-[#FDF7ED] to-[#FAF1E3] border-b border-[#EBDCC5] flex items-center justify-between text-[10.5px] font-bold tracking-wider uppercase text-[#8C6239]">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#C1902E]" />
                      Haute Mineral Photoprotection
                    </span>
                    <span className="text-[10px] text-[#A67C46] font-medium lowercase">
                      100% sheer non-nano zinc
                    </span>
                  </div>
                )}

                {isCream && (
                  <div className="px-4 py-1.5 bg-gradient-to-r from-[#F5ECE0] via-[#FAF3E9] to-[#F5ECE0] border-b border-[#E8D9C5] flex items-center justify-between text-[10.5px] font-bold tracking-wider uppercase text-[#7D532D]">
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-[#B8860B]" />
                      Circadian Cellular Crème
                    </span>
                    <span className="text-[10px] text-[#9A6F44] font-medium lowercase">
                      gold spatula ritual
                    </span>
                  </div>
                )}

                {/* Product Image Stage with Warm Luxury Pedestal */}
                <div className={`relative aspect-square overflow-hidden ${
                  isSunscreen 
                    ? 'bg-gradient-to-b from-[#FFFDF7] via-[#F9F1E2] to-[#EFE2CC]' 
                    : isCream
                    ? 'bg-gradient-to-b from-[#FAF5ED] via-[#F1E6D6] to-[#E6D5BE]'
                    : 'bg-gradient-to-b from-[#F9F5EE] to-[#EFE4D5]'
                }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Brand Authentication Logo Stamp */}
                  <div className="absolute top-3.5 left-3.5 z-10 drop-shadow-sm">
                    <BrandLogo variant="stamp" />
                  </div>

                  {/* Badge Area: Special Offer Tag takes precedence, or Haute Distinction Badge */}
                  {isOffer ? (
                    <span className="absolute top-3.5 right-14 bg-gradient-to-r from-[#8C6239] via-[#A67644] to-[#8C6239] text-[#FFF9F2] border border-[#F5E1CA] text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FFDF78]" />
                      {product.offerDiscountText || 'Privileged Offer'}
                    </span>
                  ) : product.badge ? (
                    <span className="absolute top-3.5 right-14 bg-[#1F140D]/95 backdrop-blur-md text-[#F7EDE2] border border-[#D4AF37]/50 text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full shadow-md z-10">
                      {product.badge}
                    </span>
                  ) : null}

                  {/* Quick View Button */}
                  <button
                    id={`quick-view-${product.id}`}
                    onClick={() => onQuickView(product)}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#2A1E16] hover:text-[#8C6239] border border-[#E8DEC9] hover:border-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md cursor-pointer z-10"
                    title="Examine Formulation Details & Ritual"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Sensory & Architectural Glass Watermark on Image */}
                  {isSunscreen && (
                    <div className="absolute bottom-12 left-3 z-10 pointer-events-none">
                      <span className="bg-[#FFFFFF]/95 backdrop-blur-md text-[#6D4C28] text-[9.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-[#E8DEC9] shadow-xs">
                        Zero White Cast • Cashmere Demi-Matte
                      </span>
                    </div>
                  )}

                  {isCream && (
                    <div className="absolute bottom-12 left-3 z-10 pointer-events-none">
                      <span className="bg-[#FFFFFF]/95 backdrop-blur-md text-[#5E3E21] text-[9.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-[#E8DEC9] shadow-xs">
                        Double-Walled Crystal • 24k Gold Spatula
                      </span>
                    </div>
                  )}

                  {/* Glass Vessel & Actives Architectural Strip */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl px-3 py-2 border border-[#E9DEC9] flex items-center justify-between text-[11px] text-[#553F2D] shadow-xs">
                    <div className="flex items-center gap-1.5 truncate mr-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                      <span className="truncate font-medium">{product.packaging || 'Architectural Vessel'}</span>
                    </div>
                    <span className="text-[#8C6239] font-bold shrink-0 bg-[#FAF4EB] border border-[#E7D6C1] px-2 py-0.5 rounded-md text-[10px]">
                      {product.size}
                    </span>
                  </div>
                </div>

                {/* Product Meta Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-transparent group-hover:bg-[#FCFAF7]/40 transition-colors">
                  <div>
                    {/* Atelier Edition Number & Brand Header */}
                    <div className="flex items-center justify-between gap-2 mb-2.5 pb-2.5 border-b border-[#F0E8DD]">
                      <BrandLogo variant="badge" />
                      <div className="flex items-center gap-1.5">
                        {isOffer && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A06D3B] bg-[#FFF8EE] border border-[#EAD5BA] px-2 py-0.5 rounded-full">
                            Privileged
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#8C6239] bg-[#FAF3E7] border border-[#EADBCA] px-2.5 py-0.5 rounded-full">
                          Atelier N° {editionStr}
                        </span>
                      </div>
                    </div>

                    {/* Star Acclaim & Clinical Verification */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-[#D4AF37]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-[#D4AF37] text-[#D4AF37]'
                                  : 'text-[#DFD0C3]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[#231710]">{product.rating}</span>
                        <span className="text-xs text-[#8A786B]">({product.reviewCount})</span>
                      </div>

                      <span className="text-[10px] font-medium text-[#786455] bg-[#F7F2EB] px-2 py-0.5 rounded-md border border-[#EBE0D2]">
                        {isSunscreen ? 'Broad Spectrum UV' : isCream ? 'Circadian Recovery' : 'Active Bioferment'}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-lg sm:text-xl font-bold text-[#231710] hover:text-[#8C6239] transition-colors leading-snug cursor-pointer mb-2 line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm text-[#6C594C] line-clamp-2 mb-3.5 font-light leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Key Actives Pill Strip */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.keyBotanicals.slice(0, 2).map((botanical, bIdx) => (
                        <span
                          key={bIdx}
                          className="bg-[#FAF4EC] border border-[#E8DEC9] text-[#694E36] text-[10.5px] font-medium px-2 py-0.5 rounded-md truncate max-w-[200px]"
                        >
                          {botanical}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Vanity Action */}
                  <div className="pt-4 border-t border-[#EFE8DF] flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-2xl font-serif-luxury font-bold text-[#231710]">
                          {formatINR(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#9B897C] line-through">
                            {formatINR(product.originalPrice)}
                          </span>
                        )}
                        {savings > 0 && (
                          <span className="text-[10px] font-bold text-[#8C6239] bg-[#FAF1E3] border border-[#E5D2BA] px-1.5 py-0.5 rounded-md">
                            Save {formatINR(savings)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C6239] font-medium block mt-0.5">
                        Complimentary Unboxing
                      </span>
                    </div>

                    <button
                      id={`add-to-cart-${product.id}`}
                      onClick={() => handleAdd(product)}
                      disabled={isAdded}
                      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-sm ${
                        isAdded
                          ? 'bg-[#3C5741] text-[#FFFFFF] ring-2 ring-[#4E6F54]'
                          : isSunscreen || isCream
                          ? 'bg-gradient-to-r from-[#22160F] to-[#3B281B] hover:from-[#352317] hover:to-[#4A3222] text-[#FAF5ED] hover:shadow-md hover:shadow-[#22160F]/20'
                          : 'bg-[#22160F] hover:bg-[#38261A] text-[#FAF5ED] hover:shadow-md hover:shadow-[#22160F]/20'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 mr-1.5" />
                          <span>In Vanity</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                          <span>Acquire</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Luxury Guarantee Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#FFFFFF] border border-[#E9DDCF] shadow-sm text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <BrandLogo variant="seal" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6239]">
                Maison Guarantee
              </span>
            </div>
            <h4 className="font-serif-luxury text-xl font-bold text-[#231710]">
              Preserved in Frosted Optic Glass & Solid Magnetic Metal
            </h4>
            <p className="text-xs text-[#6A584B] mt-1 max-w-xl">
              Every single bottle is sealed with nitrogen flushing to maintain active peptide and antioxidant integrity from our atelier to your vanity.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#botanicals"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#FAF5EE] hover:bg-[#EFE5D6] text-[#3D2C1E] border border-[#DFCEBA] text-xs font-bold tracking-wider uppercase transition-colors"
            >
              Explore Science & Actives
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
