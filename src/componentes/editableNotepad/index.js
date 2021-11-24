import React,{ useState } from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash, faDoorOpen, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function EditableNotepad({ selectedList, deleteItem, addItem, updateItem, close }){

  const [ newItem, setNewItem ] = useState("")
  const ground = "#FDFDFD"

  return(
    <Col md={12} style={{ height: window.innerHeight * (0.8) }} className="row justify-content-center">
      <Row>
        <Col><FontAwesomeIcon icon={faArrowLeft} onClick={()=>close()}/></Col>
      </Row>
      <div style={{

        width: "90%",
        height: "100%",
        backgroundColor:ground,
        padding: 20,
        border: "solid",
        borderRadius: 10,
        borderWidth: "1.5px",
        boxShadow: "5px 3px 0px 0px",

      }}>
        <Row style={{ marginBottom:10 }}>
          <Col style={{
            fontSize: 24,
            color: "white",
            backgroundColor: selectedList.color,
            borderRadius: 10,
            fontFamily: "Courier New"
          }}>{selectedList.name}</Col>
        </Row>
        {
        // <Row style={{ marginBottom: 20, marginTop: 5 }} noGutters>
        //   <Col style={{ fontSize: 12, color: "black", fontFamily: "Courier New" }}>Criada por: {session?.name}</Col>
        // </Row>
        }

        {!selectedList.is_notebook?
        <Row>
          <Col>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    style={{ borderRadius: 10, backgroundColor: ground }}
                    value={newItem}
                    onChange={(e) => {
                      if(e.target.value != "" || newItem.length > e.target.value.length) setNewItem(e.target.value)
                    }}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    type="submit"
                    block
                    style={{
                      backgroundColor: selectedList.color,
                      border: selectedList.color,
                      borderRadius: 10,
                    }}
                    onClick={(e) => {
                        if(newItem.length != 0){
                        addItem(newItem)
                        setNewItem("")
                      }

                    }}
                  >Salvar</Button>
                </Col>
              </Row>


            </Form>
          </Col>

        </Row>
        :
        ""
      }
        {!selectedList.is_notebook?
        <ListGroup variant="flush" style={{ marginTop: 20 }}>
          {selectedList?.items.map((item, index) =>
            <ListGroup.Item style={{ marginBottom: 10, backgroundColor: ground }} key={index}>
              <Row>
                <Col md={1}><Form.Check checked={item.done} type="checkbox" onClick={(e)=> updateItem({
                    name: item.name,
                    flavor: item.flavor,
                    type: item.type,
                    item_id: item.id,
                    list_id: item.list_id,
                    done: e.target.checked?1:0
                  })
                }/></Col>
                <Col md={9}>
                  <Form.Control
                  style={{ border:"none", outline:"none", backgroundColor: ground }}
                  defaultValue={item.name}
                  onBlur={(e)=> {
                    updateItem({
                      name: e.target.value,
                      flavor: item.flavor,
                      type: item.type,
                      item_id: item.id,
                      list_id: item.list_id,
                      done: 0
                    })
                  }}
                  />
                </Col>
                <Col className="d-flex justify-content-end" onClick={() => deleteItem(item)} ><FontAwesomeIcon icon={faTrash} /></Col>
              </Row>
            </ListGroup.Item>
          )
          }
        </ListGroup>
        :
        <Form.Control
        as="textarea"
        defaultValue={selectedList.items[0]?.name}
        style={{
          outline:"none",
          height:"90%",
          border:"none",
          backgroundColor:ground
        }}
        onBlur={(e)=> selectedList.items.length == 0? addItem(e.target.value) : updateItem({
          name: e.target.value,
          flavor: selectedList.items[0].flavor,
          type: selectedList.items[0].type,
          item_id: selectedList.items[0].id,
          list_id: selectedList.items[0].list_id,
          done: 0
        })}/>
      }
      </div>
    </Col>
  )

}
