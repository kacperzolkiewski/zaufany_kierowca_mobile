import { ButtonsBottomContainer } from "@/components/ButtonsBottomContainer";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import {
  UnAuthenticatedRoutes,
  UnAuthenticatedStackScreenProps,
} from "@/features/navigation/types/unAuthenticatedStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "@/components/FormInput";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "../schemas/forgotPasswordSchema";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const ForgotPasswordView = ({
  navigation,
}: UnAuthenticatedStackScreenProps<"ForgotPasswordView">) => {
  const [email, setEmail] = useState<string | null>(null);
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { handleSubmit } = methods;

  const [sendResetPasswordLink, { isLoading, isSuccess, error, isError }] =
    useForgotPasswordMutation();

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = (values) => {
    sendResetPasswordLink(values);
    setEmail(values.email);
  };

  useEffect(() => {
    if (isSuccess && email) {
      navigation.navigate(UnAuthenticatedRoutes.ResetPasswordLinkSentView, {
        email,
      });
    }
  }, [isLoading]);

  const { trigger } = methods;

  return (
    <FullScreenContainer centeredItems>
      <HeaderWithInformation
        title="Zresetuj hasło"
        information="Aby zresetować hasło, wprowadź adres e-mail powiązany z Twoim kontem. Wyślemy Ci wiadomość e-mail zawierającą link, który umożliwi Ci utworzenie nowego hasła."
      />
      <FormProvider {...methods}>
        <FormInput
          name="email"
          label="Podaj swój adres e-mail"
          onBlur={() => trigger("email")}
        />
      </FormProvider>
      <ButtonsBottomContainer
        firstBttonOnPress={handleSubmit(onSubmitHandler)}
        firstButtonText="Wyślij e-mail"
        secondButtonOnPress={navigation.goBack}
        secondButtonText="Wróć"
      />
      <Toast />
    </FullScreenContainer>
  );
};
