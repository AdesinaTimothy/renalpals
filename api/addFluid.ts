import { supabase } from "@/lib/supabase";
import { getUserProfile } from "./getUserProfile";

export async function addFluid (amount: string, type: string) {
    const profile = await getUserProfile();
      const { id: profileId } = profile;
    
      const { data: { session },} = await supabase.auth.getSession();
    
      if (!session) throw new Error("User not authenticated");
      const amountNumber = parseFloat(amount);

      if(isNaN(amountNumber)) {
        throw new Error("Invalid Amount: Amount is not a number")
      }
     const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/fluid_entries?profile_id=eq.${profileId}&select=*`,
    {
        method: "POST",
      headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        profile_id: profileId,
        amount: amountNumber,
        type: type,
      })
    }
  );
  
  if(!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add fluid");
  }

  const data = await response.json()
  return data[0];
}

export async function getFluidEntries () {
  const profile = await getUserProfile()
  const { id: profileId} = profile;

  const {data: {session},} = await supabase.auth.getSession();
  if(!session) throw new Error("User not authenticated")

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/fluid_entries?profile_id=eq.${profileId}&select=*`,
      {
        method: "GET",
        headers: {
          apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        }
      }
    );

    if(!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch fluid entries");
    }

    const data = await response.json();
    return data;
}


export async function deleteFluidEntry (fluidId: string) {
  const profile = await getUserProfile()
  const { id: profileId} = profile;

  const {data: {session},} = await supabase.auth.getSession();
  if(!session) throw new Error("User not authenticated")

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/fluid_entries?id=eq.${fluidId}&&profile_id=eq.${profileId}&select=*`,
      {
        method: "DELETE",
        headers: {
          apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
        }
      }
    );

    if (!response.ok) {
    const error = await response.json();
    console.error("Delete medication error:", error);
    throw new Error("Failed to delete Fluid");
  }

  const deletedRows = await response.json();
  return deletedRows[0]; 
}