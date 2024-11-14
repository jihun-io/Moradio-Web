"use client";

import Image from "next/image";
import { STATION_CATEGORIES } from "../../constants/categories";
import { Embla, EmblaSlide, EmblaContainer } from "../components/embla";
import MiniPlayer from "../components/miniPlayer";
import { useAudioStore } from "../store/useAudioStore";

export default function Home() {
  const { recentStations, setStation } = useAudioStore();

  const dialog = document.querySelector("dialog");
  const main = document.querySelector("main");
  const body = document.querySelector("body");

  const closeDialog = () => {
    if (!dialog || !main || !body) return;

    main.classList.remove("blur", "pointer-events-none");
    body.classList.remove("overflow-hidden");
    dialog.close();
  };

  const handleDialog = () => {
    if (!dialog || !main || !body) return;

    main.classList.add("blur", "pointer-events-none");
    body.classList.add("overflow-hidden");

    dialog.showModal();

    dialog.addEventListener("close", () => {
      closeDialog();
    });

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) closeDialog();
    });
  };

  interface LocalButtonProps {
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
  }

  const LocalButton: React.FC<LocalButtonProps> = ({
    active,
    children,
    onClick,
  }) => (
    <button
      className={`py-1 px-2 border-2 rounded-lg ${
        active ? "bg-highlight text-white" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <>
      <header className="py-8 px-8 sticky top-0 bg-background z-[100] shadow-sm flex justify-between">
        <h1 className="text-4xl font-bold">
          <img src="/images/logo/logo-text.svg" width={160} alt="Moradio" />
        </h1>
        <button className="p-2" onClick={handleDialog}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </header>
      <main className="px-8">
        <section>
          <h2 className="py-4 text-2xl font-bold">최근 재생한 방송국</h2>
          {recentStations.length > 0 ? (
            <Embla>
              <EmblaContainer>
                {recentStations.map((station) => (
                  <EmblaSlide
                    key={station.id}
                    onClick={() => setStation(station)}
                  >
                    <Image
                      className="rounded-lg mb-2"
                      src={station.logo}
                      alt={station.name}
                    />
                    <h3 className="text-sm">{station.name}</h3>
                  </EmblaSlide>
                ))}
              </EmblaContainer>
            </Embla>
          ) : (
            <p className="py-4">최근 재생한 방송국 목록이 여기에 표시됩니다.</p>
          )}
        </section>
        {STATION_CATEGORIES.map((category) => (
          <section key={category.id}>
            <h2 className="py-4 text-2xl font-bold">{category.name}</h2>
            <Embla>
              <EmblaContainer>
                {category.stations.map((station) => (
                  <EmblaSlide
                    key={station.id}
                    onClick={() => setStation(station)}
                  >
                    <Image
                      className="rounded-lg mb-2"
                      src={station.logo}
                      alt={station.name}
                    />
                    <h3 className="text-sm">{station.name}</h3>
                  </EmblaSlide>
                ))}
              </EmblaContainer>
            </Embla>
          </section>
        ))}
        <section className="pt-16 pb-4 text-xs">
          <h2 className="sr-only">Moradio에 관하여...</h2>
          <hr className="py-4" />
          <p className="mb-4">
            <q>모두 모아둔 모두의 라디오, Moradio.</q>
          </p>
          <p>
            Moradio는 각 방송사의 공개된 라디오 스트리밍 URL을 접속자의
            디바이스로 중개하는 애플리케이션이며, Moradio는 방송을 절대
            녹취하거나 재송신하지 않습니다.
          </p>
          <p>라디오 방송의 저작권은 각 방송사에게 있습니다.</p>
          <p className="mt-4">
            Copyright © 2024 Jihun Kim. All rights reserved.
          </p>
        </section>
      </main>
      <footer className="py-4 bg-background sticky bottom-0 z-[100] shadow-inner">
        <MiniPlayer />
      </footer>
      <dialog className="w-4/5 h-4/5 max-w-[128rem] max-h-fit rounded-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">지역 선택</h2>
          <button onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-wrap gap-y-4 gap-x-2 justify-start">
          <li>
            <LocalButton active>수도권(전국)</LocalButton>
          </li>
          <li>
            <LocalButton>강원권</LocalButton>
          </li>
          <li>
            <LocalButton>충북권</LocalButton>
          </li>
          <li>
            <LocalButton>대전/충남권</LocalButton>
          </li>
          <li>
            <LocalButton>대구/경북권</LocalButton>
          </li>
          <li>
            <LocalButton>경남권</LocalButton>
          </li>
          <li>
            <LocalButton>부산권</LocalButton>
          </li>
          <li>
            <LocalButton>울산권</LocalButton>
          </li>
          <li>
            <LocalButton>전북권</LocalButton>
          </li>
          <li>
            <LocalButton>전남/광주권</LocalButton>
          </li>
          <li>
            <LocalButton>제주권</LocalButton>
          </li>
        </ul>
      </dialog>
    </>
  );
}
