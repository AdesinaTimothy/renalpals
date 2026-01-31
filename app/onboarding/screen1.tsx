import { DecorativeCircles } from "@/components/Decorative";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen1() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding/screen2");
  };

  const handleSkip = () => {
    router.replace("/(auth)/sign-in");
  };

  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={["#3b82f6", "#1d4ed8"]}
        className="flex-1 overflow-hidden"
        style={{
          flex: 1,
        }}
      >
        <DecorativeCircles />

        <SafeAreaView className="flex-1 px-8 pt-16">
          {/* Icon */}
          <View className="flex-1 items-center justify-center">
            <View className="w-[180px] h-[180px] rounded-full items-center justify-center bg-white/15">
              <View className="w-[140px] h-[140px] rounded-full items-center justify-center bg-white/20">
                <Ionicons name="heart-outline" size={64} color="#fff" />
              </View>
            </View>
          </View>

          {/* Text content */}
          <View className="flex-1 justify-center items-center pb-10">
            <Text className="text-[36px] font-extrabold text-white text-center mb-4 tracking-tight leading-[42px]">
              Welcome to{"\n"}Renal Pals
            </Text>
            <Text className="text-[16px] text-white/85 text-center leading-6 px-3 font-medium">
              Your trusted companion for managing dialysis treatment and living
              your best life.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Bottom controls */}
      <View
        className="bg-white px-8 pt-5 rounded-t-[30px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        <SafeAreaView edges={["bottom"]}>
          {/* Pagination dots */}
          <View className="flex-row justify-center items-center gap-2 mb-7">
            <View className="h-2 w-6 rounded-full bg-blue-500" />
            <View className="h-2 w-2 rounded-full bg-slate-300" />
            <View className="h-2 w-2 rounded-full bg-slate-300" />
            <View className="h-2 w-2 rounded-full bg-slate-300" />
            <View className="h-2 w-2 rounded-full bg-slate-300" />
          </View>

          {/* Buttons */}
          <View className="flex-row justify-between items-center mb-3">
            <TouchableOpacity
              onPress={handleSkip}
              className="py-4 px-7"
              activeOpacity={0.7}
            >
              <Text className="text-[16px] text-slate-600 font-semibold">
                Skip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              className="flex-row items-center gap-2 bg-blue-500 py-4 px-8 rounded-2xl"
              activeOpacity={0.8}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text className="text-[16px] text-white font-bold">Next</Text>
              <Ionicons name="arrow-forward-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
