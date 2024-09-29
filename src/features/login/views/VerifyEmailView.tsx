import { ButtonsBottomContainer } from "@/components/ButtonsBottomContainer";
import { FormInput } from "@/components/FormInput";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import {
  UnAuthenticatedRoutes,
  UnAuthenticatedStackScreenProps,
} from "@/features/navigation/types/unAuthenticatedStack";
import { useModal } from "@/hooks/useModal";
import {
  useResendVerificationCodeMutation,
  useVerifyEmailMutation,
} from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  VerificationCodeInput,
  verificationCodeSchema,
} from "../schemas/verificationCodeSchema";

export const VerifyEmailView = ({
  navigation,
  route,
}: UnAuthenticatedStackScreenProps<"VerifyEmailView">) => {
  const { colors } = useTheme();
  const { email } = route.params;
  const methods = useForm<VerificationCodeInput>({
    resolver: zodResolver(verificationCodeSchema),
  });
  const [verifyEmail, { isSuccess, isLoading, isError }] =
    useVerifyEmailMutation();
  const [
    resendVerificationCode,
    {
      isSuccess: isResendSuccess,
      isLoading: isResendLoading,
      isError: isResendError,
    },
  ] = useResendVerificationCodeMutation();

  const { Modal, showModal } = useModal(
    "Rejestracja przeszła pomyślnie",
    () => navigation.navigate(UnAuthenticatedRoutes.LoginView),
    "Ok"
  );

  const onSubmitHandler: SubmitHandler<VerificationCodeInput> = (values) => {
    verifyEmail(values);
  };

  const { handleSubmit } = methods;

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: "error",
        text1: "Błędny kod, spróbuj ponownie.",
        visibilityTime: 2000,
        position: "bottom",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      showModal();
    }
  }, [isSuccess]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <FullScreenContainer centeredItems>
      <HeaderWithInformation
        title="Weryfikacja"
        information="Kod weryfikacyjny został wysłany na Twój adres e-mail. Sprawdź swoją skrzynkę odbiorczą w tym folder ze spamem i wpisz otrzymany kod weryfikacyjny."
      />
      <View style={{ width: "100%" }}>
        <FormProvider {...methods}>
          <FormInput name="verificationCode" label="Kod weryfikacyjny" />
        </FormProvider>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <Text>Nie otrzymałeś kodu?</Text>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
            onPress={() => resendVerificationCode({ email })}
          >
            Wyślij ponownie
          </Text>
        </View>
      </View>
      <ButtonsBottomContainer
        firstBttonOnPress={handleSubmit(onSubmitHandler)}
        firstButtonText="Potwierdź"
        secondButtonOnPress={navigation.goBack}
        secondButtonText="Wróć"
      />
      <Toast />
      {Modal}
    </FullScreenContainer>
  );
};
