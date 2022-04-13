import { useQuery } from "react-query";
import { supabase } from "../utils/supabaseClient";

const getNotes = async () => {
  try {
    const { data: notes, error } = await supabase.from("notes").select("*");
    return notes;
  } catch (error) {
    console.log(error.error_description || error.message);
  }
};

export const useGetNotes = () => {
  return useQuery("get-notes", getNotes, {
    select: (data) => {
      const notes = data;
      return notes;
    },
  });
};
