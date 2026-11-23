"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music, X } from "lucide-react";

/* ── Hidden <audio> element — single persistent instance in layout/navbar ── */
export function MusicAudioElement() {
  return (
    <audio
      id="bg-music"
      src="/audio/love-story-indila.mp3"
      loop
      preload="auto"
    />
  );
}

/* ── Immediate Autoplay Prompt if browser autoplay is blocked ── */
export function MusicAutoplayPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const userInteractedRef = useRef(false);

  const startPlayback = useCallback(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) return;

    audio.volume = 0.5;
    try {
      const storedVol = sessionStorage.getItem("music-volume");
      if (storedVol) audio.volume = parseFloat(storedVol);
    } catch { }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setShowPrompt(false);
          setIsPlaying(true);
          try { sessionStorage.setItem("music-playing", "true"); } catch { }
        })
        .catch(() => {
          // Chrome blocked autoplay — show prompt immediately
          if (!userInteractedRef.current) {
            setShowPrompt(true);
          }
        });
    }
  }, []);

  useEffect(() => {
    // Check if user previously paused music in this session
    try {
      const storedState = sessionStorage.getItem("music-playing");
      if (storedState === "false") {
        return; // Respect user's explicit pause
      }
    } catch { }

    // 1. Attempt autoplay immediately
    startPlayback();

    // 2. Set up universal first-interaction listeners to start on first interaction
    const handleFirstInteraction = () => {
      userInteractedRef.current = true;
      const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
      if (audio && audio.paused) {
        try {
          const storedState = sessionStorage.getItem("music-playing");
          if (storedState === "false") return;
        } catch { }

        audio.volume = 0.5;
        try {
          const storedVol = sessionStorage.getItem("music-volume");
          if (storedVol) audio.volume = parseFloat(storedVol);
        } catch { }

        audio.play().then(() => {
          setShowPrompt(false);
          setIsPlaying(true);
          try { sessionStorage.setItem("music-playing", "true"); } catch { }
        }).catch(() => { });
      }

      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true });
    window.addEventListener("scroll", handleFirstInteraction, { passive: true });

    // 3. Listen to audio state to hide prompt if music starts from navbar
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    const onPlay = () => {
      setShowPrompt(false);
      setIsPlaying(true);
    };
    if (audio) {
      audio.addEventListener("play", onPlay);
    }

    return () => {
      cleanupListeners();
      if (audio) audio.removeEventListener("play", onPlay);
    };
  }, [startPlayback]);

  const handleManualPlay = () => {
    userInteractedRef.current = true;
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (audio) {
      audio.volume = 0.5;
      audio.play().then(() => {
        setShowPrompt(false);
        setIsPlaying(true);
        try { sessionStorage.setItem("music-playing", "true"); } catch { }
      }).catch(console.error);
    }
  };

  if (!showPrompt || isPlaying) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 p-3.5 pr-4 rounded-2xl bg-gradient-to-r from-purple via-purple-hover to-purple text-white shadow-2xl border border-white/20 backdrop-blur-xl"
        style={{ boxShadow: "0 10px 40px rgba(123, 47, 247, 0.45)" }}
      >
        <button
          onClick={handleManualPlay}
          className="flex items-center gap-2.5 text-[14px] font-semibold text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Music size={16} className="animate-pulse" />
          </div>
          <span>🎵 Enable Background Music</span>
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all ml-1"
          aria-label="Dismiss prompt"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Accurate Music Controls for Navbar ── */
export function MusicControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedVol = sessionStorage.getItem("music-volume");
        if (storedVol) return parseFloat(storedVol);
      } catch { }
    }
    return 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) return;

    try {
      const storedVol = sessionStorage.getItem("music-volume");
      if (storedVol) {
        audio.volume = parseFloat(storedVol);
      }
    } catch { }

    // Sync actual state asynchronously to prevent cascading renders
    setTimeout(() => {
      if (audio) {
        setIsPlaying(!audio.paused);
      }
    }, 0);

    // Event listeners bound to native audio element
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error("Audio playback error occurred");
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("playing", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Periodic check to ensure 100% sync
    const interval = setInterval(() => {
      if (audio) {
        setIsPlaying((prev) => (!audio.paused !== prev ? !audio.paused : prev));
      }
    }, 1000);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("playing", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      clearInterval(interval);
    };
  }, []);

  const togglePlay = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = isMuted ? 0 : volume;
      audio.play().then(() => {
        setIsPlaying(true);
        try { sessionStorage.setItem("music-playing", "true"); } catch { }
      }).catch((err) => {
        console.warn("Playback prevented:", err);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
      try { sessionStorage.setItem("music-playing", "false"); } catch { }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (audio) audio.volume = val;
    try { sessionStorage.setItem("music-volume", String(val)); } catch { }
  };

  const toggleMute = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowVolume(true);
  };

  const handleVolumeLeave = () => {
    hideTimer.current = setTimeout(() => setShowVolume(false), 800);
  };

  return (
    <div
      className="flex items-center gap-1 relative"
      onMouseEnter={handleVolumeEnter}
      onMouseLeave={handleVolumeLeave}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${isPlaying
          ? "text-purple border-purple/40 bg-purple/15 shadow-sm shadow-purple/30"
          : "text-dark-text-secondary hover:text-dark-text hover:bg-dark-card/60 border-transparent hover:border-dark-border"
          }`}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Pause size={17} />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center ml-0.5"
            >
              <Play size={17} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Volume Slider on Hover */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-1.5 overflow-hidden px-1"
          >
            <button
              onClick={toggleMute}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-dark-text-secondary hover:text-purple transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
