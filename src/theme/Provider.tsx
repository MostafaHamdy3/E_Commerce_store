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
  const [followSystemTheme, setFollowSystemTheme] = useState(true);

  const setThemeHandler = useCallback(async () => {
    const storage = new MMKV();
    const storedTheme = storage.getString('theme');
    const storedFollowSystem = storage.getBoolean('followSystemTheme') ?? true;
    
    setFollowSystemTheme(storedFollowSystem);
    
    if (storedFollowSystem) {
      setTheme(deviceTheme);
    } else {
      setTheme((storedTheme as ThemeMode) || deviceTheme);
    }
    setIsThemeLoaded(true);
  }, [deviceTheme]);

  useEffect(() => {
    setThemeHandler();
  }, [setThemeHandler]);

  // Listen for system appearance changes
  useEffect(() => {
    if (!followSystemTheme) return;

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      const newTheme = colorScheme === 'light' ? 'light' : 'dark';
      setTheme(newTheme);
    });

    return () => subscription?.remove();
  }, [followSystemTheme]);

  const contextValue = useMemo(() => ({theme}), [theme]);

  const getThemeColorHandler = useCallback(
    (colorKey: ThemesVariables) =>
      themesVariables[theme][`--${colorKey}`],
    [theme],
  );

  const themeSwitchHandler = useCallback(async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setFollowSystemTheme(false);
    const storage = new MMKV();
    storage.set('theme', newTheme);
    storage.set('followSystemTheme', false);
  }, []);

  const enableSystemTheme = useCallback(async () => {
    const currentDeviceTheme = Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
    setTheme(currentDeviceTheme);
    setFollowSystemTheme(true);
    const storage = new MMKV();
    storage.set('followSystemTheme', true);
    storage.delete('theme');
  }, []);

  return isThemeLoaded ? (
    <View style={themes[theme]} className="flex-1">
      <ThemeContext.Provider
        value={{
          theme: contextValue.theme,
          getThemeColor: getThemeColorHandler,
          switchTheme: themeSwitchHandler,
          enableSystemTheme,
          followSystemTheme,
        }}>
        {children}
      </ThemeContext.Provider>
    </View>
  ) : (
    <></>
  );
};

export const ProviderTheme = memo(ThemeProvider);
