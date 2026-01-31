import { View } from "react-native";

export const DecorativeCircles = () => (
  <View className="absolute inset-0">
    <View
      className="absolute rounded-full"
      style={{
        top: -50,
        right: -40,
        width: 180,
        height: 180,
        borderWidth: 30,
        borderColor: "rgba(255,255,255,0.04)",
      }}
    />
    <View
      className="absolute rounded-full"
      style={{
        top: -20,
        right: 60,
        width: 100,
        height: 100,
        borderWidth: 20,
        borderColor: "rgba(255,255,255,0.03)",
      }}
    />
    <View
      className="absolute rounded-full"
      style={{
        bottom: -60,
        left: -50,
        width: 200,
        height: 200,
        borderWidth: 35,
        borderColor: "rgba(255,255,255,0.04)",
      }}
    />
    <View
      className="absolute rounded-full"
      style={{
        bottom: 20,
        left: 80,
        width: 80,
        height: 80,
        borderWidth: 15,
        borderColor: "rgba(255,255,255,0.02)",
      }}
    />
    <View
      className="absolute rounded-full"
      style={{
        top: 60,
        left: -30,
        width: 120,
        height: 120,
        borderWidth: 20,
        borderColor: "rgba(255,255,255,0.02)",
      }}
    />
  </View>
);
