import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FluidEntry {
  id?: string;
  amount: string;
  type: string;
  created_at?: string;
}

interface FluidModalProps {
  visible: boolean;
  fluid?: Partial<FluidEntry>;
  onClose: () => void;
  onSave: (limitAmount: number) => void; // ← Change this
}

export default function FluidLimitModal({
  visible,
  fluid,
  onClose,
  onSave,
}: FluidModalProps) {
  const [limitAmount, setLimitAmount] = useState(fluid?.amount || "");

  const handleSave = () => {
    if (!limitAmount.trim()) {
      alert("Please enter an amount");
      return;
    }

    const amount = parseInt(limitAmount.trim());

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    onSave(amount); // ← Now passing a number, not an object

    setLimitAmount("");
    onClose();
  };

  const handleClose = () => {
    setLimitAmount(fluid?.amount || "");

    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-slate-800">
              Daily Fluid Limit
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.7}
              className="p-2 rounded-full bg-slate-100"
            >
              <Ionicons name="close-outline" size={28} color={"black"} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Amount Input */}
            <View className="mb-5">
              <Text className="text-md text-slate-600 mb-2">
                Set your daily fluid intake limit as recommended by your
                healthcare provider
              </Text>
              <Text className="text-sm font-semibold text-slate-700 mb-2 mt-2">
                Daily Limit (ml) *
              </Text>
              <TextInput
                className="border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-800"
                value={limitAmount}
                onChangeText={setLimitAmount}
                placeholder="1500"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.8}
              className="py-5 bg-blue-500 rounded-xl items-center"
            >
              <Text className="text-[17px] font-bold text-white">
                Update Limit
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
