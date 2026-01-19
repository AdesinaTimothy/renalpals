import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { Pressable, Text, View } from "react-native";

export interface SettingsItemProps {
  label: string;
  href?: Href;
  leftIcon: keyof typeof Ionicons.glyphMap;
  leftIconColor?: string;
  leftIconBg?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  rightIconColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function AccountComp({
  label,
  href,
  leftIcon,
  leftIconColor = "#111827",
  leftIconBg = "#E5E7EB",
  rightIcon,
  rightIconColor = "#9CA3AF",
  onPress,
  disabled = false,
}: SettingsItemProps) {
  const router = useRouter();

  const handlePress = () => {
    if (disabled) return;

    if (onPress) {
      onPress();
      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`flex-row items-center justify-between py-2
        ${disabled ? "opacity-50" : "active:opacity-70"}`}
    >
      {/* Left icon + label */}
      <View className="flex-row items-center gap-3">
        <View
          className="h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: leftIconBg }}
        >
          <Ionicons name={leftIcon} size={18} color={leftIconColor} />
        </View>

        <Text className="text-base font-medium text-gray-900">{label}</Text>
      </View>

      {/* Right icon */}
      {rightIcon && (
        <Ionicons name={rightIcon} size={20} color={rightIconColor} />
      )}
    </Pressable>
  );
}
