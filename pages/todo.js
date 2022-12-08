import Head from "next/head";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/form";
import { useRef, useState } from "react";
import TodoCard from "../components/TodoCard";
import { nanoid } from "nanoid";

function TodoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  const handleModalClose = () => setIsOpen(false);
  const handleModal = () => {
    return (
      <Modal show={true} backdrop="static" onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add To-do Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingTitle"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Title"
              ref={titleRef}
              autoComplete="off"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingDetails"
            label="Details"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Details"
              style={{ height: "200px" }}
              ref={detailsRef}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={() => handleModalClose()}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              setTodoList([
                ...todoList,
                {
                  id: nanoid(),
                  title: titleRef.current.value,
                  details: detailsRef.current.value,
                  isCompleted: 0,
                },
              ]);
              setIsOpen(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
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
      <div className="mt-5 me-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Todo</h2>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Add an Item
          </Button>
        </div>
        <hr />
        <div className="todo_grid">
          {todoList.length !== 0 ? (
            todoList.map((todoListItem) => {
              return <TodoCard key={todoListItem.id} item={todoListItem} handleChange={handleChange} />;
            })
          ) : (
            <h4>No To-dos. Hooray. You're way ahead for today!</h4>
          )}
        </div>
        {isOpen && handleModal()}
      </div>
    </div>
  );
}

export default TodoPage;
