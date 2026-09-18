import React from 'react';
import { ArrowRight, ShieldCheck, Droplet, Sparkles, Leaf, Award } from 'lucide-react';
import heroImage from '../assets/images/glow_hero_banner_1789709020055.jpg';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onShopClick: () => void;
  onStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onStoryClick }) => {
  return (
    <section id="hero" className="relative pt-[90px] sm:pt-[100px] overflow-hidden bg-[#FAF7F2]">
      {/* Full-width Hero Banner Container */}
      <div className="relative w-full min-h-[580px] lg:min-h-[720px] flex items-center">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Young women with radiant, flawless, glowing clear skin with amber skincare bottles and botanical greenery"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transform animate-in fade-in duration-700"
          />
          {/* Subtle Warm Botanical & Wood Gradient Overlay for Pristine Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E140DE0] via-[#2A1D1499] to-transparent sm:w-4/5 lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent h-24 bottom-0" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-xl sm:max-w-2xl text-left">
            {/* Tag / Pre-heading with Our Brand Logo */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1E140D]/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#F3ECE2] text-xs font-semibold tracking-wider uppercase mb-5 shadow-lg shadow-[#D4AF37]/10">
              <BrandLogo variant="seal" />
              <span className="text-[#E7C673]">• Haute Skincare Atelier</span>
            </div>

            {/* Bold Headline matching User Prompt */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.12] mb-6 drop-shadow-xs">
              Here to make your skin <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#F4E8D8] underline decoration-[#D4AF37]/50 underline-offset-8">
                glowing
              </span>{' '}
              and{' '}
              <span className="text-[#E7D6BE]">nourishing</span>
            </h1>

            {/* Description */}
            <p className="text-[#EADFCF] text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-light">
              High-performance cellular biotechnology meets architectural luxury. Housed in frosted optic glass and brushed champagne gold vessels to preserve bio-peptides, clean mineral SPFs, and restorative lipid elixirs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-cta-shop"
                onClick={onShopClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#8C6239] hover:bg-[#744F2C] text-[#FAF7F2] font-semibold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 ml-2.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-story"
                onClick={onStoryClick}
                className="inline-flex items-center justify-center px-7 py-4 bg-[#FAF7F2]/20 hover:bg-[#FAF7F2]/30 text-[#FFFFFF] font-medium text-sm sm:text-base rounded-full backdrop-blur-md border border-[#FFFFFF]/30 transition-colors cursor-pointer"
              >
                Our Design & Science
              </button>
            </div>

            {/* Quick Micro-Review Preview */}
            <div className="mt-8 pt-6 border-t border-[#FFFFFF]/15 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#EAD8C3] border-2 border-[#2A1D14] flex items-center justify-center text-[11px] font-bold text-[#3D2C1E]">
                  ER
                </div>
                <div className="w-8 h-8 rounded-full bg-[#D4C3AF] border-2 border-[#2A1D14] flex items-center justify-center text-[11px] font-bold text-[#3D2C1E]">
                  CD
                </div>
                <div className="w-8 h-8 rounded-full bg-[#C2B19D] border-2 border-[#2A1D14] flex items-center justify-center text-[11px] font-bold text-[#3D2C1E]">
                  ML
                </div>
              </div>
              <div className="text-xs text-[#E8DFD5]">
                <div className="flex items-center gap-1 text-[#E7C673]">
                  {'★'.repeat(5)}
                  <span className="text-[#FAF7F2] font-semibold ml-1">4.9/5</span>
                </div>
                <span className="text-[#C7B7A6]">Trusted by 2,400+ glowing skin routines</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values Banner / Trust Highlights */}
      <div className="bg-[#F4ECE3] border-y border-[#E5DAD0] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E8DDD1] flex items-center justify-center text-[#67503B] shrink-0">
                <Sparkles className="w-5 h-5 text-[#8C6239]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#2E221A] leading-tight">Bio-Cellular Actives</p>
                <p className="text-[11px] text-[#716155] leading-normal">Peptides, ectoin & ceramides</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E8DDD1] flex items-center justify-center text-[#8C6239] shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#8C6239]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#2E221A] leading-tight">Frosted Optic Glass</p>
                <p className="text-[11px] text-[#716155] leading-normal">Architectural champagne gold</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E8DDD1] flex items-center justify-center text-[#5A735A] shrink-0">
                <Droplet className="w-5 h-5 text-[#5A735A]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#2E221A] leading-tight">100% Clean Mineral SPF</p>
                <p className="text-[11px] text-[#716155] leading-normal">Non-nano zinc & zero white cast</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E8DDD1] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Sparkles className="w-5 h-5 text-[#B88E3E]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#2E221A] leading-tight">Radiance Guaranteed</p>
                <p className="text-[11px] text-[#716155] leading-normal">30-day clinical glow promise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
