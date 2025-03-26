'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { type GetOutfitListParams } from '~/src/queries/use-get-outfit-list';

type MyOutfitFilterContextType = {
  filter: Partial<GetOutfitListParams>;
  onChangeFilter: (filter: Partial<GetOutfitListParams>) => void;
  onResetFilter: () => void;
};

const MyOutfitFilterContext = createContext<
  MyOutfitFilterContextType | undefined
>(undefined);

export const MyOutfitFilterProvider = ({ children }: PropsWithChildren) => {
  const [filter, setFilter] = useState<Partial<GetOutfitListParams>>({});

  const onChangeFilter = (filter: Partial<GetOutfitListParams>) => {
    setFilter((prev) => ({ ...prev, ...filter }));
  };

  const onResetFilter = () => {
    setFilter({});
  };

  return (
    <MyOutfitFilterContext.Provider
      value={{ filter, onChangeFilter, onResetFilter }}
    >
      {children}
    </MyOutfitFilterContext.Provider>
  );
};

export const useOutfitFilter = () => {
  const context = useContext(MyOutfitFilterContext);

  if (!context) {
    throw new Error(
      'useOutfitFilter은 MyOutfitFilterProvider 내에서 사용해야 합니다',
    );
  }

  return context;
};
