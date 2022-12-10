import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/TodoCard.module.css";

function TodoCard({
  item,
  handleChange,
  handleOnDelete,
  setTitle,
  setId,
  setDetails,
  setIsOpen,
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    setIsCompleted(item.isCompleted);
  }, []);

  return (
    <Card className={isCompleted ? styles.color1 : styles.color2}>
      <CardContent>
        <Typography variant="h5" component="h6">
          {item.title}
        </Typography>
        <Typography variant="body1" component="p">
          {item.details}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          sx={{ width: "100%", justifyContent: "flex-end" }}
        >
          <Checkbox
            checked={isCompleted}
            sx={{
              color: "rgba(0,0,0,1)",
              "&.Mui-checked": {
                color: "rgba(0,0,0,1)",
              },
            }}
            inputProps={{ "aria-label": "controlled" }}
            onChange={() => {
              setIsCompleted(!isCompleted);
              handleChange({ ...item, isCompleted: !item.isCompleted });
            }}
          />
          <IconButton
            sx={{ color: "black " }}
            onClick={() => {
              setTitle(item.title);
              setDetails(item.details);
              setId(item.id);
              setIsOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: "black" }}
            onClick={() => handleOnDelete(item)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default TodoCard;
