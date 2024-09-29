import { FullScreenLoader } from "@/components/FullScreenLoader";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/store";
import { useFonts } from "expo-font";
import React from "react";
import { AuthenticatedStack } from "./AuthenticatedStack";
import { UnAuthenticatedStack } from "./UnAuthenticatedStack";

export const Router = () => {
  const accessToken = useAppSelector((state) => state.authState.accessToken);
  const { data: user, isLoading, isFetching } = useGetMeQuery();
  const [fontsLoaded] = useFonts({
    VeganStyle: require("@/assets/fonts/Lato-Regular.ttf"),
  });

  const loading = isLoading || isFetching;

  if (loading || !fontsLoaded) {
    return <FullScreenLoader />;
  }

  if (!accessToken || !user) {
    return <UnAuthenticatedStack />;
  }

  return user?.firstLoginToApplication ? <></> : <AuthenticatedStack />;
};
