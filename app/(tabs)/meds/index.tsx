import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { quizCategories } from "@/mocks/quiz-data";
import {
  addMedication,
  deleteMedication,
  editMedication,
  fetchMedications,
} from "@/api/medication";
import MedicationCard from "@/components/MedicatonCard";
import { Medication } from "@/types/medication";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Switch } from "react-native";

export default function Med() {
  const router = useRouter();

  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    withDialysis: false,
  });
  const [editingMed, setEditingMed] = useState<Medication | null>(null);

  // This useffect always load the patients medication from the backend as soon the patient enters the screen
  useEffect(() => {
    const loadMedications = async () => {
      try {
        const data = await fetchMedications();
        console.log("Loaded medications in component:", data);
        setMedications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMedications();
  }, []);

  if (loading) return null;

  // Add Medication function: This function enable user to ad medication to their delete

  const handleAddMedication = async () => {
    if (!newMed.name.trim()) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      const addedMed = await addMedication({
        name: newMed.name,
        dosage: newMed.dosage,
        frequency: newMed.frequency,
        time: newMed.time,
        withDialysis: newMed.withDialysis,
      });

      // Update local state
      setMedications((prev) => [...prev, addedMed]);

      setNewMed({
        name: "",
        dosage: "",
        frequency: "",
        time: "",
        withDialysis: false,
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add medication:", error);
    }
  };

  // Function to open the edit modal
  const handleEditMedication = (medication: Medication) => {
    setEditingMed(medication);
    setShowEditModal(true);
  };

  // Function to save the edited medication
  const handleSaveEdit = async () => {
    if (!editingMed || !editingMed.name.trim()) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const updates = {
        name: editingMed.name,
        dosage: editingMed.dosage,
        frequency: editingMed.frequency,
        time: editingMed.time,
        withDialysis: editingMed.withDialysis,
      };

      const updatedMed = await editMedication(editingMed.id, updates);

      setMedications((prev) =>
        prev.map((med) => (med.id === editingMed.id ? updatedMed : med))
      );

      setShowEditModal(false);
      setEditingMed(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update medication");
    }
  };

  //Delete Medication function
  const handleDeleteMedication = async (id: string, name?: string) => {
    Alert.alert(
      "Delete Medication",
      `Are you sure you want to delete ${name || "this medication"}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMedication(id);

              // Update local state
              setMedications((prev) => prev.filter((med) => med.id !== id));
            } catch (error) {
              console.error("Failed to delete medication:", error);
            }
          },
        },
      ]
    );
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

          {/* Medications List */}
          <View className="gap-4">
            {medications.length === 0 ? (
              <View className="bg-white rounded-2xl p-8 items-center">
                <Ionicons name="medical-outline" size={48} color="#94a3b8" />
                <Text className="text-slate-400 text-center mt-4">
                  No medications added yet.{"\n"}Tap the button above to add
                  your first medication.
                </Text>
              </View>
            ) : (
              medications.map((med) => (
                <MedicationCard
                  key={med.id}
                  med={med}
                  onDelete={() => handleDeleteMedication(med.id, med.name)}
                  onEdit={() => handleEditMedication(med)}
                />
              ))
            )}
          </View>

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

        {/* Edit Modal */}
        <Modal
          visible={showEditModal}
          animationType="slide"
          transparent
          onRequestClose={() => {
            setShowEditModal(false);
            setEditingMed(null);
          }}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
              {/* Header */}
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-bold text-slate-800">
                  Edit Medication
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowEditModal(false);
                    setEditingMed(null);
                  }}
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
                    value={editingMed?.name || ""}
                    onChangeText={(text) => {
                      if (editingMed) {
                        setEditingMed({ ...editingMed, name: text });
                      }
                    }}
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
                    value={editingMed?.dosage || ""}
                    onChangeText={(text) => {
                      if (editingMed) {
                        setEditingMed({ ...editingMed, dosage: text });
                      }
                    }}
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
                    value={editingMed?.frequency || ""}
                    onChangeText={(text) => {
                      if (editingMed) {
                        setEditingMed({ ...editingMed, frequency: text });
                      }
                    }}
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
                    value={editingMed?.time || ""}
                    onChangeText={(text) => {
                      if (editingMed) {
                        setEditingMed({ ...editingMed, time: text });
                      }
                    }}
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
                    value={editingMed?.withDialysis || false}
                    onValueChange={(value) => {
                      if (editingMed) {
                        setEditingMed({ ...editingMed, withDialysis: value });
                      }
                    }}
                    trackColor={{ false: "#e2e8f0", true: "#93c5fd" }}
                    thumbColor={
                      editingMed?.withDialysis ? "#3b82f6" : "#f1f5f9"
                    }
                  />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  onPress={handleSaveEdit}
                  disabled={!editingMed?.name.trim()}
                  activeOpacity={0.8}
                  className={`py-4 rounded-2xl items-center ${
                    editingMed?.name.trim() ? "bg-blue-500" : "bg-blue-300"
                  }`}
                >
                  <Text className="text-[17px] font-bold text-white">
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
