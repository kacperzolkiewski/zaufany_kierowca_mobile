import { BottomContainer } from "@/components/BottomContainer";
import { Button } from "@/components/Button";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { Title } from "@/components/Title";
import StartImage from "@/features/login/assets/startImage.svg";
import {
  UnAuthenticatedRoutes,
  UnAuthenticatedStackScreenProps,
} from "@/features/navigation/types/unAuthenticatedStack";
import { StyleSheet, Text, View } from "react-native";
import { Subheading } from "react-native-paper";

export const StartView = ({
  navigation,
}: UnAuthenticatedStackScreenProps<"StartView">) => {
  return (
    <FullScreenContainer centeredItems>
      <View style={{ marginVertical: 90, alignItems: "center" }}>
        <Title>Zaufany Kierowca</Title>
        <Text style={{ fontSize: 24 }}>Zarezerwuj, podróżuj</Text>
      </View>
      <StartImage width="100%" height={260} />
      <BottomContainer>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() =>
            navigation.navigate(UnAuthenticatedRoutes.RegisterView)
          }
        >
          Rozpocznij
        </Button>
      </BottomContainer>
    </FullScreenContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 70,
  },
});
