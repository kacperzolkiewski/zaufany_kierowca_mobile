import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type BottomTabsNavigationProp<T extends keyof BottomTabsParamList> =
  BottomTabNavigationProp<BottomTabsParamList, T>;

export type BottomTabsParamList = {
  Rides: undefined;
  Messenger: undefined;
  Home: undefined;
  Profile: undefined;
};
