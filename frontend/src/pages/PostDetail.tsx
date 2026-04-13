import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {API, backendURL} from "../api/api"
import { jwtDecode } from "jwt-decode"
import Navbar from "../components/Navbar"
import type { PostDetail as PostType } from "../types/types"
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

interface TokenPayload {
    user_id: number
}

const PostDetail = () => {
 const navigate = useNavigate()

  const { id } = useParams()

  const [post, setPost] = useState<PostType | null>(null)

    const [editMode, setEditMode] = useState(false)

    const [title, setTitle] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [, setPublished] = useState(true)
//add published overhere later.
    const handleDelete = async () => {

    if (!post) return

    const confirmDelete = window.confirm("Are you sure you want to delete this post?")

    if (!confirmDelete) return

    try {

        await API.delete(`/posts/${post.Post.id}`)

        alert("Post deleted")

        navigate("/")

    } catch (error) {

        alert("Failed to delete post")

    }
    }

    const unsubscribe = async () => {

        const res = await API.post("/subscription/", {
            post_id: post?.Post.id,
            dir: 0
        })
        const resp = res.data.message
        alert(JSON.stringify(resp))
        navigate("/")
    }

    const handleUpdate = async () => {

    if (!post) return

    try {
        const formData = new FormData()

        formData.append("title", title)

        if (file){
          formData.append("file", file)
        }

        await API.put(`/posts/${post.Post.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
        })
        async () => {
          const res = await API.get(`/posts/${id}`)
          setPost(res.data)
        }

        alert("Post updated successfully")

        setEditMode(false)

    } catch (error) {

        alert("Update failed")

    }
    }

  useEffect(() => {

    const fetchPost = async () => {
      const res = await API.get(`/posts/${id}`)
      setPost(res.data)
    }

    fetchPost()

  }, [id])

    useEffect(() => {
    if (post) {
        setTitle(post.Post.title)
        // setFile(`${post.Post.content}` || "")
        setPublished(post.Post.published ?? true)
    }
    }, [post])

  if (!post) return <div>Loading... Check if you are Subscribed</div>

    const token = localStorage.getItem("token")

    let currentUserId: number | null = null

    if (token) {
    const decoded = jwtDecode<TokenPayload>(token)
    currentUserId = decoded.user_id
    }


  return (
    <>
      {!editMode && (
        <div>
          <Navbar />

          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              
              <Typography variant="h4" sx={{ mb: 2 }}>
                {post.Post.title}
              </Typography>

              <Box
                onContextMenu={(e) => e.preventDefault()}
                sx={{
                  userSelect: "none",
                  mb: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <iframe
                  src={`${backendURL}/${post.Post.content}`}
                  width="100%"
                  height="600px"
                  style={{ border: "none" }}
                />
              </Box>

              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Author: {post.Post.owner.email}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Subscribers: {post.subscribers}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="outlined" color="error" onClick={unsubscribe}>
                  Unsubscribe
                </Button>
              </Stack>

              {currentUserId === post.Post.owner.id && (
                <>
                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" spacing={2}>
                    {!editMode && (
                      <Button
                        variant="contained"
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Stack>
                </>
              )}

            </Paper>
          </Container>
        </div>

      )}

      {editMode && (
        <div>
          <Navbar />

          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Stack spacing={2}>

                <Typography variant="h5">
                  Edit Post
                </Typography>

                <TextField
                  label="Title"
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                  fullWidth
                />

                <Button variant="outlined" component="label">
                  Upload New PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleUpdate}
                >
                  Save
                </Button>

              </Stack>
            </Paper>
          </Container>
        </div>
      )}
    </>
  )
}

export default PostDetail