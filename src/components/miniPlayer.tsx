"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { useAudioStore } from "@/store/useAudioStore";

const MiniPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentStation,
    isPlaying,
    volume,
    togglePlay,
    setVolume,
    initAudio,
  } = useAudioStore();

  useEffect(() => {
    if (audioRef.current) {
      initAudio(audioRef.current);

      // 시스템 미디어 컨트롤 이벤트 리스너
      const audio = audioRef.current;

      const handlePlay = () => {
        useAudioStore.setState({ isPlaying: true });
      };

      const handlePause = () => {
        useAudioStore.setState({ isPlaying: false });
      };

      // 이벤트 리스너 등록
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      // 정리(cleanup) 함수
      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, [initAudio]);

  return (
    <section className="px-4 flex justify-between items-center">
      <audio ref={audioRef} />
      <h2 className="sr-only">플레이어</h2>
      <div className="flex items-center gap-x-4">
        {isPlaying ? (
          <Image
            src={
              !currentStation
                ? "/images/logo/logo-square.svg"
                : currentStation?.logo
            }
            width={64}
            height={64}
            className="w-16 h-16 object-contain rounded-md"
            alt="Moradio"
          />
        ) : (
          <Image
            src="/images/logo/logo-square.svg"
            width={64}
            height={64}
            className="w-16 h-16 object-contain rounded-md"
            alt="Moradio"
          />
        )}

        {isPlaying ? <p>{currentStation?.name}</p> : <p>Moradio</p>}
      </div>
      <div className="flex items-center gap-x-4">
        <div className="w-3/4 flex items-center">
          <input
            className="volume-slider bg-gray-400"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
        <button className="p-4" onClick={togglePlay}>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#dc2e2e"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#dc2e2e"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default MiniPlayer;
