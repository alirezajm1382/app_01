import { useEffect, useState } from "react";
import styles from "../styles/TodoCard.module.css";
import Form from "react-bootstrap/Form";

function TodoCard({ item, handleChange }) {
  const [isCompleted, setisCompleted] = useState(false);
  useEffect(() => {
    handleChange({ ...item, isCompleted: !item.isCompleted });
  }, [isCompleted]);
  return (
    <div className={isCompleted ? styles.color1 : styles.color2}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div>
          <h5 className={isCompleted ? styles.text2 : ``}>{item.title}</h5>
          <p className={isCompleted ? styles.text2 : ``}>{item.details}</p>
        </div>
        <div className="d-flex justify-content-end gap-2 align-item-end">
          <p className={styles.statusText}>
            <strong>Status</strong>
          </p>
          <Form.Check
            type="checkbox"
            id="todo_isCompleted"
            name="todo_isCompleted"
            onChange={() => {
              if (isCompleted) setisCompleted(false);
              else setisCompleted(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
