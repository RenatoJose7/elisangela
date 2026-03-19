/*
 * Home — Página principal do Cosmic Cell Invasion
 * Design: Arcade Cósmico Neon Brutalist
 * Integra: StarField + StartScreen + GameEngine
 */

import { useState } from "react";
import type { Player } from "../data/gameTypes";
import GameEngine from "../components/GameEngine";
import StarField from "../components/StarField";
import StartScreen from "../components/StartScreen";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleStart = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  const handleExit = () => {
    setGameStarted(false);
    setPlayers([]);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#0A0A1A" }}
    >
      {/* Animated star field background */}
      <StarField />

      {/* CRT scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          zIndex: 1,
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Game content */}
      {!gameStarted ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameEngine initialPlayers={players} onExit={handleExit} />
      )}
    </div>
  );
}
