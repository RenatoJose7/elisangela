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

export type SpecialSquareType = "bonus" | "trap" | "none";

export interface SpecialSquare {
  squareIndex: number;
  type: SpecialSquareType;
  effect: string;
}

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
  specialSquareTriggered: SpecialSquare | null;
  playerSkipsTurn: boolean;
}

export const BOARD_SQUARES = 30;

export const PLAYER_COLORS = [
  { color: "#7B2FFF", glowColor: "#B44FFF" },
  { color: "#00FF9F", glowColor: "#69FF47" },
  { color: "#00E5FF", glowColor: "#7DF9FF" },
  { color: "#FF3366", glowColor: "#FF6B9D" },
];

export const SQUARE_THEMES = [
  { label: "G1", color: "#00E5FF", icon: "🔬", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-interphase-g1-VVCrw7LRbBJfKQe3tWuWMP.webp" },
  { label: "S", color: "#00FF9F", icon: "🧬", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-interphase-s-hoEmiKJnoiv8VDbfJXUfYJ.webp" },
  { label: "G2", color: "#69FF47", icon: "⚗️", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-interphase-g2-D4Vh3xmg4Pm66Jq63wbZga.webp" },
  { label: "PRÓ", color: "#7B2FFF", icon: "🔭", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-mitosis-prophase-NNMxcm5afYsG95FxMK3sXh.webp" },
  { label: "META", color: "#B44FFF", icon: "🎯", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-mitosis-metaphase-Q4T6jfozRsBhwrjpjxSP6H.webp" },
  { label: "ANA", color: "#E040FB", icon: "⚡", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-mitosis-anaphase-6c6dReeyyGp3njRjezbQUs.webp" },
  { label: "TELO", color: "#FF6B9D", icon: "🌀", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-mitosis-telophase-LvZt7yGwGEshcXpFv4pt9V.webp" },
  { label: "CITO", color: "#FF8C42", icon: "✂️", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-cytokinesis-QRrwxedhMSgrp23sX6ss4K.webp" },
  { label: "MEI I", color: "#FFD700", icon: "🌟", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-meiosis-1-NPuk64VetV4csrkgsT4HxR.webp" },
  { label: "MEI II", color: "#FF3366", icon: "💫", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-meiosis-2-Spv8ZVnT6mCwh3cDNAikek.webp" },
  { label: "CROSS", color: "#FF6B35", icon: "🔀", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-crossing-over-5tjMdoyN7jsrkAAZFf7J2B.webp" },
];

// Casas especiais do tabuleiro
export const SPECIAL_SQUARES: SpecialSquare[] = [
  { squareIndex: 5, type: "bonus", effect: "Avança 3 casas extras!" },
  { squareIndex: 8, type: "trap", effect: "Perde a próxima vez!" },
  { squareIndex: 12, type: "bonus", effect: "Avança 3 casas extras!" },
  { squareIndex: 15, type: "trap", effect: "Perde a próxima vez!" },
  { squareIndex: 19, type: "bonus", effect: "Avança 3 casas extras!" },
  { squareIndex: 22, type: "trap", effect: "Perde a próxima vez!" },
  { squareIndex: 26, type: "bonus", effect: "Avança 3 casas extras!" },
  { squareIndex: 29, type: "trap", effect: "Perde a próxima vez!" },
];

export function getSpecialSquare(squareIndex: number): SpecialSquare | null {
  return SPECIAL_SQUARES.find((sq) => sq.squareIndex === squareIndex) || null;
}
