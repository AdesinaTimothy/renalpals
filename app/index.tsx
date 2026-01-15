import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  useEffect(() => {
    // Add a small delay to let the layout mount
    const timer = setTimeout(() => {
      router.replace("/onboarding/screen1");
    }, 100); // Just 100ms delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#0ea5e9" />
    </View>
  );
}
