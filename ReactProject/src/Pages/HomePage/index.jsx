import { useEffect, useState } from "react"
import api from "../../apis/api"
import { Button, TextField, Typography } from "@mui/material";

function HomePage() {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")

  async function postUser() {
    await api.post("/users", {
    firstName: nome,
    lastName: sobrenome
    })}

    async function getUserData() {
     const getUserResponse = await api.get("/users");
      setUserData(getUserResponse.data);
    }

    
    async function getPostData() {
    const getPostResponse = await api.get("/posts");
     setPostData(getPostResponse.data);
    }

    useEffect(() => {
      getPostData();
      getUserData();
    }, [])

    useEffect(() => {
    console.log(userData)
  }, [userData])

      useEffect(() => {
    console.log(postData)
  }, [postData])

  return (


<div className="CreateUser">
  <TextField
    id="outlined-basic"
    variant="outlined"
    label="Nome"
    value={nome}
    onChange={(e) => setNome(e.target.value)}> 
  </TextField>

  <TextField
    id="outlined-basic"
    variant="outlined"
    label="Sobrenome"
    value={sobrenome}
    onChange={(e) => setSobrenome(e.target.value)}> 
  </TextField>
    <Button
    variant="outlined">
      Criar Usuario
    </Button>
    </div>

    
  )}



export default HomePage;
