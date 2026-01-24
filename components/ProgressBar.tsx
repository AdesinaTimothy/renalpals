import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.min(current / total, 1) * 100;

  const animatedStyle = useAnimatedStyle(
    () => ({
      width: withTiming(`${progress}%`, { duration: 300 }),
    }),
    [progress]
  );

  return (
    <View className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
      <Animated.View
        className="h-full bg-green-600 rounded-full"
        style={animatedStyle}
      />
    </View>
  );
}
