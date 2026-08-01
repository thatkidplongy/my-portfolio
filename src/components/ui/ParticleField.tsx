"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  /** Downward speed, tied to radius so nearer dots fall faster. */
  vy: number;
  /** Constant sideways drift. */
  vx: number;
  alpha: number;
  /** Sway oscillator. */
  phase: number;
  swaySpeed: number;
  swayAmount: number;
}

const MIN_R = 0.8;
const R_RANGE = 1.9;

/**
 * Slow falling dot field pinned behind the whole page. Canvas rather than DOM
 * nodes so the count stays cheap, and fixed so it persists past the hero.
 */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;

    const makeParticle = (seedY?: number): Particle => {
      const r = MIN_R + Math.random() * R_RANGE;
      const depth = (r - MIN_R) / R_RANGE; // 0 = far, 1 = near

      return {
        x: Math.random() * width,
        y: seedY ?? -10,
        r,
        vy: 0.1 + depth * 0.34,
        vx: (Math.random() - 0.5) * 0.08,
        alpha: 0.14 + depth * 0.24,
        phase: Math.random() * Math.PI * 2,
        swaySpeed: 0.004 + Math.random() * 0.008,
        swayAmount: 0.1 + Math.random() * 0.25,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 11000);
      // Seed the initial field across the full height so it starts populated.
      particles = Array.from({ length: count }, () =>
        makeParticle(Math.random() * height)
      );
    };

    const paint = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (animate) {
          p.phase += p.swaySpeed;
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.phase) * p.swayAmount;

          // Recycle to the top once it falls past the bottom.
          if (p.y > height + 6) {
            p.y = -6;
            p.x = Math.random() * width;
          }

          if (p.x < -6) p.x = width + 6;
          else if (p.x > width + 6) p.x = -6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }
    };

    const loop = () => {
      paint(true);
      frame = requestAnimationFrame(loop);
    };

    resize();

    if (prefersReduced) {
      paint(false);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resize();
      if (prefersReduced) paint(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default ParticleField;
