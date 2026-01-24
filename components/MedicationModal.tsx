import { Medication } from "@/types/medication";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { useState } from "react";
import {
  Modal,
  Platform,
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
  const frequencies = [
    "Once daily",
    "Twice daily",
    "Thrice daily",
    "As needed",
  ];

  const [showTimePicker, setShowTimePicker] = useState(false);

  // Initialize with a default time (e.g., 8:00 AM) or existing medication time
  const getInitialTime = () => {
    if (medication.time) {
      const [time, period] = medication.time.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      const date = new Date();
      let hour = hours;
      if (period === "PM" && hours !== 12) hour += 12;
      if (period === "AM" && hours === 12) hour = 0;
      date.setHours(hour || 8);
      date.setMinutes(minutes || 0);
      return date;
    }
    const defaultTime = new Date();
    defaultTime.setHours(8);
    defaultTime.setMinutes(0);
    return defaultTime;
  };

  const [selectedTime, setSelectedTime] = useState<Date>(getInitialTime());

  // Handle the time selection for Android
  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    console.log("Time picker event:", event.type);

    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }

    if (selectedDate && event.type === "set") {
      setSelectedTime(selectedDate);
      const formattedTime = selectedDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      console.log("Selected time:", formattedTime);
      onMedicationChange("time", formattedTime);

      if (Platform.OS === "ios") {
        setShowTimePicker(false);
      }
    } else if (event.type === "dismissed") {
      setShowTimePicker(false);
    }
  };

  // iOS-specific: confirm time selection
  const confirmIOSTime = () => {
    const formattedTime = selectedTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    console.log("Confirmed time:", formattedTime);
    onMedicationChange("time", formattedTime);
    setShowTimePicker(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8 max-h-[90%]">
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
              <View className="flex-row justify-between flex-wrap gap-2">
                {frequencies.map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    onPress={() => onMedicationChange("frequency", freq)}
                    className={`px-3 py-2 rounded-2xl border ${
                      medication.frequency === freq
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        medication.frequency === freq
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {freq}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Time */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-600 mb-2">
                Reminder Time
              </Text>
              <TouchableOpacity
                onPress={() => {
                  console.log("Time button pressed");
                  setShowTimePicker(true);
                }}
                className="border border-slate-200 rounded-2xl px-4 py-4 flex-row items-center justify-between"
              >
                <Text
                  className={`text-base ${
                    medication.time ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {medication.time || "Tap to select time"}
                </Text>
                <Ionicons name="time-outline" size={24} color="#64748b" />
              </TouchableOpacity>

              {/* iOS Time Picker */}
              {showTimePicker && Platform.OS === "ios" && (
                <View className="mt-4 border border-slate-200 rounded-2xl p-4 bg-white">
                  <Text className="text-sm font-semibold text-slate-600 mb-3">
                    Select Reminder Time
                  </Text>
                  <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="spinner"
                    onChange={(event, date) => {
                      if (date) {
                        console.log("Time changed:", date);
                        setSelectedTime(date);
                      }
                    }}
                    style={{ height: 120 }}
                  />
                  <View className="flex-row  gap-2 mt-4">
                    <TouchableOpacity
                      onPress={() => setShowTimePicker(false)}
                      className="flex-1 py-3 rounded-xl bg-gray-200"
                    >
                      <Text className="text-center font-semibold text-gray-700">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={confirmIOSTime}
                      className="flex-1 py-3 rounded-xl bg-blue-500"
                    >
                      <Text className="text-center font-semibold text-white">
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Android Time Picker */}
              {showTimePicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
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
