import { useState } from 'react';

const useLocalStorage = (key: string) => {
  const [value, setValueState] = useState(() => {
    const storage = localStorage.getItem(key);
    return storage !== null ? storage : '';
  });

  const saveToLocalStorage = (newValue: string) => {
    localStorage.setItem(key, newValue);
  };

  return [value, setValueState, saveToLocalStorage] as const;
};

export default useLocalStorage;
