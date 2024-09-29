import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native";
import { useTheme } from "react-native-paper";

export const SubTitle = ({
  text,
  style,
  ...rest
}: TextProps & { text: string }) => {
  const { colors } = useTheme();

  return (
    <Text style={[styles(colors.secondary).subtitle, style]} {...rest}>
      {text}
    </Text>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    subtitle: {
      fontSize: 18,
      color,
      fontWeight: "500",
    },
  });
