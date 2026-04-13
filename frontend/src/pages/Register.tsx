import { useState } from "react"
import {API} from "../api/api"
import { Container, Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

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
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5" align="center">
              Create Account
            </Typography>

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Create User
            </Button>

            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login/", { replace: true })}
                sx={{ cursor: "pointer" }}
              >
                Login
              </Link>
            </Typography>

          </Box>
        </Paper>
      </Container>
    </form>
  )
}

export default Register