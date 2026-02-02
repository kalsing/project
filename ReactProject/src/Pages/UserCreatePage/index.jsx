import { useEffect, useState } from "react"
import api from "../../apis/api"
import { Box, Button, TextField, Typography } from "@mui/material";

function UserCreate() {
    const [userData, setUserData] = useState([]);
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

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <Box
            sx={{
                backgroundColor: 'grey',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                padding: 2,
                gap: 2
            }}
        >
            <TextField
                id="outlined-nome"
                label="Nome"
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <TextField
                id="outlined-sobrenome" 
                label="Sobrenome"
                variant="outlined"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
            />

            <Button 
                variant="contained" 
                onClick={postUser}
            >
                Criar Usuário
            </Button>
        </Box>
    )
}

export default UserCreate;