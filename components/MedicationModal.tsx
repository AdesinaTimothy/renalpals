import { Medication } from "@/types/medication";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface MedicationModalProps {
  visible: boolean;
  mode: "add" | "edit";
  medication: Partial<Medication>;
  onClose: () => void;
  onSave: () => void;
  onMedicationChange: (
    field: keyof Medication,
    value: string | boolean
  ) => void;
}

export default function MedicationModal({
  visible,
  mode,
  medication,
  onClose,
  onSave,
  onMedicationChange,
}: MedicationModalProps) {
  const isAddMode = mode === "add";

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-slate-800">
              {isAddMode ? "Add Medication" : "Edit Medication"}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="p-2 rounded-full bg-slate-100"
            >
              <Ionicons name="close-outline" size={28} color={"black"} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Medication Name */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-600 mb-2">
                Medication Name *
              </Text>
              <TextInput
                className="border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-800"
                value={medication.name || ""}
                onChangeText={(text) => onMedicationChange("name", text)}
                placeholder="e.g., Phosphate Binder"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Dosage */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-600 mb-2">
                Dosage
              </Text>
              <TextInput
                className="border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-800"
                value={medication.dosage || ""}
                onChangeText={(text) => onMedicationChange("dosage", text)}
                placeholder="e.g., 800mg"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Frequency */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-600 mb-2">
                Frequency
              </Text>
              <TextInput
                className="border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-800"
                value={medication.frequency || ""}
                onChangeText={(text) => onMedicationChange("frequency", text)}
                placeholder="e.g., Once daily"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Time */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-600 mb-2">
                Time
              </Text>
              <TextInput
                className="border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-800"
                value={medication.time || ""}
                onChangeText={(text) => onMedicationChange("time", text)}
                placeholder="e.g., 9:00 AM"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Switch */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-sm font-semibold text-slate-600">
                Take with dialysis
              </Text>
              <Switch
                value={medication.withDialysis || false}
                onValueChange={(value) =>
                  onMedicationChange("withDialysis", value)
                }
                trackColor={{ false: "#e2e8f0", true: "#93c5fd" }}
                thumbColor={medication.withDialysis ? "#3b82f6" : "#f1f5f9"}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={onSave}
              disabled={!medication.name?.trim()}
              activeOpacity={0.8}
              className={`py-4 rounded-2xl items-center ${
                medication.name?.trim() ? "bg-blue-500" : "bg-blue-300"
              }`}
            >
              <Text className="text-[17px] font-bold text-white">
                {isAddMode ? "Add Medication" : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
