import { useState, useEffect } from "react";
import { Card, Text, Textarea, Button, Group } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";
import { useSessionUser } from "../hooks/useSessionUser";

function AddNote() {
  const [noteText, setNoteText] = useState("");
  const [empty, setEmpty] = useState(false);
  const user = useSessionUser();

  const queryClient = useQueryClient();

  const characterLimit = 200;

  const insertNote = async (noteText) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert([{ note: noteText, user_id: user.id }]);
      if (error) throw error;
      return data;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const mutation = useMutation(insertNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-notes");
    },
  });

  const handleChange = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    mutation.mutate(noteText);
  };

  useEffect(() => {
    if (noteText.length >= 0) {
      setEmpty(false);
    }
  }, [noteText]);

  return (
    <Card
      sx={(theme) => ({ backgroundColor: theme.colors.blue[2] })}
      shadow="sm"
      padding="sm"
    >
      <Card.Section>
        <Textarea
          styles={(theme) => ({
            input: { border: "none", backgroundColor: theme.colors.blue[2] },
          })}
          placeholder="Type to add a note..."
          autosize
          value={noteText}
          onChange={handleChange}
          error={
            (characterLimit - noteText.length <= 0 &&
              "Note should not cross more than 200 latters") ||
            (empty && "Please write some note")
          }
        />
      </Card.Section>
      <Group position="apart">
        <Text>{characterLimit - noteText.length} remaining</Text>
        <Button onClick={handleAddNote} radius="xl" compact>
          Save
        </Button>
      </Group>
    </Card>
  );
}

export default AddNote;
