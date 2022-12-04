import Link from "next/link";
import { Box, Button, Typography, Divider, Stack } from "@mui/material";

function Navbar() {
  return (
    <Box p="2rem">
      <Typography variant="h3" color="initial" component="h1">
        App
      </Typography>
      <Typography variant="subtitle1" color="initial">
        Powered by Love
      </Typography>
      <Stack direction="column" mt="5rem" spacing={2}>
        <Link href="/table" passHref legacyBehavior>
          <Button href="" size="large" variant="text" color="primary">
            Table
          </Button>
        </Link>
        <Divider />
        <Link href="/gallery" passHref legacyBehavior>
          <Button href="" size="large" variant="text" color="primary">
            Gallery
          </Button>
        </Link>
        <Divider />
        <Link href="/todo" passHref legacyBehavior>
          <Button href="" size="large" variant="text" color="primary">
            To-do
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default Navbar;
