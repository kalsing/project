import { useEffect, useState } from "react"
import api from "../../apis/api"
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

function HomePage() {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [id, setId] = useState("")

  async function createUser() {
    const response = await api.post("/users", {
      firstName: nome, 
      lastName: sobrenome
    });
    setId(response.data.id);
  }

  async function createPost() {
    await api.post("/posts", {
      title: titulo,
      content: conteudo,
      userId: id 
    });
    setTitulo("");
    getPostData();
  }

  async function createLike(postId) {
    await api.post("/likes", {
      userId: Number(id),
      postId: Number(postId) 
    });
    getPostData(); 
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

  return (
    <Box sx={{
      backgroundColor: '#f0f2f5',
      minHeight: '100vh', p: 4,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      gap: 4
    }}>

      <Paper elevation={2}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
        <Typography variant="h6" fontWeight="bold">Login</Typography>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Sobrenome"
          variant="outlined"
          fullWidth
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <Button variant="contained" onClick={createUser}>Criar Usuario</Button>
      </Paper>

      <Paper elevation={2}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
        <Typography variant="h6" fontWeight="bold">Novo Post</Typography>

        <TextField
          label="Título do Post"
          variant="outlined"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <TextField
          label="ID do Autor"
          variant="outlined"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Button variant="contained"
          color="secondary"
          onClick={createPost}
        >Enviar Post</Button>
      </Paper>

      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h5"
          sx={{
            mb: 2,
            fontWeight: 'bold'
          }}
        >Posts</Typography>

        {postData.map((post) => (
          <Paper key={post.id}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: '#1e1e1e',
              color: 'white'
            }}>

            <Typography variant="subtitle1"
              color="#4caf50"
              fontWeight="bold">
              {post.title}
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1
            }}>

              <Typography variant="caption"
                color="gray"
              >ID Autor: {post.userId}
              </Typography>

              <Typography variant="caption"
                color="#f44336"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {post.Likes?.length || 0} 
                
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="error"
                  onClick={() => createLike(post.id)}
                >
                  Like
                </Button>
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default HomePage;