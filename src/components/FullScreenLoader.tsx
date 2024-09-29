import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export const FullScreenLoader = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator
        style={{ width: 100, height: 100 }}
        size="large"
        animating={true}
        color={colors.primary}
      />
    </View>
  );
};
