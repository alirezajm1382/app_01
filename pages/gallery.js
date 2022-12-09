import Head from "next/head";
import {
  IconButton,
  Typography,
  Box,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImageCard from "../components/ImageCard";

function GalleryPage() {
  return (
    <div>
      <Head>
        <title>App / Gallery</title>
        <meta name="description" content="Powered by Love <3" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
      </Head>
      <Box mt={5} mr={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb={2}
        >
          <Typography variant="h4" color="initial" component="h2">
            Gallery
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              placeholder="Search Query"
              sx={{ minWidth: "100px" }}
              variant="standard"
            />
            <IconButton color="primary" onClick={() => {}}>
              <SearchIcon />
            </IconButton>
          </Stack>
        </Box>
        <hr />
        <Grid container mt={2} spacing={1}>
          <Grid item xs="4">
            <ImageCard />
          </Grid>
          <Grid item xs="4">
            <ImageCard />
          </Grid>
          <Grid item xs="4">
            <ImageCard />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default GalleryPage;
