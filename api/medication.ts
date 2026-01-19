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

