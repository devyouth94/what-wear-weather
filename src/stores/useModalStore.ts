import { create } from 'zustand';

type TModal = 'setting';

interface StoreState {
  setting: boolean;
  actions: {
    changeModalState: (type: TModal) => void;
  };
}

const useModalStore = create<StoreState>((set) => ({
  setting: false,
  actions: {
    changeModalState: (type) => {
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

export default useModalStore;

export const useSettingModalState = () => useModalStore((state) => state.setting);

export const useModalActions = () => useModalStore((state) => state.actions);
