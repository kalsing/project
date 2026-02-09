import { useEffect, useState } from "react"
import api from "../../apis/api"
import { Box, Button, TextField, Typography, Paper, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import chan from "../../assets/3chan 2icon.png"
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from "react-router-dom";

function HomePage() {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")
  const location = useLocation();
  const { userId, nome, sobrenome } = location.state;

  async function deletePost(postId, postUserId) {
    if (Number(userId) == postUserId) {
      const response = await api.delete(`posts/${postId}`, {
      })
      getPostData();
    }
  }

  async function createPost() {
    await api.post("/posts", {
      title: titulo,
      content: conteudo,
      userId: userId
    });
    setTitulo("");
    setConteudo("");
    getPostData();
  }

  async function createLike(postId) {
    await api.post("/likes", {
      userId: Number(userId),
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
        top: 0,
        left: 5,
        zIndex: 1100
      }}>
        <Box
          component="img"
          src={chan}
          sx={{
            width: 110,
            height: 110,
          }}
        />
      </Box>

      <Box
      transform sx={{
        transform: "translateY(5px)",
      }}  
      >
        {userId ? (
          <Typography
            color="black"
            variant="body1"
            sx={{
              mt: 1,
              p: 1,
              textAlign: 'center',
              animation: 'blink 0.8s infinite steps(1)',
              '@keyframes blink': {
                '0%': { backgroundColor: '#00ff00' },
                '50%': { backgroundColor: '#fbff00' },
                '100%': { backgroundColor: '#00ff00' }
              }
            }}
          >
             <Typography>
              ID: {userId}
            </Typography>
            Logado como: {nome} {sobrenome}
          </Typography>
          
          
        ) : (
          <Typography color="red"
            variant="h4"
          >Faça login</Typography>
        )}
      </Box>


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
          color="black">
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
          color="warning"
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
              color="black"
              fontWeight="bold">
              {post.title}
            </Typography>

            <Typography variant="h6"
              color="#00ff0d"
              fontWeight="bold">
              {post.content}
            </Typography>


            <Box
              sx={{
                pt: 2,
                borderTop: '1px solid #000000f8',
              }}
            >
              <Typography variant="subtitle1" color="textSecondary" display="block">
                Autor ID: {post.userId}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary" display="block">
                Nome do Autor: {nome} {sobrenome}
              </Typography>


              <Box sx={{
                display: 'flex',
                transform: "translateY(5px)",
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
                {Number(userId) === post.userId && (
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