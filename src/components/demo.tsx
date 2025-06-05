import { SplashCursor } from "@/components/ui/splash-cursor";

export function NoiseDemo() {
  return (
    <div className="relative min-h-screen">
      <SplashCursor />
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white">Interactive Fluid Demo</h1>
        <p className="mt-4 text-lg text-white/80">
          Move your mouse or touch the screen to interact with the fluid simulation
        </p>
      </div>
    </div>
  );
}