import { create } from 'zustand';
import Hls from 'hls.js';
import { StaticImageData } from 'next/image';


interface Station {
  id: string;
  name: string;
  streamUrl: string;
  color?: string;
  logo: StaticImageData;
}

interface AudioStore {
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  hls: Hls | null;  // any 대신 Hls 타입 사용
  audioElement: HTMLAudioElement | null;
  recentStations: Station[];

  // Actions
  setStation: (station: Station) => Promise<void>;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  initAudio: (audioElement: HTMLAudioElement) => void;
  clearHistory: () => void;
}

// 로컬스토리지 키
const RECENT_STATIONS_KEY = 'radio-recent-stations';

// 로컬스토리지에서 최근 재생 목록 불러오기
const loadRecentStations = (): Station[] => {
  try {
    const stored = localStorage.getItem(RECENT_STATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load recent stations:', error);
    return [];
  }
};

// 로컬스토리지에 최근 재생 목록 저장
const saveRecentStations = (stations: Station[]) => {
  try {
    localStorage.setItem(RECENT_STATIONS_KEY, JSON.stringify(stations));
  } catch (error) {
    console.error('Failed to save recent stations:', error);
  }
};

export const useAudioStore = create<AudioStore>((set, get) => ({
  currentStation: null,
  isPlaying: false,
  volume: Number(localStorage.getItem('radio-volume')) || 1,
  hls: null,
  audioElement: null,
  recentStations: loadRecentStations(),

  setStation: async (station) => {
    const { hls, audioElement, recentStations } = get();  // recentStations를 get()에서 가져오기

    try {
      // 최근 재생 목록 업데이트
      const updatedHistory = [
        station,
        ...recentStations.filter(s => s.id !== station.id)  // 중복 제거
      ];
      
      // 최근 재생 목록 저장
      saveRecentStations(updatedHistory);

      // Workers URL로 직접 요청
      const proxyResponse = await fetch(`/radio-proxy/stream/${station.streamUrl}`);

      // 리다이렉트된 URL 가져오기
      const finalUrl = proxyResponse.url;

      if (hls) {
        hls.destroy();
      }

      if (audioElement && Hls.isSupported()) {
        const newHls = new Hls();
        newHls.loadSource(finalUrl);
        newHls.attachMedia(audioElement);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          audioElement.play().catch(console.error);
          set({ 
            currentStation: station,
            recentStations: updatedHistory,  // 상태 업데이트에 최근 재생 목록 추가
            hls: newHls,
            isPlaying: true 
          });
        });
      } else if (audioElement?.canPlayType('application/vnd.apple.mpegurl')) {
        audioElement.src = finalUrl;
        audioElement.play().catch(console.error);
        set({ 
          currentStation: station,
          recentStations: updatedHistory,  // 상태 업데이트에 최근 재생 목록 추가
          isPlaying: true 
        });
      }
    } catch (error) {
      console.error('Failed to load station:', error);
      set({ isPlaying: false });
    }
  },

  togglePlay: () => {
    const { audioElement, isPlaying } = get();
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      set({ isPlaying: !isPlaying });
    }
  },

  setVolume: (volume) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = volume;
      localStorage.setItem('radio-volume', volume.toString());
      set({ volume });
    }
  },

  initAudio: (audioElement) => {
    set({ audioElement });
    audioElement.volume = get().volume;
  },

  clearHistory: () => {  // clearHistory 메서드 구현 추가
    localStorage.removeItem(RECENT_STATIONS_KEY);
    set({ recentStations: [] });
  }
}));