import { SubTitle } from "@/components/SubTitle";
import { ProfileFoto } from "@/features/profile/components/ProfileFoto";
import { IOpinion } from "@/redux/api/types";
import { StyleSheet, Text, View } from "react-native";
import { Stars } from "./Stars";

export const Opinion = ({
  opinion,
  isReceived,
}: {
  opinion: IOpinion;
  isReceived?: boolean;
}) => {
  const { receiver, giver, stars, comment } = opinion;
  const userOnOpinion = isReceived ? giver : receiver;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {userOnOpinion.name}
          </Text>
          <Stars starsCount={stars} />
        </View>
        <ProfileFoto uri={userOnOpinion.imageUrl} size={50} />
      </View>
      <SubTitle
        style={{
          fontSize: 14,
          width: "100%",
        }}
        text={comment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "99%",
    minHeight: 140,
    backgroundColor: "white",
    padding: 20,
    marginTop: 5,
    elevation: 5,
    borderRadius: 20,
    overflow: "hidden",
    gap: 20,
  },
});
