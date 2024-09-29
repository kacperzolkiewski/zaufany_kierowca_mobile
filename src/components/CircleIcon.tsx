import { FC, SVGAttributes } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

interface CircleIconProps {
  Icon: FC<SVGAttributes<SVGElement>>;
  circleColor?: string;
  iconColor?: string;
  style?: ViewStyle;
  iconSize?: number;
}

export const CircleIcon = ({
  Icon,
  circleColor,
  iconColor = "white",
  style,
  iconSize = 25,
}: CircleIconProps) => {
  const { colors } = useTheme();
  const backgroundColor = circleColor ? circleColor : colors.primary;

  return (
    <View style={[styles(backgroundColor, iconSize).container, style]}>
      <Icon width={iconSize} height={iconSize} color={iconColor} />
    </View>
  );
};

const styles = (backgroundColor: string, iconSize: number) =>
  StyleSheet.create({
    container: {
      width: 2 * iconSize,
      height: 2 * iconSize,
      borderRadius: iconSize,
      backgroundColor: backgroundColor,
      elevation: 5,
      justifyContent: "center",
      alignItems: "center",
    },
  });
