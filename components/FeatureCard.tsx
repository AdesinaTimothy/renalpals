import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

export type FeatureCardProps = {
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBgColor?: string;
  //   cardBgColor?: string;
  padding?: string;
  onPress?: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  iconName,
  iconBgColor = "bg-white/25",
  //   cardBgColor = "bg-blue-700",
  padding = "p-6",
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    <Link href="/learn"></Link>;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className={`flex gap-3 rounded-3xl ${padding}`}>
        {/* Icon container */}
        <View
          className={`flex w-16 h-16 items-center justify-center rounded-2xl p-3 ${iconBgColor}`}
        >
          <Ionicons name={iconName} color="white" size={28} />
        </View>

        {/* Text content */}
        <View className="flex gap-3">
          <Text className="text-xl font-bold text-white">{title}</Text>
          <Text className="text-md text-white">{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeatureCard;
