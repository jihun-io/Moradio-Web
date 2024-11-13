"use client";

import Image from "next/image";
import { STATION_CATEGORIES } from "../../constants/categories";
import { Embla, EmblaSlide, EmblaContainer } from "../components/embla";
import MiniPlayer from "../components/miniPlayer";
import { useAudioStore } from "../store/useAudioStore";

export default function Home() {
  const { recentStations, setStation } = useAudioStore();

  return (
    <>
      <header className="py-8 px-8 sticky top-0 bg-background z-[100]">
        <h1 className="text-4xl font-bold">
          <img src="/images/logo/logo-text.svg" width={160} alt="Moradio" />
        </h1>
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
      </main>
      <footer className="py-4 bg-background sticky bottom-0 z-[100] shadow-inner">
        <MiniPlayer />
      </footer>
    </>
  );
}
