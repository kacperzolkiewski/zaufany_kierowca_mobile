import { bottomBarStyles } from "@/styles/navigationStyles";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export const useHideBottomTabs = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: bottomBarStyles, tabBarVisible: true });
  }, [navigation]);
};
