import { supabase } from "@/lib/supabase";
import { getUserProfile } from "./getUserProfile";

export async function fetchFluidLimit () {
      const profile = await getUserProfile();
      const { id: profileId } = profile;
    
      const {
        data: { session },
      } = await supabase.auth.getSession();
    
      if (!session) throw new Error("User not authenticated");


      const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/fluid_settings?profile_id=eq.${profileId}&select=*`,
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
  if (data && data.length > 0) {
    return data[0].daily_limit; // ← Extract just the number
  }
  
  return 1500; // Default if no limit set
}



export async function AddFluidLimit (limitAmount: number) {
      const profile = await getUserProfile();
      const { id: profileId } = profile;
    
      const {
        data: { session },
      } = await supabase.auth.getSession();
    
      if (!session) throw new Error("User not authenticated");

      // First, check if fluid settings already exist
        const checkResponse = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/fluid_settings?profile_id=eq.${profileId}`,
    {
      method: "GET",
      headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const existingSettings = await checkResponse.json();
  const settingsExist = existingSettings && existingSettings.length > 0;

  // Use PATCH if exists, POST if new
  const method = settingsExist ? "PATCH" : "POST";
  const url = settingsExist 
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/fluid_settings?profile_id=eq.${profileId}`
    : `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/fluid_settings`;


const response = await fetch(url,
    {
    method,
      headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
         Prefer: "return=representation"
      },
      body: JSON.stringify({
        profile_id: profileId,
        daily_limit: limitAmount,
        
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('Fetch fluid limit error:', error);
    throw new Error('Failed to Add FLuid limit');
  }
 

  const data = await response.json();
  return data; 
}