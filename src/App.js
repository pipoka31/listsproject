import React, { useState } from "react";
import './App.css';

//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
//ROTAS
import Rotas from "./rotas";
import { BrowserRouter as Router } from "react-router-dom";

//PROVIDER
import Provider from "./servicos/context"



function App() {
  const [token, setToken] = useState("He")
  return (
    <Provider>
      <Router>
        <Rotas />
      </Router>
    </Provider>
  );
}

export default App;
