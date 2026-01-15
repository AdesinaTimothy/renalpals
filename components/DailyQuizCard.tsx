import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { shadows } from "@/styles/shadows";
import { LinearGradient } from "expo-linear-gradient";

export type DailyQuizCardProps = {
  title: string;
  description: string;
  dailyQuestionCount: number;

  /** Ionicons icon name */
  iconName: keyof typeof Ionicons.glyphMap;

  /** Tailwind background color class for icon container */
  iconBgColor?: string;

  /** Optional press handler */
  onPress?: () => void;
};

const DailyQuizCard: React.FC<DailyQuizCardProps> = ({
  title,
  description,
  dailyQuestionCount,
  iconName,
  iconBgColor = "bg-blue-500",
  onPress,
}) => {
  return (
    <View
      className="flex-1 bg-green-700 rounded-3xl px-5 py-5 shadow-md "
      style={shadows.card}
      onTouchEnd={onPress}
    >
      <LinearGradient
        colors={["red", "green"]} // green gradient from left (#047857) to right (#059669)
        start={[0, 0]}
        end={[1, 0]} // left to right
        className="rounded-2xl px-5 py-5"
      ></LinearGradient>
      <View className="flex-row items-center">
        <View className="flex-row items-center gap-4">
          {/* Icon Container */}
          <View
            className={`w-16 h-16 rounded-2xl items-center justify-center ${iconBgColor}`}
          >
            <Ionicons name={iconName} size={28} color="white" />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {title}
            </Text>
            <Text className="text-sm max-sm: text-gray-500">
              {dailyQuestionCount} questions to complete globally
            </Text>
          </View>
        </View>

        <View className="flex-1  p-2 rounded-2xl bg-white items-center justify-center">
          <Text className="text-sm font-bold text-gray-800 mb-1">Quiz</Text>
          <Text className="text-lg font-bold text-gray-900">
            #{dailyQuestionCount}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DailyQuizCard;

const styles = StyleSheet.create({});
