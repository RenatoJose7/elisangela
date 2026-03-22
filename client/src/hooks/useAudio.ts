import { useEffect } from "react";

export function useAudio() {
  useEffect(() => {
    // Criar elemento de áudio
    const audio = document.getElementById("background-music") as HTMLAudioElement;
    
    if (!audio) {
      const newAudio = document.createElement("audio");
      newAudio.id = "background-music";
      newAudio.loop = true;
      newAudio.volume = 0.3;
      
      // Usar uma música de fundo estilo arcade/cósmico
      // Usando uma URL de música royalty-free
      newAudio.src = "https://assets.mixkit.co/active_storage/music/2a7f8c4f-1d3e-4c5b-8f2a-9b3c1d5e7f9a/preview.mp3";
      // Fallback: usar outra música se a primeira não funcionar
      newAudio.onerror = () => {
        newAudio.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      };
      
      document.body.appendChild(newAudio);
      
      // Tentar reproduzir
      newAudio.play().catch(() => {
        // Se falhar, esperar por interação do usuário
        const playOnInteraction = () => {
          newAudio.play();
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
      });
    } else {
      // Se já existe, apenas garantir que está tocando
      audio.play().catch(() => {
        const playOnInteraction = () => {
          audio.play();
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
      });
    }
  }, []);
}
