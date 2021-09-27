import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { Context } from "../../servicos/context"

//FONT AWESOME ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

//API
import API from "../../servicos/api";

const Principal = () => {

  const informations = useContext(Context)
  const [lists, setLists] = useState(informations.infos.lists)
  const [newList, setNewList] = useState({ name: "", user_id: null })
  const [newItem, setNewItem] = useState({ name: "", type: "", flavor: "", list_id: null })
  const history = useHistory();

  const [listName, setListName] = useState("")

  useEffect(() => {
    API.interceptors.request.use(function Config(config) {
      config.headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${informations.infos.token}`
      }
      return config;
    });
  }, [])

  async function createList() {

    API.post("/list", newList)
      .then((response) => {
        setLists([...lists, newList])
        setNewList({ name: "", user_id: null })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  async function addItem() {

    API.post("/item", newItem)
      .then((response) => {
        let list = lists
        lists[newItem.list_id].push(newItem)

        setLists(list)
        setNewItem({ name: "", type: "", flavor: "", list_id: null })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <Container fluid style={{ fontFamily: "Courier New" }}>

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
                    informations.infos.lists.map((list) => {
                      <ListGroup.Item style={{ border: "solid", borderColor: "black", borderRadius: 80 }} action active={true}>{list.name}</ListGroup.Item>
                    })
                  }
                </ListGroup>
                :
                <ListGroup variant="flush">
                  <ListGroup.Item action>Vamos começar?! Clique em <FontAwesomeIcon icon={faPlusCircle} size="xs" color="#75903E" /> </ListGroup.Item>
                </ListGroup>
              }
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col className="d-flex justify-content-center"><FontAwesomeIcon icon={faPlusCircle} size="lg" color="#75903E" /></Col>
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
              <Col style={{ fontSize: 24, color: "white", backgroundColor: "#A799B7", borderRadius: 10 }}>Items da lista</Col>
            </Row>

            <Row style={{ marginBottom: 10 }}>

            </Row>
          </div>
        </Col>

      </Row>
    </Container >
  )

}

export default Principal;
