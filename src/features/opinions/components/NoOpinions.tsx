import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import NoOpinionsImage from "@/features/opinions/assets/noOpinions.svg";
import { View } from "react-native";

export const NoOpinions = ({ title }: { title: string }) => {
  return (
    <View style={{ marginTop: 40, width: "100%" }}>
      <HeaderWithInformation
        title={title}
        containerStyle={{ marginBottom: 40 }}
      />
      <NoOpinionsImage
        width="100%"
        height={200}
        style={{ alignSelf: "center" }}
      />
    </View>
  );
};
