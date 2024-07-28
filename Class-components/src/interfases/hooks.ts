import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

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

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
