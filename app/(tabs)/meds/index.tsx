import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { quizCategories } from "@/mocks/quiz-data";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Switch } from "react-native";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  withDialysis: boolean;
}

export default function Quiz() {
  const router = useRouter();

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Phosphate Binder",
      dosage: "800mg",
      frequency: "With meals",
      time: "8:00 AM, 1:00 PM, 7:00 PM",
      withDialysis: false,
    },
    {
      id: "2",
      name: "Blood Pressure Med",
      dosage: "10mg",
      frequency: "Once daily",
      time: "9:00 AM",
      withDialysis: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    withDialysis: false,
  });

  const handleAddMedication = () => {
    if (!newMed.name.trim()) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMed.name,
      dosage: newMed.dosage,
      frequency: newMed.frequency,
      time: newMed.time,
      withDialysis: newMed.withDialysis,
    };

    setMedications([...medications, medication]);
    setNewMed({
      name: "",
      dosage: "",
      frequency: "",
      time: "",
      withDialysis: false,
    });
    setShowAddModal(false);
  };

  return (
    <View className="flex-1 bg-blue-50">
      <LinearGradient colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]} />
      <ScrollView className="flex-1">
        <View className="py-6 px-4">
          <Text className="text-xl text-gray-600 mb-8">
            Track your daily medication schedule
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => setShowAddModal(true)}
              className="flex-row bg-blue-500 items-center justify-center py-4 gap-2 mb-6 rounded-2xl "
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 5,
              }}
            >
              <Ionicons name="add-outline" size={28} color={"white"} />
              <Text className="text-white text-md font-bold">
                Add Medication
              </Text>
            </TouchableOpacity>
          </View>

          {/* Container to render medication */}

          {/* Container for Modal */}
          <Modal
            visible={showAddModal}
            animationType="slide"
            transparent
            onRequestClose={() => setShowAddModal(false)}
          >
            {/* Overlay */}
            <View className="flex-1 bg-black/50 justify-end">
              {/* Modal content */}
              <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="text-xl font-bold text-slate-800">
                    Add Medication
                  </Text>

                  <TouchableOpacity
                    onPress={() => setShowAddModal(false)}
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
                      value={newMed.name}
                      onChangeText={(text) =>
                        setNewMed({ ...newMed, name: text })
                      }
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
                      value={newMed.dosage}
                      onChangeText={(text) =>
                        setNewMed({ ...newMed, dosage: text })
                      }
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
                      value={newMed.frequency}
                      onChangeText={(text) =>
                        setNewMed({ ...newMed, frequency: text })
                      }
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
                      value={newMed.time}
                      onChangeText={(text) =>
                        setNewMed({ ...newMed, time: text })
                      }
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
                      value={newMed.withDialysis}
                      onValueChange={(value) =>
                        setNewMed({ ...newMed, withDialysis: value })
                      }
                      trackColor={{ false: "#e2e8f0", true: "#93c5fd" }}
                      thumbColor={newMed.withDialysis ? "#3b82f6" : "#f1f5f9"}
                    />
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity
                    onPress={handleAddMedication}
                    disabled={!newMed.name.trim()}
                    activeOpacity={0.8}
                    className={`py-4 rounded-2xl items-center ${
                      newMed.name.trim() ? "bg-blue-500" : "bg-blue-300"
                    }`}
                  >
                    <Text className="text-[17px] font-bold text-white">
                      Add Medication
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}
