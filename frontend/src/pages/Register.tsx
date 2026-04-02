import { useState } from "react"
import {API} from "../api/api"

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    await API.post("/users/", {
      email,
      password
    })

    alert("User created")
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Create User</button>

    </form>
  )
}

export default Register