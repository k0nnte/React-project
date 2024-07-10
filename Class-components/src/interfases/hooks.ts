import { useState, useEffect } from 'react';

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    const storage = localStorage.getItem(key);
    return storage !== null ? storage : '';
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue] as const;
};

export default useLocalStorage;
