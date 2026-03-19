/*
 * GameBoard — Tabuleiro contínuo em serpentina com casas numeradas
 * Design: Arcade Cósmico Neon Brutalist
 * Layout: Serpentina 5 colunas × 6 linhas = 30 casas
 * Casas conectadas por trilhas luminosas
 */

import { useEffect, useRef, useState } from "react";
import type { Player } from "../data/gameTypes";
import { BOARD_SQUARES, SQUARE_THEMES, getSpecialSquare } from "../data/gameTypes";

interface GameBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  highlightedSquare?: number | null;
  onSquareClick?: (index: number) => void;
}

const COLS = 5;
const ROWS = 6;

// Build serpentine path positions
function getSquareGridPos(index: number): { col: number; row: number } {
  const row = Math.floor(index / COLS);
  const posInRow = index % COLS;
  const col = row % 2 === 0 ? posInRow : COLS - 1 - posInRow;
  return { col, row };
}

// Get square index from grid position
function getSquareIndex(col: number, row: number): number {
  const posInRow = row % 2 === 0 ? col : COLS - 1 - col;
  return row * COLS + posInRow;
}

const SQUARE_THEME_MAP = Array.from({ length: BOARD_SQUARES }, (_, i) => ({
  ...SQUARE_THEMES[i % SQUARE_THEMES.length],
  index: i,
}));

export default function GameBoard({
  players,
  currentPlayerIndex,
  highlightedSquare,
  onSquareClick,
}: GameBoardProps) {
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

  return (
    <div
      className="relative w-full rounded-sm p-2 sm:p-3"
      style={{
        background: "rgba(8, 5, 20, 0.92)",
        border: "2px solid #7B2FFF",
        boxShadow:
          "0 0 25px #7B2FFF50, 0 0 50px #7B2FFF20, inset 0 0 40px rgba(123,47,255,0.04)",
      }}
    >
      {/* Board title */}
      <div
        className="font-arcade text-center mb-2"
        style={{
          fontSize: "0.4rem",
          color: "#7B2FFF",
          textShadow: "0 0 8px #7B2FFF",
          letterSpacing: "0.2em",
        }}
      >
        ◆ TABULEIRO CÓSMICO ◆
      </div>

      {/* Grid */}
      <div
        className="grid gap-1 sm:gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: ROWS }, (_, visualRow) => {
          const boardRow = ROWS - 1 - visualRow;
          return Array.from({ length: COLS }, (_, col) => {
            const squareIndex = getSquareIndex(col, boardRow);
            if (squareIndex >= BOARD_SQUARES) return null;

            const theme = SQUARE_THEME_MAP[squareIndex];
            const playersHere = players.filter((p) => p.position === squareIndex);
            const isHighlighted = highlightedSquare === squareIndex;
            const isStart = squareIndex === 0;
            const isEnd = squareIndex === BOARD_SQUARES - 1;
            const specialSquare = getSpecialSquare(squareIndex);

            // Determine connector arrows
            const isRowEnd = (squareIndex + 1) % COLS === 0 && squareIndex < BOARD_SQUARES - 1;
            const isRowStart = squareIndex % COLS === 0 && squareIndex > 0;

            return (
              <BoardSquare
                key={squareIndex}
                index={squareIndex}
                theme={theme}
                players={playersHere}
                currentPlayerIndex={currentPlayerIndex}
                isHighlighted={isHighlighted}
                isStart={isStart}
                isEnd={isEnd}
                animatingPlayers={animatingPlayers}
                specialSquare={specialSquare}
                onClick={() => onSquareClick?.(squareIndex)}
              />
            );
          });
        })}
      </div>

      {/* Bottom info */}
      <div
        className="mt-2 flex items-center justify-between"
        style={{ borderTop: "1px solid #7B2FFF20", paddingTop: "0.5rem" }}
      >
        <div
          className="font-vt323"
          style={{ fontSize: "0.85rem", color: "#7B2FFF60" }}
        >
          INÍCIO → CASA 1
        </div>
        <div
          className="font-vt323"
          style={{ fontSize: "0.85rem", color: "#FFD70060" }}
        >
          META → CASA {BOARD_SQUARES}
        </div>
      </div>
    </div>
  );
}

interface BoardSquareProps {
  index: number;
  theme: { label: string; color: string; icon: string; index: number };
  players: Player[];
  currentPlayerIndex: number;
  isHighlighted: boolean;
  isStart: boolean;
  isEnd: boolean;
  animatingPlayers: Set<number>;
  specialSquare: any;
  onClick: () => void;
}

function BoardSquare({
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
}: BoardSquareProps) {
  const hasPawn = players.length > 0;
  const rgb = hexToRgb(theme.color);
  const isBonus = specialSquare?.type === "bonus";
  const isTrap = specialSquare?.type === "trap";

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-between select-none transition-all duration-200"
      style={{
        aspectRatio: "1",
        minHeight: "48px",
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
        borderRadius: "3px",
        boxShadow: isHighlighted
          ? `0 0 14px #FFD700, 0 0 28px #FFD70060`
          : isBonus
          ? `0 0 10px #FFD700, 0 0 20px #FFD70060, inset 0 0 15px rgba(255,215,0,0.1)`
          : isTrap
          ? `0 0 10px #FF3366, 0 0 20px #FF336660, inset 0 0 15px rgba(255,51,102,0.1)`
          : hasPawn
          ? `0 0 8px ${players[0].glowColor}70`
          : `0 0 3px ${theme.color}25`,
        transform: isHighlighted ? "scale(1.06)" : "scale(1)",
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
        className="relative font-arcade text-center leading-none pt-1 z-10"
        style={{
          fontSize: "clamp(0.28rem, 0.9vw, 0.42rem)",
          color: isStart ? "#00E5FF" : isEnd ? "#FFD700" : theme.color,
          textShadow: `0 0 5px ${theme.color}`,
          opacity: 0.95,
        }}
      >
        {isStart ? "IN" : isEnd ? "FIM" : index}
      </div>

      {/* Theme icon */}
      <div
        className="relative z-10 text-center leading-none"
        style={{ fontSize: "clamp(0.7rem, 2vw, 1rem)", lineHeight: 1 }}
      >
        {isEnd ? "🏆" : isBonus ? "⭐" : isTrap ? "⚠️" : theme.icon}
      </div>

      {/* Theme label */}
      <div
        className="relative font-arcade text-center leading-none pb-0.5 z-10"
        style={{
          fontSize: "clamp(0.22rem, 0.7vw, 0.32rem)",
          color: isBonus ? "#FFD700" : isTrap ? "#FF3366" : theme.color,
          opacity: 0.75,
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
                  size={players.length > 2 ? "xs" : players.length > 1 ? "sm" : "md"}
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
            border: "2px solid #FFD700",
            borderRadius: "3px",
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
  size: "xs" | "sm" | "md";
}

function PawnToken({ player, isCurrentPlayer, isAnimating, size }: PawnTokenProps) {
  const dim = size === "md" ? 26 : size === "sm" ? 18 : 13;
  const fontSize = size === "md" ? "0.38rem" : size === "sm" ? "0.3rem" : "0.22rem";

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
