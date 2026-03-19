/*
 * FeedbackPopup — Pop-up animado de feedback para acerto/erro
 * Design: Arcade Cósmico Neon Brutalist
 */

import { useEffect, useState } from "react";

interface FeedbackPopupProps {
  type: "correct" | "incorrect";
  explanation: string;
  penalty?: number;
  onClose: () => void;
}

const CORRECT_MESSAGES = [
  "PERFEITO!",
  "EXCELENTE!",
  "CORRETO!",
  "INCRÍVEL!",
  "BRILHANTE!",
];

const INCORRECT_MESSAGES = [
  "ERROU!",
  "INCORRETO!",
  "TENTE MAIS!",
  "NÃO FOI DESSA VEZ!",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

export default function FeedbackPopup({
  type,
  explanation,
  penalty,
  onClose,
}: FeedbackPopupProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  const isCorrect = type === "correct";
  const mainColor = isCorrect ? "#00FF9F" : "#FF3366";
  const glowColor = isCorrect ? "#69FF47" : "#FF6B9D";
  const bgColor = isCorrect ? "rgba(0,255,159,0.08)" : "rgba(255,51,102,0.08)";
  const borderColor = isCorrect ? "#00FF9F" : "#FF3366";

  const message = isCorrect
    ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
    : INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)];

  useEffect(() => {
    setVisible(true);

    // Generate particles for correct answers
    if (isCorrect) {
      const colors = ["#00FF9F", "#69FF47", "#FFD700", "#00E5FF", "#7B2FFF"];
      const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 40,
        y: 40 + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 8,
        vy: -(Math.random() * 6 + 2),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        life: 0,
      }));
      setParticles(newParticles);
    }
  }, [isCorrect]);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.3, life: p.life + 1 }))
          .filter((p) => p.life < 60)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles.length]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        animation: visible ? "fadeIn 0.2s ease-out" : "none",
      }}
      onClick={handleClose}
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size}px ${p.color}`,
            opacity: Math.max(0, 1 - p.life / 60),
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Main popup */}
      <div
        className={`relative max-w-lg w-full mx-4 rounded-sm overflow-hidden ${
          isCorrect ? "feedback-correct" : "feedback-incorrect"
        }`}
        style={{
          background: "#0A0A1A",
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 20px ${mainColor}60, 0 0 40px ${mainColor}30, 0 0 80px ${mainColor}15`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header stripe */}
        <div
          style={{
            background: `linear-gradient(90deg, ${mainColor}30, ${mainColor}10, transparent)`,
            borderBottom: `1px solid ${borderColor}40`,
            padding: "1rem 1.5rem",
          }}
        >
          {/* Status icon + message */}
          <div className="flex items-center gap-4">
            <div
              className="font-vt323 flex-shrink-0"
              style={{
                fontSize: "3rem",
                color: mainColor,
                textShadow: `0 0 20px ${mainColor}`,
                lineHeight: 1,
              }}
            >
              {isCorrect ? "✓" : "✗"}
            </div>
            <div>
              <div
                className="font-arcade"
                style={{
                  fontSize: "0.75rem",
                  color: mainColor,
                  textShadow: `0 0 10px ${mainColor}, 0 0 20px ${glowColor}`,
                  letterSpacing: "0.1em",
                }}
              >
                {message}
              </div>
              {!isCorrect && penalty && penalty > 0 && (
                <div
                  className="font-vt323 mt-1"
                  style={{
                    fontSize: "1.1rem",
                    color: "#FF9AB5",
                  }}
                >
                  Recue {penalty} {penalty === 1 ? "casa" : "casas"}!
                </div>
              )}
              {isCorrect && (
                <div
                  className="font-vt323 mt-1"
                  style={{
                    fontSize: "1.1rem",
                    color: "#AFFFDF",
                  }}
                >
                  Continue avançando!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="px-6 py-4">
          <div
            className="font-arcade mb-2"
            style={{
              fontSize: "0.4rem",
              color: "#7B2FFF",
              textShadow: "0 0 6px #7B2FFF",
              letterSpacing: "0.1em",
            }}
          >
            EXPLICAÇÃO:
          </div>
          <p
            className="font-orbitron leading-relaxed"
            style={{
              fontSize: "0.7rem",
              color: "#C0B0E0",
              lineHeight: 1.7,
            }}
          >
            {explanation}
          </p>
        </div>

        {/* Close button */}
        <div className="px-6 pb-5 flex justify-center">
          <button
            onClick={handleClose}
            className={`arcade-btn ${isCorrect ? "arcade-btn-green" : "arcade-btn-purple"}`}
            style={{ fontSize: "0.5rem" }}
          >
            {isCorrect ? "CONTINUAR →" : "TENTAR NOVAMENTE →"}
          </button>
        </div>

        {/* Corner decorations */}
        <div
          className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
          style={{
            borderTop: `2px solid ${borderColor}`,
            borderRight: `2px solid ${borderColor}`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none"
          style={{
            borderBottom: `2px solid ${borderColor}`,
            borderLeft: `2px solid ${borderColor}`,
          }}
        />
      </div>
    </div>
  );
}
