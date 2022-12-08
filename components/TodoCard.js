import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  Stack,
} from "@mui/material";
import styles from "../styles/TodoCard.module.css";
import Form from "react-bootstrap/Form";

function TodoCard({ item, handleChange }) {
  const [isCompleted, setisCompleted] = useState(false);
  let style = "";
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
              color: 'rgba(0,0,0,1)',
              "&.Mui-checked": {
                color: 'rgba(0,0,0,1)',
              },
            }}
            onChange={() => {
              if (isCompleted) setisCompleted(false);
              else setisCompleted(true);
            }}
          />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default TodoCard;
