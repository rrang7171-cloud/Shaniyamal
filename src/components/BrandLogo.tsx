import React from 'react';

interface BrandLogoProps {
  variant?: 'icon' | 'badge' | 'seal' | 'stamp' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'badge',
  size = 'sm',
  className = '',
  showText = true,
}) => {
  // SVG Drop & Botanical Sprout Icon
  const LogoIcon = ({ iconSize = 'w-4 h-4' }: { iconSize?: string }) => (
    <svg
      className={`${iconSize} shrink-0 text-[#D4AF37]`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22C12 22 4 17 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10C20 17 12 22 12 22Z" />
      <path d="M12 7V16" />
      <path d="M9 11L12 8L15 11" />
    </svg>
  );

  if (variant === 'icon') {
    const sizeMap = {
      xs: 'w-3.5 h-3.5',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-7 h-7',
    };
    return <LogoIcon iconSize={sizeMap[size]} />;
  }

  // Circular Luxury Atelier Provenance Seal
  if (variant === 'seal') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F1610]/85 backdrop-blur-md border border-[#D4AF37]/50 shadow-md ${className}`}
      >
        <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
          <LogoIcon iconSize="w-2.5 h-2.5" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.18em] text-[#EADBCA] uppercase">
          Glow & Grow Atelier
        </span>
      </div>
    );
  }

  // Sleek Corner Product Stamp (placed directly on product bottles & card stages)
  if (variant === 'stamp') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm ${className}`}
      >
        <div className="w-3.5 h-3.5 rounded-full bg-[#2E2015] flex items-center justify-center text-[#D4AF37]">
          <LogoIcon iconSize="w-2.5 h-2.5" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-serif-luxury text-[10px] font-bold text-[#2A1E16] tracking-tight">
            Glow & Grow
          </span>
          <span className="text-[7.5px] uppercase tracking-[0.16em] text-[#8C6239] font-semibold">
            Skincare
          </span>
        </div>
      </div>
    );
  }

  // Full Brand Logo
  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="w-9 h-9 rounded-full bg-[#3D2C1E] flex items-center justify-center text-[#D4AF37] shadow-xs">
          <LogoIcon iconSize="w-5 h-5" />
        </div>
        {showText && (
          <div>
            <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#2B1F17] block leading-none">
              Glow & Grow
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6239] font-medium block mt-0.5">
              Skincare
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default Badge Variant
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FAF5EE] border border-[#E8DDCE] text-[#5C4533] text-[10px] font-semibold tracking-wider ${className}`}
    >
      <LogoIcon iconSize="w-3 h-3" />
      <span>Glow & Grow™</span>
    </div>
  );
};
