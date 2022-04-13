import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export const useSessionUser = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);
  return user;
};
