import { ButtonsBottomContainer } from "@/components/ButtonsBottomContainer";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import JeepImage from "@/features/home/assets/jeepImage.svg";
import { AuthenticatedStackNavigationProp } from "@/features/navigation/types/authenticatedStack";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export const HomeView = () => {
  const navigation =
    useNavigation<AuthenticatedStackNavigationProp<"BottomTabs">>();

  return (
    <FullScreenContainer centeredItems>
      <HeaderWithInformation
        title="Zaufany Kierowca"
        information="Twórz i podróżuj razem z nami! Dodawaj swoje przejazdy lub znajdź odpowiednią podróż. Wybierz spośród dwóch opcji i ruszaj w niezapomnianą podróż z innymi podróżnikami. Gotowy na nowe przygody?"
      />
      <JeepImage />
      <ButtonsBottomContainer
        firstButtonText="Znajdź przejazd"
        firstBttonOnPress={() => {
          navigation.navigate("FindRide");
        }}
        secondButtonText="Dodaj przejazd"
        secondButtonOnPress={() => {
          navigation.navigate("AddRide");
        }}
      />
    </FullScreenContainer>
  );
};
