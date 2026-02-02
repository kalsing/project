import { useEffect, useState } from "react"
import api from "../../apis/api"
import { Box, Button, TextField, Typography } from "@mui/material";

function HomePage() {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")

  async function postUser() {
    await api.post("/users", {
      firstName: nome,
      lastName: sobrenome
    })
  }

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
    <Box
      sx={{
        backgroundColor: 'grey',
        minHeight: '100vh',
        display: 'flex',
        ustifyContent: 'center',
        alignItems: 'center',
        padding: 2
        //-- lembrar de criar um global CSS para melhor organizacao
      }}
    >
      <Box
        sx={{
          backgroundColor: "darkgray",
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 4,
          borderRadius: 2
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <TextField
          id="outlined-basic-2"
          variant="outlined"
          label="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />


        <Button variant="outlined">
          Criar Usuario
        </Button>
      </Box>

      <Box sx={{
        backgroundColor: "#1e1e1e",
        padding: 3,
        borderRadius: 2,
        display: "flex",

        maxWidth: 600,
      }}>

        <Typography
          variant="h5"
          color="white"
        > Posts </Typography>

        {postData.map((post) => (
          <Box
            key={post.id}
            sx={{
              bgcolor: "#2a2a2a",
              padding: 2,
              mb: 2,
            }}
          >
            <Typography color="green">
              {post.title}
            </Typography>

            <Typography
              color="red"
              sx={{ mt: 1 }}>
              {post.Likes.length} Curtidas
            </Typography>

          </Box>
        ))}


      </Box>
    </Box>
  )
}




export default HomePage;
