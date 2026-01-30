import { useAuthStore } from "@/store/authStore";
import * as Notifications from "expo-notifications";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import "react-native-url-polyfill/auto";

export default function Index() {
  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    }).then((status) => {
      console.log(`PERM:`, status);
    });
  });

  const scheduleNotifications = async () => {};

  const { user, initialized } = useAuthStore();

  if (!initialized) {
    return null;
  }

  // If authenticated, go to tabs
  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
