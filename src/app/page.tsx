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
      <header className="py-8 px-8 sticky top-0 bg-background z-[100] shadow-sm">
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
    </>
  );
}
