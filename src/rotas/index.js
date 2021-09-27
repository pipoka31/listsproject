import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Context } from "../servicos/context";

//PAGINAS
import Login from "../paginas/Login";
import EditarUsuario from "../paginas/EditarUsuario";
import CriarUsuario from "../paginas/CriarUsuario";
import Principal from "../paginas/Principal";

export default function Rotas() {
  const context = useContext(Context);
  const Unathorized = () => <div>Faça o login primeiro :)</div>
  return (
    <Switch>
      <Route exact path="/" component={Login} />

      <Route exact path="/principal" component={context.infos.token != "" ? Principal : Unathorized} />
      <Route exact path="/editar" component={context.infos.token != "" ? EditarUsuario : Unathorized} />
      <Route exact path="/criar" component={CriarUsuario} />

    </Switch>
  )
}
