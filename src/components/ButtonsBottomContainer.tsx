import { ViewStyle } from "react-native";
import { BottomContainer } from "./BottomContainer";
import { Button } from "./Button";

interface ButtonsBottomContainerProps {
  firstButtonText: string;
  firstBttonOnPress: () => void;
  secondButtonText: string;
  secondButtonOnPress: () => void;
  styles?: ViewStyle;
}

export const ButtonsBottomContainer = ({
  firstBttonOnPress,
  firstButtonText,
  secondButtonOnPress,
  secondButtonText,
  styles,
}: ButtonsBottomContainerProps) => {
  return (
    <BottomContainer
      style={[
        {
          marginBottom: 40,
        },
        styles,
      ]}
    >
      <Button
        mode="contained"
        style={{ marginBottom: 20 }}
        onPress={firstBttonOnPress}
      >
        {firstButtonText}
      </Button>
      <Button mode="outlined" onPress={secondButtonOnPress}>
        {secondButtonText}
      </Button>
    </BottomContainer>
  );
};
