import { create } from 'zustand';

type Type = 'nickname';

interface ModalState {
  nickname: boolean;
  actions: {
    changeModalState: (type: Type) => void;
  };
}

const useModalStore = create<ModalState>((set) => ({
  nickname: false,
  actions: {
    changeModalState: (type) => {
      set((state) => ({ ...state, [type]: !state[type] }));
    },
  },
}));

export default useModalStore;

export const useModalActions = () => useModalStore((state) => state.actions);
export const useNicknameModalState = () => useModalStore((state) => state.nickname);
