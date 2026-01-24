import { supabase } from "@/lib/supabase";
import { getUserProfile } from "./getUserProfile";

export async function fetchFluidLimit () {
      const profile = await getUserProfile();
      const { id: profileId } = profile;
    
      const {
        data: { session },
      } = await supabase.auth.getSession();
    
      if (!session) throw new Error("User not authenticated");
}