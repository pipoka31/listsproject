import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { Context } from "../../servicos/context"

//FONT AWESOME ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

//API
import API from "../../servicos/api";

//MODALS
import { AddListModal } from "./modal";

const Principal = () => {

  const informations = useContext(Context)
  const [lists, setLists] = useState(informations.infos.lists)
  const [newItem, setNewItem] = useState("")
  const [update, setUpdate] = useState(false)
  const [selectedList, setSelectedList] = useState({
      id: 0,
      name: "",
      user_id: null,
      items_quantity: null,
      items: []
    })
  const [showListModal, setShowListModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    (
      async function update(){
        await API.get(`lists/${informations.infos.id}`,{
          headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${informations.infos.token}`
        }})
        .then((response)=>{
          setLists(response.data.lists)
        })
        .catch((err)=>console.log(err))
      }
    )()
  }, [update])



  function modalListClose(value){
    setShowListModal(false);
    setUpdate(true)
  }

  async function addItem() {

    let item = {
      name: newItem,
      type:"item",
      list_id:selectedList.id
    }

    API.post("additem", item, {
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${informations.infos.token}`
    }})
      .then((response) => {
      setNewItem("")
      setUpdate(!update)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <Container fluid style={{ fontFamily: "Courier New" }}>
    {showListModal? <AddListModal show={true} user_id={informations.infos.id} close={modalListClose} token={informations.infos.token}/>:""}

      <Row style={{ marginTop: 20, boxShadow: "0px 3px rgb(0,0,0,0.1)" }}>
        <Col className="d-flex justify-content-start" style={{ fontSize: 18, marginBottom: 12 }}>Bem-vindo, {informations.infos.name}! ;)</Col>
        <Col className="d-flex justify-content-end" ><FontAwesomeIcon icon={faDoorOpen} onClick={() => history.push("/")} /></Col>
      </Row>

      <Row style={{ marginTop: 30 }} md={12}>
        <Col md={4}>
          <div style={{
            width: 330,
            height: "100%",
            padding: 20,

          }}>
            <Row style={{ marginBottom: 10 }} >
              <Col style={{ fontSize: 24, color: "white", backgroundColor: "#DE989A", borderRadius: 10 }}>Listas</Col>
            </Row>

            <Row>
              {informations.infos.lists.length > 0 ?
                <ListGroup variant="flush">
                  {
                    lists.map((list, index) =>
                      <ListGroup.Item key={index} onClick={()=>setSelectedList(list)}>{list.name}</ListGroup.Item>
                    )
                  }
                </ListGroup>
                :
                <ListGroup variant="flush">
                  <ListGroup.Item action>Vamos começar?! Clique em <FontAwesomeIcon icon={faPlusCircle} size="xs" color="#75903E" /> </ListGroup.Item>
                </ListGroup>
              }
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col className="d-flex justify-content-center" onClick={()=>setShowListModal(true)}>
              <FontAwesomeIcon icon={faPlusCircle} size="lg" color="#75903E" />
              </Col>
            </Row>
          </div>
        </Col>

        <Col style={{ height: window.innerHeight * (0.8) }}>
          <div style={{
            width: "70%",
            height: "100%",
            padding: 20,
            border: "solid",
            borderRadius: 20,
            borderWidth: "1px",
            boxShadow: "5px 3px gray",
            borderColor: "#E7E7E7"
          }}>
            <Row style={{ marginBottom: 20 }} >
              <Col style={{ fontSize: 24, color: "white", backgroundColor: "#A799B7", borderRadius: 10 }}>Items da lista {selectedList?.name}</Col>
            </Row>

            <Row>
            <Col>
              <Form onSubmit={(e)=>e.preventDefault()}>
                <Row>
                <Col md={9}>
                  <Form.Control
                  type="text"
                  style={{borderRadius:10}}
                  value={newItem}
                  onChange={(e)=>setNewItem(e.target.value)}
                  />
                  </Col>
                  <Col>
                  <Button
                  type="submit"
                  style={{
                    backgroundColor: "#DE989A",
                    border: "#DE989A",
                    borderRadius: 10,
                  }}
                  onClick={(e)=>addItem()}
                  >Adicionar</Button>
                  </Col>
                  </Row>


              </Form>
              </Col>

            </Row>

            <ListGroup variant="flush" style={{ marginTop:20 }}>
            {selectedList?.items.map((item, index)=>
              <ListGroup.Item style={{ marginBottom: 10 }} index={index}>
              <Row>
              <Col md={1}><Form.Check tyle="checkbox"/></Col>
                <Col>{item.name}</Col>
                <Col className="d-flex justify-content-end" ><FontAwesomeIcon icon = { faTrash }/></Col>
              </Row>
              </ListGroup.Item>
            )
            }
            </ListGroup>
          </div>
        </Col>

      </Row>
    </Container >
  )

}

export default Principal;
