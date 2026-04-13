import { useEffect, useState } from "react"
import {API} from "../api/api"
import type { PostFeed } from "../types/types"
import Navbar from "../components/Navbar"
import PostCard from "../components/PostCard"
import { Container, Box, TextField, Button, Typography } from "@mui/material";

const Feed = () => {

  const [posts, setPosts] = useState<PostFeed[]>([])
  const [search, setSearch] = useState("")
  const fetchPosts = async () => {
    const res = await API.get(`/posts/?search=${search}`)
    setPosts(res.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
  <div>
    <Navbar />

    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={fetchPosts}
          sx={{ whiteSpace: "nowrap" }}
        >
          Search
        </Button>
      </Box>

      <Typography variant="h4" sx={{ mb: 2 }}>
        Feed
      </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
        {posts.length > 0 ? (
          posts.map((p) => (
            <PostCard key={p.Post.id} post={p} />
          ))
        ) : (
          <Typography color="text.secondary">
            No notes found
          </Typography>
        )}
      </Box>
    </Container>
  </div>
  )
}

export default Feed