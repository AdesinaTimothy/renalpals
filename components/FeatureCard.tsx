// import { Ionicons } from "@expo/vector-icons";
// import { Link, useRouter } from "expo-router";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// export type FeatureCardProps = {
//   title: string;
//   description: string;
//   iconName: keyof typeof Ionicons.glyphMap;
//   iconBgColor?: string;

//   padding?: string;
//   onPress?: () => void;
// };

// const FeatureCard: React.FC<FeatureCardProps> = ({
//   title,
//   description,
//   iconName,
//   iconBgColor = "bg-white/25",
//   padding = "p-6",
//   onPress,
// }) => {
//   const router = useRouter();

//   const handlePress = () => {
//     <Link href="/learn"></Link>;
//   };

//   return (
//     <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
//       <View className={`flex gap-3 rounded-3xl ${padding}`}>
//         {/* Icon container */}
//         <View
//           className={`flex w-16 h-16 items-center justify-center rounded-2xl p-3 ${iconBgColor}`}
//         >
//           <Ionicons name={iconName} color="white" size={28} />
//         </View>

//         {/* Text content */}
//         <View className="flex gap-2">
//           <Text className="text-xl font-bold text-white">{title}</Text>
//           <Text className="text-md text-white">{description}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default FeatureCard;

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type FeatureCardProps = {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  onPress?: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  iconName,
  iconColor,
  iconBgColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      className="flex-1 bg-white rounded-2xl  px-3 py-3 items-center gap-[10px] border border-black/5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 1,
        elevation: 1,
      }}
    >
      <View
        className="w-[50px] h-[50px] rounded-2xl items-center justify-center mt-1"
        style={{ backgroundColor: iconBgColor }}
      >
        <Ionicons name={iconName} size={22} color={iconColor} />
      </View>

      <Text className="text-[11px] font-bold text-slate-600 text-center ">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FeatureCard;
