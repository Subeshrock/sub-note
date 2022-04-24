import { useState, useEffect } from "react";
import { Button, Textarea } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";

function UpdateNote({ note, setOpened }) {
  const [noteText, setNoteText] = useState(note.note);
  const [empty, setEmpty] = useState(false);

  const queryClient = useQueryClient();

  const characterLimit = 200;

  const updateNote = async (noteText) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .update({ note: noteText })
        .match({ id: note.id });
      setOpened(false);
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const mutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-notes");
    },
  });

  const handleChange = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    mutation.mutate(noteText);
  };

  useEffect(() => {
    if (noteText.length >= 0) {
      setEmpty(false);
    }
  }, [noteText]);

  return (
    <>
      <Textarea
        autosize
        value={noteText}
        onChange={handleChange}
        error={
          (characterLimit - noteText.length <= 0 &&
            "Note should not cross more than 200 latters") ||
          (empty && "Please write some note")
        }
      />
      <Button mt={10} onClick={handleUpdateNote} radius="xl" compact>
        Update
      </Button>
    </>
  );
}

export default UpdateNote;
