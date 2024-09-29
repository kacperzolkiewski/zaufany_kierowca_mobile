import { ReservationStackParamList } from "@/features/reservation/navigation/types/reservationStack";
import { RideStackParamList } from "@/features/ride/navigation/types/rideStack";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface AuthenticatedStackScreenParamList
  extends Record<string, object | undefined> {
  BottomTabs: undefined;
  FindRide: undefined;
  AddRide: undefined;
  History: undefined;
  Reservation: NavigatorScreenParams<ReservationStackParamList>;
  Opinions: { userId: string };
  Ride: NavigatorScreenParams<RideStackParamList>;
  ProfileDetails: { userId: string };
  RidePassengers: { rideId: string };
  AddOpinion: { receiverId: string };
}

export type AuthenticatedStackNavigationProp<
  T extends keyof AuthenticatedStackScreenParamList
> = NativeStackNavigationProp<AuthenticatedStackScreenParamList, T>;

export interface AuthenticatedStackScreenProps<
  T extends keyof AuthenticatedStackScreenParamList
> {
  navigation: AuthenticatedStackNavigationProp<T>;
  route: RouteProp<AuthenticatedStackScreenParamList, T>;
}
