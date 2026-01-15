import { Stack } from "expo-router";

export default function MedicationLayout() {
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
          title: "Medications",
        }}
      />
    </Stack>
  );
}
