import { create } from 'zustand';

type Type = 'nickname' | 'profileImg' | 'setting';

interface ModalState {
  nickname: boolean;
  profileImg: boolean;
  setting: boolean;
  actions: {
    changeModalState: (type: Type) => void;
  };
}

const useModalStore = create<ModalState>((set) => ({
  nickname: false,
  profileImg: false,
  setting: false,
  actions: {
    changeModalState: (type) => {
      set((state) => ({ ...state, [type]: !state[type] }));
    },
  },
}));

export default useModalStore;

export const useModalActions = () => useModalStore((state) => state.actions);

export const useNicknameModalState = () => useModalStore((state) => state.nickname);
export const useProfileImgModalState = () => useModalStore((state) => state.profileImg);

export const useSettingDrawerState = () => useModalStore((state) => state.setting);
