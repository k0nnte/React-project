'use client';
import React, { createContext, useState } from 'react';
import { ContextType, ProviderProps } from '../interfases/interfases';

const Contex = createContext<ContextType>({
  theme: true,
  setTheme: () => {},
});
const TheProvider: React.FC<ProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(true);

  return (
    <Contex.Provider value={{ theme, setTheme }}>{children}</Contex.Provider>
  );
};

export { Contex, TheProvider };
