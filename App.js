import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "./constants/colors";
import { Provider } from "react-redux";
import { store } from "./store/store";

SplashScreen.preventAutoHideAsync();

const App = () => {
  SplashScreen.preventAutoHideAsync();
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          main: require("./assets/fonts/HakgyoansimJeomsimsigan-Bold.ttf"),
          regular: require("./assets/fonts/NanumSquareR.ttf"),
          light: require("./assets/fonts/NanumSquareL.ttf"),
          extraBold: require("./assets/fonts/NanumSquareEB.ttf"),
          bold: require("./assets/fonts/NanumSquareB.ttf"),
        });
      } catch (error) {
        console.log.error();
      } finally {
        setAppIsLoaded(true);
      }
    };
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <AppNavigator />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
