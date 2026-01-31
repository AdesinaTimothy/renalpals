import { fetchFluidLimit } from "@/api/fluidLimit";
import { useAuthStore } from "@/store/authStore";
import { useFluidLimitStore } from "@/store/fluidStore";
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
    }).then((status) => {});
  });

  const { user, initialized } = useAuthStore();

  const { setFluidLimit } = useFluidLimitStore();

  useEffect(() => {
    fetchFluidLimit().then(setFluidLimit);
  }, []);

  if (!initialized) {
    return null;
  }

  // If authenticated, go to tabs
  if (user) {
    // return <Redirect href="/(tabs)/home" />;
    return <Redirect href="/onboarding/screen1" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
