import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import FeatureCard from "@/components/FeatureCard";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#3b82f6", "#1d4ed8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: 350,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <SafeAreaView className="flex-1 p-4">
          <Text className="text-3xl text-white font-bold">Welcome back</Text>
          <Text className="text-3xl text-white font-bold">TimoBest!</Text>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView className="flex-1">
        <View className="flex-1 p-6">
          <View className="flex gap-3 mb-6">
            <Text className="text-gray-800 text-2xl font-bold ">
              Explore Features
            </Text>
            <Text className="text-gray-500 text-lg">
              Everything you need to manage your dialysis journey
            </Text>
          </View>
          <View className="flex-1 gap-4">
            <LinearGradient
              colors={["#3b82f6", "#1d4ed8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, borderRadius: 24 }}
            >
              <FeatureCard
                title="Learn"
                description="Explore extensive dialysis topics and resources"
                iconName="book-outline"
                iconBgColor="bg-white/25"
                onPress={() => router.push("/learn")}
              />
            </LinearGradient>

            <LinearGradient
              colors={["#8b5cf6", "#6d28d9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, borderRadius: 24 }}
            >
              <FeatureCard
                title="Practice Quiz"
                description="Test your knowledge with interactive quizzes"
                iconName="school-outline"
                iconBgColor="bg-white/25"
                onPress={() => router.push("/quiz")}
              />
            </LinearGradient>

            <LinearGradient
              colors={["#ec4899", "#db2777"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, borderRadius: 24 }}
            >
              <FeatureCard
                title="Medication Tracker"
                description="Manage and track your medications easily"
                iconName="bandage-outline"
                iconBgColor="bg-white/25"
                onPress={() => router.push("/meds")}
              />
            </LinearGradient>

            <LinearGradient
              colors={["#06b6d4", "#0891b2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, borderRadius: 24 }}
            ></LinearGradient>

            <View className="flex bg-white gap-4 p-6 mt-3 rounded-3xl border border-gray-200">
              <Text className="text-gray-800 text-2xl font-bold ">
                Welcome to Your Health Hub
              </Text>
              <Text className="text-gray-500 text-lg">
                This app is designed to support you throughout your dialysis
                journey. Learn about treatments, tract medications, test your
                knowledge, and get instant A1-powered answers to your questions.
              </Text>
            </View>

            <View className="flex justify-center items-center">
              <Text className="text-sm text-gray-500">
                Built and developed by a team of dialysis nurses 👩‍⚕️
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  progressTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  progressDetails: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  progressLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },
  progressRing: {
    transform: [{ rotate: "-90deg" }],
  },
});
