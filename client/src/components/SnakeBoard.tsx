/*
 * SnakeBoard — Estilo Donkey Kong
 * Cards como plataformas/escadas conectando as fileiras
 * Quadros MUITO maiores
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

  // Renderizar linhas em zig-zag com "escadas" entre elas
  const rows = [];
  
  for (let row = 0; row < ROWS; row++) {
    const rowCells = [];
    
    // Se linha é par (0, 2, 4...), vai esquerda→direita
    // Se linha é ímpar (1, 3, 5...), vai direita→esquerda
    if (row % 2 === 0) {
      // Esquerda → direita
      for (let col = 0; col < COLS; col++) {
        const squareIndex = row * COLS + col;
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
    } else {
      // Direita → esquerda
      for (let col = COLS - 1; col >= 0; col--) {
        const squareIndex = row * COLS + col;
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
    }

    rows.push(
      <div key={`row-${row}`} className="flex gap-3 justify-center w-full">
        {rowCells}
      </div>
    );

    // Adicionar "escada" entre as linhas (exceto na última)
    if (row < ROWS - 1) {
      rows.push(
        <div key={`ladder-${row}`} className="flex justify-center w-full">
          <div
            style={{
              width: "80px",
              height: "30px",
              border: "2px solid #FFD700",
              borderRadius: "4px",
              background: "rgba(255, 215, 0, 0.1)",
              boxShadow: "0 0 15px #FFD70060",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              color: "#FFD700",
              fontFamily: "monospace",
              textShadow: "0 0 8px #FFD700",
            }}
          >
            ↕
          </div>
        </div>
      );
    }
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1rem",
        overflow: "auto",
      }}
    >
      {/* Board title */}
      <div
        className="font-arcade text-center flex-shrink-0"
        style={{
          fontSize: "0.8rem",
          color: "#7B2FFF",
          textShadow: "0 0 8px #7B2FFF",
          letterSpacing: "0.2em",
        }}
      >
        ◆ TABULEIRO CÓSMICO ◆
      </div>

      {/* Linhas zig-zag com escadas */}
      <div className="flex flex-col gap-2 items-center justify-center flex-1 w-full">
        {rows}
      </div>

      {/* Bottom info */}
      <div
        className="flex items-center justify-between text-center w-full"
        style={{ paddingTop: "0.5rem" }}
      >
        <div
          className="font-vt323 flex-1"
          style={{ fontSize: "0.55rem", color: "#7B2FFF60" }}
        >
          INÍCIO
        </div>
        <div
          className="font-vt323 flex-1 text-center"
          style={{ fontSize: "0.55rem", color: "#FFD70060" }}
        >
          {BOARD_SQUARES} CASAS
        </div>
        <div
          className="font-vt323 flex-1 text-right"
          style={{ fontSize: "0.55rem", color: "#FFD70060" }}
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
        width: "95px",
        height: "95px",
        minWidth: "95px",
        background: isStart
          ? "rgba(0, 229, 255, 0.1)"
          : isEnd
          ? "rgba(255, 215, 0, 0.12)"
          : isBonus
          ? "rgba(255, 215, 0, 0.15)"
          : isTrap
          ? "rgba(255, 51, 102, 0.12)"
          : `rgba(${rgb}, 0.07)`,
        border: `2px solid ${
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
        borderRadius: "6px",
        boxShadow: isHighlighted
          ? `0 0 15px #FFD700, 0 0 30px #FFD70060`
          : isBonus
          ? `0 0 10px #FFD700, 0 0 20px #FFD70060`
          : isTrap
          ? `0 0 10px #FF3366, 0 0 20px #FF336660`
          : hasPawn
          ? `0 0 8px ${players[0].glowColor}70`
          : `0 0 3px ${theme.color}25`,
        transform: isHighlighted ? "scale(1.12)" : "scale(1)",
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
          fontSize: "0.7rem",
          color: isStart ? "#00E5FF" : isEnd ? "#FFD700" : theme.color,
          textShadow: `0 0 5px ${theme.color}`,
          opacity: 0.95,
          fontWeight: "bold",
        }}
      >
        {isStart ? "IN" : isEnd ? "FIM" : index}
      </div>

      {/* Theme icon / Image */}
      <div
        className="relative z-10 text-center leading-none"
        style={{ fontSize: "1.4rem", lineHeight: 1, width: "100%", height: "auto" }}
      >
        {theme.image && !isBonus && !isTrap && !isEnd && !isStart ? (
          <img src={theme.image} alt={theme.label} style={{ width: "85%", height: "auto", maxHeight: "3.5rem", objectFit: "contain" }} />
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
        className="relative font-arcade text-center leading-none pb-1 z-10"
        style={{
          fontSize: "0.42rem",
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
          <div className="flex gap-1 flex-wrap justify-center p-1">
            {players.map((player, pi) => {
              const isAnimating = animatingPlayers.has(pi);
              const isCurrentPlayer = player.id === players[currentPlayerIndex % players.length]?.id;
              return (
                <PawnToken
                  key={player.id}
                  player={player}
                  isCurrentPlayer={isCurrentPlayer}
                  isAnimating={isAnimating}
                  size="md"
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
            borderRadius: "6px",
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
  size: "md";
}

function PawnToken({ player, isCurrentPlayer, isAnimating, size }: PawnTokenProps) {
  const dim = 40;
  const fontSize = "0.5rem";

  return (
    <div
      className={`rounded-full flex items-center justify-center font-arcade flex-shrink-0 ${
        isAnimating ? "pawn-hop" : isCurrentPlayer ? "pawn-idle" : ""
      }`}
      style={{
        width: dim,
        height: dim,
        background: `radial-gradient(circle at 35% 35%, ${player.glowColor}, ${player.color})`,
        border: `2px solid ${player.glowColor}`,
        boxShadow: isCurrentPlayer
          ? `0 0 10px ${player.glowColor}, 0 0 20px ${player.color}`
          : `0 0 4px ${player.color}`,
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
