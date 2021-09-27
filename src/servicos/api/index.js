import axios from "axios";

// Pode ser algum servidor executando localmente:
// http://localhost:3000

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});


// This should already be declared in your API file
export default API;
