import { SimpleGrid } from "@mantine/core";
import { useGetNotes } from "../hooks/useGetNotes";
import AddNote from "./AddNote";
import Note from "./Note";

function NoteList() {
  const { data } = useGetNotes();

  return (
    <SimpleGrid cols={3}>
      <AddNote />
      {data?.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </SimpleGrid>
  );
}

export default NoteList;
