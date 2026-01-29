import { useState } from "react"
import api from "../../apis/api"

function HomePage() {
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")

  async function postUser() {
    await api.post("/users", {
    firstName: nome,
    lastName: sobrenome
    })}

  return (
<div className="tantofaz">
  <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
/>

 <input
        type="text"
        placeholder="Sobrenome"
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
/>

    <button onClick={postUser}>Enviar</button>
    </div>
  )}

export default HomePage;
