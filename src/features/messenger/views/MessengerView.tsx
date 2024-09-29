import { FullScreenContainer } from "@/components/FullScreenContainer";
import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import NoMessagesImage from "@/features/messenger/assets/noMessagesImage.svg";
import React from "react";

export const MessengerView = () => {
  return (
    <FullScreenContainer centeredItems>
      <HeaderWithInformation title="Brak wiadomości" />
      <NoMessagesImage width="100%" height={400} />
    </FullScreenContainer>
  );
};
