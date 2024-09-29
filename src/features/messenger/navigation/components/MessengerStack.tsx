import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessengerStackParamList } from "../types/messengerStack";
import { MessengerView } from "../../views/MessengerView";

const Stack = createNativeStackNavigator<MessengerStackParamList>();

export const MessengerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MessengerView"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MessengerView" component={MessengerView} />
    </Stack.Navigator>
  );
};
