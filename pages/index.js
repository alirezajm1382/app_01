import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { Stack, Typography, Button } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { useEffect } from "react";
import Router from "next/router";

function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      Router.push("/table?query=pass");
    }
  },[session]);
  return (
    <div>
      <Head>
        <title>App / Home</title>
        <meta name="description" content="Powered by love <3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        direction="row"
        sx={{
          marginTop: "3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="column" gap={3} sx={{ alignItems: "center" }}>
          <Typography variant="h3">Welcome to app_01!</Typography>
          <Button
            onClick={() => signIn(`github`, { callbackUrl: "/table" })}
            variant="contained"
            color="info"
            sx={{
              minWidth: "300px",
              padding: ".8rem",
            }}
          >
            <GitHub sx={{ marginRight: "1rem" }} />
            Sign-in via GitHub
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default Home;
