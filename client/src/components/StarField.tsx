/*
 * StarField — Fundo animado com estrelas e partículas de DNA
 * Design: Arcade Cósmico Neon Brutalist
 */

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  twinkleOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
  shape: "circle" | "x" | "dna";
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const colors = ["#7B2FFF", "#00FF9F", "#00E5FF", "#B44FFF", "#FF3366", "#FFD700"];

    const initStars = () => {
      starsRef.current = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const spawnParticle = () => {
      if (particlesRef.current.length < 25) {
        const shapes: Particle["shape"][] = ["circle", "x", "dna"];
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 0.8 + 0.3),
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0,
          life: 0,
          maxLife: Math.random() * 300 + 200,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
    };

    const drawX = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-size / 6, -size / 2, size / 3, size);
      ctx.fillRect(-size / 2, -size / 6, size, size / 3);
      ctx.restore();
    };

    const drawDNA = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, time: number) => {
      ctx.save();
      ctx.translate(x, y);
      for (let i = -2; i <= 2; i++) {
        const t = i / 4;
        const x1 = Math.sin(t * Math.PI + time * 0.02) * size * 0.4;
        const x2 = -x1;
        const yPos = t * size;
        ctx.beginPath();
        ctx.arc(x1, yPos, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x2, yPos, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
        if (i < 2) {
          ctx.beginPath();
          ctx.moveTo(x1, yPos);
          ctx.lineTo(x2, yPos + size * 0.25);
          ctx.lineWidth = size * 0.06;
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const draw = () => {
      timeRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * 0.02 + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fill();

        // Subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2.5);
          grad.addColorStop(0, star.color + "60");
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.globalAlpha = star.opacity * twinkle * 0.5;
          ctx.fill();
        }

        // Drift upward slowly
        star.y -= star.speed;
        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw particles
      if (timeRef.current % 60 === 0) spawnParticle();

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      particlesRef.current.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in/out
        if (p.life < 30) p.opacity = p.life / 30;
        else if (p.life > p.maxLife - 30) p.opacity = (p.maxLife - p.life) / 30;
        else p.opacity = 0.6;

        ctx.globalAlpha = p.opacity * 0.7;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "x") {
          drawX(ctx, p.x, p.y, p.size);
        } else {
          drawDNA(ctx, p.x, p.y, p.size * 2, timeRef.current);
        }
      });

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
