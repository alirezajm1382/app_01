import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";

export default function TableModal({
  modalState,
  setModalState,
  addState,
  handleAddItem,
  handleUpdateItem,
  selectedItem,
}) {
  const nanoid = customAlphabet("1234567890");
  const handleClose = () => setModalState(false);
  const [uid, setUid] = useState(selectedItem.userId);
  const [title, setTitle] = useState(selectedItem.title);
  const [body, setBody] = useState(selectedItem.body);
  useEffect(() => {
    if(modalState) {
      setUid(selectedItem.userId);
      setTitle(selectedItem.title);
      setBody(selectedItem.body);
    }
  }, [modalState]);
  return (
    <Dialog
      open={modalState}
      onClose={handleClose}
    >
      <DialogTitle>{addState ? `Add` : `Edit`} Item</DialogTitle>
      <DialogContent>
        <TextField
          label="User ID"
          id="userIdInputField"
          fullWidth
          margin="dense"
          variant="standard"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <TextField
          multiline
          rows={2}
          label="Title"
          id="titleInputField"
          fullWidth
          margin="dense"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          rows={4}
          label="Body"
          id="bodyInputField"
          fullWidth
          margin="dense"
          variant="standard"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClose}
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
          onClick={() =>
            addState
              ? handleAddItem({
                  userId: +uid,
                  id: +nanoid(),
                  title: title,
                  body: body,
                })
              : handleUpdateItem({
                  userId: +uid,
                  id: selectedItem.id,
                  title: title,
                  body: body,
                })
          }
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
  );
}
