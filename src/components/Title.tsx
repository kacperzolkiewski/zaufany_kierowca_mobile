import { StyleSheet, Text, TextProps } from "react-native";

export const Title = ({ children, style, ...rest }: TextProps) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "VeganStyle",
  },
});
