import StarIcon from "@/features/opinions/assets/starIcon.svg";
import React, { ReactElement } from "react";
import { View, ViewStyle } from "react-native";

const createStars = (starsCount: number, starSize: number) => {
  const starsArray: ReactElement[] = [];
  for (let i = 0; i < starsCount; i++) {
    starsArray.push(
      <StarIcon key={i} width={starSize} height={starSize} color="gold" />
    );
  }
  return starsArray;
};

export const Stars = ({
  starsCount,
  style,
  starSize = 20,
}: {
  starsCount: number;
  starSize?: number;
  style?: ViewStyle;
}) => {
  const stars = createStars(starsCount, starSize);
  return <View style={[{ flexDirection: "row", gap: 2 }, style]}>{stars}</View>;
};
