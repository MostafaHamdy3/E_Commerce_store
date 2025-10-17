import {createContext, useContext} from 'react';
import {Appearance} from 'react-native';

export type ThemesVariables =
  | 'bgScreen'
  | 'bgContainer'
  | 'mainColor'
  | 'primaryColor'
  | 'secondaryColor'
  | 'descColor'
	| 'error'
	| 'borderColor'
	| 'placeholder';

export type ThemeMode = 'light' | 'dark';

type ThemeContextProps = {
  theme: ThemeMode;
  switchTheme: (newTheme: ThemeMode) => void;
  getThemeColor: (colorKey: ThemesVariables) => string;
  enableSystemTheme: () => void;
  followSystemTheme: boolean;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Appearance.getColorScheme() === 'light' ? 'light' : 'dark',
  switchTheme: () => {},
  getThemeColor: () => '',
  enableSystemTheme: () => {},
  followSystemTheme: true,
});

export const useTheme = () => useContext(ThemeContext);
