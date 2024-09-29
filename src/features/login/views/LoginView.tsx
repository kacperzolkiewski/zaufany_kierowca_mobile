import { BottomContainer } from "@/components/BottomContainer";
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { Title } from "@/components/Title";
import LoginImage from "@/features/login/assets/loginImage.svg";
import {
  UnAuthenticatedRoutes,
  UnAuthenticatedStackScreenProps,
} from "@/features/navigation/types/unAuthenticatedStack";
import { useModal } from "@/hooks/useModal";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { LoginInput, loginSchema } from "../schemas/loginSchema";

export const LoginView = ({
  navigation,
}: UnAuthenticatedStackScreenProps<"LoginView">) => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit, reset, trigger } = methods;

  const { Modal, showModal } = useModal(
    "Niepoprawny e-mail lub hasło.",
    () => reset(),
    "OK"
  );
  const { colors } = useTheme();

  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    if (messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }

    const firebaseToken = await messaging().getToken();
    loginUser({ ...values, firebaseToken });
  };

  useEffect(() => {
    if (isError) {
      showModal();
    }
  }, [isError]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <FullScreenContainer centeredItems>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <LoginImage width={250} height={150} />
        <Title>Witaj ponownie!</Title>
      </View>
      <FormProvider {...methods}>
        <View style={{ flex: 1, width: "100%", gap: 5 }}>
          <FormInput
            name="email"
            label="Adres e-mail"
            onBlur={() => trigger("email")}
          />
          <FormInput
            name="password"
            secureTextEntry={true}
            label="Hasło"
            onBlur={() => trigger("password")}
          />
          <Text
            style={{
              textAlign: "right",
              color: colors.primary,
              fontWeight: "bold",
              marginTop: 5,
            }}
            onPress={() =>
              navigation.navigate(UnAuthenticatedRoutes.ForgotPasswordView)
            }
          >
            Nie pamiętasz hasła?
          </Text>
        </View>
      </FormProvider>
      <BottomContainer>
        <Button
          mode="contained"
          style={{ marginBottom: 20 }}
          onPress={handleSubmit(onSubmitHandler)}
        >
          Zaloguj się
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>Nie masz jeszcze konta?</Text>
          <Text
            style={{
              color: colors.primary,
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 35,
            }}
            onPress={() => {
              navigation.navigate(UnAuthenticatedRoutes.RegisterView);
              reset();
            }}
          >
            Zarejestruj się
          </Text>
        </View>
      </BottomContainer>
      {Modal}
    </FullScreenContainer>
  );
};
