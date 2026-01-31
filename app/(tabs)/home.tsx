import FeatureCard from "@/components/FeatureCard";
import { getNextMedication } from "@/services/medication.service";

import { useAuthStore } from "@/store/authStore";
import { Medication } from "@/types/medication";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [nextMedication, setNextMedication] = useState<Medication | null>(null);

  useEffect(() => {
    const loadNextMed = async () => {
      const med = await getNextMedication();
      setNextMedication(med);
    };

    loadNextMed();
  }, [nextMedication]);

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
          <View className="flex-row items-center justify-end">
            <TouchableOpacity
              onPress={() => router.push("/settings")}
              className="p-2"
            >
              <Ionicons name="settings-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Username */}
          <View className="flex items-center gap-8 mt-10">
            <View className="flex items-center ">
              <Text className="text-[32px] font-bold text-white mb-2 tracking-[0.5px]">
                Dialysis Companion
              </Text>
              <Text className="text-[16px] font-medium text-white">
                Your partner in kidney care
              </Text>
            </View>
            <View className="flex-row w-30 bg-white/15 py-3 px-4 rounded-3xl items-center justify-center gap-6">
              <Ionicons name="heart-outline" size={24} color={"white"} />
              <Text className="text-white font-bold text-xl">
                Track your health
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView className="flex-1">
        <View className="flex-1 p-6">
          {/* Next Medication Section */}
          <View className="flex gap-2 mb-4">
            <Text className="text-gray-700 text-xl font-bold ">
              Next Medication
            </Text>

            <View>
              {nextMedication && (
                <View className=" bg-white rounded-2xl py-4 px-4 flex-row items-center justify-between border border-violet-100 shadow-sm shadow-violet-400/20">
                  {/* Left side */}
                  <View className="flex-row items-center gap-[14px] flex-1">
                    <View className="w-[46px] h-[46px] rounded-[14px] bg-violet-100 items-center justify-center">
                      <Ionicons
                        name="medkit-outline"
                        size={20}
                        color="#8b5cf6"
                      />
                    </View>

                    <View>
                      <Text className="text-[15px] font-semibold text-slate-800">
                        {nextMedication.name}
                      </Text>
                      <Text className="text-[12px] text-slate-400 mt-[2px]">
                        {nextMedication.dosage}
                      </Text>
                    </View>
                  </View>

                  {/* Right side */}
                  <View className="flex-row items-center gap-[5px] bg-violet-100 px-[10px] py-[6px] rounded-full">
                    <Ionicons name="time-outline" size={14} color="#8b5cf6" />
                    <Text className="text-[13px] font-semibold text-violet-500">
                      {nextMedication.time}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View className="flex gap-3 mb-3 mt-5">
            <Text className="text-gray-700 text-xl font-bold ">
              Quick Actions
            </Text>
          </View>
          <View className="flex-1 gap-4">
            <View className="flex-row gap-2">
              <FeatureCard
                title="Add Fluid"
                iconName="water-outline"
                iconColor="#38bdf8"
                iconBgColor="#38bdf815"
                onPress={() => router.push("/(tabs)/fluid")}
              />
              <FeatureCard
                title="Medications"
                iconName="bandage-outline"
                iconColor="#a78bfa"
                iconBgColor="#a78bfa15"
                onPress={() => router.push("/(tabs)/meds")}
              />
              <FeatureCard
                title="Learn"
                iconName="book-outline"
                iconColor="#34d399"
                iconBgColor="#34d39915"
                onPress={() => router.push("/learn")}
              />
              <FeatureCard
                title="Quiz"
                iconName="school-outline"
                iconColor="#fb923c"
                iconBgColor="#fb923c15"
                onPress={() => router.push("/quiz")}
              />
            </View>

            <View className="flex bg-white gap-4 p-6 mt-3 rounded-3xl border border-gray-200">
              <Text className="text-gray-800 text-xl font-bold ">
                Welcome to Renapal Hub
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
