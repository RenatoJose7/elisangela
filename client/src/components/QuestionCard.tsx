/*
 * QuestionCard — Carta com efeito flip 3D e perguntas de múltipla escolha
 * Design: Arcade Cósmico Neon Brutalist
 * Efeito: rotateY 180deg ao clicar, revelando a pergunta
 */

import { useState, useEffect } from "react";
import type { Question } from "../data/questions";
import { CATEGORY_COLORS } from "../data/questions";

interface QuestionCardProps {
  question: Question;
  isFlipped: boolean;
  onFlip: () => void;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onTimeout?: () => void;
  feedbackType: "correct" | "incorrect" | null;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  isFlipped,
  onFlip,
  selectedAnswer,
  onSelectAnswer,
  onTimeout,
  feedbackType,
  disabled,
}: QuestionCardProps) {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (isFlipped && selectedAnswer === null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && selectedAnswer === null && onTimeout) {
      onTimeout();
    }
  }, [isFlipped, selectedAnswer, timeLeft, onTimeout]);

  useEffect(() => {
    if (!isFlipped) {
      setTimeLeft(20);
    }
  }, [isFlipped]);

  const categoryColor = CATEGORY_COLORS[question.category] || "#7B2FFF";
  const optionLetters = ["A", "B", "C", "D"];
  const rgb = hexToRgb(categoryColor);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        visibility: isFlipped ? "visible" : "hidden",
        opacity: isFlipped ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: isFlipped ? "auto" : "none",
      }}
    >
      <div
        className="w-full max-w-2xl mx-auto rounded-sm overflow-hidden"
        style={{
          background: "#0A0318",
          border: `2px solid ${categoryColor}`,
          boxShadow: `0 0 15px ${categoryColor}50, 0 0 30px ${categoryColor}25`,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Category header */}
        <div
          className="px-6 py-3 flex items-center justify-between flex-shrink-0"
          style={{
            background: `linear-gradient(90deg, rgba(${rgb}, 0.2), rgba(${rgb}, 0.05))`,
            borderBottom: `1px solid ${categoryColor}35`,
          }}
        >
          <div className="flex items-center gap-2">
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
          {/* Timer Display */}
          <div
            className="font-arcade"
            style={{
              fontSize: "0.5rem",
              color: timeLeft <= 5 ? "#FF3366" : categoryColor,
              textShadow: `0 0 8px ${timeLeft <= 5 ? "#FF3366" : categoryColor}`,
              animation: timeLeft <= 5 ? "pulse 0.5s infinite" : "none",
            }}
          >
            TEMPO: {timeLeft}s
          </div>
        </div>

        {/* Question text and image - Content Area */}
        <div
          className="px-6 py-5 overflow-y-auto flex-1 custom-scrollbar"
          style={{
            borderBottom: `1px solid ${categoryColor}20`,
          }}
        >
          {question.image && (
            <div
              className="mb-5 rounded-sm overflow-hidden flex items-center justify-center"
              style={{
                height: "auto",
                maxHeight: "250px",
                background: "rgba(123,47,255,0.1)",
                border: `1px solid ${categoryColor}30`,
              }}
            >
              <img
                src={question.image}
                alt="Pergunta"
                style={{
                  maxWidth: "100%",
                  maxHeight: "250px",
                  objectFit: "contain",
                  padding: "0.8rem",
                }}
              />
            </div>
          )}
          <p
            className="font-orbitron leading-relaxed mb-6"
            style={{
              fontSize: "1rem",
              color: "#D0C0F0",
              lineHeight: 1.8,
            }}
          >
            {question.question}
          </p>

          {/* Answer options moved inside scroll area for better mobile support */}
          <div
            className="flex flex-col gap-3"
            style={{ minHeight: "0" }}
          >
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
                  className="w-full text-left rounded-sm transition-all duration-200 flex items-start gap-3"
                  style={{
                    padding: "0.7rem 1rem",
                    background: bgColor,
                    border: `1.5px solid ${borderColor}`,
                    boxShadow:
                      isSelected || showCorrectHighlight
                        ? `0 0 8px ${borderColor}50`
                        : "none",
                    cursor: canSelect ? "pointer" : "default",
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
                      minWidth: "24px",
                      fontSize: "0.7rem",
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
                      fontSize: "0.9rem",
                      color: textColor,
                      lineHeight: 1.5,
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
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "123, 47, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
