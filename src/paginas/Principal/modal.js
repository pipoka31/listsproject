import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";

import API from "../../servicos/api";

export const AddListModal = (props) => {
  const [list, setList] = useState({
    name: "",
    user_id: props.user_id,
    is_notebook: 0,
    color: "#A799B7",
  });
  const nameInput = useRef(null)

  useEffect(()=>{
     nameInput.current.focus()
  },[])

  const colors = [
    "#A799B7",
    "#F6BD60",
    "#F5CAC3",
    "#F28482",
    "#4D908E",
    "#b5c99a",
    "#ddbea9",
    "#98c1d9",
    "#ffb5a7",
    "#f2b5d4",
  ];

  async function createList() {

    if(list.name !== ""){

    await API.post("/list", list, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((response) => {
        props.close();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <Modal
      show={true}
      style={{ borderRadius: 10, borderWidth: 2, fontFamily:"Courier" }}
      onHide={() => props.close()}
    >
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              ref={nameInput}
              className="form-control shadow-none"
              style={{
                borderColor: "#DE989A",
                borderWidht: "1.5px",
                outline: "tranparent",
              }}
              type="text"
              onChange={(e) => setList({ ...list, name: e.target.value })}
            />
            <Form.Text className="text-muted" style={{ fontSize:12 }}>
            Campo obrigatório
            </Form.Text>
          </Form.Group>

          <Form.Group style={{ marginTop: 14 }}>
            <Form.Check
              type="checkbox"
              label="Caderno"
              checked={list.is_notebook === 1}
              onClick={() => setList({ ...list, is_notebook: 1 })}
            />
            <Form.Check
              type="checkbox"
              label="Lista"
              checked={list.is_notebook === 0}
              onClick={() => setList({ ...list, is_notebook: 0 })}
            />
          </Form.Group>

          <Row style={{ marginTop:14 }}>
            {colors.map((color) => (
              <Col md={1}>
                <div
                  style={{
                    borderRadius: 50,
                    backgroundColor: color,
                    marginTop: 10,
                    width: 20,
                    height: 25,
                    border: list.color === color ? "solid" : "none",
                    borderWidth: 1,
                  }}
                  onClick={() => setList({ ...list, color: color })}
                ></div>
              </Col>
            ))}
          </Row>

          <Row>
            <Col>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#DE989A",
                  border: "#DE989A",
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onClick={() => createList()}
              >
                Feito!
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
