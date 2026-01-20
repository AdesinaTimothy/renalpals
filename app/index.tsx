import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import "react-native-url-polyfill/auto";

export default function Index() {
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
