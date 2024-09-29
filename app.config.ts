import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Zaufany Kierowca",
  slug: "frontend",
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {},
    package: "com.zksoftware.zaufanykierowca",
  },
  extra: {
    eas: {
      projectId: "4b047e46-67da-4de0-be77-a8568cd7b433",
    },
  },
});
