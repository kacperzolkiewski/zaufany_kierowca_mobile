import { ButtonsBottomContainer } from "@/components/ButtonsBottomContainer";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import { UnAuthenticatedStackScreenProps } from "@/features/navigation/types/unAuthenticatedStack";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EmailSentImage from "@/features/login/assets/emailSentImage.svg";

export const ResetPasswordLinkSentView = ({
  navigation,
  route,
}: UnAuthenticatedStackScreenProps<"ResetPasswordLinkSentView">) => {
  const { email } = route.params;

  const [sendResetPasswordLink, { isLoading, isSuccess, error, isError }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
    }

    if (isError) {
    }
  }, [isLoading]);

  return (
    <FullScreenContainer centeredItems>
      <HeaderWithInformation
        title="Sprawdź swoją skrzynkę pocztową"
        information="Wysłaliśmy do Ciebie wiadomość e-mail z linkiem. Prosimy, sprawdź swoją skrzynkę odbiorczą i kliknij na link, aby kontynuować proces resetowania hasła. Jeśli nie otrzymałeś wiadomości e-mail, upewnij się, że sprawdziłeś folder ze spamem lub spróbuj ponownie za kilka minut."
      />
      <EmailSentImage width="100%" height={150} />
      <ButtonsBottomContainer
        firstBttonOnPress={() => {
          sendResetPasswordLink({ email });
        }}
        firstButtonText="Wyślij ponownie"
        secondButtonOnPress={navigation.goBack}
        secondButtonText="Wróć"
      />
      <Toast />
    </FullScreenContainer>
  );
};
