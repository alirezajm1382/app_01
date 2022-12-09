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
import styles from "../styles/TodoCard.module.css";

function TodoCard({
  item,
  handleChange,
  setTitle,
  setId,
  setDetails,
  setIsOpen,
}) {
  const [isCompleted, setisCompleted] = useState(false);
  useEffect(() => {
    handleChange({ ...item, isCompleted: !item.isCompleted });
  }, [isCompleted]);

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
            sx={{
              color: "rgba(0,0,0,1)",
              "&.Mui-checked": {
                color: "rgba(0,0,0,1)",
              },
            }}
            onChange={() => {
              if (isCompleted) setisCompleted(false);
              else setisCompleted(true);
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
        </Stack>
      </CardActions>
    </Card>
  );
}

export default TodoCard;
