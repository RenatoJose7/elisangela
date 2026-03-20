/*
 * QuestionCard — Carta com efeito flip 3D e perguntas de múltipla escolha
 * Design: Arcade Cósmico Neon Brutalist
 * Efeito: rotateY 180deg ao clicar, revelando a pergunta
 */

import { useState } from "react";
import type { Question } from "../data/questions";
import { CATEGORY_COLORS } from "../data/questions";

interface QuestionCardProps {
  question: Question;
  isFlipped: boolean;
  onFlip: () => void;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  feedbackType: "correct" | "incorrect" | null;
  disabled?: boolean;
}

const CARD_BACK_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/card-back-a5NvPY7cr87FS5kyNudRw4.webp";

export default function QuestionCard({
  question,
  isFlipped,
  onFlip,
  selectedAnswer,
  onSelectAnswer,
  feedbackType,
  disabled,
}: QuestionCardProps) {
  const categoryColor = CATEGORY_COLORS[question.category] || "#7B2FFF";
  const optionLetters = ["A", "B", "C", "D"];
  const rgb = hexToRgb(categoryColor);

  return (
    <div
      className="card-container w-full fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        pointerEvents: isFlipped ? "auto" : "none",
      }}
    >
      <div className="w-11/12 max-w-2xl max-h-96" style={{ pointerEvents: "auto" }}>
        <div
          className={`card-inner ${isFlipped ? "flipped" : ""}`}
          style={{ height: "100%" }}
        >
          {/* ── CARD FRONT (closed) ─────────────────────────── */}
          <div
            className="card-front rounded-sm overflow-hidden cursor-pointer select-none"
            onClick={!isFlipped ? onFlip : undefined}
            style={{
              background: "#0D0520",
              border: `3px solid ${categoryColor}`,
              boxShadow: `0 0 20px ${categoryColor}70, 0 0 40px ${categoryColor}40`,
              height: "320px",
            }}
          >
          <div
            className="w-full h-full relative flex flex-col items-center justify-center gap-3"
            style={{
              backgroundImage: `url(${CARD_BACK_URL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(8, 3, 25, 0.6)" }}
            />

            {/* Category badge */}
            <div
              className="relative z-10 font-arcade text-center px-3 py-1.5 rounded-sm"
              style={{
                fontSize: "0.42rem",
                color: categoryColor,
                border: `1px solid ${categoryColor}80`,
                background: `rgba(${rgb}, 0.2)`,
                boxShadow: `0 0 8px ${categoryColor}50`,
                textShadow: `0 0 8px ${categoryColor}`,
              }}
            >
              {question.categoryLabel}
            </div>

            {/* Question mark */}
            <div
              className="relative z-10 font-vt323"
              style={{
                fontSize: "7rem",
                color: categoryColor,
                textShadow: `0 0 30px ${categoryColor}, 0 0 60px ${categoryColor}60`,
                lineHeight: 1,
                animation: "neonPulse 2s ease-in-out infinite",
              }}
            >
              ?
            </div>

            {/* Click prompt */}
            <div
              className="relative z-10 font-arcade text-center"
              style={{
                fontSize: "0.6rem",
                color: "#E0AAFF",
                textShadow: "0 0 10px #7B2FFF",
                letterSpacing: "0.08em",
              }}
            >
              CLIQUE PARA REVELAR
            </div>

            {/* Corner decorations */}
            <div
              className="absolute top-2 left-2 w-5 h-5 pointer-events-none"
              style={{
                borderTop: `1.5px solid ${categoryColor}80`,
                borderLeft: `1.5px solid ${categoryColor}80`,
              }}
            />
            <div
              className="absolute top-2 right-2 w-5 h-5 pointer-events-none"
              style={{
                borderTop: `1.5px solid ${categoryColor}80`,
                borderRight: `1.5px solid ${categoryColor}80`,
              }}
            />
            <div
              className="absolute bottom-2 left-2 w-5 h-5 pointer-events-none"
              style={{
                borderBottom: `1.5px solid ${categoryColor}80`,
                borderLeft: `1.5px solid ${categoryColor}80`,
              }}
            />
            <div
              className="absolute bottom-2 right-2 w-5 h-5 pointer-events-none"
              style={{
                borderBottom: `1.5px solid ${categoryColor}80`,
                borderRight: `1.5px solid ${categoryColor}80`,
              }}
            />
          </div>
        </div>

        {/* ── CARD BACK (question revealed) ──────────────── */}
        <div
          className="card-back rounded-sm overflow-hidden"
          style={{
            background: "#0A0318",
            border: `2px solid ${categoryColor}`,
            boxShadow: `0 0 15px ${categoryColor}50, 0 0 30px ${categoryColor}25`,
            minHeight: "280px",
            height: "auto",
          }}
        >
          {/* Category header */}
          <div
            className="px-4 py-2.5 flex items-center gap-2"
            style={{
              background: `linear-gradient(90deg, rgba(${rgb}, 0.2), rgba(${rgb}, 0.05))`,
              borderBottom: `1px solid ${categoryColor}35`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: categoryColor,
                boxShadow: `0 0 6px ${categoryColor}`,
              }}
            />
            <div
              className="font-arcade"
              style={{
                fontSize: "0.38rem",
                color: categoryColor,
                textShadow: `0 0 8px ${categoryColor}`,
              }}
            >
              {question.categoryLabel}
            </div>
          </div>

          {/* Question text and image */}
          <div
            className="px-5 py-4"
            style={{ borderBottom: `1px solid ${categoryColor}20` }}
          >
            {question.image && (
              <div className="mb-4 rounded-sm overflow-hidden flex items-center justify-center" style={{ height: "160px", background: "rgba(123,47,255,0.1)", border: `1px solid ${categoryColor}30` }}>
                <img src={question.image} alt="Pergunta" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "0.5rem" }} />
              </div>
            )}
            <p
              className="font-orbitron leading-relaxed"
              style={{
                fontSize: "0.85rem",
                color: "#D0C0F0",
                lineHeight: 1.7,
              }}
            >
              {question.question}
            </p>
          </div>

          {/* Answer options */}
          <div className="px-5 py-4 flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: "200px" }}>
            {question.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrect = i === question.correctIndex;
              const showCorrectHighlight =
                feedbackType === "incorrect" && isCorrect && selectedAnswer !== null;

              let borderColor = `${categoryColor}45`;
              let bgColor = `rgba(${rgb}, 0.04)`;
              let textColor = "#9080B0";
              let labelColor = `${categoryColor}80`;

              if (isSelected && feedbackType === "correct") {
                borderColor = "#00FF9F";
                bgColor = "rgba(0,255,159,0.12)";
                textColor = "#AFFFDF";
                labelColor = "#00FF9F";
              } else if (isSelected && feedbackType === "incorrect") {
                borderColor = "#FF3366";
                bgColor = "rgba(255,51,102,0.12)";
                textColor = "#FF9AB5";
                labelColor = "#FF3366";
              } else if (showCorrectHighlight) {
                borderColor = "#00FF9F80";
                bgColor = "rgba(0,255,159,0.08)";
                textColor = "#AFFFDF";
                labelColor = "#00FF9F";
              } else if (isSelected) {
                borderColor = categoryColor;
                bgColor = `rgba(${rgb}, 0.15)`;
                textColor = "#E0AAFF";
                labelColor = categoryColor;
              }

              const canSelect = !disabled && selectedAnswer === null;

              return (
                <button
                  key={i}
                  onClick={() => canSelect && onSelectAnswer(i)}
                  disabled={!canSelect}
                  className="w-full text-left rounded-sm transition-all duration-200 flex items-start gap-2.5"
                  style={{
                    padding: "0.7rem 0.85rem",
                    background: bgColor,
                    border: `1.5px solid ${borderColor}`,
                    boxShadow:
                      isSelected || showCorrectHighlight
                        ? `0 0 8px ${borderColor}50`
                        : "none",
                    cursor: canSelect ? "pointer" : "default",
                    transform: canSelect ? undefined : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (canSelect) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = categoryColor;
                      (e.currentTarget as HTMLButtonElement).style.background = `rgba(${rgb}, 0.1)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (canSelect && selectedAnswer === null) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = `${categoryColor}45`;
                      (e.currentTarget as HTMLButtonElement).style.background = `rgba(${rgb}, 0.04)`;
                    }
                  }}
                >
                  {/* Letter badge */}
                  <span
                    className="font-arcade flex-shrink-0"
                    style={{
                      fontSize: "0.55rem",
                      color: labelColor,
                      textShadow: `0 0 5px ${labelColor}`,
                      marginTop: "0.12rem",
                    }}
                  >
                    {optionLetters[i]}
                  </span>

                  {/* Option text */}
                  <span
                    className="font-orbitron flex-1"
                    style={{
                      fontSize: "0.8rem",
                      color: textColor,
                      lineHeight: 1.6,
                    }}
                  >
                    {option}
                  </span>

                  {/* Result icon */}
                  {isSelected && feedbackType && (
                    <span
                      className="ml-auto flex-shrink-0 font-vt323"
                      style={{
                        fontSize: "1.6rem",
                        color: feedbackType === "correct" ? "#00FF9F" : "#FF3366",
                        textShadow:
                          feedbackType === "correct"
                            ? "0 0 10px #00FF9F"
                            : "0 0 10px #FF3366",
                      }}
                    >
                      {feedbackType === "correct" ? "✓" : "✗"}
                    </span>
                  )}
                  {showCorrectHighlight && (
                    <span
                      className="ml-auto flex-shrink-0 font-vt323"
                      style={{
                        fontSize: "1.6rem",
                        color: "#00FF9F",
                        textShadow: "0 0 10px #00FF9F",
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "123, 47, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
