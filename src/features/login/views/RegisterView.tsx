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
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RegisterInput, registerSchema } from "../schemas/registerSchema";

export const RegisterView = ({
  navigation,
}: UnAuthenticatedStackScreenProps<"RegisterView">) => {
  const [email, setEmail] = useState<string | null>();
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const { colors } = useTheme();
  const [registerUser, { isLoading, isSuccess, isError }] =
    useRegisterUserMutation();

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
    setEmail(values.email);
  };

  const { handleSubmit, reset, trigger } = methods;

  useEffect(() => {
    if (isSuccess && email) {
      navigation.navigate(UnAuthenticatedRoutes.VerifyEmailView, {
        email,
      });
      reset();
    }

    if (isError) {
      Toast.show({
        type: "error",
        text1: "Co poszło nie tak, spróbuj ponownie.",
        visibilityTime: 2000,
        position: "bottom",
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <FullScreenContainer centeredItems>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <LoginImage width={250} height={150} />
        <Title>Witaj na pokładzie!</Title>
      </View>
      <FormProvider {...methods}>
        <View style={{ flex: 1, width: "100%", gap: 5 }}>
          <FormInput
            name="name"
            label="Imię i Nazwisko"
            onBlur={() => trigger("name")}
          />
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
          <FormInput
            name="passwordConfirm"
            secureTextEntry={true}
            label="Powtórz hasło"
            onBlur={() => trigger("passwordConfirm")}
          />
        </View>
      </FormProvider>

      <BottomContainer>
        <Button
          mode="contained"
          style={{ marginBottom: 20 }}
          onPress={handleSubmit(onSubmitHandler)}
        >
          Zarejestruj się
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>Już masz konto?</Text>
          <Text
            style={{
              color: colors.primary,
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 35,
            }}
            onPress={() => {
              navigation.navigate(UnAuthenticatedRoutes.LoginView);
              reset();
            }}
          >
            Zaloguj się
          </Text>
        </View>
      </BottomContainer>
      <Toast />
    </FullScreenContainer>
  );
};
