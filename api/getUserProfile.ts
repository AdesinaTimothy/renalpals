import { supabase } from "../lib/supabase";

// export async function getUserProfile() {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) throw new Error("User not authenticated");

//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/profiles?user_id=eq.${session.user.id}&select=*`,
//     {
//       headers: {
//         apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
//         Authorization: `Bearer ${session.access_token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await response.json();
//   if (data.length === 0) throw new Error("No profile found for this user");

//   return data[0]; 
// }
export async function getUserProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("User not authenticated");

  console.log('Session user ID:', session.user.id);

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/profiles?user_id=eq.${session.user.id}&select=*`,
    {
      headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  

  if (data.length === 0) throw new Error("No profile found for this user");

  return data[0]; 
}

