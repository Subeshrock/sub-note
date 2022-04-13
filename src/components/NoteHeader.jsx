import { Title, Button, Input, Space, Group } from "@mantine/core";
import { ReactComponent as SearchIcon } from "../assets/Search.svg";

function NoteHeader() {
  return (
    <Group direction="column" spacing="xs" grow>
      <Group position="apart">
        <Title order={1}>SUB Notes</Title>
        {/* <Button radius="xl" compact>
          Toggle Mode
        </Button> */}
      </Group>
      <Space h="xl" />
      <Input icon={<SearchIcon />} placeholder="Type to Search" radius="lg" />
    </Group>
  );
}

export default NoteHeader;
