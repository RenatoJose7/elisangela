/*
 * WinScreen — Tela de vitória com animações
 * Design: Arcade Cósmico Neon Brutalist
 */

import { useEffect, useState } from "react";
import type { Player } from "../data/gameTypes";

interface WinScreenProps {
  winner: Player;
  onRestart: () => void;
}

export default function WinScreen({ winner, onRestart }: WinScreenProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => f + 1), 100);
    
    // Save high score
    const highScores = JSON.parse(localStorage.getItem("cosmic_high_scores") || "[]");
    const newScore = { name: winner.name, score: winner.score, date: new Date().toLocaleDateString() };
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    localStorage.setItem("cosmic_high_scores", JSON.stringify(updatedScores));

    return () => clearInterval(interval);
  }, [winner]);

  const trophyChars = ["🏆", "⭐", "🏆", "✨"];
  const trophy = trophyChars[frame % trophyChars.length];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="max-w-md w-full mx-4 rounded-sm overflow-hidden text-center feedback-correct"
        style={{
          background: "#0A0A1A",
          border: `3px solid ${winner.color}`,
          boxShadow: `0 0 30px ${winner.glowColor}, 0 0 60px ${winner.color}60`,
        }}
      >
        {/* Trophy */}
        <div
          className="py-6"
          style={{
            background: `linear-gradient(180deg, ${winner.color}20, transparent)`,
            borderBottom: `1px solid ${winner.color}40`,
          }}
        >
          <div
            className="font-vt323"
            style={{ fontSize: "5rem", lineHeight: 1 }}
          >
            {trophy}
          </div>
        </div>

        <div className="px-6 py-6 flex flex-col items-center gap-4">
          {/* GAME OVER text */}
          <div
            className="font-arcade"
            style={{
              fontSize: "0.8rem",
              color: "#FFD700",
              textShadow: "0 0 10px #FFD700, 0 0 20px #FFD700",
              letterSpacing: "0.1em",
            }}
          >
            GAME OVER
          </div>

          {/* Winner announcement */}
          <div>
            <div
              className="font-arcade mb-2"
              style={{
                fontSize: "0.45rem",
                color: "#B0A0CC",
                letterSpacing: "0.1em",
              }}
            >
              VENCEDOR:
            </div>
            <div
              className="font-arcade"
              style={{
                fontSize: "0.9rem",
                color: winner.color,
                textShadow: `0 0 15px ${winner.glowColor}, 0 0 30px ${winner.color}`,
                letterSpacing: "0.05em",
              }}
            >
              {winner.name}
            </div>
            <div
              className="font-arcade mt-2"
              style={{
                fontSize: "0.5rem",
                color: "#FFD700",
                textShadow: "0 0 10px #FFD700",
              }}
            >
              PONTUAÇÃO FINAL: {winner.score}
            </div>
          </div>

          {/* Winner pawn */}
          <div
            className="rounded-full flex items-center justify-center font-arcade pawn-idle"
            style={{
              width: 60,
              height: 60,
              background: `radial-gradient(circle at 35% 35%, ${winner.glowColor}, ${winner.color})`,
              border: `3px solid ${winner.glowColor}`,
              boxShadow: `0 0 20px ${winner.glowColor}, 0 0 40px ${winner.color}`,
              fontSize: "0.6rem",
              color: "#fff",
            }}
          >
            {winner.id + 1}
          </div>

          {/* Congratulations text */}
          <p
            className="font-orbitron"
            style={{
              fontSize: "0.7rem",
              color: "#C0B0E0",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Parabéns! Você dominou o ciclo celular e chegou ao fim do tabuleiro cósmico!
          </p>

          {/* Buttons */}
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onRestart}
              className="flex-1 arcade-btn arcade-btn-purple"
              style={{ fontSize: "0.45rem" }}
            >
              ↺ JOGAR NOVAMENTE
            </button>
          </div>
        </div>

        {/* Corner decorations */}
        <div
          className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
          style={{
            borderTop: `2px solid ${winner.color}`,
            borderRight: `2px solid ${winner.color}`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none"
          style={{
            borderBottom: `2px solid ${winner.color}`,
            borderLeft: `2px solid ${winner.color}`,
          }}
        />
      </div>
    </div>
  );
}
