import { ActionIcon, Card, Text, Space, Group } from "@mantine/core";
import { ReactComponent as DeleteIcon } from "../assets/Trash.svg";
import { ReactComponent as EditIcon } from "../assets/Edit.svg";
import { useMutation } from "react-query";
import { supabase } from "../utils/supabaseClient.js";
import { useSessionUser } from "../hooks/useSessionUser";

function Note({ note }) {
  const user = useSessionUser();

  const deleteNote = async (id) => {
    const { data, error } = await supabase.from("notes").delete().match({ id });
  };

  const mutation = useMutation(deleteNote);

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
      {/* <Group position="apart"> */}
      <Text>{note.note}</Text>
      {/* <ActionIcon>
          <EditIcon style={{ width: 16, height: 16 }} />
        </ActionIcon>
      </Group> */}
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
