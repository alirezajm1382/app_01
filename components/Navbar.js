import Link from "next/link";
import { Box, Button, Typography, Divider, Stack } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session && router.pathname !== "/" && !router.query) {
      alert("You must set a session first! \nReturning to Homepage.");
      router.replace("/");
    }
  }, [router.pathname]);

  return (
    <Box p="2rem">
      <Typography variant="h3" color="initial" component="h1" mb={2}>
        App
      </Typography>
      <Typography variant="subtitle1" color="initial">
        {status === "authenticated"
          ? <>Logged in as <br/> {session.user.name}</>
          : `Not Logged in`}
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
        {status === "authenticated" && (
          <>
            <Divider />
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              size="large"
              variant="text"
              color="primary"
            >
              Log out
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Navbar;
