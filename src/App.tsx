import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
//@ts-ignore
navigator.geolocation = require("@react-native-community/geolocation");

import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Router } from "./features/navigation";
import { store } from "./redux/store";
import { onMessageReceived } from "./utilities/notifications";

// tutaj modyfikujesz dla całej apki style
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#476969",
    secondary: "#3F3D56",
    background: "#F3F3F3",
    button: {
      width: "100%",
    },
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  try {
    await onMessageReceived(remoteMessage);
  } catch (error) {
    console.log("onMessageReceived background error: ", error);
  }
});

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      try {
        await onMessageReceived(remoteMessage);
      } catch (error) {
        console.log("onMessageReceived foreground error: ", error);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar backgroundColor={theme.colors.primary} style="light" />
          <Router />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default registerRootComponent(App);
