import React from 'react';
import { TTheme } from '~/themes';

interface IThemeContext {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
}

const Theme = React.createContext<IThemeContext | null>(null);

const defaultTheme =
  typeof window !== 'undefined'
    ? localStorage.getItem('theme') || 'light'
    : 'light';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState({
    name: defaultTheme,
    value: defaultTheme,
  });
  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
};

export const useTheme = () => React.useContext(Theme);
