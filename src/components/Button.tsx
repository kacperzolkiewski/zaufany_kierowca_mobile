import { Button as RNButton, StyleProp, StyleSheet } from "react-native";
import {
  Button as PButton,
  ButtonProps as PButtonProps,
} from "react-native-paper";

interface ButtonProps {
  style?: Pick<PButtonProps, "style">;
}

export const Button = ({ children, ...rest }: ButtonProps & PButtonProps) => {
  return (
    <PButton contentStyle={styles.button} labelStyle={styles.label} {...rest}>
      {children}
    </PButton>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 45,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
  },
});
