import React from 'react';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE2D7] text-[#6E543E] text-xs font-semibold tracking-widest uppercase mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Community Stories</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E16] mb-4">
            Loved by Radiant Skin Routines
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-[#5C4C40]">
            <div className="flex items-center text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="font-bold text-[#2A1E16]">4.9 out of 5</span>
            <span>• Based on 2,400+ verified customer reviews</span>
          </div>
        </div>

        {/* Clinical / Consumer Results Bar */}
        <div className="bg-[#FFFFFF] border border-[#E9DFD3] rounded-2xl p-6 sm:p-8 mb-14 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#ECE2D6] text-center">
            <div className="pt-4 sm:pt-0 sm:px-4">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#8C6239] block mb-1">
                96%
              </span>
              <p className="text-xs sm:text-sm text-[#5C4C40] leading-snug">
                Noticed immediate dewy radiance & luminous skin glow within 14 days
              </p>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-4">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5A735A] block mb-1">
                98%
              </span>
              <p className="text-xs sm:text-sm text-[#5C4C40] leading-snug">
                Felt deep, long-lasting moisture without pore congestion
              </p>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-4">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3D2C1E] block mb-1">
                100%
              </span>
              <p className="text-xs sm:text-sm text-[#5C4C40] leading-snug">
                Appreciated the UV-protective dark amber glass packaging and wooden aesthetics
              </p>
            </div>
          </div>
        </div>

        {/* Customer Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFFFF] rounded-2xl p-7 sm:p-8 border border-[#EBE1D5] hover:border-[#D8C7B5] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header with stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  {review.verified && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5A735A] bg-[#EFF4EE] px-2.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>

                {/* Headline Quote */}
                <h3 className="font-serif-luxury text-lg font-bold text-[#2A1E16] mb-3 leading-snug flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[#C5A059] shrink-0 rotate-180 opacity-60 mt-1" />
                  <span>{review.headline}</span>
                </h3>

                {/* Body Comment */}
                <p className="text-xs sm:text-sm text-[#67574B] leading-relaxed mb-6 font-light">
                  {review.comment}
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#2A1E16]">{review.author}</p>
                  <p className="text-[#8E7E73]">{review.location} • {review.skinType}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-medium text-[#8C6239] block">
                    Product:
                  </span>
                  <span className="text-[11px] text-[#69584C] font-semibold truncate max-w-[160px] block">
                    {review.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
