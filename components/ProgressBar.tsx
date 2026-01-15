// import { View } from "react-native";

// interface ProgressBarProps {
//   current: number;
//   total: number;
// }

// export function ProgressBar({ current, total }: ProgressBarProps) {
//   const progress = Math.min(current / total, 1) * 100;

//   return (
//     <View className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
//       <View
//         className="h-full bg-green-600 rounded-full"
//         style={{ width: `${progress}%` }}
//       />
//     </View>
//   );
// }

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
    <View className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
      <Animated.View
        className="h-full bg-green-600 rounded-full"
        style={animatedStyle}
      />
    </View>
  );
}
