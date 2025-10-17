import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AppState, AppStateStatus, I18nManager } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BootSplash from "react-native-bootsplash";

import { useTheme } from "../theme/ThemeContext";
import Login from "../screens/Login";
import Products from "../screens/Products";
import LaptopCategory from "../screens/LaptopCategory";
import Logout from "../screens/Logout";
import { RootStackParamList } from "../types/navigation";
import { clearAuth, getAccessToken } from "../utils/storage";
import { validateSession } from "../services/auth";
import {
  loginSuccess,
  logout,
  resetInactivity,
  selectAuth,
} from "../store/authSlice";
import {
  checkInternetConnection,
  initNetworkListener,
} from "../services/connection";
import { LOCK_TIME } from "../utils/constants";
import LockModal from "../components/LockModal";
import {
  clearQueryCache,
  loadQueryCache,
  saveQueryCache,
} from "../utils/queryPersistence";
import { QueryProvider } from "../provider/QueryProvider";
import ProductsIcon from "../assets/svgs/products.svg";
import LaptopIcon from "../assets/svgs/Laptop.svg";
import LogoutIcon from "../assets/svgs/logout.svg";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const dispatch = useDispatch();
  const { getThemeColor } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    clearAuth();
    clearQueryCache();
  };

  const handleTabFocus = useCallback(() => {
    dispatch(resetInactivity());
  }, [dispatch]);

  const getBottomTabIcon = (routeName: string, focused: boolean) => {
    const iconColor = useMemo(
      () => (focused ? getThemeColor('primaryColor') : getThemeColor('placeholder')),
      [focused]
    );
    switch (routeName) {
      case "Products":
        return <ProductsIcon color={iconColor} />;
      case "Laptop":
        return <LaptopIcon color={iconColor} />;
      case "Logout":
        return <LogoutIcon color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Products"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getBottomTabIcon(route.name, focused),
        tabBarActiveTintColor: getThemeColor('primaryColor'),
        tabBarInactiveTintColor: getThemeColor('placeholder'),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: getThemeColor('bgScreen'),
        },
      })}
      screenListeners={{
        focus: handleTabFocus,
      }}
    >
      {I18nManager.isRTL ? (
        <>
          <BottomTab.Screen
            name="Logout"
            component={Logout} // Dummy component, won't be used
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                handleLogout();
              },
            }}
          />
          <BottomTab.Screen name="Laptop" component={LaptopCategory} />
          <BottomTab.Screen name="Products" component={Products} />
        </>
      ) : (
        <>
          <BottomTab.Screen name="Products" component={Products} />
          <BottomTab.Screen name="Laptop" component={LaptopCategory} />
          <BottomTab.Screen
            name="Logout"
            component={Logout} // Dummy component, won't be used
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                handleLogout();
              },
            }}
          />
        </>
      )}
    </BottomTab.Navigator>
  );
}

const AppNavigator = () => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  const { isAuthenticated, lastInteraction } = useSelector(selectAuth);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isLock, setIsLock] = useState(false);
  const [dehydratedState, setDehydratedState] = useState<any>(undefined);

  useEffect(() => {
    if (!isAuthenticated) return;
    const remainingTime = LOCK_TIME - (Date.now() - lastInteraction);
    const timeoutId = setTimeout(
      () => {
        setIsLock(true);
      },
      Math.max(0, remainingTime)
    );
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, lastInteraction]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const init = async () => {
      const state = loadQueryCache();
      setDehydratedState(state);

      await checkInternetConnection();

      const token = await getAccessToken();
      try {
        if (token) {
          const response = await validateSession();
          dispatch(loginSuccess(response));
          dispatch(resetInactivity());
          setIsLock(true);
        }
      } catch (error) {
        console.log("init ERROR ===>", error);
        clearAuth();
      }
      setIsInitialized(true);
    };

    const unsubscribeNetListener = initNetworkListener();

    init().finally(async () => {
      setTimeout(async () => {
        await BootSplash.hide({ fade: true });
      }, 100);
    });

    return () => {
      unsubscribeNetListener();
    };
  }, []);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (
        nextAppState === "active" &&
        appState.current === "background" &&
        isAuthenticated
      ) {
        setIsLock(true);
        dispatch(resetInactivity());
        saveQueryCache();
      }
      appState.current = nextAppState;
    },
    [isAuthenticated, dispatch]
  );

  const unlockHandler = useCallback(() => {
    setIsLock(false);
    dispatch(resetInactivity());
  }, [dispatch]);

  if (!isInitialized) {
    return null;
  }

  if (isLock) {
    return <LockModal isVisible={isLock} unlockHandler={unlockHandler} />;
  }

  return (
    <QueryProvider dehydratedState={dehydratedState}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
            animationDuration: 500,
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="Home" component={BottomTabNavigator} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryProvider>
  );
};

export default AppNavigator;
