import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Screen4() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/(tabs)/home");
  };

  const handleSkip = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <LinearGradient
      colors={["#22d3ee", "#14b8a6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        {/* Your screen content here */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-3xl font-bold">Screen 4</Text>
        </View>

        {/* Pagination */}
        <View className="flex-row justify-center mb-4">
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              className={`mx-1 w-3 h-3 rounded-full ${
                i === 0 ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between items-center px-4 mb-6">
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-white font-bold">Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white px-6 py-3 rounded-full"
            onPress={handleNext}
          >
            <Text className="text-teal-600 font-bold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
