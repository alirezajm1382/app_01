import Head from "next/head";
import { useEffect, useState } from "react";
import { Typography, Box, Button, Stack, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TableModal from "../components/TableModal";

export default function table({ table }) {
  const [fetchedData, setFetchedData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [addState, setAddState] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    title: "",
    body: "",
    userId: "",
  });

  useEffect(() => {
    setFetchedData(table);
  }, []);

  const handleAddItem = (_item) => {
    setModalState(false);
    setFetchedData([...fetchedData, _item]);
  };

  const handleUpdateItem = (_item) => {
    setModalState(false);
    let index = -1;
    let temp = fetchedData.filter((f) => {
      return f.id === _item.id;
    });
    index = fetchedData.indexOf(temp[0]);
    setFetchedData([
      ...fetchedData.slice(0, index),
      _item,
      ...fetchedData.slice(index + 1),
    ]);
  };

  const handleOnDelete = (_item) => {
    setFetchedData(fetchedData.filter((item) => item.id !== _item.id));
  };

  return (
    <div>
      <Head>
        <title>App / Table</title>
        <meta name="description" content="Powered by love <3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mt={5} mr={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
          <Typography variant="h4" color="initial" component="h2">
            Table
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setAddState(true);
              setSelectedItem({ id: "", title: "", body: "", userId: "" });
              setModalState(true);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(33, 112, 181, 0.2)",
              },
            }}
          >
            Add Item
          </Button>
        </Box>
        <hr />
        <Box mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 90 }}>User ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Body</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.body}</TableCell>
                    <TableCell>
                      <Stack direction="column" spacing={1}>
                        <IconButton
                          aria-label="delete"
                          sx={{
                            color: "rgba(189, 89, 89, 0.9)",
                            "&:hover": {
                              backgroundColor: "rgba(189, 89, 89, 0.2)",
                            },
                          }}
                          onClick={() => handleOnDelete(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setAddState(false);
                            setSelectedItem(row);
                            setModalState(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <TableModal
        modalState={modalState}
        setModalState={setModalState}
        addState={addState}
        handleAddItem={handleAddItem}
        handleUpdateItem={handleUpdateItem}
        selectedItem={selectedItem}
      />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return {
    props: {
      table: data,
    },
  };
}
