import { ProgressBar } from "@/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const router = useRouter();

  const [fluidLimit, setFluidLimit] = useState<number>(1500);
  const [fluidTakenToday, setFluidTakenToday] = useState<number>(0);

  //   useEffect(() => {
  //    const loadLimit = async () => {
  //     const limit = await fetchFluidlimit()
  //     setFluidLimit(limit);
  //    }
  //   },[])

  const add100mil = () => {
    setFluidTakenToday((fluidTakenToday) => fluidTakenToday + 100);
  };
  const add200mil = () => {
    setFluidTakenToday((fluidTakenToday) => fluidTakenToday + 200);
  };
  const add250mil = () => {
    setFluidTakenToday((fluidTakenToday) => fluidTakenToday + 250);
  };
  const add500mil = () => {
    setFluidTakenToday((fluidTakenToday) => fluidTakenToday + 500);
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#06b6d4", "#0891b2", "#0ca5e9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: 350,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <SafeAreaView className="flex-1 px-6 ">
          <View className="flex-1 flex-col gap-6 mt-4 justify-between">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center justify-between gap-4">
                <Ionicons name="water-outline" size={28} color="white" />
                <Text className="text-white text-3xl font-bold">
                  Fluid Tracker
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/settings")}
                className="p-2"
              >
                <Ionicons name="settings-outline" size={22} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 bg-white/15 rounded-[20px] justify-between p-5  border border-white/20">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white font-bold">Todays's Intake </Text>
                <Text className="text-white">Limit: {fluidLimit}ml</Text>
              </View>
              <View className="flex mb-4">
                <Text className="text-white text-5xl font-bold  tracking-[-1px] mb-1">
                  {fluidTakenToday}ml
                </Text>
                <Text className="text-white">
                  {fluidLimit - fluidTakenToday}ml left
                </Text>
              </View>
              <View className="flex-row items-center gap-12 justify-between">
                <View className="flex-1">
                  <ProgressBar current={fluidTakenToday} total={fluidLimit} />
                </View>

                <Text className="text-white font-bold">
                  <Text>
                    {((fluidTakenToday / fluidLimit) * 100).toFixed(1)}%
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView className="flex-1">
        <View className="flex-1 p-6">
          <View className="flex gap-3 mb-6">
            <Text className="text-gray-800 text-2xl font-bold ">QuicK Add</Text>
          </View>
          <View className="flex-row flex-wrap gap-4 mb-6">
            <TouchableOpacity
              onPress={add100mil}
              className="w-[48%] rounded-2xl bg-[#8b5cf6] items-center py-8 gap-3"
            >
              <Ionicons name="beer-outline" size={28} color="white" />
              <Text className="text-white font-bold text-xl">100ml</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={add200mil}
              className="w-[48%] rounded-2xl bg-[#3b82f6] items-center py-8 gap-4"
            >
              <Ionicons name="cafe-outline" size={28} color="white" />
              <Text className="text-white font-bold text-xl">200ml</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={add250mil}
              className="w-[48%] rounded-2xl bg-[#06b6d4] items-center py-8 gap-4"
            >
              <Ionicons name="hourglass-outline" size={28} color="white" />
              <Text className="text-white font-bold text-xl">250ml</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={add500mil}
              className="w-[48%] rounded-2xl bg-[#10b981] items-center py-8 gap-4"
            >
              <Ionicons name="wine-outline" size={28} color="white" />
              <Text className="text-white font-bold text-xl">500ml</Text>
            </TouchableOpacity>
          </View>

          {/* custome Amount Button */}
          <TouchableOpacity className="flex-row items-center justify-center gap-4 rounded-2xl border border-dashed mt-3 p-4 border-[#06b6d4]">
            <Ionicons name="add-circle-outline" size={26} color={"#06b6d4"} />
            <Text className="text-[16px] font-bold text-[#06b6d4]">
              Custom Amount
            </Text>
          </TouchableOpacity>

          <View className="flex gap-3 mt-5">
            <Text className="text-gray-800 text-xl font-bold ">
              Today's Log
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

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
