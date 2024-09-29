import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";

export const BottomContainer = ({
  children,
  style,
  ...restProps
}: PropsWithChildren & ViewProps) => (
  <View style={[styles.container, style]} {...restProps}>
    <HideWithKeyboard>{children}</HideWithKeyboard>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
