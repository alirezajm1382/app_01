import Head from "next/head";
import { Button, Typography, Box, Grid } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import TodoCard from "../components/TodoCard";
import { nanoid } from "nanoid";

function TodoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleModalClose = () => setIsOpen(false);

  const handleChange = (_item) => {
    let index = -1;
    let temp = todoList.filter((f) => {
      return f.id === _item.id;
    });
    index = todoList.indexOf(temp[0]);
    setTodoList([
      ...todoList.slice(0, index),
      _item,
      ...todoList.slice(index + 1),
    ]);
  };

  return (
    <div>
      <Head>
        <title>App / To-do</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      <Box mt={5} mr={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
          <Typography variant="h4" color="initial" component="h2">
            To-do
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setIsOpen(true);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(33, 112, 181, 0.2)",
              },
            }}
          >
            Add To-do
          </Button>
        </Box>
        <hr />
        {todoList.length !== 0 ? (
          <Grid container spacing={3} mt>
            {todoList.map((todoListItem) => {
              return (
                <Grid item xs={4}>
                  <TodoCard
                    key={todoListItem.id}
                    item={todoListItem}
                    handleChange={handleChange}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <h4>No To-dos. Hooray. You're way ahead for today!</h4>
        )}
      </Box>
      <Dialog open={isOpen} onClose={handleModalClose}>
        <DialogTitle>Add To-do Item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            variant="standard"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="standard"
            label="Details"
            multiline
            rows={3}
            onChange={(e) => setDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={handleModalClose}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(189, 89, 89, 0.2)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              setTodoList([
                ...todoList,
                {
                  id: nanoid(),
                  title: title,
                  details: details,
                  isCompleted: 0,
                },
              ]);
              setIsOpen(false);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(53, 181, 32, 0.2)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TodoPage;
