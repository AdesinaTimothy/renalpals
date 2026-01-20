import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Medication {
  id: string;
  name: string;
  dosage?: string;
  time?: string;
  frequency?: string;
  withDialysis?: boolean;
  reminderEnabled?: boolean;
  color?: string; // optional for color coding meds
}

interface MedicationCardProps {
  med: Medication;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function MedicationCard({
  med,
  onDelete,
  onEdit,
}: MedicationCardProps) {
  return (
    <View className=" rounded-xl bg-white p-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View
            className={`mr-3 h-11 w-11 items-center justify-center rounded-full ${
              med.color ? med.color + "20" : "bg-red-100"
            }`}
          >
            <Image
              source={require("../assets/images/drugs.png")}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </View>

          <View className="flex-1">
            <Text className="text-base font-bold text-slate-900">
              {med.name}
            </Text>
            {med.dosage && (
              <Text className="text-sm text-slate-500">{med.dosage}</Text>
            )}
          </View>
        </View>

        {/* Edit/Delete Buttons */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => onEdit(med.id)}
            className="rounded-xl bg-slate-100 p-2 active:scale-95"
          >
            <Ionicons name="create-outline" size={18} color="#2563eb" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDelete(med.id)}
            className="rounded-xl bg-slate-100 p-2 active:scale-95"
          >
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Details */}
      <View className="mt-4 flex-row flex-wrap gap-4">
        {med.time && (
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={16} color="#64748b" />
            <Text className="text-sm font-medium text-slate-600">
              {med.time}
            </Text>
          </View>
        )}

        {med.frequency && (
          <View className="flex-row items-center gap-1">
            <Ionicons name="repeat-outline" size={16} color="#64748b" />
            <Text className="text-sm font-medium text-slate-600">
              {med.frequency}
            </Text>
          </View>
        )}

        {med.reminderEnabled && (
          <View className="flex-row items-center gap-1">
            <Ionicons name="notifications-outline" size={16} color="#10b981" />
            <Text className="text-sm font-medium text-emerald-600">
              Reminder On
            </Text>
          </View>
        )}
      </View>

      {/* Dialysis Badge */}
      {med.withDialysis && (
        <View className="mt-3 self-start rounded-full bg-blue-50 px-3 py-1">
          <Text className="text-xs font-semibold text-blue-700">
            Take with dialysis
          </Text>
        </View>
      )}
    </View>
  );
}
