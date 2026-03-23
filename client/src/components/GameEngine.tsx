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
  // Função para tocar som
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
              newPos = Math.min(newPos + 3, BOARD_SQUARES - 1);
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

  // ── Flip Card ──────────────────────────────────────────────
  // Fazer a carta aparecer automaticamente quando entrar em card_reveal
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

  // ── Select Answer ──────────────────────────────────────────
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
      selectedAnswer: -1, // No answer selected
      feedbackType: "incorrect",
      phase: "feedback",
      feedbackMessage: "O TEMPO ACABOU! VOCÊ PERDEU O TURNO.",
    }));
  }, [gameState.phase, gameState.selectedAnswer]);

  // ── Close Feedback ─────────────────────────────────────────
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
        {/* Title & Sound Control */}
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

        {/* Phase indicator */}
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

        {/* Current player */}
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

          {/* Exit */}
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
      <div className="flex flex-1 gap-2 p-2 overflow-hidden">

        {/* ── LEFT: Placar ─────────────────────────── */}
        <div className="flex flex-col gap-2 overflow-y-auto" style={{ flexShrink: 0, width: gameState.players.length >= 4 ? "280px" : "320px", maxHeight: "calc(100vh - 80px)" }}>
          {/* Player scoreboard */}
          <PlayerStatusPanel
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
          />

          {/* Phase legend */}
          <PhaseLegend />
        </div>

        {/* ── CENTER: Board ─────────────────────────── */}
        <div className="flex-1 min-w-0 overflow-hidden">
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
        <div className="flex flex-col gap-2 overflow-y-auto" style={{ flexShrink: 0, width: "380px", maxHeight: "calc(100vh - 80px)" }}>

          {/* Dice / Card panel */}
          <div
            className="rounded-sm overflow-hidden flex-1 flex flex-col"
            style={{
              background: "rgba(8, 5, 20, 0.92)",
              border: "2px solid #7B2FFF",
              boxShadow: "0 0 15px #7B2FFF30",
              minHeight: 0,
            }}
          >
            {/* Panel header */}
            <div
              className="px-4 py-2.5 flex items-center gap-2"
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

            <div className="p-4 flex-1 flex flex-col items-center justify-center overflow-y-auto">
              {/* Dice section */}
              {(gameState.phase === "rolling" || gameState.phase === "moving") && (
                <div className="flex flex-col items-center gap-4 w-full">
                  {/* Turn indicator */}
                    <div
                className="w-full py-2 px-3 rounded-sm text-center"
                style={{
                  background: `rgba(${hexToRgb(currentPlayer.color)}, 0.1)`,
                  border: `1px solid ${currentPlayer.color}50`,
                }}
              >
                <div
                  className="font-arcade"
                  style={{
                    fontSize: "0.55rem",
                    color: currentPlayer.color,
                    textShadow: `0 0 8px ${currentPlayer.glowColor}`,
                  }}
                >
                  VEZ DE:
                </div>
                <div
                  className="font-vt323 mt-1"
                  style={{
                    fontSize: gameState.players.length >= 4 ? "1.6rem" : "1.8rem",
                        color: currentPlayer.glowColor,
                        textShadow: `0 0 10px ${currentPlayer.color}`,
                      }}
                    >
                      {currentPlayer.name}
                    </div>
                  </div>

                  <div style={{ transform: "scale(1.3)", transformOrigin: "center" }}>
                    <Dice
                      value={gameState.diceValue}
                      isRolling={gameState.isDiceRolling}
                      onRoll={handleRollDice}
                      disabled={gameState.phase !== "rolling"}
                    />
                  </div>

                  {/* Position info */}
                  <div
                    className="w-full py-2 px-3 rounded-sm"
                    style={{
                      background: "rgba(123,47,255,0.06)",
                      border: "1px solid #7B2FFF30",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                    className="font-arcade"
                    style={{ fontSize: "0.48rem", color: "#7B2FFF80" }}
                  >
                    POSIÇÃO
                  </span>
                  <span
                    className="font-vt323"
                    style={{ fontSize: "1.5rem", color: "#E0AAFF" }}
                      >
                        {currentPlayer.position + 1} / {BOARD_SQUARES}
                      </span>
                    </div>
                    {/* Mini progress bar */}
                    <div
                      className="w-full mt-1.5 rounded-full overflow-hidden"
                      style={{ height: 4, background: "rgba(123,47,255,0.15)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(currentPlayer.position / (BOARD_SQUARES - 1)) * 100}%`,
                          background: `linear-gradient(90deg, ${currentPlayer.color}, ${currentPlayer.glowColor})`,
                          boxShadow: `0 0 4px ${currentPlayer.color}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Card section */}
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
            </div>
          </div>
        </div>
      </div>

      {/* Feedback popup */}
      {gameState.phase === "feedback" && gameState.feedbackType && gameState.currentQuestion && (
        <FeedbackPopup
          type={gameState.feedbackType}
          explanation={gameState.currentQuestion.explanation}
          penalty={gameState.feedbackType === "incorrect" ? PENALTY_SQUARES : undefined}
          specialMessage={gameState.specialSquareTriggered?.effect}
          onClose={handleCloseFeedback}
        />
      )}

      {/* Win screen */}
      {gameState.phase === "game_over" && gameState.winner && (
        <WinScreen winner={gameState.winner} onRestart={onExit} />
      )}
    </div>
  );
}

// ── Player Status Panel ────────────────────────────────────────
interface PlayerStatusPanelProps {
  players: Player[];
  currentPlayerIndex: number;
}

function PlayerStatusPanel({ players, currentPlayerIndex }: PlayerStatusPanelProps) {
  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{
        background: "rgba(8, 5, 20, 0.92)",
        border: "1px solid #7B2FFF40",
      }}
    >
      <div
        className="px-4 py-2"
        style={{
          background: "linear-gradient(90deg, rgba(123,47,255,0.2), transparent)",
          borderBottom: "1px solid #7B2FFF20",
        }}
      >
        <span
          className="font-arcade"
          style={{ fontSize: "0.42rem", color: "#B0A0CC" }}
        >
          PLACAR
        </span>
      </div>

      <div className="p-2 flex flex-col gap-1">
        {players.map((player, i) => {
          const isActive = i === currentPlayerIndex;
          const progress = (player.position / (BOARD_SQUARES - 1)) * 100;

          return (
            <div
              key={player.id}
              className="rounded-sm p-1.5 transition-all duration-300"
              style={{
                background: isActive
                  ? `rgba(${hexToRgb(player.color)}, 0.1)`
                  : "rgba(123,47,255,0.03)",
                border: `1px solid ${isActive ? player.color + "80" : player.color + "30"}`,
                boxShadow: isActive ? `0 0 8px ${player.color}30` : "none",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {/* Pawn */}
                <div
                  className={`rounded-full flex-shrink-0 flex items-center justify-center font-arcade ${
                    isActive ? "pawn-idle" : ""
                  }`}
                  style={{
                    width: 20,
                    height: 20,
                    background: `radial-gradient(circle at 35% 35%, ${player.glowColor}, ${player.color})`,
                    border: `1.5px solid ${player.glowColor}`,
                    boxShadow: isActive ? `0 0 6px ${player.glowColor}` : "none",
                    fontSize: "0.32rem",
                    color: "#fff",
                  }}
                >
                  {player.id + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-arcade truncate flex items-center gap-1"
                    style={{
                      fontSize: "0.40rem",
                      color: isActive ? player.color : "#A090C0",
                      textShadow: isActive ? `0 0 6px ${player.glowColor}` : "none",
                    }}
                  >
                    {player.name}
                    {isActive && (
                      <span className="blink" style={{ color: player.color }}>
                        ◀
                      </span>
                    )}
                  </div>
                  <div
                    className="font-vt323"
                    style={{ fontSize: "0.90rem", color: "#6050A0" }}
                  >
                    Casa {player.position + 1}/{BOARD_SQUARES}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="w-full rounded-full overflow-hidden"
                style={{
                  height: 3,
                  background: "rgba(123,47,255,0.12)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${player.color}, ${player.glowColor})`,
                    boxShadow: `0 0 3px ${player.color}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Phase Legend ───────────────────────────────────────────────
function PhaseLegend() {
  const phases = [
    { label: "G1", color: "#00E5FF", desc: "Crescimento" },
    { label: "S", color: "#00FF9F", desc: "Síntese DNA" },
    { label: "G2", color: "#69FF47", desc: "Preparação" },
    { label: "PRÓ", color: "#7B2FFF", desc: "Prófase" },
    { label: "META", color: "#B44FFF", desc: "Metáfase" },
    { label: "ANA", color: "#E040FB", desc: "Anáfase" },
    { label: "TELO", color: "#FF6B9D", desc: "Telófase" },
    { label: "CITO", color: "#FF8C42", desc: "Citocinese" },
    { label: "MEI I", color: "#FFD700", desc: "Meiose I" },
    { label: "MEI II", color: "#FF3366", desc: "Meiose II" },
    { label: "CROSS", color: "#FF6B35", desc: "Crossing Over" },
  ];

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{
        background: "rgba(8, 5, 20, 0.85)",
        border: "1px solid #7B2FFF25",
      }}
    >
      <div
        className="px-4 py-2"
        style={{
          background: "linear-gradient(90deg, rgba(123,47,255,0.12), transparent)",
          borderBottom: "1px solid #7B2FFF15",
        }}
      >
        <span
          className="font-arcade"
          style={{ fontSize: "0.35rem", color: "#7B2FFF70" }}
        >
          LEGENDA DO TABULEIRO
        </span>
      </div>

      <div className="p-2.5 grid grid-cols-2 gap-1">
        {phases.map((p) => (
          <div key={p.label} className="flex items-center gap-1.5">
            <div
              className="rounded-sm flex-shrink-0"
              style={{
                width: 7,
                height: 7,
                background: p.color,
                boxShadow: `0 0 4px ${p.color}`,
              }}
            />
            <span
              className="font-vt323"
              style={{ fontSize: "0.8rem", color: "#6050A0" }}
            >
              {p.label} — {p.desc}
            </span>
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
