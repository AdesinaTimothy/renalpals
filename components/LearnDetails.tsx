import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export type LearnDetailsProps = {
  topic: string;
};

const LearnDetails = () => {
  return (
    <View className="flex p-5 rounded-2xl bg-white shadow-sm">
      <Text className="text-xl text-slate-800 mb-3 font-bold  ">
        Why is Dialysis Needed
      </Text>
      <Text className="text-base leading-6 mb-3 text-slate-800 ">
        When kidneys fail, they can no longer remove waste products and excess
        fluid from your blood. Dialysis takes over this vital function.
      </Text>

      <View className="mt-2 flex-row gap-2 items-center justify-center">
        <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        <Text className="flex-1 text-base text-slate-800">
          Removes waste and toxins from blood
        </Text>
      </View>
      <View className="mt-2 flex-row gap-2 items-center justify-center">
        <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        <Text className="flex-1 text-base text-slate-800">
          Controls blood pressure
        </Text>
      </View>
      <View className="mt-2 flex-row gap-2 items-center justify-center">
        <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        <Text className="flex-1 text-base text-slate-800">
          Helps keep safe levels of minerals
        </Text>
      </View>
      <View className="mt-2 flex-row gap-2 items-center justify-center">
        <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        <Text className="flex-1 text-base text-slate-800">
          Maintains proper balance of minerals
        </Text>
      </View>
    </View>
  );
};

export default LearnDetails;

const styles = StyleSheet.create({});
