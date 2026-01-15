import { Stack } from "expo-router";

export default function QuizLayout() {
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
          title: "Quiz",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[categoryId]"
        options={{
          title: "Quiz",
          headerBackTitle: "Categories",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
