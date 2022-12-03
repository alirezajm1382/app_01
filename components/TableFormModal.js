import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useRef, useEffect } from "react";
import { customAlphabet } from "nanoid";

export default function TableFormModal({
  setModalState,
  addState,
  handleAddItem,
  handleUpdateItem,
  selectedItem,
}) {
  const nanoid = customAlphabet("1234567890");
  const uid_ref = useRef(null);
  const title_ref = useRef(null);
  const body_ref = useRef(null);
  const handleClose = () => setModalState(false);
  useEffect(() => {
    if (!addState) {
      uid_ref.current.value = selectedItem.userId;
      title_ref.current.value = selectedItem.title;
      body_ref.current.value = selectedItem.body;
    }
  }, []);
  return (
    <Modal show={true} backdrop="static" onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{addState ? `Add` : `Edit`} Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingUserId"
          label="User ID"
          className="mb-3"
        >
          <Form.Control type="number" placeholder="User ID" ref={uid_ref} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Title"
            style={{ height: "100px" }}
            ref={title_ref}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingBody" label="Body">
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Body"
            style={{ height: "200px" }}
            ref={body_ref}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() =>
            addState
              ? handleAddItem({
                  userId: +uid_ref.current.value,
                  id: +nanoid(),
                  title: title_ref.current.value,
                  body: body_ref.current.value,
                })
              : handleUpdateItem({
                userId: +uid_ref.current.value,
                id: selectedItem.id,
                title: title_ref.current.value,
                body: body_ref.current.value,
              })
          }
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
