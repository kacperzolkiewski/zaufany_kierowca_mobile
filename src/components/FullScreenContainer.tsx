import { PropsWithChildren } from "react";
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FullScreenContainerProps {
  centeredItems?: boolean;
  style?: StyleProp<View>;
}

export const FullScreenContainer = ({
  children,
  centeredItems = false,
}: FullScreenContainerProps & PropsWithChildren) => {
  return (
    <SafeAreaView style={styles(centeredItems).container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles(centeredItems).content}>{children}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = (centeredItems: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      alignItems: centeredItems ? "center" : "flex-start",
    },
  });
