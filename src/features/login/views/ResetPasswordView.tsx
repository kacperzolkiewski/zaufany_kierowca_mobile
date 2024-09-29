import { ButtonsBottomContainer } from "@/components/ButtonsBottomContainer";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import {
  UnAuthenticatedRoutes,
  UnAuthenticatedStackScreenProps,
} from "@/features/navigation/types/unAuthenticatedStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from "../schemas/resetPasswordSchema";
import { FormInput } from "@/components/FormInput";
import { View } from "react-native";
import ResetPasswordImage from "@/features/login/assets/resetPasswordImage.svg";
import { Title } from "@/components/Title";
import { useResetPasswordMutation } from "@/redux/api/authApi";
export const ResetPasswordView = ({
  navigation,
  route,
}: UnAuthenticatedStackScreenProps<"ResetPasswordView">) => {
  const { resetToken } = route.params;
  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPassword, { isSuccess }] = useResetPasswordMutation();

  const { handleSubmit, trigger } = methods;

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = (values) => {
    resetPassword({
      ...values,
      resetToken,
    });
  };

  return (
    <FullScreenContainer centeredItems>
      <Title style={{ marginTop: 10, marginBottom: 25 }}>
        Utwórz nowe hasło
      </Title>
      <ResetPasswordImage width="100%" height={200} />
      <FormProvider {...methods}>
        <View
          style={{ width: "100%", gap: 5, marginBottom: 10, marginTop: 25 }}
        >
          <FormInput
            label="Nowe hasło"
            name="password"
            onBlur={() => trigger("password")}
          />
          <FormInput
            label="Powtórz hasło"
            name="passwordConfirm"
            onBlur={() => trigger("passwordConfirm")}
          />
        </View>
      </FormProvider>
      <ButtonsBottomContainer
        firstBttonOnPress={handleSubmit(onSubmitHandler)}
        firstButtonText="Zresetuj hasło"
        secondButtonOnPress={() =>
          navigation.navigate(UnAuthenticatedRoutes.ResetPasswordLinkSentView, {
            email: "",
          })
        }
        secondButtonText="Wróć do logowania"
      />
    </FullScreenContainer>
  );
};
