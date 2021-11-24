import React, { useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";

import API from "../../servicos/api";

export const AddListModal = (props) => {
  const [list, setList] = useState({
    name: "",
    user_id: props.user_id ,
    is_notebook: 0,
    color:"#A799B7"
  })

  const colors = ["#A799B7","#F6BD60","#F5CAC3","#F28482","#4D908E","#b5c99a","#ddbea9","#98c1d9","#ffb5a7","#f2b5d4"]

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

  function notebookCheck(value){

  }

  return (
    <Modal show={true} style={{ borderRadius:10, borderWidth:2 }} onHide={()=> props.close()} >

      <Modal.Body>
          <Form onSubmit={(e)=>e.preventDefault()}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
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

            <Form.Group style={{ marginTop:5 }}>

                <Form.Check type="checkbox" label="Caderno" isSelected={list.is_notebook == 1} onClick={()=>setList({...list,is_notebook:1})}/>
                <Form.Check type="checkbox" label= "Lista" isSelected={list.is_notebook == 0} onClick={()=>setList({...list,is_notebook:0})}/>

            </Form.Group>

            <Row>
            {colors.map((color)=>
              <Col md={1}>
                <div style={{
                  borderRadius: 50,
                  backgroundColor: color,
                  marginTop:10,
                  width:20,
                  height:25,
                  border: list.color == color?"solid":"none",
                  borderWidth:1
                 }}
                 onClick={()=>setList({...list, color:color})}
                 >
                </div>
              </Col>
            )}
            </Row>



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
