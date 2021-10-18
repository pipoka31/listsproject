import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";

//UseHistory
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../servicos/context"

//API
import API from "../../servicos/api";


const Login = () => {
  const { session, setSession } = useAuth()
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (session) history.push('/principal')
  }, [session])


  async function processLogin() {

    if (username == "") {
      setFeedback("Preencha o nome de usuário, por favor")
      return
    } else if (password == "") {
      setFeedback("Preencha a senha, por favor")
      return
    }

    await API.post("login", { username, password })
      .then((response) => {
        setSession({
          token: response.data.token,
          name: response.data.user.name,
          id: response.data.user.id,
          lists: response.data.user.lists
        })

        history.push("/principal");
      })
      .catch((err) => {
        console.log(err)
        setFeedback("Desculpe, não encontramos seu login :l")
      })

  }

  return (
    <Container fluid style={{ fontFamily: "Courier New" }}>

      <Row style={{ marginTop: window.innerHeight * (0.2) }}>
        <Col className="d-flex justify-content-center"
          style={{
            fontFamily: "Courier New",
            fontSize: 24,
            color: "#95AF5F",
            fontWeight: "bolder"
          }}>
          Lists
        </Col>
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
            <Form onSubmit={(e) => e.preventDefault()} >

              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Control placeholder="Usuário" style={{
                  borderColor: "#DE989A",
                  borderWidht: "1.5px",
                  width: 280,
                  outline: "none"
                }}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  style={{
                    borderColor: "#DE989A",
                    borderWidht: "1.5px",
                    width: 280,
                    outline: "none"
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                block
                type="submit"
                style={{
                  backgroundColor: "#DE989A",
                  border: "#DE989A",
                  borderRadius: 10,
                  width: 280
                }}
                onClick={() => processLogin()}
              >
                Vamos lá
              </Button>

            </Form>

            <p
              style={{ fontSize: 11, marginTop: 20, textAlign: "center" }}
            >Como assim você ainda não tem uma conta??<br /> <Link to="/criar">Crie agora</Link></p>

          </div>
        </Col>
      </Row>

    </Container >
  )

}

export default Login;
