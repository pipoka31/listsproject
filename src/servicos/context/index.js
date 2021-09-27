import React, { useState, createContext } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [infos, setInfos] = useState({
    token: "",
    name: "",
    id: "",
    lists: []
  });

  return (
    <Context.Provider value={{ infos, setInfos }}>
      {children}
    </Context.Provider>
  )

}

export default Provider
