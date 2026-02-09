import { useEffect, useState } from "react"
import api from "../../apis/api"
import { Box, Button, TextField, Typography, Paper, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import chan from "../../assets/3chan 2icon.png"
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

function UserCreate() {
    const [userData, setUserData] = useState([]);
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const navigate = useNavigate();

    async function createUser() {
      const response = await api.post("/users", {
            firstName: nome,
            lastName: sobrenome
        })
        getUserData();
        navigate('/homepage', {state: {
                userId: response.data.id,
                nome: nome,
                sobrenome: sobrenome,
            }});
    }

    async function getUserData() {
        const getUserResponse = await api.get("/users");
        setUserData(getUserResponse.data);
    }

    useEffect(() => {
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

            <Paper elevation={3}
                sx={{
                    backgroundColor: "#4f4f4f",
                    p: 2,
                    width: 500,
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    zIndex: 1000
                }}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="black">
                    Login</Typography>

                <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}>
                </TextField>

                <TextField
                    label="Sobrenome"
                    variant="outlined"
                    fullWidth
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}>
                </TextField>

                <Button
                    variant="contained"
                    onClick={createUser}
                >
                    Logar
                </Button>
            </Paper>
        </Box>
    )
}

export default UserCreate;