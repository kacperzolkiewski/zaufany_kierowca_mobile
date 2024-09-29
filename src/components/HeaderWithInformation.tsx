import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Title } from "./Title";
import { SubTitle } from "./SubTitle";
import { StyleProp } from "react-native";

interface HeaderWithInformationProps {
  title: string;
  information?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const HeaderWithInformation = ({
  title,
  information,
  containerStyle,
}: HeaderWithInformationProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Title style={styles.title}>{title}</Title>
      {information ? <SubTitle text={information} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 70,
  },
  title: {
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center",
  },
});
