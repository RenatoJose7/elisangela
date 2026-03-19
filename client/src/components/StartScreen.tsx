/*
 * StartScreen — Tela inicial do jogo com configuração de jogadores
 * Design: Arcade Cósmico Neon Brutalist
 * Referência visual: Máquina de fliperama Cosmic Invasion (roxo, azul escuro, neon)
 */

import { useState } from "react";
import type { Player } from "../data/gameTypes";
import { PLAYER_COLORS } from "../data/gameTypes";

const HEADER_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/arcade-header-BUw6E3aA6mLs2v7XFf9rCZ.webp";

const BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/bg-cosmic-arcade-WLgksMn6LWzYEdmn4cs9Wr.webp";

interface StartScreenProps {
  onStart: (players: Player[]) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState([
    "Jogador 1",
    "Jogador 2",
    "Jogador 3",
    "Jogador 4",
  ]);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStart = () => {
    const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      name: playerNames[i] || `Jogador ${i + 1}`,
      position: 0,
      color: PLAYER_COLORS[i].color,
      glowColor: PLAYER_COLORS[i].glowColor,
    }));
    onStart(players);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-6 px-4 relative z-10">

      {/* Header image */}
      <div
        className="w-full max-w-xl mb-4 rounded-sm overflow-hidden animate-slide-down"
        style={{
          border: "2px solid #7B2FFF",
          boxShadow: "0 0 30px #7B2FFF60, 0 0 60px #7B2FFF30",
        }}
      >
        <img
          src={HEADER_URL}
          alt="Cosmic Cell Invasion"
          className="w-full object-cover"
          style={{ maxHeight: "120px", objectPosition: "center 30%" }}
        />
      </div>

      {/* Subtitle */}
      <div
        className="font-arcade text-center mb-1 animate-slide-down"
        style={{
          fontSize: "0.5rem",
          color: "#00E5FF",
          textShadow: "0 0 10px #00E5FF, 0 0 20px #7DF9FF",
          letterSpacing: "0.15em",
        }}
      >
        JOGO EDUCATIVO DE BIOLOGIA CELULAR
      </div>

      <div
        className="font-vt323 text-center mb-6"
        style={{
          fontSize: "1rem",
          color: "#7B2FFF80",
          letterSpacing: "0.08em",
        }}
      >
        MITOSE · MEIOSE · INTERFASE · CROSSING OVER
      </div>

      {/* Two-column layout on larger screens */}
      <div className="w-full max-w-3xl flex flex-col lg:flex-row gap-4">

        {/* Left: Config card */}
        <div
          className="flex-1 rounded-sm overflow-hidden animate-slide-up"
          style={{
            background: "rgba(8, 5, 20, 0.92)",
            border: "2px solid #7B2FFF",
            boxShadow: "0 0 20px #7B2FFF40",
          }}
        >
          {/* Card header */}
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{
              background: "linear-gradient(90deg, rgba(123,47,255,0.35), rgba(123,47,255,0.05))",
              borderBottom: "1px solid #7B2FFF40",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: "#7B2FFF",
                boxShadow: "0 0 6px #7B2FFF",
                animation: "neonPulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              className="font-arcade"
              style={{ fontSize: "0.48rem", color: "#E0AAFF", textShadow: "0 0 8px #7B2FFF" }}
            >
              CONFIGURAR PARTIDA
            </span>
          </div>

          <div className="px-5 py-5 flex flex-col gap-5">
            {/* Player count */}
            <div>
              <label
                className="font-arcade block mb-3"
                style={{ fontSize: "0.4rem", color: "#00E5FF", textShadow: "0 0 6px #00E5FF" }}
              >
                NÚMERO DE JOGADORES
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPlayerCount(n)}
                    className="flex-1 py-2.5 rounded-sm font-arcade transition-all duration-150"
                    style={{
                      fontSize: "0.65rem",
                      border: `2px solid ${playerCount === n ? "#7B2FFF" : "#7B2FFF35"}`,
                      background:
                        playerCount === n
                          ? "rgba(123,47,255,0.3)"
                          : "rgba(123,47,255,0.04)",
                      color: playerCount === n ? "#E0AAFF" : "#7B2FFF60",
                      boxShadow: playerCount === n ? "0 0 12px #7B2FFF60" : "none",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Player names */}
            <div>
              <label
                className="font-arcade block mb-3"
                style={{ fontSize: "0.4rem", color: "#00E5FF", textShadow: "0 0 6px #00E5FF" }}
              >
                NOMES DOS JOGADORES
              </label>
              <div className="flex flex-col gap-2">
                {Array.from({ length: playerCount }, (_, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className="rounded-full flex-shrink-0 flex items-center justify-center font-arcade"
                      style={{
                        width: 22,
                        height: 22,
                        background: `radial-gradient(circle at 35% 35%, ${PLAYER_COLORS[i].glowColor}, ${PLAYER_COLORS[i].color})`,
                        border: `1.5px solid ${PLAYER_COLORS[i].glowColor}`,
                        boxShadow: `0 0 6px ${PLAYER_COLORS[i].glowColor}`,
                        fontSize: "0.35rem",
                        color: "#fff",
                      }}
                    >
                      {i + 1}
                    </div>
                    <input
                      type="text"
                      value={playerNames[i]}
                      onChange={(e) => {
                        const newNames = [...playerNames];
                        newNames[i] = e.target.value;
                        setPlayerNames(newNames);
                      }}
                      className="flex-1 font-orbitron rounded-sm px-3 py-2 outline-none transition-all duration-150"
                      style={{
                        fontSize: "0.7rem",
                        background: "rgba(123,47,255,0.07)",
                        border: "1.5px solid #7B2FFF35",
                        color: "#E0AAFF",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#7B2FFF";
                        e.target.style.boxShadow = "0 0 8px #7B2FFF50";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#7B2FFF35";
                        e.target.style.boxShadow = "none";
                      }}
                      maxLength={20}
                      placeholder={`Jogador ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={handleStart}
              className="w-full arcade-btn arcade-btn-green"
              style={{ fontSize: "0.58rem", padding: "0.85rem" }}
            >
              ▶ INICIAR JOGO
            </button>

            {/* Instructions toggle */}
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full arcade-btn arcade-btn-cyan"
              style={{ fontSize: "0.42rem" }}
            >
              {showInstructions ? "▲ OCULTAR INSTRUÇÕES" : "▼ VER INSTRUÇÕES"}
            </button>
          </div>

          {/* Instructions panel */}
          {showInstructions && (
            <div
              className="px-5 pb-5 animate-slide-up"
              style={{ borderTop: "1px solid #7B2FFF25" }}
            >
              <div
                className="font-arcade mb-3 mt-4"
                style={{ fontSize: "0.4rem", color: "#7B2FFF", textShadow: "0 0 6px #7B2FFF" }}
              >
                COMO JOGAR:
              </div>
              <div className="flex flex-col gap-2">
                {[
                  ["1", "Role o dado para avançar no tabuleiro"],
                  ["2", "Ao parar em uma casa, uma carta aparecerá"],
                  ["3", "Clique na carta para revelar a pergunta"],
                  ["4", "Escolha a resposta correta para continuar"],
                  ["5", "Resposta errada = recua 2 casas!"],
                  ["6", "Primeiro a chegar na casa 30 vence!"],
                ].map(([num, text]) => (
                  <div key={num} className="flex items-start gap-3">
                    <span
                      className="font-arcade flex-shrink-0"
                      style={{
                        fontSize: "0.38rem",
                        color: "#00FF9F",
                        textShadow: "0 0 6px #00FF9F",
                        marginTop: "0.12rem",
                      }}
                    >
                      {num}.
                    </span>
                    <span
                      className="font-orbitron"
                      style={{ fontSize: "0.65rem", color: "#A090C0", lineHeight: 1.5 }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Info card */}
        <div
          className="lg:w-64 flex flex-col gap-3 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Topics covered */}
          <div
            className="rounded-sm overflow-hidden"
            style={{
              background: "rgba(8, 5, 20, 0.92)",
              border: "1px solid #00E5FF40",
              boxShadow: "0 0 12px #00E5FF20",
            }}
          >
            <div
              className="px-4 py-2.5"
              style={{
                background: "linear-gradient(90deg, rgba(0,229,255,0.2), transparent)",
                borderBottom: "1px solid #00E5FF30",
              }}
            >
              <span
                className="font-arcade"
                style={{ fontSize: "0.4rem", color: "#00E5FF", textShadow: "0 0 6px #00E5FF" }}
              >
                CONTEÚDOS DO JOGO
              </span>
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              {[
                { label: "Interfase G1", color: "#00E5FF", icon: "🔬" },
                { label: "Interfase S", color: "#00FF9F", icon: "🧬" },
                { label: "Interfase G2", color: "#69FF47", icon: "⚗️" },
                { label: "Mitose (4 fases)", color: "#7B2FFF", icon: "🔭" },
                { label: "Citocinese", color: "#FF8C42", icon: "✂️" },
                { label: "Meiose I", color: "#FFD700", icon: "🌟" },
                { label: "Meiose II", color: "#FF3366", icon: "💫" },
                { label: "Crossing Over", color: "#FF6B35", icon: "🔀" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span style={{ fontSize: "0.8rem" }}>{item.icon}</span>
                  <span
                    className="font-vt323"
                    style={{ fontSize: "0.95rem", color: item.color }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty badge */}
          <div
            className="rounded-sm p-3 text-center"
            style={{
              background: "rgba(255,215,0,0.06)",
              border: "1px solid #FFD70040",
            }}
          >
            <div
              className="font-arcade mb-1"
              style={{ fontSize: "0.38rem", color: "#FFD700", textShadow: "0 0 6px #FFD700" }}
            >
              NÍVEL DE DIFICULDADE
            </div>
            <div
              className="font-vt323"
              style={{ fontSize: "1.4rem", color: "#FFE87C" }}
            >
              ENEM / 3º ANO
            </div>
            <div
              className="font-orbitron mt-1"
              style={{ fontSize: "0.6rem", color: "#FFD70080" }}
            >
              30 perguntas · múltipla escolha
            </div>
          </div>

          {/* Background preview */}
          <div
            className="rounded-sm overflow-hidden"
            style={{
              border: "1px solid #7B2FFF40",
              boxShadow: "0 0 10px #7B2FFF20",
            }}
          >
            <img
              src={BG_URL}
              alt="Preview"
              className="w-full object-cover"
              style={{ height: "100px", opacity: 0.7 }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-6 font-vt323 text-center"
        style={{ fontSize: "0.85rem", color: "#7B2FFF50" }}
      >
        INSERT COIN TO CONTINUE
        <span className="blink ml-1">_</span>
      </div>
    </div>
  );
}
