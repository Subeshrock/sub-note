import { useState } from "react";
import { ActionIcon, Card, Text, Space, Group, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as DeleteIcon } from "../assets/Trash.svg";
import { ReactComponent as EditIcon } from "../assets/Edit.svg";

import { supabase } from "../utils/supabaseClient.js";
import UpdateNote from "../components/UpdateNote";

function Note({ note }) {
  const [opened, setOpened] = useState(false);

  const queryClient = useQueryClient();

  const deleteNote = async (id) => {
    const { data, error } = await supabase.from("notes").delete().match({ id });
  };

  const mutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-notes");
    },
  });

  const handleDeleteNote = () => {
    mutation.mutate(note.id);
  };

  const d = new Date(note.created_at);

  return (
    <Card
      shadow="sm"
      padding="sm"
      sx={(theme) => ({ backgroundColor: theme.colors.yellow[2] })}
    >
      <Group position="apart">
        <Text>{note.note}</Text>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Edit Note"
        >
          <UpdateNote note={note} setOpened={setOpened} />
        </Modal>
        <ActionIcon onClick={() => setOpened(true)}>
          <EditIcon style={{ width: 16, height: 16 }} />
        </ActionIcon>
      </Group>
      <Space h="md" />
      <Group position="apart">
        <Text>{`${d.getDate()}/${d.getMonth()}/${d.getFullYear()} `}</Text>
        <ActionIcon onClick={handleDeleteNote}>
          <DeleteIcon style={{ width: 16, height: 16 }} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default Note;
