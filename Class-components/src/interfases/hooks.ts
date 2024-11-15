'use clinet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

const useLocalStorage = (key: string) => {
  const [value, setValueState] = useState(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(key);
      return storage !== null ? storage : '';
    }
  });

  const saveToLocalStorage = (newValue: string) => {
    localStorage.setItem(key, newValue);
  };

  return [value, setValueState, saveToLocalStorage] as const;
};

export default useLocalStorage;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
