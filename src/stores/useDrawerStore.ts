import { create } from 'zustand';

type TDrawer = 'write' | 'profile';

interface StoreState {
  write: boolean;
  profile: boolean;
  articleId: string | null;
  actions: {
    changeDrawerState: (type: TDrawer) => void;
    changeSelectedId: (id: string | null) => void;
  };
}

const useDrawerStore = create<StoreState>((set) => ({
  write: false,
  profile: false,
  articleId: null,
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
    changeSelectedId: (id) => {
      set((state) => {
        if (state.articleId) {
          document.body.style.overflowY = 'overlay';
        } else {
          document.body.style.overflowY = 'hidden';
        }

        return { ...state, articleId: id };
      });
    },
  },
}));

export default useDrawerStore;

export const useWriteDrawerState = () => useDrawerStore((state) => state.write);
export const useProfileDrawerState = () => useDrawerStore((state) => state.profile);
export const useArticleDrawerState = () => useDrawerStore((state) => state.articleId);

export const useDrawerActions = () => useDrawerStore((state) => state.actions);
