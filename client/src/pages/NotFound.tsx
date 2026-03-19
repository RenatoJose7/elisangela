import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#0A0A1A" }}
    >
      <div
        className="font-arcade text-center"
        style={{
          fontSize: "3rem",
          color: "#FF3366",
          textShadow: "0 0 20px #FF3366, 0 0 40px #FF3366",
          lineHeight: 1,
        }}
      >
        404
      </div>
      <div
        className="font-arcade mt-4 mb-8 text-center"
        style={{
          fontSize: "0.5rem",
          color: "#7B2FFF",
          textShadow: "0 0 8px #7B2FFF",
          letterSpacing: "0.1em",
        }}
      >
        PÁGINA NÃO ENCONTRADA
      </div>
      <button
        onClick={() => setLocation("/")}
        className="arcade-btn arcade-btn-purple"
        style={{ fontSize: "0.5rem" }}
      >
        ← VOLTAR AO JOGO
      </button>
    </div>
  );
}
