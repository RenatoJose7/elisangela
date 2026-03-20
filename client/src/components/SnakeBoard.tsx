/*
 * SnakeBoard — Tabuleiro em grid zig-zag (Cobras e Escadas)
 * Design: Arcade Cósmico Neon Brutalist
 * Layout: 6 linhas × 5 colunas = 30 casas em padrão zig-zag
 * Linha 1: esquerda → direita
 * Linha 2: direita → esquerda
 * Linha 3: esquerda → direita (e assim por diante)
 */

import { useEffect, useRef, useState } from "react";
import type { Player } from "../data/gameTypes";
import { BOARD_SQUARES, SQUARE_THEMES, getSpecialSquare } from "../data/gameTypes";

interface SnakeBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  highlightedSquare?: number | null;
  onSquareClick?: (index: number) => void;
}

const COLS = 5;
const ROWS = 6;

const SQUARE_THEME_MAP = Array.from({ length: BOARD_SQUARES }, (_, i) => ({
  ...SQUARE_THEMES[i % SQUARE_THEMES.length],
  index: i,
}));

export default function SnakeBoard({
  players,
  currentPlayerIndex,
  highlightedSquare,
  onSquareClick,
}: SnakeBoardProps) {
  const [animatingPlayers, setAnimatingPlayers] = useState<Set<number>>(new Set());
  const prevPositions = useRef<number[]>(players.map((p) => p.position));

  useEffect(() => {
    const newAnimating = new Set<number>();
    players.forEach((p, i) => {
      if (p.position !== prevPositions.current[i]) {
        newAnimating.add(i);
        prevPositions.current[i] = p.position;
      }
    });
    if (newAnimating.size > 0) {
      setAnimatingPlayers(newAnimating);
      const t = setTimeout(() => setAnimatingPlayers(new Set()), 500);
      return () => clearTimeout(t);
    }
  }, [players]);

  // Renderizar grid em zig-zag
  const gridCells = [];
  for (let row = 0; row < ROWS; row++) {
    const rowCells = [];
    for (let col = 0; col < COLS; col++) {
      // Se linha é par (0, 2, 4...), vai esquerda→direita
      // Se linha é ímpar (1, 3, 5...), vai direita→esquerda
      const colIndex = row % 2 === 0 ? col : COLS - 1 - col;
      const squareIndex = row * COLS + colIndex;

      if (squareIndex < BOARD_SQUARES) {
        rowCells.push(
          <SnakeBoardSquare
            key={squareIndex}
            index={squareIndex}
            theme={SQUARE_THEME_MAP[squareIndex]}
            players={players.filter((p) => p.position === squareIndex)}
            currentPlayerIndex={currentPlayerIndex}
            isHighlighted={highlightedSquare === squareIndex}
            isStart={squareIndex === 0}
            isEnd={squareIndex === BOARD_SQUARES - 1}
            animatingPlayers={animatingPlayers}
            specialSquare={getSpecialSquare(squareIndex)}
            onClick={() => onSquareClick?.(squareIndex)}
          />
        );
      }
    }
    gridCells.push(
      <div key={`row-${row}`} className="flex gap-2 justify-center">
        {rowCells}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0.5rem",
      }}
    >
      {/* Board title */}
      <div
        className="font-arcade text-center flex-shrink-0"
        style={{
          fontSize: "0.65rem",
          color: "#7B2FFF",
          textShadow: "0 0 8px #7B2FFF",
          letterSpacing: "0.2em",
        }}
      >
        ◆ TABULEIRO CÓSMICO ◆
      </div>

      {/* Grid zig-zag */}
      <div className="flex flex-col gap-2 items-center justify-center flex-1">
        {gridCells}
      </div>

      {/* Bottom info */}
      <div
        className="flex items-center justify-between text-center w-full"
        style={{ paddingTop: "0.3rem" }}
      >
        <div
          className="font-vt323 flex-1"
          style={{ fontSize: "0.45rem", color: "#7B2FFF60" }}
        >
          INÍCIO
        </div>
        <div
          className="font-vt323 flex-1 text-center"
          style={{ fontSize: "0.45rem", color: "#FFD70060" }}
        >
          {BOARD_SQUARES} CASAS
        </div>
        <div
          className="font-vt323 flex-1 text-right"
          style={{ fontSize: "0.45rem", color: "#FFD70060" }}
        >
          META
        </div>
      </div>
    </div>
  );
}

interface SnakeBoardSquareProps {
  index: number;
  theme: { label: string; color: string; icon: string; index: number; image?: string };
  players: Player[];
  currentPlayerIndex: number;
  isHighlighted: boolean;
  isStart: boolean;
  isEnd: boolean;
  animatingPlayers: Set<number>;
  specialSquare: any;
  onClick: () => void;
}

