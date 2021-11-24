import React from "react";
import { Row, Col, Form, Button, ListGroup } from "react-bootstrap";

export default function Notepad({ notepad }){

  const list = notepad
  const ground = "#FDFDFD"

  function verifyItemNameSize(name){

    if(notepad.is_notebook){

      if(name.length > 100) return name.substring(0,100) +" ..."
      return name


    }else{

      if(name.length > 10) return name.substring(0,10) +" ..."
      return name

    }

  }

return(
  <Col style={{ height:200, width:"100%", margin:10 }}>
    <div style={{
      width: "95%",
      height: "100%",
      backgroundColor:ground,
      padding: 20,
      border: "solid",
      borderRadius: 20,
      borderWidth: "1px",
      boxShadow: "5px 3px 0px 0px",
      //borderColor: "#E7E7E7"
    }}>
      <Row>
        <Col style={{
          fontSize: 24,
          color: "white",
          backgroundColor: notepad.color,
          borderRadius: 10,
          fontFamily: "Courier New" }}
          >{list?.name.length > 14? list.name.substring(0,14) +"...":list.name}</Col>
      </Row>

      <ListGroup variant="flush" style={{ marginTop: 7 }}>
        {list.items.slice(0,3).map((item, index) =>

          <ListGroup.Item style={{ marginBottom: 10, height:30,backgroundColor:ground, width:"100%" }} key={index}>
            <Row>
              <Col md={9} style={{ fontSize:14 }}>
                {verifyItemNameSize(item.name)}
              </Col>
            </Row>
          </ListGroup.Item>
        )
        }
      </ListGroup>

    </div>
  </Col>
)

}
