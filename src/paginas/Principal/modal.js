import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

const AddListModal = (props) => {
  const [list, setList] = useState({ name: "", user_id: null })

  return (
    <Modal show={show} onHide={handleClose} style={{ border: "solid" }}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  )
}
