import { Container, Space } from "@mantine/core";

import NoteList from "./components/NoteList";
import NoteHeader from "./components/NoteHeader";
import Auth from "./components/auth/Auth";
import AddNote from "./components/AddNote";
import { useSessionUser } from "./hooks/useSessionUser";

function App() {
  const user = useSessionUser();

  return (
    <Container>
      {user ? (
        <>
          <NoteHeader />
          <Space h="xl" />
          <NoteList />
        </>
      ) : (
        <Auth />
      )}
    </Container>
  );
}

export default App;
