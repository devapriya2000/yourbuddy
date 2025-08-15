import React, { useEffect, useMemo, useRef, useState } from "react";
import rainAudio from "./rain.mp3";
import thunderAudio from "./thunder.mp3";
import teaAudio from "./tea.mp3";
import songAudio from "./song.mp3";

interface ChaiGPTProps {
  onBack: () => void;
  /** Optional: override default asset URLs */
  bgUrl?: string;
  nostalgicUrl?: string; // looped background music
  rainUrl?: string;      // looped rain
  thunderUrl?: string;   // looped thunder ambience (with lightning flashes)
  pourUrl?: string;      // one-shot “tea pouring” SFX
}

const DEFAULTS = {
  bgUrl:
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1920&auto=format&fit=crop",
  nostalgicUrl: songAudio,
  rainUrl: rainAudio,
  thunderUrl: thunderAudio,
  pourUrl: teaAudio,
};

const ChaiGPT: React.FC<ChaiGPTProps> = ({
  onBack,
  bgUrl = DEFAULTS.bgUrl,
  nostalgicUrl = DEFAULTS.nostalgicUrl,
  rainUrl = DEFAULTS.rainUrl,
  thunderUrl = DEFAULTS.thunderUrl,
  pourUrl = DEFAULTS.pourUrl,
}) => {
  // UI states
  const [musicOn, setMusicOn] = useState(false);
  const [rainOn, setRainOn] = useState(false);
  const [thunderOn, setThunderOn] = useState(false);
  const [isPouring, setIsPouring] = useState(false);

  // audio refs
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const thunderRef = useRef<HTMLAudioElement | null>(null);
  const pourRef = useRef<HTMLAudioElement | null>(null);

  // Create raindrops once (to keep positions stable)
  const drops = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // %
        delay: Math.random() * 2, // s
        duration: 1 + Math.random() * 1.7, // s
        size: 0.6 + Math.random() * 0.7, // scale
      })),
    []
  );

  // Play/pause helpers
  const safePlay = async (el: HTMLAudioElement | null) => {
    if (!el) return;
    try {
      await el.play();
    } catch {
      // ignore autoplay errors; user must click a button first
    }
  };
  const safePause = (el: HTMLAudioElement | null) => {
    if (!el) return;
    el.pause();
  };

  // Toggle handlers
  const toggleMusic = async () => {
    const next = !musicOn;
    setMusicOn(next);
    if (next) {
      musicRef.current!.loop = true;
      musicRef.current!.volume = 0.5;
      await safePlay(musicRef.current);
    } else {
      safePause(musicRef.current);
    }
  };

  const toggleRain = async () => {
    const next = !rainOn;
    setRainOn(next);
    if (next) {
      rainRef.current!.loop = true;
      rainRef.current!.volume = 0.7;
      await safePlay(rainRef.current);
    } else {
      safePause(rainRef.current);
    }
  };

  const toggleThunder = async () => {
    const next = !thunderOn;
    setThunderOn(next);
    if (next) {
      thunderRef.current!.loop = true;
      thunderRef.current!.volume = 0.8;
      await safePlay(thunderRef.current);
    } else {
      safePause(thunderRef.current);
    }
  };

  const pourTea = async () => {
    if (isPouring) return;
    setIsPouring(true);
    if (pourRef.current) {
      pourRef.current.currentTime = 0;
      pourRef.current.volume = 1;
      await safePlay(pourRef.current);
    }
    // end pour after animation length (matches CSS ~2.6s)
    setTimeout(() => setIsPouring(false), 2600);
  };

  // Stop sounds on unmount
  useEffect(() => {
    return () => {
      safePause(musicRef.current);
      safePause(rainRef.current);
      safePause(thunderRef.current);
      safePause(pourRef.current);
    };
  }, []);

  return (
    <div className="chai-root" style={{ backgroundImage: `url(${bgUrl})` }}>
      {/* Overlay gradient for readability */}
      <div className="overlay" />

      {/* Lightning flashes when thunder is on */}
      <div className={`lightning ${thunderOn ? "active" : ""}`} />

      {/* Rain overlay when rain is on */}
      <div className={`rain ${rainOn ? "active" : ""}`}>
        {drops.map((d) => (
          <span
            key={d.id}
            className="drop"
            style={
              {
                left: `${d.left}%`,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
                "--scale": d.size,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Main card */}
      <div className="card enter">
        <div className="card-header">
          <button className="back" onClick={onBack} title="Back to Games">
            ← Back
          </button>
          <h1 className="title">ChaiGPT Tea Shop ☕</h1>
          <div style={{ width: 64 }} />
        </div>

        <p className="subtitle">
          Set the mood: nostalgic music, cozy rain, thunder rumbles — and pour a hot chai.
        </p>

        {/* Teapot / Pour scene */}
        <div className="scene">
          <div className={`teapot ${isPouring ? "tilt" : ""}`}>🫖</div>

          <div className="cup">
            <div className={`steam ${musicOn ? "on" : ""}`}>
              <span />
              <span />
              <span />
            </div>
            <div className={`fill ${isPouring ? "fill-anim" : ""}`} />
            <div className="cup-body">☕</div>
          </div>

          {/* Tea stream appears only while pouring */}
          <div className={`stream ${isPouring ? "show" : ""}`} />
        </div>

        {/* Controls */}
        <div className="controls">
          <button
            className={`btn ${musicOn ? "on" : ""}`}
            onClick={toggleMusic}
            title="Nostalgic music"
          >
            {musicOn ? "Pause Music 🎵" : "Play Music 🎵"}
          </button>

          <button
            className={`btn ${rainOn ? "on" : ""}`}
            onClick={toggleRain}
            title="Rain ambience"
          >
            {rainOn ? "Stop Rain 🌧️" : "Play Rain 🌧️"}
          </button>

          <button
            className={`btn ${thunderOn ? "on" : ""}`}
            onClick={toggleThunder}
            title="Thunder ambience"
          >
            {thunderOn ? "Stop Thunder ⚡" : "Play Thunder ⚡"}
          </button>

          <button className="btn pour" onClick={pourTea} title="Pour tea">
            Pour Tea 🫖➡️☕
          </button>
        </div>

        <p className="hint">
          Tip: You can combine sounds (e.g., Music + Rain) for extra cozy vibes.
        </p>
      </div>

      {/* Hidden audio elements */}
      <audio ref={musicRef} src={nostalgicUrl} preload="none" />
      <audio ref={rainRef} src={rainUrl} preload="none" />
      <audio ref={thunderRef} src={thunderUrl} preload="none" />
      <audio ref={pourRef} src={pourUrl} preload="none" />

      {/* Local CSS */}
      <style>{`
        .chai-root {
          position: relative;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.45) 0%,
            rgba(0,0,0,0.35) 40%,
            rgba(0,0,0,0.45) 100%
          );
          pointer-events: none;
        }

        /* Card */
        .card {
          position: relative;
          width: min(960px, 92vw);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 20px;
          padding: 20px 20px 28px;
          color: #fff;
          box-shadow: 0 10px 40px rgba(0,0,0,0.25);
          z-index: 5;
        }
        .enter {
          animation: cardIn 520ms ease-out;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .card-header {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          margin-bottom: 8px;
        }
        .back {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.35);
          padding: 8px 12px;
          color: #fff;
          border-radius: 10px;
          cursor: pointer;
        }
        .back:hover { background: rgba(255,255,255,0.28); }
        .title {
          font-size: clamp(22px, 2.4vw, 30px);
          margin: 0;
        }
        .subtitle {
          margin: 8px 2px 18px;
          color: #e8e8e8;
        }

        /* Scene */
        .scene {
          position: relative;
          height: 220px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
          border: 1px solid rgba(255,255,255,0.2);
          overflow: hidden;
          display: flex; align-items: center; justify-content: center; gap: 40px;
          margin-bottom: 18px;
        }
        .teapot {
          font-size: 64px;
          transform-origin: 60% 50%;
          transition: transform 0.4s ease;
          filter: drop-shadow(0 3px 7px rgba(0,0,0,0.35));
        }
        .teapot.tilt { transform: rotate(-28deg) translateY(-6px); }
        .cup {
          position: relative;
          width: 140px; height: 140px;
          display: grid;
          place-items: center;
        }
        .cup-body {
          font-size: 60px;
          transform: translateY(6px);
          filter: drop-shadow(0 3px 7px rgba(0,0,0,0.35));
        }
        .fill {
          position: absolute;
          bottom: 46px; left: 50%;
          transform: translateX(-50%);
          width: 72px;
          height: 0px;
          background: linear-gradient(180deg, #b2722e, #7a4b1c);
          border-radius: 0 0 12px 12px;
          transition: height 0.2s;
          z-index: -1;
        }
        .fill-anim {
          animation: fillCup 2.2s ease-in-out forwards;
        }
        @keyframes fillCup {
          0% { height: 0px; }
          40% { height: 16px; }
          70% { height: 28px; }
          100% { height: 34px; }
        }
        .steam {
          position: absolute;
          top: 14px; left: 50%;
          transform: translateX(-50%);
          width: 100px; height: 60px;
          opacity: 0; pointer-events: none;
          display: flex; gap: 6px;
        }
        .steam.on { opacity: 1; transition: opacity 0.5s; }
        .steam span {
          width: 14px; height: 14px; border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8), rgba(255,255,255,0.05));
          animation: steamUp 2.6s ease-in-out infinite;
          filter: blur(0.5px);
        }
        .steam span:nth-child(2) { animation-delay: 0.6s; }
        .steam span:nth-child(3) { animation-delay: 1.2s; }
        @keyframes steamUp {
          0% { transform: translateY(18px) scale(0.6); opacity: 0; }
          20% { opacity: 0.65; }
          60% { opacity: 0.4; }
          100% { transform: translateY(-24px) scale(1.1); opacity: 0; }
        }

        /* Tea stream (visible while pouring) */
        .stream {
          position: absolute;
          top: 68px; left: calc(50% - 84px);
          width: 6px; height: 0;
          background: linear-gradient(180deg, #c77a2e, #8a531f);
          border-radius: 6px;
          box-shadow: 0 0 10px rgba(199,122,46,0.4);
          opacity: 0;
        }
        .stream.show {
          animation: streamDown 2.0s ease-in-out forwards;
        }
        @keyframes streamDown {
          0% { height: 0; opacity: 0; }
          10% { opacity: 1; }
          70% { height: 120px; }
          100% { height: 0; opacity: 0; }
        }

        /* Controls */
        .controls {
          display: grid;
          grid-template-columns: repeat(2, minmax(200px, 1fr));
          gap: 12px;
        }
        @media (max-width: 600px) {
          .controls { grid-template-columns: 1fr; }
        }
        .btn {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.35);
          color: #fff;
          padding: 12px 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.16s ease, background 0.2s ease;
          backdrop-filter: blur(6px);
        }
        .btn:hover { transform: translateY(-1px); background: rgba(255,255,255,0.26); }
        .btn.on { box-shadow: 0 0 0 2px rgba(255,255,255,0.5) inset; }
        .btn.pour {
          background: linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.14));
          border: 1px solid rgba(255,255,255,0.4);
        }
        .hint {
          margin-top: 12px; color: #eaeaea; font-size: 14px; opacity: 0.9;
        }

        /* Rain overlay */
        .rain {
          position: absolute; inset: 0;
          pointer-events: none;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .rain.active { opacity: 1; }
        .drop {
          position: absolute;
          top: -8%;
          width: 2px; height: 14vh;
          background: linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.55) 90%, rgba(255,255,255,0) 100%);
          filter: blur(0.5px);
          transform: scale(var(--scale, 1));
          animation-name: rainFall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes rainFall {
          from { transform: translateY(-10vh) scale(var(--scale, 1)); }
          to   { transform: translateY(110vh) scale(var(--scale, 1)); }
        }

        /* Lightning */
        .lightning {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.0), rgba(255,255,255,0.0));
          mix-blend-mode: screen;
          opacity: 0;
          pointer-events: none;
        }
        .lightning.active {
          animation: flash 6s infinite linear;
        }
        @keyframes flash {
          0%, 88%, 92%, 100% { opacity: 0; }
          89% { opacity: 0.7; }
          90% { opacity: 0.15; }
          91% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
};

export default ChaiGPT;

