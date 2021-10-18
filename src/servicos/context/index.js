import React, { createContext, useContext } from "react";
import useLocalStorage from 'use-local-storage';

export const Context = createContext();

export function useAuthProvider() {
  const [session, setSession] = useLocalStorage('session', null)

  return { session, setSession }
}

const Provider = ({ children }) => {
  const auth = useAuthProvider()

  // const [infos, setInfos] = useState({
  //   token: "",
  //   name: "",
  //   id: "",
  //   lists: []
  // });

  return (
    <Context.Provider value={auth}>
      {children}
    </Context.Provider>
  )

}

export default Provider

export function useAuth() {
  return useContext(Context)
}
