import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { shadows } from "@/styles/shadows";

export type LearnCategoriesProps = {
  title: string;
  description: string;
  questionCount?: number;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBgColor?: string;

  onPress?: () => void;
};

const LearnCategories: React.FC<LearnCategoriesProps> = ({
  title,
  description,
  questionCount,
  iconName,
  iconBgColor = "bg-blue-500",
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className="flex-1 bg-white rounded-2xl px-5 py-5 shadow-md "
        style={shadows.card}
        onTouchEnd={onPress}
      >
        <View className="flex-row items-center gap-5">
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
            <Text className="text-base text-gray-600 mb-1">{description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LearnCategories;
