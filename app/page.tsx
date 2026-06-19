"use client";

import { useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(50);

  const playAudio = () => {
    audioRef.current?.play();
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  const changeVolume = (value: number) => {
    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        color: "#000000",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "30px",
          borderRadius: "12px",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            marginBottom: "15px",
          }}
        >
          🎵 Player de Áudio
        </h1>

        <p
          style={{
            color: "#4b5563",
            marginBottom: "20px",
          }}
        >
          Aplicação desenvolvida em Next.js para reproduzir,
          pausar e controlar o volume de um arquivo MP3.
        </p>

        <audio ref={audioRef}>
          <source src="/audio1.mp3" type="audio/mpeg" />
          Seu navegador não suporta áudio.
        </audio>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={playAudio}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#22c55e",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ▶ Executar
          </button>

          <button
            onClick={pauseAudio}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ⏸ Pausar
          </button>
        </div>

        <div style={{ marginTop: "25px" }}>
          <p
            style={{
              color: "#1f2937",
              fontWeight: "bold",
            }}
          >
            Volume: {volume}%
          </p>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) =>
              changeVolume(Number(e.target.value))
            }
            style={{
              width: "100%",
              marginTop: "10px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </main>
  );
}