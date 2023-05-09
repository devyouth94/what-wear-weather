import { create } from 'zustand';

type TDrawer = 'write' | 'profile';

interface StoreState {
  write: boolean;
  profile: boolean;
  actions: {
    changeDrawerState: (type: TDrawer) => void;
  };
}

const useDrawerStore = create<StoreState>((set) => ({
  write: false,
  profile: false,
  actions: {
    changeDrawerState: (type) => {
      set((state) => {
        if (state[type]) {
          document.body.style.overflowY = 'overlay';
        } else {
          document.body.style.overflowY = 'hidden';
        }

        return { ...state, [type]: !state[type] };
      });
    },
  },
}));

export default useDrawerStore;

export const useWriteDrawerState = () => useDrawerStore((state) => state.write);
export const useProfileDrawerState = () => useDrawerStore((state) => state.profile);

export const useDrawerActions = () => useDrawerStore((state) => state.actions);
