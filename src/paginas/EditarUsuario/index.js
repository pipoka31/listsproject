import React, { useState, useEffect } from "react";

const EditarUsuario = () => {

  const [message, setMessage] = useState("Hello World");

  return (
    <div class="row">
      {message}
    </div>
  )

}

export default EditarUsuario;
