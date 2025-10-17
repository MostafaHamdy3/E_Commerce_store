import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Appearance, View, ViewProps} from 'react-native';
import {MMKV} from 'react-native-mmkv';

import {ThemeContext, ThemeMode, ThemesVariables} from './ThemeContext';
import {themes, themesVariables} from './Index';

type ThemeProps = ViewProps;

const ThemeProvider = ({children}: ThemeProps) => {
  const deviceTheme = Appearance.getColorScheme() === 'light' ? 'light' : 'dark';

  const [theme, setTheme] = useState<ThemeMode>(deviceTheme);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const setThemeHandler = useCallback(async () => {
    const storage = new MMKV();
    const storedTheme = storage.getString('theme');
    setTheme((storedTheme as ThemeMode) || deviceTheme);
    setIsThemeLoaded(true);
  }, [deviceTheme]);

  useEffect(() => {
    setThemeHandler();
  }, [setThemeHandler]);

  const contextValue = useMemo(() => ({theme}), [theme]);

  const getThemeColorHandler = useCallback(
    (colorKey: ThemesVariables) =>
      themesVariables[theme][`--${colorKey}`],
    [theme],
  );

  const themeSwitchHandler = useCallback(async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    const storage = new MMKV();
    storage.set('theme', newTheme);
  }, []);

  return isThemeLoaded ? (
    <View style={themes[theme]} className="flex-1">
      <ThemeContext.Provider
        value={{
          theme: contextValue.theme,
          getThemeColor: getThemeColorHandler,
          switchTheme: themeSwitchHandler,
        }}>
        {children}
      </ThemeContext.Provider>
    </View>
  ) : (
    <></>
  );
};

export const ProviderTheme = memo(ThemeProvider);
