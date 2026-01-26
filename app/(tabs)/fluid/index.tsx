import { addFluid, deleteFluidEntry, getFluidEntries } from "@/api/addFluid";
import FluidModal from "@/components/FluidModal";

import { ProgressBars } from "@/components/ProgressBars";
import { FluidEntry } from "@/types/fluid";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
  const [showFluidModal, setShowFluidModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [fluids, setFluids] = useState<FluidEntry[]>([]);
  const [selectedFluid, setSelectedFluid] = useState<FluidEntry>();

  //UseEffect to log Today's fluid everytime the screen shows
  useEffect(() => {
    const allFluidLogs = async () => {
      try {
        const allfluids = await getFluidEntries();

        if (Array.isArray(allfluids)) {
          setFluids(allfluids);
          const total = allfluids.reduce((sum, f) => sum + f.amount, 0);
          setFluidTakenToday(total);
        } else {
          setFluids([]);
        }
      } catch (error: any) {
        console.error("Error loading fluids:", error);
        setFluids([]);
      }
    };

    allFluidLogs();
  }, []);

  //Function to format time(created_At) from the fluid
  const formatTime = (createdAt: string) => {
    return new Date(createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //Function to do quick add
  const quickAdd = async (amount: number, type: string = "Water") => {
    try {
      const newEntry = await addFluid(amount.toString(), type);

      setFluids((prev) => [newEntry, ...prev]);
      setFluidTakenToday((prev) => prev + amount);
    } catch (error: any) {
      console.error(" Error in quick add:", error);
      alert(error?.message || "Failed to add fluid");
    }
  };

  const add100mil = () => quickAdd(100, "Water");
  const add200mil = () => quickAdd(200, "Water");
  const add250mil = () => quickAdd(250, "Water");
  const add500mil = () => quickAdd(500, "Water");

  //Function to delete fluid entry from the logs
  const handleDeleteFluidEntry = async (id: string) => {
    Alert.alert(
      "Delete Fluid Entry",
      `Are you sure you want to delete this fluid entry?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const fluidToDelete = fluids.find((fluid) => fluid.id === id);

              if (!fluidToDelete) {
                console.error("Fluid entry not found");
                alert("Fluid entry not found");
                return;
              }
              await deleteFluidEntry(id);

              setFluids((prev) => prev.filter((fluid) => fluid.id !== id));

              const convertedAmount = Number(fluidToDelete.amount);

              setFluidTakenToday((prev) => prev - convertedAmount);
            } catch (error: any) {
              console.error("Error in deleting:", error);
              alert(error?.message || "Failed to delete fluid");
            }
          },
        },
      ]
    );
  };

  //Function to save fluid to the backend
  const handleSaveFluid = async (fluid: Partial<FluidEntry>) => {
    try {
      if (fluid.amount == null) return;
      const amountAsNumber = parseFloat(fluid.amount);

      const fluidType = fluid.type || "Water";
      const newEntry = await addFluid(fluid.amount, fluidType);

      setFluids((prev) => [newEntry, ...prev]);
      setFluidTakenToday((prev) => prev + amountAsNumber);
      setShowFluidModal(false);
    } catch (error: any) {
      console.error("Error adding fluid", error);
      alert(error?.message || "Failed to add fluid");
    }
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
                  <ProgressBars current={fluidTakenToday} total={fluidLimit} />
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
          <TouchableOpacity
            onPress={() => {
              setModalMode("add");
              setSelectedFluid(undefined);
              setShowFluidModal(true);
            }}
            className="flex-row items-center justify-center gap-4 rounded-2xl border border-dashed mt-3 p-4 border-[#06b6d4]"
          >
            <Ionicons name="add-circle-outline" size={26} color={"#06b6d4"} />
            <Text className="text-[16px] font-bold text-[#06b6d4]">
              Custom Amount
            </Text>
          </TouchableOpacity>

          {/* Add Custom Amount Modal */}
          <FluidModal
            visible={showFluidModal}
            mode={modalMode}
            fluid={selectedFluid}
            onClose={() => setShowFluidModal(false)}
            onSave={handleSaveFluid}
          />

          <View className="flex gap-4 mt-6">
            <Text className="text-gray-800 text-xl font-bold ">
              Today's Log
            </Text>

            <View className="gap-2">
              {fluids && fluids.length > 0 ? ( // ✅ Add this check
                fluids.map((fluid) => {
                  return (
                    <View
                      key={fluid.id}
                      className="flex-row bg-white items-center justify-between p-4 rounded-2xl border border-slate-200 "
                    >
                      <View className="flex-row items-center gap-3 flex-1">
                        <View className="w-10 h-10 rounded-xl bg-sky-100 items-center justify-center">
                          <Ionicons
                            name="water-outline"
                            size={18}
                            color={"#06b6d4"}
                          />
                        </View>
                        <View>
                          <Text className="text-[15px] font-semibold text-slate-900 mb-[2px]">
                            {fluid.type}
                          </Text>
                          <Text className="text-[13px] text-slate-500">
                            {fluid.created_at
                              ? formatTime(fluid.created_at)
                              : "Unknown time"}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center gap-3">
                        <Text className="text-lg font-bold text-cyan-500">
                          {fluid.amount}ml
                        </Text>

                        <TouchableOpacity
                          onPress={() => handleDeleteFluidEntry(fluid.id)}
                          className="w-9 h-9 rounded-lg bg-red-100 items-center justify-center"
                        >
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color={"red"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View className="py-8 items-center">
                  <Text className="text-gray-500 text-center">
                    No fluids logged yet today
                  </Text>
                </View>
              )}
            </View>
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
