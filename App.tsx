import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AppRouter from "./components/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
          {/* <Banner
          iconLeft="menu"
          iconRight="ios-notifications-outline"
          navigation
        /> */}
          <StatusBar />
          {/* <AppRouter /> */}
        </Provider>
      </SafeAreaProvider>
    );
  }
}
