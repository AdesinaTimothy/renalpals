import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import {
  addMedication,
  deleteMedication,
  editMedication,
  fetchMedications,
} from "@/api/medication";
import MedicationModal from "@/components/MedicationModal";
import MedicationCard from "@/components/MedicatonCard";

import { convertTo24Hour } from "@/services/time";
import { Medication } from "@/types/medication";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

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

  //Schedule notifcation for a single medication
  const scheduleMedicationNotification = async (medication: Medication) => {
    try {
      const { hours, minutes } = convertTo24Hour(medication.time);

      if (isNaN(hours) || isNaN(minutes)) {
        console.error("Invalid time format:", medication.time);
        return null;
      }
      //Schedule Medication reminder
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "💊 Medication Reminder",
          body: `Time to take ${medication.name} - ${medication.dosage}`,
          sound: true,
          data: {
            medicationId: medication.id,
            medicationName: medication.name,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      });

      // Show success message
      Alert.alert(
        "Success!",
        `Reminder set for ${medication.name} at ${medication.time} daily`
      );

      return notificationId;
    } catch (error) {
      console.error("Failed to schedule notification:", error);
    }
  };

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

      // Schedule notification
      if (addedMed.time) {
        const notificationId = await scheduleMedicationNotification(addedMed);

        if (notificationId) {
          // Update with ALL fields plus notification_id
          await editMedication(addedMed.id, {
            name: addedMed.name,
            dosage: addedMed.dosage,
            frequency: addedMed.frequency,
            time: addedMed.time,
            withDialysis: addedMed.withDialysis,
            notification_id: notificationId, // ← Add notification_id
          });

          addedMed.notification_id = notificationId;
        }
      }

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
              const medication = medications.find((med) => med.id === id);

              if (medication?.notification_id) {
                await Notifications.cancelScheduledNotificationAsync(
                  medication.notification_id
                );
              }

              await deleteMedication(id);

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
        </View>

        {/* Add Medication Modal */}
        <MedicationModal
          visible={showAddModal}
          mode="add"
          medication={newMed}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMedication}
          onMedicationChange={(field, value) => {
            setNewMed({ ...newMed, [field]: value });
          }}
        />

        {/* Edit Medication Modal */}
        <MedicationModal
          visible={showEditModal}
          mode="edit"
          medication={editingMed || {}}
          onClose={() => {
            setShowEditModal(false);
            setEditingMed(null);
          }}
          onSave={handleSaveEdit}
          onMedicationChange={(field, value) => {
            if (editingMed) {
              setEditingMed({ ...editingMed, [field]: value });
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
