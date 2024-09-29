import * as Notifications from "expo-notifications";

export const requestNotificationsPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    alert("You need to enable permissions in order to receive notifications");
  }
};

export const checkNotificationsPermission = async () => {
  const settings = await Notifications.getPermissionsAsync();

  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};
