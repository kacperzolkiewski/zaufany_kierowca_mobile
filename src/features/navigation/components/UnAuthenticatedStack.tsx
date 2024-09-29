import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UnAuthenticatedParamList } from "../types/unAuthenticatedStack";
import { LoginView, RegisterView } from "@/features/login";
import { VerifyEmailView } from "@/features/login/views/VerifyEmailView";
import { StartView } from "@/features/login/views/StartView";
import { ForgotPasswordView } from "@/features/login/views/ForgotPasswordView";
import { ResetPasswordLinkSentView } from "@/features/login/views/ResetPasswordLinkSentView.tsx";
import { ResetPasswordView } from "@/features/login/views/ResetPasswordView";

const Stack = createNativeStackNavigator<UnAuthenticatedParamList>();

export const UnAuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartView"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="SplashView" component={SplashView} /> */}
      <Stack.Screen name="StartView" component={StartView} />
      <Stack.Screen name="RegisterView" component={RegisterView} />
      <Stack.Screen name="LoginView" component={LoginView} />
      <Stack.Screen name="VerifyEmailView" component={VerifyEmailView} />
      <Stack.Screen name="ForgotPasswordView" component={ForgotPasswordView} />
      <Stack.Screen
        name="ResetPasswordLinkSentView"
        component={ResetPasswordLinkSentView}
      />
      <Stack.Screen name="ResetPasswordView" component={ResetPasswordView} />
    </Stack.Navigator>
  );
};
