import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { shadows } from "@/styles/shadows";

export type CategoryCardProps = {
  title: string;
  description: string;
  questionCount: number;

  /** Ionicons icon name */
  iconName: keyof typeof Ionicons.glyphMap;

  /** Tailwind background color class for icon container */
  iconBgColor?: string;

  /** Optional press handler */
  onPress?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  questionCount,
  iconName,
  iconBgColor = "bg-blue-500",
  onPress,
}) => {
  return (
    <View
      className="flex-1 bg-white rounded-2xl px-5 py-5 shadow-md "
      style={shadows.card}
      onTouchEnd={onPress}
    >
      <View className="flex-row items-center gap-5">
        {/* Icon Container */}
        <View
          className={`w-16 h-16 rounded-2xl items-center justify-center ${iconBgColor}`}
        >
          <Ionicons name={iconName} size={28} color="white" />
        </View>

        {/* Text Content */}
        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-800 mb-1">{title}</Text>
          <Text className="text-base text-gray-600 mb-1">{description}</Text>
          <Text className="text-sm text-gray-500">
            {questionCount} questions
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryCard;
