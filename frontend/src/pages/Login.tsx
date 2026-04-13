import { useState } from "react";
import {API} from "../api/api";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography, Link } from "@mui/material";

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
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, maxWidth: 400, margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          
          <Typography variant="h5" align="center">
            Login
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
          >
            Login
          </Button>

          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link
              component="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register", { replace: true });
              }}
            >
              Register
            </Link>
          </Typography>

        </Box>
      </Paper>
    </form>
  )
}

export default Login