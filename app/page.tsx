"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = [
    { title: "Música 1", src: "/audio1.mp3" },
    { title: "Música 2", src: "/audio2.mp3" },
    { title: "Música 3", src: "/audio3.mp3" },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setPlaying(false);
      });
    }

    setPlaying(true);
  }, [currentTrack]);

  const playPause = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const previousTrack = () => {
    setCurrentTrack(
      (prev) => (prev - 1 + playlist.length) % playlist.length
    );
  };

  const forward10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const backward10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const changeTime = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "#fff",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "520px",
          background: "#111827",
          padding: "25px",
          borderRadius: "14px",
          boxShadow: "0 0 20px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#38bdf8" }}>
          🎧 Player de Áudio
        </h1>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src={playlist[currentTrack].src}
          onLoadedMetadata={() =>
            setDuration(audioRef.current?.duration || 0)
          }
          onTimeUpdate={() =>
            setCurrentTime(audioRef.current?.currentTime || 0)
          }
          onEnded={nextTrack}
        />

        {/* TRACK ATUAL */}
        <h3 style={{ textAlign: "center", marginTop: 10 }}>
          Tocando:{" "}
          <span style={{ color: "#22c55e" }}>
            {playlist[currentTrack].title}
          </span>
        </h3>

        {/* PLAYLIST */}
        <div style={{ marginTop: 20 }}>
          {playlist.map((track, index) => (
            <div
              key={index}
              onClick={() => setCurrentTrack(index)}
              style={{
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  currentTrack === index ? "#2563eb" : "#1f2937",
                color: "#fff",
                border:
                  currentTrack === index
                    ? "1px solid #38bdf8"
                    : "1px solid transparent",
              }}
            >
              {track.title}
            </div>
          ))}
        </div>

        {/* CONTROLES */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button onClick={previousTrack} style={btn}>
            ⏮
          </button>

          <button onClick={playPause} style={{ ...btn, margin: "0 10px" }}>
            {playing ? "⏸" : "▶"}
          </button>

          <button onClick={nextTrack} style={btn}>
            ⏭
          </button>
        </div>

        {/* 10s */}
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <button onClick={backward10} style={smallBtn}>
            ⏪ 10s
          </button>

          <button onClick={forward10} style={{ ...smallBtn, marginLeft: 10 }}>
            10s ⏩
          </button>
        </div>

        {/* TEMPO */}
        <div style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => changeTime(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        {/* VOLUME */}
        <div style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center" }}>Volume: {volume}%</p>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </main>
  );
}

// estilos
const btn = {
  padding: "10px 14px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const smallBtn = {
  padding: "8px 12px",
  background: "#374151",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};