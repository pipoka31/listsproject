import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../servicos/context"

//FONT AWESOME ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash, faDoorOpen, faSearch } from '@fortawesome/free-solid-svg-icons'

//API
import API from "../../servicos/api";

//MODALS
import { AddListModal } from "./modal";

//COMPONENTS
import Notepad from "../../componentes/notepad"
import EditableNotepad from "../../componentes/editableNotepad"

const Principal = () => {
  const { session, setSession } = useAuth()
  const [lists, setLists] = useState(session?.lists)
  const [update, setUpdate] = useState(false)
  const [selectedList, setSelectedList] = useState({
    id: 0,
    name: "",
    user_id: null,
    items_quantity: null,
    items: []
  })
  const [showListModal, setShowListModal] = useState(false);

  const size = [4,5,3]

  const history = useHistory();

  useEffect(() => {
    if (!session) {
      history.push('/')
    }
  }, [session, history])


  useEffect(() => {
    (
      async function update() {
        await API.get(`lists/${session?.id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${session?.token}`
          }
        })
          .then((response) => {
            if (response.data.length == 1) {
              setSelectedList(response.data[0])
            }
            console.log(response.data)
            setLists(response.data.lists)

            response.data.lists.map((list) => {
              if (list.id == selectedList.id) {
                setSelectedList(list)
              }
            })
          })
          .catch((err) => console.log(err))
      }
    )()
  }, [update])



  function modalListClose(value) {
    setShowListModal(false);
    setUpdate(!update)
  }

  async function addItem(newItem) {

    let item = {
      name: newItem,
      type: "item",
      list_id: selectedList.id
    }

    await API.post("item", item, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${session?.token}`
      }
    })
      .then((response) => {
        setUpdate(!update)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  async function deleteItem(item) {
    let payload = {
      done: item.done ? 1 : 0,
      flavor: item.flavor,
      item_id: item.id,
      list_id: item.list_id,
      name: item.name,
      type: item.type
    }

    await API.delete("item", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${session?.token}`,
      },
      data: payload
    })
      .then(() => setUpdate(!update))
      .catch((err) => console.log(err))

  }

  async function updateItem(payload) {
    console.log(payload)
    await API.put("item", payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${session?.token}`
      }
    })
      .then((response) => {
        setUpdate(!update)
      })
      .catch((err) => console.log(err))

  }

  function signOut() {
    setSession(null)
  }

  function closeSelectedList(){
    setSelectedList({
      id: 0,
      name: "",
      user_id: null,
      items_quantity: null,
      items: []
    })
    setUpdate(!update)
  }


  return (
    <Container fluid style={{ fontFamily: "Courier New" }}>
      {showListModal ? <AddListModal show={true} user_id={session?.id} close={modalListClose} token={session?.token} /> : ""}

      <Row style={{ margin: 12, boxShadow: "0px 3px 3px 3px rgb(0,0,0,0.1)", borderRadius:10, padding:7 }}>
        <Col className="d-flex justify-content-start" style={{ fontSize:18, color:"#75903E", borderRadius:20 }}> List
        {//<Row><small>Bem-vindo, {session?.name}! ;)</small></Row>
        }
        </Col>


        <Col className="row justify-content-center">
          <input style={{
            padding:3,
            border:"solid",
            borderColor: "#DE989A",
            borderWidth:1.5,
            outline:"none",
            //backgroundColor:"rgb(0,0,0,0.1)",
            borderRadius: 10,
            width:"100%" }}/>

        </Col>
        {
          //<Col onClick={()=> history.push("/editar")} >Editar perfil</Col>
        }
        <Col className="d-flex justify-content-end" ><FontAwesomeIcon icon={faDoorOpen} onClick={signOut} /></Col>
      </Row>

      <Row style={{ marginTop: 24 }} md={12}>
{
//         <Col>
//
//         <div style={{
//           border:"solid",
//           borderWidth:2,
//           borderRadius:10,
//           height:"80%",
//           width:"100%"
//         }}>
//
//         </div>
//
//
//         </Col>
}

        {
          lists.length > 0 ?
            <Col md={12}>

            <Row>

            {selectedList.id === 0?
              <div>
              <Row style={{ marginBottom: 5 }}>
                <Col className="d-flex justify-content-center" onClick={() => setShowListModal(true)}>
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" color="#75903E" />
                </Col>
              </Row>

              <Row>
              {lists.map((list, index)=>
              <Col md={list.is_notebook?6:3} onClick={()=> {
                setSelectedList(list)
              }}>
                <Notepad notepad={list}/>
              </Col>

            )}
            </Row>
            </div>
            :
            <EditableNotepad
            close={closeSelectedList}
            selectedList={selectedList}
            deleteItem={deleteItem}
            updateItem={updateItem}
            addItem={addItem}
            />
            }
            </Row>

            </Col>
            :
            <AddListModal show={true} user_id={session?.id} close={modalListClose} token={session?.token} />
        }

      </Row>
    </Container >
  )

}

export default Principal;
