import { create } from 'zustand';
import type { TWeatherImage } from '@/types/weatherTypes';

interface StoreState {
  data: TWeatherImage;
  actions: {
    changeState: (imageData: TWeatherImage) => void;
  };
}

const useBackgroundImageStore = create<StoreState>((set) => ({
  data: { src: '', profile: '', name: '', unsplash: '' },
  actions: {
    changeState: (imageData: TWeatherImage) => {
      set((state) => ({
        ...state,
        data: {
          src: imageData.src,
          profile: imageData.profile,
          name: imageData.name,
          unsplash: imageData.unsplash,
        },
      }));
    },
  },
}));

export const useBackgroundImageState = () => useBackgroundImageStore((state) => state.data);
export const useBackgroundImageActions = () => useBackgroundImageStore((state) => state.actions);
