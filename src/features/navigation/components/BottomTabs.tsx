import { HomeView } from "@/features/home/views/HomeView";
import { MessengerStack } from "@/features/messenger";
import CarIcon from "@/features/navigation/assets/carIcon.svg";
import HomeIcon from "@/features/navigation/assets/homeIcon.svg";
import MessengerIcon from "@/features/navigation/assets/messengerIcon.svg";
import ProfileIcon from "@/features/navigation/assets/profileIcon.svg";
import { BottomTabsParamList } from "@/features/navigation/types/bottomTabs";
import { ProfileStack } from "@/features/profile";
import { RidesView } from "@/features/ride/views/RidesView";
import { bottomBarStyles } from "@/styles/navigationStyles";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { FC, SVGAttributes } from "react";
import { Text } from "react-native";

const getBottomTabScreenOptions = (
  label: string,
  Icon: FC<SVGAttributes<SVGElement>>
) => {
  return {
    tabBarLabel: ({ focused }) => (
      <Text
        style={{
          color: focused ? "#476969" : "gray",
          fontSize: 10,
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
    ),
    tabBarIcon: ({ focused }) => <Icon color={focused ? "#476969" : "gray"} />,
  } as BottomTabNavigationOptions;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: bottomBarStyles,
      }}
    >
      <Tab.Screen
        name="Home"
        options={getBottomTabScreenOptions("Strona Główna", HomeIcon)}
        component={HomeView}
      />
      <Tab.Screen
        name="Rides"
        options={getBottomTabScreenOptions("Przejazdy", CarIcon)}
        component={RidesView}
      />
      <Tab.Screen
        name="Messenger"
        options={getBottomTabScreenOptions("Wiadomości", MessengerIcon)}
        component={MessengerStack}
      />
      <Tab.Screen
        name="Profile"
        options={getBottomTabScreenOptions("Profil", ProfileIcon)}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};
