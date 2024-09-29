import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { scheduleNotificationAsync } from "expo-notifications";

enum NotificationType {
  RIDE_CANCELLED = "ride_cancelled",
  RESERVATION_CANCELLED = "reservation_cancelled",
  RESERVATION_CREATED = "reservation_created",
}

type MessageData = {
  type: NotificationType;
};

type RideCancelledMessageData = MessageData & {
  userName: string;
  reason: string;
  originAddress: string;
  destinationAddress: string;
};

type ReservationCancelledMessageData = MessageData & {
  userName: string;
  reason: string;
};

type ReservationCreatedMessageData = MessageData & {
  userName: string;
  originAddress: string;
  destinationAddress: string;
};

export const onMessageReceived = async (
  message: FirebaseMessagingTypes.RemoteMessage
) => {
  const { type } = message.data as MessageData;
  switch (type) {
    case NotificationType.RESERVATION_CANCELLED: {
      const { userName, reason } =
        message.data as ReservationCancelledMessageData;
      await scheduleNotificationAsync({
        content: {
          title: `${userName} anulował rezerwację`,
          body: `Informacja od ${userName}: ${reason}`,
        },
        trigger: null,
      });
      break;
    }
    case NotificationType.RIDE_CANCELLED: {
      const { userName, reason, originAddress, destinationAddress } =
        message.data as RideCancelledMessageData;
      await scheduleNotificationAsync({
        content: {
          title: `Przejazd z ${originAddress} do ${destinationAddress} został odwołany`,
          body: `Informacja od ${userName}: ${reason}`,
        },
        trigger: null,
      });
      break;
    }
    case NotificationType.RESERVATION_CREATED: {
      const { userName, originAddress, destinationAddress } =
        message.data as ReservationCreatedMessageData;
      await scheduleNotificationAsync({
        content: {
          title: `${userName} dokonał rezerwacji`,
          body: `Przejazd z ${originAddress} do ${destinationAddress} został zarezerwowany.`,
        },
        trigger: null,
      });
      break;
    }
    default:
  }
};
