import heroCorbiere from "@/assets/hero-corbiere.jpg";

interface GlassyLogoProps {
  letter: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-10 h-10 text-lg",
  md: "w-14 h-14 text-xl",
  lg: "w-16 h-16 text-2xl",
  xl: "w-24 h-24 lg:w-32 lg:h-32 text-4xl lg:text-5xl",
};

export function GlassyLogo({ letter, size = "md", className = "" }: GlassyLogoProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 ${sizeMap[size]} ${className}`}
    >
      {/* Background image */}
      <img
        src={heroCorbiere}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-150"
        aria-hidden="true"
      />
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" />
      {/* Letter */}
      <span className="relative z-10 font-bold text-primary-foreground drop-shadow-md">
        {letter}
      </span>
    </div>
  );
}
