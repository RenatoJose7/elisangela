/*
 * Dice — Dado interativo com animação de shake e rotação 3D
 * Design: Arcade Cósmico Neon Brutalist
 * Efeito: Shake + spin durante rolagem, bounce ao parar
 */

import { useEffect, useState } from "react";

interface DiceProps {
  value: number | null;
  isRolling: boolean;
  onRoll: () => void;
  disabled?: boolean;
}

const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [28, 28],
    [72, 72],
  ],
  3: [
    [28, 28],
    [50, 50],
    [72, 72],
  ],
  4: [
    [28, 28],
    [72, 28],
    [28, 72],
    [72, 72],
  ],
  5: [
    [28, 28],
    [72, 28],
    [50, 50],
    [28, 72],
    [72, 72],
  ],
  6: [
    [28, 22],
    [72, 22],
    [28, 50],
    [72, 50],
    [28, 78],
    [72, 78],
  ],
};

export default function Dice({ value, isRolling, onRoll, disabled }: DiceProps) {
  const [displayValue, setDisplayValue] = useState<number>(1);
  const [isLanding, setIsLanding] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    if (isRolling) {
      setIsLanding(false);
      setRollCount((c) => c + 1);
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 80);
      return () => clearInterval(interval);
    } else if (value !== null) {
      setDisplayValue(value);
      setIsLanding(true);
      const t = setTimeout(() => setIsLanding(false), 500);
      return () => clearTimeout(t);
    }
  }, [isRolling, value]);

  const dots = DOT_POSITIONS[displayValue] || DOT_POSITIONS[1];
  const canRoll = !disabled && !isRolling;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Dice container with 3D perspective */}
      <div
        className="relative"
        style={{ perspective: "400px" }}
      >
        {/* Glow ring behind dice */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: isRolling
              ? "radial-gradient(circle, rgba(123,47,255,0.4) 0%, transparent 70%)"
              : value !== null
              ? "radial-gradient(circle, rgba(123,47,255,0.2) 0%, transparent 70%)"
              : "transparent",
            transform: "scale(1.5)",
            transition: "all 0.3s",
          }}
        />

        {/* Dice face */}
        <div
          onClick={canRoll ? onRoll : undefined}
          className={`relative select-none transition-all duration-100 ${
            isRolling ? "dice-rolling" : isLanding ? "dice-landing" : ""
          } ${canRoll ? "cursor-pointer" : "cursor-not-allowed"}`}
          style={{
            width: 88,
            height: 88,
            background: "linear-gradient(145deg, #1E0A40 0%, #0D0520 50%, #150830 100%)",
            border: `2px solid ${isRolling ? "#B44FFF" : value !== null ? "#7B2FFF" : "#7B2FFF60"}`,
            borderRadius: "14px",
            boxShadow: isRolling
              ? "0 0 25px #7B2FFF, 0 0 50px #B44FFF, 0 0 80px #7B2FFF60, inset 0 0 15px rgba(123,47,255,0.2)"
              : value !== null
              ? "0 0 15px #7B2FFF, 0 0 30px #B44FFF40, inset 0 0 8px rgba(123,47,255,0.1)"
              : "0 0 8px #7B2FFF30, inset 0 0 5px rgba(123,47,255,0.05)",
            position: "relative",
            overflow: "hidden",
            transform: canRoll && !isRolling ? "translateY(0)" : undefined,
            transition: "box-shadow 0.3s, border-color 0.3s",
          }}
        >
          {/* Corner highlights */}
          <div
            className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
            }}
          />

          {/* Dots */}
          {dots.map(([x, y], i) => (
            <div
              key={`${displayValue}-${i}`}
              className="absolute rounded-full transition-all duration-75"
              style={{
                width: 11,
                height: 11,
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                background: isRolling
                  ? "radial-gradient(circle at 35% 35%, #E0AAFF, #B44FFF)"
                  : "radial-gradient(circle at 35% 35%, #F0E0FF, #9B59FF)",
                boxShadow: isRolling
                  ? "0 0 6px #7B2FFF, 0 0 12px #B44FFF"
                  : "0 0 5px #7B2FFF, 0 0 10px #B44FFF80",
              }}
            />
          ))}

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.08) 4px, rgba(0,0,0,0.08) 5px)",
              borderRadius: "12px",
            }}
          />

          {/* Hover glow overlay */}
          {canRoll && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl"
              style={{
                background: "rgba(123,47,255,0.1)",
              }}
            />
          )}
        </div>
      </div>

      {/* Value display */}
      <div className="flex items-center gap-2">
        <div
          className="font-vt323 text-center"
          style={{
            fontSize: "2.2rem",
            color: isRolling ? "#B44FFF" : value !== null ? "#E0AAFF" : "#7B2FFF40",
            textShadow:
              value !== null && !isRolling
                ? "0 0 12px #7B2FFF, 0 0 24px #B44FFF"
                : "none",
            minWidth: "3rem",
            lineHeight: 1,
            transition: "all 0.2s",
          }}
        >
          {isRolling ? "???" : value !== null ? `+${value}` : "---"}
        </div>
      </div>

      {/* Roll button */}
      <button
        onClick={canRoll ? onRoll : undefined}
        disabled={!canRoll}
        className="arcade-btn arcade-btn-purple w-full"
        style={{
          fontSize: "0.5rem",
          padding: "0.65rem 1rem",
          opacity: !canRoll ? 0.45 : 1,
          letterSpacing: "0.08em",
        }}
      >
        {isRolling ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="inline-block"
              style={{ animation: "spin 0.5s linear infinite" }}
            >
              ◆
            </span>
            ROLANDO...
          </span>
        ) : (
          "⚄ ROLAR DADO"
        )}
      </button>
    </div>
  );
}
