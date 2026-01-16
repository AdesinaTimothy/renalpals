// import { useAuthStore } from "@/store/authStore";
// import { router } from "expo-router";
// import { useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";
// import "react-native-url-polyfill/auto";

// export default function Index() {
//   const user = useAuthStore((state) => state.user);

//   useEffect(() => {
//     // Add a small delay to let the layout mount
//     const timer = setTimeout(() => {
//       router.replace("/onboarding/screen1");
//     }, 100); // Just 100ms delay

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View className="flex-1 justify-center items-center bg-white">
//       <ActivityIndicator size="large" color="#0ea5e9" />
//     </View>
//   );
// }

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
