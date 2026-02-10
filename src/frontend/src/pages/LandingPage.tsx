import LetterByLetterTitle from '../components/landing/LetterByLetterTitle';
import AmbientParticlesCanvas from '../components/landing/AmbientParticlesCanvas';
import ParallaxLayers from '../components/landing/ParallaxLayers';
import Footer from '../components/Footer';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: () => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-landing-dark">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: 'url(/assets/generated/grain-overlay.dim_2048x2048.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
        }}
      />

      {/* Animated fog gradient */}
      <div className="absolute inset-0 z-0">
        <div className="fog-layer-1 absolute inset-0 opacity-30" />
        <div className="fog-layer-2 absolute inset-0 opacity-20" />
      </div>

      {/* Ambient particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-5">
          <AmbientParticlesCanvas />
        </div>
      )}

      {/* Parallax content layers */}
      <div className="flex-1">
        <ParallaxLayers>
          <div className="relative z-20 flex h-full flex-col items-center justify-center gap-12 px-6">
            <LetterByLetterTitle />
            
            {/* Navigation button to gallery */}
            <button
              onClick={onNavigate}
              className="group relative mt-8 flex items-center gap-3 rounded-full border border-foreground/20 bg-background/10 px-8 py-4 text-lg font-light tracking-wide text-foreground/90 backdrop-blur-sm transition-all duration-300 hover:border-foreground/40 hover:bg-background/20 hover:shadow-glow"
            >
              <span>Enter Gallery</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </ParallaxLayers>
      </div>

      {/* Footer pinned to bottom */}
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}
