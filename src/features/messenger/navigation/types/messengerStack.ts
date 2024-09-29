import type {
  CompositeNavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabsNavigationProp } from "@/features/navigation/types/bottomTabs";

export type MessengerStackParamList = {
  MessengerView: undefined;
};

export type MessengerStackNavigationProp<
  T extends keyof MessengerStackParamList
> = CompositeNavigationProp<
  NativeStackNavigationProp<MessengerStackParamList, T>,
  BottomTabsNavigationProp<"Messenger">
>;

export interface MessengerStackScreenProps<
  T extends keyof MessengerStackParamList
> {
  navigation: MessengerStackNavigationProp<T>;
  route: RouteProp<MessengerStackParamList, T>;
}
