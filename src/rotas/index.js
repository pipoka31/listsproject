import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "../servicos/context";

//PAGINAS
import Login from "../paginas/Login";
import EditarUsuario from "../paginas/EditarUsuario";
import CriarUsuario from "../paginas/CriarUsuario";
import Principal from "../paginas/Principal";

function ProtectedRoutes(props) {
  const { session } = useAuth();
  return (
    <Route
      render={() => (session ? props.children : <Redirect to={'/'} />)}
    />
  )
}

export default function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <ProtectedRoutes>
        <Route exact path="/principal" component={Principal} />
        <Route exact path="/editar" component={EditarUsuario} />
        <Route exact path="/criar" component={CriarUsuario} />
      </ProtectedRoutes>

    </Switch>
  )
}
