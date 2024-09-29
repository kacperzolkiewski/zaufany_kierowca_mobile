import { HistoryStack } from "@/features/history/navigation/components/HistoryStack";
import { AddOpinionView } from "@/features/opinions/views/AddOpinionView";
import { OpinionsView } from "@/features/opinions/views/OpinionsView";
import { ProfileDetailsView } from "@/features/profile/views/ProfileDetailsView";
import { ReservationStack } from "@/features/reservation/navigation/components/ReservationStack";
import { AddRideStack } from "@/features/ride/navigation/components/AddRideStack";
import { FindRideStack } from "@/features/ride/navigation/components/FindRideStack";
import { RideStack } from "@/features/ride/navigation/components/RideStack";
import { RidePassengersView } from "@/features/ride/views/RidePassengersView";
import { backArrowVisibleOptions } from "@/utilities/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import { AuthenticatedStackScreenParamList } from "../types/authenticatedStack";
import { BottomTabs } from "./BottomTabs";

const Stack = createNativeStackNavigator<AuthenticatedStackScreenParamList>();

export const AuthenticatedStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="AddRide" component={AddRideStack} />
      <Stack.Screen name="FindRide" component={FindRideStack} />
      <Stack.Screen name="History" component={HistoryStack} />
      <Stack.Screen name="Reservation" component={ReservationStack} />
      <Stack.Screen
        options={backArrowVisibleOptions(colors.secondary)}
        name="Opinions"
        component={OpinionsView}
      />
      <Stack.Screen
        options={backArrowVisibleOptions(colors.secondary)}
        name="Ride"
        component={RideStack}
      />
      <Stack.Screen
        options={backArrowVisibleOptions("white")}
        name="ProfileDetails"
        component={ProfileDetailsView}
      />
      <Stack.Screen
        options={backArrowVisibleOptions(colors.secondary)}
        name="RidePassengers"
        component={RidePassengersView}
      />
      <Stack.Screen
        options={backArrowVisibleOptions(colors.secondary)}
        name="AddOpinion"
        component={AddOpinionView}
      />
    </Stack.Navigator>
  );
};
