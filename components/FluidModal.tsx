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
  mode: "add" | "edit";
  fluid?: Partial<FluidEntry>;
  onClose: () => void;
  onSave: (fluid: Partial<FluidEntry>) => void;
}

export default function FluidModal({
  visible,
  mode,
  fluid,
  onClose,
  onSave,
}: FluidModalProps) {
  const isAddMode = mode === "add";

  const [amount, setAmount] = useState(fluid?.amount || "");
  const [type, setType] = useState(fluid?.type || "");

  const fluidTypes = [
    "Water",
    "Coffee",
    "Tea",
    "Juice",
    "Milk",
    "Soup",
    "Soda",
    "Other",
  ];

  const handleSave = () => {
    if (!amount.trim()) {
      alert("Please enter an amount");
      return;
    }

    const fluidObject = {
      amount: amount.trim(),
      type: type.trim() || "Water",
    };

    onSave(fluidObject);

    setAmount("");
    setType("");
  };

  const handleClose = () => {
    setAmount(fluid?.amount || "");
    setType(fluid?.type || "");
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
              {isAddMode ? "Add Fluid Intake" : "Edit Fluid Intake"}
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
              <Text className="text-sm font-semibold text-slate-600 mb-2">
                Amount (ml) *
              </Text>
              <TextInput
                className="border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-800"
                value={amount}
                onChangeText={setAmount}
                placeholder="e.g., 250"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
              />
            </View>

            {/* Fluid Type */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-600 mb-2">
                Type of Fluid
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {fluidTypes.map((fluidType) => (
                  <TouchableOpacity
                    key={fluidType}
                    onPress={() => setType(fluidType)}
                    className={`px-4 py-2 rounded-2xl border ${
                      type === fluidType
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        type === fluidType ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {fluidType}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Custom Type Input */}
              {type === "Other" && (
                <TextInput
                  className="border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-800 mt-3"
                  value={type === "Other" ? "" : type}
                  onChangeText={setType}
                  placeholder="Enter fluid type"
                  placeholderTextColor="#94a3b8"
                />
              )}
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={!amount.trim()}
              activeOpacity={0.8}
              className={`py-4 rounded-2xl items-center ${
                amount.trim() ? "bg-blue-500" : "bg-blue-300"
              }`}
            >
              <Text className="text-[17px] font-bold text-white">
                {isAddMode ? "Add Fluid" : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
