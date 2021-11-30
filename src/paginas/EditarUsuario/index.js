import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";

//FONT AWESOME ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash, faDoorOpen, faSearch } from '@fortawesome/free-solid-svg-icons'

//UseHistory
import { useHistory, Link } from "react-router-dom";

//API
import API from "../../servicos/api";

const EditarUsuario = () => {

  const history = useHistory()

  const [message, setMessage] = useState("Hello World");
  const [name, setName] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [feedback, setFeedback] = useState("")

  async function updateUser() {

    if (name == "") {
      setFeedback("Preencha o seu nome, por favor")
      return
    } else if (username == "") {
      setFeedback("Preencha o nome de usuário, por favor")
      return
    } else if (password == "") {
      setFeedback("Preencha a senha, por favor")
      return
    } else if (password != passwordAgain) {
      setFeedback("As senhas são diferentes")
      return
    }
    console.log("chegou")
    await API.post("user", { name: name, username: username, password: password })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        if (err.reponse.message == "User already exists") {
          setFeedback("Usuário já existe")
        } else {
          setFeedback("Ocorreu um erro, tente mais tarde :l")
        }
      })
  }

  return (
    <Container fluid style={{ fontFamily: "Courier New" }}>

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
      <Col onClick={()=> history.push("/editar")} >Editar perfil</Col>
      <Col className="d-flex justify-content-end" ><FontAwesomeIcon icon={faDoorOpen} onClick={()=>{}} /></Col>
    </Row>


      <Row>
        <Col className="d-flex justify-content-center">
          <div style={{
            border: "solid",
            padding: 20,
            borderRadius: 5,
            borderWidth: "1.5px",
            margin: 5,
            boxShadow: "5px 3px 0px 0px"
          }}>
            <p style={{ fontSize: 12 }}>{feedback}</p>
            <Form onSubmit={(e)=> e.preventDefault()}>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control placeholder="Nome" style={{
                  borderColor: "#DE989A",
                  borderWidht: "1.5px",
                  width: 280,
                  outline: "none"
                }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control placeholder="Usuário" style={{
                  borderColor: "#DE989A",
                  borderWidht: "1.5px",
                  width: 280,
                  outline: "none"
                }}
                  onChange={(e) => setUsername(e.target.value)}
                />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  placeholder="Senha"
                  type="password"
                  style={{
                    borderColor: "#DE989A",
                    borderWidht: "1.5px",
                    width: 280,
                    outline: "none"
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  placeholder="Confirme a senha"
                  type="password"
                  style={{
                    borderColor: "#DE989A",
                    borderWidht: "1.5px",
                    width: 280,
                    outline: "none"
                  }}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                block
                style={{
                  backgroundColor: "#DE989A",
                  border: "#DE989A",
                  borderRadius: 10,
                  width: 280
                }}
                onClick={() => updateUser()}
              >
                Pronto para começar!
              </Button>

            </Form>

            <p
              style={{ fontSize: 11, marginTop: 20, textAlign: "center" }}
            ><Link to="/">Já tenho uma com usuário e tudo mais</Link></p>

          </div>
        </Col>
      </Row>

    </Container >
  )

}

export default EditarUsuario;