function SnakeBoardSquare({
  index,
  theme,
  players,
  currentPlayerIndex,
  isHighlighted,
  isStart,
  isEnd,
  animatingPlayers,
  specialSquare,
  onClick,
}: SnakeBoardSquareProps) {
  const hasPawn = players.length > 0;
  const rgb = hexToRgb(theme.color);
  const isBonus = specialSquare?.type === "bonus";
  const isTrap = specialSquare?.type === "trap";

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-between select-none transition-all duration-200 flex-shrink-0"
      style={{
        width: "65px",
        height: "65px",
        minWidth: "65px",
        background: isStart
          ? "rgba(0, 229, 255, 0.1)"
          : isEnd
          ? "rgba(255, 215, 0, 0.12)"
          : isBonus
          ? "rgba(255, 215, 0, 0.15)"
          : isTrap
          ? "rgba(255, 51, 102, 0.12)"
          : `rgba(${rgb}, 0.07)`,
        border: `1.5px solid ${
          isHighlighted
            ? "#FFD700"
            : isStart
            ? "#00E5FF"
            : isEnd
            ? "#FFD700"
            : isBonus
            ? "#FFD700"
            : isTrap
            ? "#FF3366"
            : theme.color + "70"
        }`,
        borderRadius: "4px",
        boxShadow: isHighlighted
          ? `0 0 12px #FFD700, 0 0 24px #FFD70060`
          : isBonus
          ? `0 0 8px #FFD700, 0 0 16px #FFD70060`
          : isTrap
          ? `0 0 8px #FF3366, 0 0 16px #FF336660`
          : hasPawn
          ? `0 0 6px ${players[0].glowColor}70`
          : `0 0 2px ${theme.color}25`,
        transform: isHighlighted ? "scale(1.1)" : "scale(1)",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(${rgb}, 0.15), transparent 70%)`,
        }}
      />

      {/* Square number */}
      <div
        className="relative font-arcade text-center leading-none pt-0.5 z-10"
        style={{
          fontSize: "0.55rem",
          color: isStart ? "#00E5FF" : isEnd ? "#FFD700" : theme.color,
          textShadow: `0 0 4px ${theme.color}`,
          opacity: 0.95,
          fontWeight: "bold",
        }}
      >
        {isStart ? "IN" : isEnd ? "FIM" : index}
      </div>

      {/* Theme icon / Image */}
      <div
        className="relative z-10 text-center leading-none"
        style={{ fontSize: "1rem", lineHeight: 1, width: "100%", height: "auto" }}
      >
        {theme.image && !isBonus && !isTrap && !isEnd && !isStart ? (
          <img src={theme.image} alt={theme.label} style={{ width: "85%", height: "auto", maxHeight: "2.5rem", objectFit: "contain" }} />
        ) : isEnd ? (
          "🏆"
        ) : isBonus ? (
          "⭐"
        ) : isTrap ? (
          "⚠️"
        ) : (
          theme.icon
        )}
      </div>

      {/* Theme label */}
      <div
        className="relative font-arcade text-center leading-none pb-0.5 z-10"
        style={{
          fontSize: "0.35rem",
          color: isBonus ? "#FFD700" : isTrap ? "#FF3366" : theme.color,
          opacity: 0.7,
          letterSpacing: "0.01em",
        }}
      >
        {isStart ? "START" : isEnd ? "WIN" : isBonus ? "BÔNUS" : isTrap ? "TRAP" : theme.label}
      </div>

      {/* Player pawns overlay */}
      {players.length > 0 && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ background: "rgba(0,0,0,0.35)" }}
        >
          <div className="flex gap-0.5 flex-wrap justify-center p-0.5">
            {players.map((player, pi) => {
              const isAnimating = animatingPlayers.has(pi);
              const isCurrentPlayer = player.id === players[currentPlayerIndex % players.length]?.id;
              return (
                <PawnToken
                  key={player.id}
                  player={player}
                  isCurrentPlayer={isCurrentPlayer}
                  isAnimating={isAnimating}
                  size="sm"
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Highlight pulse ring */}
      {isHighlighted && (
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            border: "1.5px solid #FFD700",
            borderRadius: "4px",
            animation: "squareActive 0.8s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}

interface PawnTokenProps {
  player: Player;
  isCurrentPlayer: boolean;
  isAnimating: boolean;
  size: "sm";
}

function PawnToken({ player, isCurrentPlayer, isAnimating, size }: PawnTokenProps) {
  const dim = 30;
  const fontSize = "0.42rem";

  return (
    <div
      className={`rounded-full flex items-center justify-center font-arcade flex-shrink-0 ${
        isAnimating ? "pawn-hop" : isCurrentPlayer ? "pawn-idle" : ""
      }`}
      style={{
        width: dim,
        height: dim,
        background: `radial-gradient(circle at 35% 35%, ${player.glowColor}, ${player.color})`,
        border: `1.5px solid ${player.glowColor}`,
        boxShadow: isCurrentPlayer
          ? `0 0 8px ${player.glowColor}, 0 0 16px ${player.color}`
          : `0 0 3px ${player.color}`,
        fontSize,
        color: "#fff",
        zIndex: 10,
      }}
    >
      {player.id + 1}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "123, 47, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
