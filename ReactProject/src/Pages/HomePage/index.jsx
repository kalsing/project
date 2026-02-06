import { useEffect, useState } from "react"
import api from "../../apis/api"
import { Box, Button, TextField, Typography, Paper, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import chan from "../../assets/3chan 2icon.png"
import DeleteIcon from '@mui/icons-material/Delete';


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
    getUserData();
  }

  async function deletePost(postId, postUserId) {
    if (Number(id) == postUserId) {
      const response = await api.delete(`posts/${postId}`, {
      })
      getPostData();
    }
  }

  async function createPost() {
    await api.post("/posts", {
      title: titulo,
      content: conteudo,
      userId: id
    });
    setTitulo("");
    setConteudo("");
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
      backgroundColor: "black",
      minHeight: '100vh',
      p: 2,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      <Box sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1100
      }}>
        <Box
          component="img"
          src={chan}
          sx={{
            width: 45,
            height: 45,
          }}
        />
      </Box>
      
      <Box>
            {id ? (
          <Typography color="#00eeff"
          >Logado como: {nome} {sobrenome}</Typography>
        ) : (
          <Typography color = "red"
          >Faça login</Typography>
        )}
        </Box>
        

      <Paper elevation={3}
        sx={{
          backgroundColor: "#4f4f4f",
          p: 2,
          width: 250,
          position: 'fixed',
          top: 20,
          left: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          zIndex: 1000
        }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="white">
          Login</Typography>
          

        <TextField
          label="Nome"
          variant="outlined"
          size="small"
          color="white"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />


        <TextField
          label="Sobrenome"
          variant="outlined"
          size="small"
          fullWidth
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <Button variant="contained"
          size="small"
          onClick={createUser}>
          Logar</Button>



      </Paper>

      <Paper elevation={2}
        sx={{
          backgroundColor: "#4f4f4f",
          p: 3,
          width: '100%',
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
          mb: 6
        }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="white">
          Novo Post</Typography>

        <TextField
          label="Titulo do Post"
          variant="outlined"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <TextField
          label="Conteudo do Post"
          variant="outlined"
          fullWidth
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={createPost}
        >Enviar Post</Button>
      </Paper>

      <Box sx={{ width: '100%', maxWidth: 800, mb: 4 }}>
        <Typography variant="h5"
          sx={{
            color: "white",
            mb: 3,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >Posts</Typography>

        {postData.map((post) => (
          <Paper key={post.id}
            sx={{
              p: 3,
              mb: 3,
              bgcolor: '#4f4f4f',
              borderRadius: 2
            }}>
            <Typography variant="h4"
              color="white"
              fontWeight="bold">
              {post.title}
            </Typography>

            <Typography variant="h6"
              color="white"
              fontWeight="bold">
              {post.content}
            </Typography>


            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              borderTop: '1px solid #460000fb'
            }}>
              <Typography
                variant="caption"
                color="textSecondary">
                Autor ID: {post.userId}
              </Typography>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <Typography
                  variant="body2"
                  color="error"

                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <FavoriteIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  {post.Likes.length}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => createLike(post.id)}
                >
                  Curtir
                </Button>
                {Number(id) === post.userId && (
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => deletePost(post.id, post.userId)}
                    sx={{
                      backgroundColor: '#00000071'
                    }
                    }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default HomePage;