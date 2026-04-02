import { useState } from "react"
import {API} from "../api/api"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    const form = new URLSearchParams()
    form.append("username", email)
    form.append("password", password)

    const res = await API.post("/login/", form)

    localStorage.setItem("token", res.data.access_token)
    navigate("/", { replace: true }); 
    
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

      <button>Login</button>

    </form>
  )
}

export default Login