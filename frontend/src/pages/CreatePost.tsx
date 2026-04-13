import { useState } from "react"
import {API} from "../api/api"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";


const CreatePost = () => {

  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    const formData = new FormData()

    formData.append("title", title)

    if (file) {
      formData.append("file", file)
    }

    await API.post("/posts", formData)

    navigate("/")
  }

  return (
    <div>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Create Post
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />

              <Button
                variant="outlined"
                component="label"
              >
                Upload PDF
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="large"
              >
                Create
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default CreatePost