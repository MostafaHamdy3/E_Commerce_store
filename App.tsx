import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { Provider as ReduxProvider } from 'react-redux';
import { KeyboardProvider } from "react-native-keyboard-controller";

import './global.css';
import { ProviderTheme } from './src/theme/Provider';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function App() {
  const [fontsLoaded] = useFonts({
    'enRg': require('./src/assets/fonts/SourceSans3-Regular.ttf'),
    'enMd': require('./src/assets/fonts/SourceSans3-Medium.ttf'),
    'enB': require('./src/assets/fonts/SourceSans3-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <KeyboardProvider>
      <ReduxProvider store={store}>
        <ProviderTheme>
          <StatusBar style="auto" />
          <SafeAreaView className='flex-1 bg-bgScreen'>
            <AppNavigator />
          </SafeAreaView>
        </ProviderTheme>
      </ReduxProvider>
    </KeyboardProvider>
  );
};
