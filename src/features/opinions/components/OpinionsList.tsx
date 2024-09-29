import { IOpinion } from "@/redux/api/types";
import { FlatList, View } from "react-native";
import { Opinion } from "./Opinion";

export const OpinionsList = ({
  opinions,
  areReceived,
}: {
  opinions: IOpinion[];
  areReceived?: boolean;
}) => {
  return (
    <FlatList
      style={{ width: "100%" }}
      data={opinions}
      renderItem={({ item: opinion }) => (
        <View
          key={opinion.id}
          style={{ marginBottom: 20, paddingHorizontal: 5 }}
        >
          <Opinion opinion={opinion} isReceived={areReceived} />
        </View>
      )}
      keyExtractor={({ id }) => id}
    />
  );
};
