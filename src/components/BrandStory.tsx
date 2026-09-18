import React, { useState } from 'react';
import { Sparkles, Sun, Droplets, Flower2, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { BOTANICAL_INGREDIENTS } from '../data/products';
import storyImage from '../assets/images/botanical_story_visual_1789709035853.jpg';

export const BrandStory: React.FC = () => {
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);
  const activeIngredient = BOTANICAL_INGREDIENTS[activeIngredientIndex];

  const getIngredientIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#8C6239]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#C5A059]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#5A735A]" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-[#B87060]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#8C6239]" />;
    }
  };

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#F4EDE4] border-t border-[#EAE0D4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Story Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-24">
          {/* Left Column: Visual with Wood Frame & Amber Accent */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FFFFFF]">
              <img
                src={storyImage}
                alt="Organic skincare botanicals, rosehip seeds, and cold-pressed botanical oils in amber dropper on rustic teak wood"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#251A1290] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
                <p className="text-xs uppercase tracking-widest text-[#E7C673] font-semibold mb-1">
                  Cellular Biotechnology & Design
                </p>
                <p className="font-serif-luxury text-xl sm:text-2xl font-semibold leading-snug">
                  Preserved in Frosted Optic Glass & Champagne Gold
                </p>
              </div>
            </div>

            {/* Decorative Floating Quote Badge */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 z-20 bg-[#FAF7F2] p-5 rounded-2xl shadow-xl border border-[#E7DDD0] max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#EADCCF] flex items-center justify-center text-[#8C6239]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A1E16]">Clinical-Grade Efficacy</h4>
                  <p className="text-[11px] text-[#716155]">100% Bio-compatible purity</p>
                </div>
              </div>
              <p className="text-xs text-[#5C4D42] italic font-serif-luxury">
                “When you marry bio-identical cellular actives with architectural glass, daily skincare becomes high art.”
              </p>
            </div>

            {/* Warm background accent element */}
            <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl border-2 border-[#D5C2AF]/50 -z-0" />
          </div>

          {/* Right Column: Story Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DDD1] text-[#694E38] text-xs font-semibold tracking-widest uppercase">
              <span>Our Design & Science</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E16] leading-[1.18]">
              Cellular biotechnology, <br />
              elevated by architectural design.
            </h2>

            <p className="text-[#55463C] text-base sm:text-lg leading-relaxed font-light">
              At <strong>Glow & Grow Skincare</strong>, our formulation atelier bridges cellular dermatology and timeless architectural minimalism.
            </p>

            <p className="text-[#6D5E53] text-sm sm:text-base leading-relaxed">
              We synthesize biocompatible signaling peptides, bio-fermented ectoin, encapsulated retinal, and pure micro-dispersed mineral zinc. Each formulation is preserved in frosted optic glass flasks, fluted cylinders, and solid champagne gold magnetic casings engineered to shield active molecules from oxidation and degradation.
            </p>

            {/* Core Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2A1E16]">Bio-Mimetic Peptides</h4>
                  <p className="text-xs text-[#716155]">Clinically proven amino-acid sequences for deep epidermal remodeling.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2A1E16]">Architectural Frosted Glass</h4>
                  <p className="text-xs text-[#716155]">Recyclable optic glass with precision airless champagne gold actuators.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2A1E16]">Clean 100% Mineral UV</h4>
                  <p className="text-xs text-[#716155]">Micro-dispersed non-nano zinc oxide with zero chemical filters.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2A1E16]">Sustainable Purity</h4>
                  <p className="text-xs text-[#716155]">Refillable vessels, carbon-neutral manufacturing, and zero synthetic dyes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botanical Ingredients Spotlight */}
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E7DDD0] shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C6239] mb-2">
              <Heart className="w-3.5 h-3.5 text-[#B87060]" />
              <span>Bio-Cellular Transparency</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2A1E16]">
              Key Bio-Cellular Actives
            </h3>
            <p className="text-xs sm:text-sm text-[#736458] mt-2">
              Explore the advanced cellular actives and dermatological science driving our formulations.
            </p>
          </div>

          {/* Ingredient Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {BOTANICAL_INGREDIENTS.map((item, idx) => (
              <button
                key={item.name}
                id={`ingredient-tab-${idx}`}
                onClick={() => setActiveIngredientIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                  activeIngredientIndex === idx
                    ? 'bg-[#3D2C1E] text-[#FAF7F2] border-[#3D2C1E] shadow-md'
                    : 'bg-[#F2ECE3] hover:bg-[#E9DFD3] text-[#4A3B31] border-[#E5DAD0]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${activeIngredientIndex === idx ? 'bg-[#FFFFFF]/20 text-[#FAF7F2]' : 'bg-[#E5DACE]'}`}>
                    {getIngredientIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-medium truncate opacity-75">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="font-serif-luxury text-sm font-bold leading-tight line-clamp-1">
                  {item.name}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Ingredient Details Card */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E9DFD3] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs font-semibold text-[#8C6239] bg-[#F7F2EB] px-2.5 py-1 rounded-md">
                  {activeIngredient.scientificName}
                </span>
                <span className="text-xs text-[#716256] italic">
                  Origin: {activeIngredient.origin}
                </span>
              </div>
              <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2A1E16]">
                {activeIngredient.name}
              </h4>
              <p className="text-sm font-semibold text-[#5A735A]">
                {activeIngredient.benefit}
              </p>
              <p className="text-sm text-[#67574B] leading-relaxed font-light">
                {activeIngredient.description}
              </p>
            </div>

            <div className="md:col-span-4 bg-[#F8F4EE] rounded-xl p-5 border border-[#E8DDD1] text-center">
              <div className="w-12 h-12 rounded-full bg-[#EADCCE] mx-auto flex items-center justify-center mb-3">
                {getIngredientIcon(activeIngredient.icon)}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#3D2C1E]">
                Living Phytochemicals
              </p>
              <p className="text-[11px] text-[#78695E] mt-1">
                Extracted gently below 40°C to safeguard polyphenol and fatty acid potency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
