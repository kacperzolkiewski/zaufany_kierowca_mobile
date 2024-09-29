import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { ReactChildren } from "react-native-toast-message";

interface PressableWithOpacityProps {
  children: ReactChildren;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PressableWithOpacity = ({
  children,
  onPress,
  style,
  disabled,
}: PressableWithOpacityProps & PressableProps) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, style]}
  >
    {children}
  </Pressable>
);
