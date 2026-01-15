import { Stack } from "expo-router";

export default function LearnLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen
        name="index"
        options={{
          title: "Learn",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[topicId]"
        options={{
          headerShown: true,
          title: "Topic Details",
          headerBackTitle: "Learn",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
