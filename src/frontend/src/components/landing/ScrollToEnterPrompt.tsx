import { ChevronDown } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function ScrollToEnterPrompt() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
      <p className="cinematic-body mb-4 text-muted-foreground">Scroll to Enter</p>
      <ChevronDown
        className={`mx-auto h-8 w-8 text-muted-foreground ${
          prefersReducedMotion ? '' : 'animate-bounce-subtle'
        }`}
      />
    </div>
  );
}
