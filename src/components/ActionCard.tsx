import { Animated, Pressable, StyleProp, View, ViewProps } from "react-native";
import { SubTitle } from "./SubTitle";
import ArrowRight from "@/assets/arrowRight.svg";
import { StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { PressableWithOpacity } from "./PressableWithOpacity";

interface ActionCardProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<View>;
}

export const ActionCard = ({
  title,
  onPress,
  style,
}: ActionCardProps & ViewProps) => {
  const { colors } = useTheme();

  return (
    <PressableWithOpacity onPress={onPress} style={[styles.container, style]}>
      <SubTitle style={{ fontWeight: "bold" }} text={title} />
      <ArrowRight width={25} height={20} color={colors.primary} />
    </PressableWithOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    elevation: 5,
    overflow: "hidden",
  },
});
