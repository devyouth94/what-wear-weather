import { useState } from 'react';

const useSelectedState = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelected = (id: string | null) => {
    setSelectedId(id);
  };

  return { selectedId, handleSelected };
};

export default useSelectedState;
