import { Stack } from "expo-router";
import React from "react";

const OnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerShadowVisible: false,
        headerTintColor: "#1e293b",
        headerTitleStyle: {
          fontWeight: "700" as const,
        },
      }}
    >
      <Stack.Screen name="screen1" />
      <Stack.Screen name="screen2" />
      <Stack.Screen name="screen3" />
      <Stack.Screen name="screen4" />
      <Stack.Screen name="screen5" />
    </Stack>
  );
};

export default OnboardingLayout;
