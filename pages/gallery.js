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
import { useState, useEffect } from "react";
import axios from "axios";

function GalleryPage() {
  const [query, setQuery] = useState("");
  const [fire, setFire] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (query !== "") {
      let url = `https://api.unsplash.com/search/photos?per_page=12&page=1&query=${query}&client_id=j-HQOzjYOyL8NGtBumlbUJuic8zkQ2abcclsQ4Z2dyw`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          setImages(response.data.results);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setFire(false);
          console.log(images);
        });
    }
  }, [fire]);
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
              onChange={(event) => setQuery(event.target.value)}
            />
            <IconButton color="primary" onClick={() => setFire(true)}>
              <SearchIcon />
            </IconButton>
          </Stack>
        </Box>
        <hr />
        <Grid container mt={2} spacing={1}>
          {images &&
            images.map((data) => (
              <Grid item xs={4} key={data.id}>
                <ImageCard data={data} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default GalleryPage;
