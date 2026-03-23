/*
 * GameEngine — Componente principal do jogo com toda a lógica de estado
 * Design: Arcade Cósmico Neon Brutalist
 * Mecânica: Dado → Movimento → Carta Flip → Pergunta → Feedback → Próximo turno
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useAudio } from "../hooks/useAudio";
import type { GamePhase, GameState, Player } from "../data/gameTypes";
import { BOARD_SQUARES, PLAYER_COLORS, getSpecialSquare } from "../data/gameTypes";
import { getQuestionForSquare } from "../data/questions";
import SnakeBoard from "./SnakeBoard";
import Dice from "./Dice";
import QuestionCard from "./QuestionCard";
import FeedbackPopup from "./FeedbackPopup";
import WinScreen from "./WinScreen";

const PENALTY_SQUARES = 2;

interface GameEngineProps {
  initialPlayers: Player[];
  onExit: () => void;
}

export default function GameEngine({ initialPlayers, onExit }: GameEngineProps) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("soundEnabled");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Persistir estado de som
  useEffect(() => {
    localStorage.setItem("soundEnabled", JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  useAudio(isSoundEnabled);

  const [gameState, setGameState] = useState<GameState>({
    phase: "rolling",
    players: initialPlayers,
    currentPlayerIndex: 0,
    diceValue: null,
    isDiceRolling: false,
    currentQuestion: null,
    isCardFlipped: false,
    selectedAnswer: null,
    feedbackType: null,
    feedbackMessage: "",
    totalSquares: BOARD_SQUARES,
    winner: null,
    specialSquareTriggered: null,
    playerSkipsTurn: false,
  });

  const [flashClass, setFlashClass] = useState("");
  const rollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  // ── Roll Dice ──────────────────────────────────────────────
  const playSound = (type: "dice" | "bonus" | "correct" | "incorrect") => {
    if (!isSoundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case "dice":
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case "bonus":
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      case "correct":
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case "incorrect":
        oscillator.frequency.value = 300;
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
    }
  };

  const handleRollDice = useCallback(() => {
    if (gameState.phase !== "rolling" || gameState.isDiceRolling) return;
    playSound("dice");

    setGameState((prev) => ({
      ...prev,
      isDiceRolling: true,
      diceValue: null,
    }));

    if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current);
    rollTimeoutRef.current = setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;

      setGameState((prev) => ({
        ...prev,
        isDiceRolling: false,
        diceValue: rolled,
        phase: "moving",
      }));

      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = setTimeout(() => {
        setGameState((prev) => {
          let newPos = Math.min(
            prev.players[prev.currentPlayerIndex].position + rolled,
            BOARD_SQUARES - 1
          );
          let updatedPlayers = prev.players.map((p, i) =>
            i === prev.currentPlayerIndex ? { ...p, position: newPos } : p
          );

          const specialSquare = getSpecialSquare(newPos);
          let specialSquareTriggered = null;
          let playerSkipsTurn = false;

          if (specialSquare) {
            specialSquareTriggered = specialSquare;
            if (specialSquare.type === "bonus") {
              playSound("bonus");
              newPos = Math.min(newPos + 1, BOARD_SQUARES - 1);
              updatedPlayers = updatedPlayers.map((p, i) =>
                i === prev.currentPlayerIndex ? { ...p, position: newPos } : p
              );
            } else if (specialSquare.type === "trap") {
              playerSkipsTurn = true;
            }
          }

          if (newPos >= BOARD_SQUARES - 1) {
            return {
              ...prev,
              players: updatedPlayers,
              phase: "game_over",
              winner: updatedPlayers[prev.currentPlayerIndex],
              specialSquareTriggered,
              playerSkipsTurn,
            };
          }

          const question = getQuestionForSquare(newPos);

          return {
            ...prev,
            players: updatedPlayers,
            phase: "card_reveal",
            currentQuestion: question,
            isCardFlipped: false,
            selectedAnswer: null,
            feedbackType: null,
            specialSquareTriggered,
            playerSkipsTurn,
          };
        });
      }, 700);
    }, 1200);
  }, [gameState.phase, gameState.isDiceRolling]);

  useEffect(() => {
    if (gameState.phase === "card_reveal" && !gameState.isCardFlipped) {
      const timer = setTimeout(() => {
        handleFlipCard();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.phase, gameState.isCardFlipped]);

  const handleFlipCard = useCallback(() => {
    if (gameState.phase !== "card_reveal") return;
    setGameState((prev) => ({
      ...prev,
      isCardFlipped: true,
      phase: "question",
    }));
  }, [gameState.phase]);

  const handleSelectAnswer = useCallback(
    (answerIndex: number) => {
      if (gameState.phase !== "question" || gameState.selectedAnswer !== null) return;
      if (!gameState.currentQuestion) return;

      const isCorrect = answerIndex === gameState.currentQuestion.correctIndex;
      playSound(isCorrect ? "correct" : "incorrect");

      setFlashClass(isCorrect ? "flash-green" : "flash-red");
      setTimeout(() => setFlashClass(""), 600);

      setGameState((prev) => ({
        ...prev,
        selectedAnswer: answerIndex,
        feedbackType: isCorrect ? "correct" : "incorrect",
        phase: "feedback",
        players: prev.players.map((p, i) => 
          i === prev.currentPlayerIndex && isCorrect 
            ? { ...p, score: p.score + 100 } 
            : p
        )
      }));
    },
    [gameState.phase, gameState.selectedAnswer, gameState.currentQuestion]
  );

  const handleTimeout = useCallback(() => {
    if (gameState.phase !== "question" || gameState.selectedAnswer !== null) return;
    
    playSound("incorrect");
    setFlashClass("flash-red");
    setTimeout(() => setFlashClass(""), 600);

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: -1,
      feedbackType: "incorrect",
      phase: "feedback",
      feedbackMessage: "O TEMPO ACABOU! VOCÊ PERDEU O TURNO.",
    }));
  }, [gameState.phase, gameState.selectedAnswer]);

  const handleCloseFeedback = useCallback(() => {
    setGameState((prev) => {
      if (!prev.feedbackType || !prev.currentQuestion) return prev;

      const isCorrect = prev.feedbackType === "correct";
      let updatedPlayers = [...prev.players];

      if (!isCorrect) {
        const penaltyPos = Math.max(
          0,
          updatedPlayers[prev.currentPlayerIndex].position - PENALTY_SQUARES
        );
        updatedPlayers = updatedPlayers.map((p, i) =>
          i === prev.currentPlayerIndex ? { ...p, position: penaltyPos } : p
        );
      }

      let nextPlayerIndex = (prev.currentPlayerIndex + 1) % prev.players.length;

      if (prev.playerSkipsTurn) {
        nextPlayerIndex = (nextPlayerIndex + 1) % prev.players.length;
      }

      return {
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: nextPlayerIndex,
        phase: "rolling",
        diceValue: null,
        isDiceRolling: false,
        currentQuestion: null,
        isCardFlipped: false,
        selectedAnswer: null,
        feedbackType: null,
        feedbackMessage: "",
        specialSquareTriggered: null,
        playerSkipsTurn: false,
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  const isCardPhase =
    gameState.phase === "card_reveal" ||
    gameState.phase === "question" ||
    gameState.phase === "feedback";

  const phaseLabelMap: Record<string, string> = {
    start: "INÍCIO",
    rolling: "ROLE O DADO",
    moving: "MOVENDO...",
    card_reveal: "CLIQUE NA CARTA",
    question: "RESPONDA",
    feedback: "RESULTADO",
    game_over: "FIM DE JOGO",
  };
  const phaseLabel = phaseLabelMap[gameState.phase] || "";

  return (
    <div className={`h-screen w-screen relative z-10 overflow-hidden flex flex-col ${flashClass}`} style={{ background: "#0A0A1A", position: "relative" }}>
      {/* ── Top HUD Bar ──────────────────────────────────────────── */}
      <div
        className="z-20 flex items-center justify-between px-3 sm:px-5 py-2.5 flex-shrink-0"
        style={{
          background: "rgba(8, 5, 20, 0.97)",
          borderBottom: "1px solid #7B2FFF50",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 20px rgba(123,47,255,0.2)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
              className="font-arcade hidden sm:block"
              style={{
                fontSize: "0.55rem",
              color: "#7B2FFF",
              textShadow: "0 0 8px #7B2FFF",
            }}
          >
            COSMIC CELL INVASION
          </div>
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className="font-arcade text-[10px] px-2 py-1 rounded border border-[#7B2FFF] transition-all hover:scale-105 active:scale-95"
            style={{
              color: isSoundEnabled ? "#00FF9F" : "#FF3366",
              borderColor: isSoundEnabled ? "#00FF9F80" : "#FF336680",
              background: isSoundEnabled ? "rgba(0,255,159,0.1)" : "rgba(255,51,102,0.1)",
              textShadow: `0 0 5px ${isSoundEnabled ? "#00FF9F" : "#FF3366"}`,
              boxShadow: isSoundEnabled ? "0 0 8px #00FF9F30" : "0 0 8px #FF336630",
              cursor: "pointer",
            }}
          >
            {isSoundEnabled ? "🔊 SOM: ON" : "🔇 SOM: OFF"}
          </button>
        </div>

        <div
          className="font-arcade"
          style={{
            fontSize: "0.55rem",
            color: "#00E5FF",
            textShadow: "0 0 8px #00E5FF",
            letterSpacing: "0.1em",
          }}
        >
          {phaseLabel}
        </div>

        <div className="flex items-center gap-2">
          <div
            className="rounded-full pawn-idle"
            style={{
              width: 14,
              height: 14,
              background: `radial-gradient(circle at 35% 35%, ${currentPlayer.glowColor}, ${currentPlayer.color})`,
              border: `1.5px solid ${currentPlayer.glowColor}`,
              boxShadow: `0 0 6px ${currentPlayer.glowColor}`,
              flexShrink: 0,
            }}
          />
          <span
            className="font-arcade"
            style={{
              fontSize: "0.5rem",
              color: currentPlayer.color,
              textShadow: `0 0 6px ${currentPlayer.glowColor}`,
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {currentPlayer.name}
          </span>

          <button
            onClick={onExit}
            className="font-arcade ml-2"
            style={{
              fontSize: "0.48rem",
              color: "#FF3366",
              textShadow: "0 0 6px #FF3366",
              background: "rgba(255,51,102,0.1)",
              border: "1px solid #FF336640",
              padding: "0.25rem 0.5rem",
              borderRadius: "2px",
            }}
          >
            ✕ SAIR
          </button>
        </div>
      </div>

      {/* ── Main Layout ─────────────────────────────── */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">

        {/* ── LEFT: Placar ─────────────────────────── */}
        <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar" style={{ flexShrink: 0, width: "240px" }}>
          <PlayerStatusPanel
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
          />
          <PhaseLegend />
        </div>

        {/* ── CENTER: Board ─────────────────────────── */}
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
          <SnakeBoard
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            highlightedSquare={
              gameState.phase !== "rolling" && gameState.phase !== "moving"
                ? currentPlayer.position
                : null
            }
          />
        </div>

        {/* ── RIGHT: Controls (Dado) ─────────────────────────── */}
        <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar" style={{ flexShrink: 0, width: "320px" }}>

          <div
            className="rounded-sm overflow-hidden flex flex-col"
            style={{
              background: "rgba(8, 5, 20, 0.92)",
              border: "2px solid #7B2FFF",
              boxShadow: "0 0 15px #7B2FFF30",
              minHeight: "450px",
            }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{
                background: "linear-gradient(90deg, rgba(123,47,255,0.3), rgba(123,47,255,0.05))",
                borderBottom: "1px solid #7B2FFF40",
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: "#7B2FFF",
                  boxShadow: "0 0 6px #7B2FFF",
                  animation: "neonPulse 1.5s ease-in-out infinite",
                }}
              />
              <span
                className="font-arcade"
                style={{ fontSize: "0.5rem", color: "#E0AAFF" }}
              >
                {isCardPhase ? "CARTA DE DESAFIO" : "PAINEL DE CONTROLE"}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col items-center justify-center">
              {(gameState.phase === "rolling" || gameState.phase === "moving") && (
                <div className="flex flex-col items-center gap-6 w-full">
                  <div
                    className="w-full py-3 px-4 rounded-sm text-center"
                    style={{
                      background: `rgba(${hexToRgb(currentPlayer.color)}, 0.1)`,
                      border: `1px solid ${currentPlayer.color}50`,
                    }}
                  >
                    <div
                      className="font-arcade"
                      style={{
                        fontSize: "0.45rem",
                        color: currentPlayer.color,
                        textShadow: `0 0 8px ${currentPlayer.glowColor}`,
                      }}
                    >
                      VEZ DE:
                    </div>
                    <div
                      className="font-vt323 mt-1"
                      style={{
                        fontSize: "1.8rem",
                        color: currentPlayer.glowColor,
                        textShadow: `0 0 10px ${currentPlayer.color}`,
                      }}
                    >
                      {currentPlayer.name}
                    </div>
                  </div>

                  <div className="py-4">
                    <Dice
                      value={gameState.diceValue}
                      isRolling={gameState.isDiceRolling}
                      onRoll={handleRollDice}
                      disabled={gameState.phase !== "rolling"}
                    />
                  </div>

                  <div
                    className="w-full py-2 px-4 rounded-sm text-center"
                    style={{
                      background: "rgba(123,47,255,0.08)",
                      border: "1px solid #7B2FFF30",
                    }}
                  >
                    <div
                      className="font-arcade text-xs"
                      style={{ color: "#B0A0CC", fontSize: "0.32rem" }}
                    >
                      POSIÇÃO NO MAPA
                    </div>
                    <div
                      className="font-vt323 mt-1"
                      style={{ color: "#00E5FF", fontSize: "1rem" }}
                    >
                      CASA {currentPlayer.position + 1} / {BOARD_SQUARES}
                    </div>
                  </div>

                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{ height: 6, background: "rgba(123,47,255,0.15)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(currentPlayer.position / (BOARD_SQUARES - 1)) * 100}%`,
                        background: `linear-gradient(90deg, ${currentPlayer.color}, ${currentPlayer.glowColor})`,
                        boxShadow: `0 0 6px ${currentPlayer.color}`,
                      }}
                    />
                  </div>
                </div>
              )}

              {isCardPhase && (
                <div className="text-center py-8">
                  <div className="font-arcade text-purple-400 mb-4 animate-pulse" style={{ fontSize: "0.5rem" }}>
                    DESAFIO ATIVO
                  </div>
                  <div className="font-vt323 text-white text-xl">
                    Responda à pergunta para continuar!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Question Card Overlay */}
      {isCardPhase && gameState.currentQuestion && (
        <QuestionCard
          question={gameState.currentQuestion}
          isFlipped={gameState.isCardFlipped}
          onFlip={handleFlipCard}
          selectedAnswer={gameState.selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onTimeout={handleTimeout}
          feedbackType={gameState.feedbackType}
          disabled={gameState.phase !== "question"}
        />
      )}

      {/* Feedback popup */}
      {gameState.phase === "feedback" && gameState.feedbackType && gameState.currentQuestion && (
        <FeedbackPopup
          type={gameState.feedbackType}
          explanation={gameState.currentQuestion.explanation}
          onClose={handleCloseFeedback}
          penalty={gameState.feedbackType === "incorrect" ? PENALTY_SQUARES : 0}
          specialMessage={gameState.feedbackMessage}
        />
      )}

      {/* Winner screen */}
      {gameState.phase === "game_over" && gameState.winner && (
        <WinScreen winner={gameState.winner} onRestart={onExit} />
      )}
    </div>
  );
}

// ── Sub-componentes auxiliares ──────────────────────────────

function PlayerStatusPanel({ players, currentPlayerIndex }: { players: Player[]; currentPlayerIndex: number }) {
  return (
    <div
      className="rounded-sm p-3 flex flex-col gap-3"
      style={{
        background: "rgba(8, 5, 20, 0.92)",
        border: "2px solid #7B2FFF",
        boxShadow: "0 0 15px #7B2FFF30",
      }}
    >
      <div className="font-arcade text-[0.45rem] text-purple-300 border-b border-purple-900/50 pb-2 mb-1 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
        PLACAR DOS JOGADORES
      </div>
      <div className="flex flex-col gap-2.5">
        {players.map((player, i) => {
          const isCurrent = i === currentPlayerIndex;
          return (
            <div
              key={player.id}
              className={`p-2.5 rounded-sm border transition-all ${isCurrent ? 'scale-105' : 'opacity-80'}`}
              style={{
                background: isCurrent ? `rgba(${hexToRgb(player.color)}, 0.12)` : "rgba(255,255,255,0.03)",
                borderColor: isCurrent ? player.color : "rgba(123,47,255,0.2)",
                boxShadow: isCurrent ? `0 0 12px ${player.color}40` : "none",
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: player.color,
                      boxShadow: `0 0 6px ${player.glowColor}`,
                    }}
                  />
                  <span
                    className="font-arcade truncate max-w-[100px]"
                    style={{ fontSize: "0.4rem", color: player.color }}
                  >
                    {player.name}
                  </span>
                </div>
                {isCurrent && (
                  <span className="font-arcade text-[8px] text-white animate-pulse">ATUAL</span>
                )}
              </div>
              <div className="flex justify-between items-end">
                <div className="font-vt323 text-cyan-400 text-sm">
                  CASA: {player.position + 1}
                </div>
                <div className="font-vt323 text-yellow-400 text-lg leading-none">
                  {player.score} <span className="text-[10px] text-yellow-600">PTS</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhaseLegend() {
  const steps = [
    { icon: "🎲", label: "ROLAR" },
    { icon: "🏃", label: "MOVER" },
    { icon: "❓", label: "QUIZ" },
    { icon: "✨", label: "PONTUAR" },
  ];

  return (
    <div
      className="rounded-sm p-3"
      style={{
        background: "rgba(8, 5, 20, 0.92)",
        border: "2px solid #7B2FFF30",
      }}
    >
      <div className="font-arcade text-[0.4rem] text-cyan-500/70 mb-3 text-center">GUIA RÁPIDO</div>
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 px-2">
            <span className="text-sm">{step.icon}</span>
            <span className="font-arcade text-[0.35rem] text-purple-300/60">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "123, 47, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
