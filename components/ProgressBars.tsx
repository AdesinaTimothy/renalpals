import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBars({ current, total }: ProgressBarProps) {
  const progress = Math.min(current / total, 1) * 100;

  const animatedStyle = useAnimatedStyle(
    () => ({
      width: withTiming(`${progress}%`, { duration: 300 }),
    }),
    [progress]
  );

  return (
    <View className="w-full h-2 bg-white rounded-full overflow-hidden">
      <Animated.View
        className="h-full bg-green-500 rounded-full"
        style={animatedStyle}
      />
    </View>
  );
}
