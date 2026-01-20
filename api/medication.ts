import { Medication } from "@/types/medication";
import { supabase } from "../lib/supabase";
import { getUserProfile } from "./getUserProfile";

export async function fetchMedications() {
  const profile = await getUserProfile();
  const { id: profileId } = profile;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("User not authenticated");

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/medications?profile_id=eq.${profileId}&select=*`,
    {
      headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('Fetch medications error:', error);
    throw new Error('Failed to fetch medications');
  }

  const data = await response.json();
  return data; 
}

export async function deleteMedication(medId: string) {
  const profile = await getUserProfile();
  const { id: profileId } = profile;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("User not authenticated");

  
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/medications?id=eq.${medId}&profile_id=eq.${profileId}`,
    {
      method: "DELETE",
      headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation", 
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Delete medication error:", error);
    throw new Error("Failed to delete medication");
  }

  const deletedRows = await response.json();
  return deletedRows; 
}



//Function to add Medication
export async function addMedication(medication: Omit<Medication, "id">) {
  const profile = await getUserProfile();
  const { id: profileId } = profile;
 
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("User not authenticated");

  const payload = {
    name: medication.name,
    dosage: medication.dosage,
    frequency: medication.frequency,
    time: medication.time,
    with_dialysis: medication.withDialysis, // Convert to snake_case
    profile_id: profileId,
  };
  
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/medications`,
    {
      method: "POST",
      headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation", 
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error; // Throw the actual error object instead of generic message
  }

  const newMed = await response.json();
  return newMed[0]; 
}


