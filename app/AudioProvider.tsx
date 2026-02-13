"use client";

import { useRef, useState, useEffect } from "react";

export default function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsMuted(true);
      });
    }
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(err => {
          console.log("Audio play failed:", err);
        });
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      {/* Audio Player */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/TheParadiseThemeOst.mp3" type="audio/mpeg" />
      </audio>

      {/* Sound Button */}
      <button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-[60] bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-md border-2 border-red-400/30 rounded-full p-4 hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 hover:scale-110 group"
        aria-label="Toggle Sound"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {isMuted ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
          ) : (
            <>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md group-hover:bg-red-400/30 transition-all duration-300 -z-10"></div>
      </button>
    </>
  );
}