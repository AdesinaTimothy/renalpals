import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const result = () => {
  const { score, total, categoryTitle } = useLocalSearchParams<{
    score: string;
    total: string;
    categoryTitle: string;
  }>();

  const router = useRouter();

  const scoreNum = parseInt(score || "0", 10);
  const totalNum = parseInt(total || "0", 10);
  const percentage = Math.round((scoreNum / totalNum) * 100);

  const getMessage = () => {
    if (percentage === 100) {
      return {
        emoji: "🎉",
        title: "Perfect Score!",
        message: "Outstanding! You have excellent knowledge about dialysis.",
      };
    } else if (percentage >= 80) {
      return {
        emoji: "🌟",
        title: "Great Job!",
        message: "You have a strong understanding of the material. Keep it up!",
      };
    } else if (percentage >= 60) {
      return {
        emoji: "👍",
        title: "Good Effort!",
        message:
          "You are learning well. Review the topics you missed to improve.",
      };
    } else {
      return {
        emoji: "💪",
        title: "Keep Learning!",
        message:
          "Learning takes time. Try again and review the explanations carefully.",
      };
    }
  };

  const resultMessage = getMessage();

  return (
    <View className="flex-1 ">
      <ScrollView className="p-4">
        <View
          className="bg-white rounded-[24px] p-8 items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 24,
            elevation: 10,
          }}
        >
          <View className="flex items-center gap-4">
            <Text className="text-[72px] mb-4">{resultMessage.emoji}</Text>
            <Text className="text-[32px] font-extrabold text-slate-800 mb-8 text-center">
              {resultMessage.title}
            </Text>
          </View>

          <View
            className="w-[160px] h-[160px] border-yellow-500 border-2 mb-5 rounded-full items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 16,
              elevation: 8,
              backgroundColor: "green",
            }}
          >
            <Text className="text-[48px] font-extrabold text-white">
              {percentage}%
            </Text>
          </View>

          <Text className="text-[18px] text-slate-500 font-semibold mb-6">
            {scoreNum} out of {totalNum} correct
          </Text>

          <View className="bg-slate-100 px-5 py-3 rounded-xl mb-6">
            <Text className="text-xs text-slate-400 font-semibold uppercase tracking-widest text-center mb-1">
              category
            </Text>
            <Text className="text-base font-bold text-slate-800 text-center">
              {categoryTitle}
            </Text>
          </View>

          <View>
            <Text className="text-base text-slate-500 text-center leading-6 px-4">
              {resultMessage.message}
            </Text>
          </View>
        </View>
        {/* Button Container */}
        <View className="flex  gap-3 mt-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center justify-center py-4 rounded-2xl bg-white gap-2 border-2 border-slate-200"
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-undo-outline" size={20} color="#3b82f6" />
            <Text className=" text-[17px] font-bold text-[#1e293b]">
              Try Again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/quiz")}
            className="flex-row items-center justify-center py-4 rounded-2xl bg-white gap-2 border-2 border-slate-200"
            style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6" }}
            activeOpacity={0.8}
          >
            <Ionicons name="school-outline" size={20} color={"white"} />
            <Text className="text-[17px] font-bold text-white">
              Back to Quizzes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default result;

const styles = StyleSheet.create({});
