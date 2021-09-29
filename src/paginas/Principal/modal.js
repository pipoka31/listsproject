import React, { useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";

import API from "../../servicos/api";

export const AddListModal = (props) => {
  const [list, setList] = useState({ name: "", user_id: props.user_id })

  async function createList() {

    await API.post("/list", list, {
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${props.token}`
    }})
      .then((response) => {
        props.close()

      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal show={true} style={{ borderRadius:10, borderWidth:2 }} onHide={()=> props.close()} >
      <Modal.Header closeButton>

      </Modal.Header>
      <Modal.Body>
          <Form onSubmit={(e)=>e.preventDefault()}>
            <Form.Group>
              <Form.Label>Nome da lista</Form.Label>
                <Form.Control
                style={{
                 borderColor: "#DE989A",
                 borderWidht: "1.5px",
                 outline: "none"
               }}
                type="text"
                onChange={(e)=>setList({...list,name: e.target.value})}
                />
            </Form.Group>
            <Row>
            <Col>
            <Button
              type="submit"
              style={{
                backgroundColor: "#DE989A",
                border: "#DE989A",
                borderRadius: 10,
                marginTop:20
              }}
              onClick={()=>createList()}
            >
              Feito!
            </Button>
            </Col>
            </Row>
          </Form>
      </Modal.Body>

    </Modal>
  )
}

export const AddItemList = (props) => {
  const [list, setList] = useState({ name: "", user_id: null })

  return (
    <Modal show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          Close
          </Button>
        <Button variant="primary">
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  )
}
