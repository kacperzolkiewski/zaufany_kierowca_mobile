import type { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum UnAuthenticatedRoutes {
  SplashView = "SplashView",
  StartView = "StartView",
  LoginView = "LoginView",
  RegisterView = "RegisterView",
  VerifyEmailView = "VerifyEmailView",
  ForgotPasswordView = "ForgotPasswordView",
  ResetPasswordView = "ResetPasswordView",
  ResetPasswordLinkSentView = "ResetPasswordLinkSentView",
}

export type UnAuthenticatedParamList = {
  SplashView: undefined;
  StartView: undefined;
  LoginView: undefined;
  RegisterView: undefined;
  VerifyEmailView: { email: string };
  ForgotPasswordView: undefined;
  ResetPasswordLinkSentView: { email: string };
  ResetPasswordView: { resetToken: string };
};

export type UnAuthenticatedStackNavigationProp<
  T extends keyof UnAuthenticatedParamList
> = NativeStackNavigationProp<UnAuthenticatedParamList, T>;

export interface UnAuthenticatedStackScreenProps<
  T extends keyof UnAuthenticatedParamList
> {
  navigation: UnAuthenticatedStackNavigationProp<T>;
  route: RouteProp<UnAuthenticatedParamList, T>;
}
