// ============================================================
// COSMIC CELL INVASION — Tipos e Estado do Jogo
// ============================================================

import type { Question } from "./questions";

export type GamePhase =
  | "start"
  | "rolling"
  | "moving"
  | "card_reveal"
  | "question"
  | "feedback"
  | "game_over";

export type FeedbackType = "correct" | "incorrect";

export interface Player {
  id: number;
  name: string;
  position: number; // 0-indexed square position
  color: string;
  glowColor: string;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number | null;
  isDiceRolling: boolean;
  currentQuestion: Question | null;
  isCardFlipped: boolean;
  selectedAnswer: number | null;
  feedbackType: FeedbackType | null;
  feedbackMessage: string;
  totalSquares: number;
  winner: Player | null;
}

export const BOARD_SQUARES = 30;

export const PLAYER_COLORS = [
  { color: "#7B2FFF", glowColor: "#B44FFF" },
  { color: "#00FF9F", glowColor: "#69FF47" },
  { color: "#00E5FF", glowColor: "#7DF9FF" },
  { color: "#FF3366", glowColor: "#FF6B9D" },
];

export const SQUARE_THEMES = [
  { label: "G1", color: "#00E5FF", icon: "🔬" },
  { label: "S", color: "#00FF9F", icon: "🧬" },
  { label: "G2", color: "#69FF47", icon: "⚗️" },
  { label: "PRÓ", color: "#7B2FFF", icon: "🔭" },
  { label: "META", color: "#B44FFF", icon: "🎯" },
  { label: "ANA", color: "#E040FB", icon: "⚡" },
  { label: "TELO", color: "#FF6B9D", icon: "🌀" },
  { label: "CITO", color: "#FF8C42", icon: "✂️" },
  { label: "MEI I", color: "#FFD700", icon: "🌟" },
  { label: "MEI II", color: "#FF3366", icon: "💫" },
  { label: "CROSS", color: "#FF6B35", icon: "🔀" },
];
