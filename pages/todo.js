import Head from "next/head";
import { Button, Typography, Box, Grid } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { useState, useEffect } from "react";
import TodoCard from "../components/TodoCard";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TodoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [id, setId] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const handleModalClose = () => setIsOpen(false);

  const handleOnDelete = (_item) => {
    setOnDelete(true);
    setTodoList(todoList.filter((item) => item.id !== _item.id));
  };

  const handleChange = (_item) => {
    let index = -1;
    let temp = todoList.filter((f) => {
      return f.id === _item.id;
    });
    index = todoList.indexOf(temp[0]);
    if (_item.id !== "") {
      setTodoList([
        ...todoList.slice(0, index),
        _item,
        ...todoList.slice(index + 1),
      ]);
    } else {
      setTodoList([
        ...todoList,
        {
          title: title,
          details: details,
          isCompleted: false,
          id: nanoid(),
        },
      ]);
    }
  };

  const tabProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (onDelete === true || !localStorage.getItem("list")) {
      localStorage.setItem("list", JSON.stringify(todoList));
      setOnDelete(false);
    }
  }, [todoList]);

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("list")));
  }, []);

  return (
    <div>
      <Head>
        <title>App / To-do</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      <Box mt={5} mr={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
          <Typography variant="h4" color="initial" component="h2">
            localStorage To-do
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setTitle("");
              setDetails("");
              setId("");
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
          <Box mt>
            <Tabs
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabChange}
            >
              <Tab label="To-do" {...tabProps(0)} />
              <Tab label="Done" {...tabProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                {todoList.map((todoListItem) => {
                  if (!todoListItem.isCompleted) {
                    return (
                      <Grid item xs={4} key={todoListItem.id}>
                        <TodoCard
                          key={todoListItem.id}
                          item={todoListItem}
                          handleChange={handleChange}
                          handleOnDelete={handleOnDelete}
                          setTitle={setTitle}
                          setDetails={setDetails}
                          setId={setId}
                          setIsOpen={setIsOpen}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                {todoList.map((todoListItem) => {
                  if (todoListItem.isCompleted) {
                    return (
                      <Grid item xs={4} key={todoListItem.id}>
                        <TodoCard
                          item={todoListItem}
                          handleChange={handleChange}
                          handleOnDelete={handleOnDelete}
                          setTitle={setTitle}
                          setDetails={setDetails}
                          setId={setId}
                          setIsOpen={setIsOpen}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </TabPanel>
          </Box>
        ) : (
          <Typography variant="h6" component="h4" m={2}>
            No To-dos. Hooray!
          </Typography>
        )}
      </Box>
      <Dialog open={isOpen} onClose={handleModalClose}>
        <DialogTitle>{id === "" ? `Add` : `Edit`} To-do Item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            variant="standard"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="standard"
            label="Details"
            multiline
            rows={3}
            value={details}
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
              handleChange({
                title: title,
                details: details,
                id: id,
              });
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
