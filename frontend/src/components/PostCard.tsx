import { Link } from "react-router-dom"
import type { PostFeed } from "../types/types"
import {API} from "../api/api"
import { Container, Card, CardContent, Typography, Button, Box, Stack } from "@mui/material";

interface Props {
  post: PostFeed
}

const PostCard: any = ({ post }: Props) => {
    const subscribe = async (p: any) => {

        const res = await API.post("/subscription/", {
            post_id: p?.Post.id,
            dir: 1
        })
        const resp = res.data.message
        alert(JSON.stringify(resp))
    }

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 800, // wider card
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Stack
              sx={{
                spacing: 2,
                alignItems: "center",
                textAlign: "center",
              }}
          >
            {/* Title */}
            <Typography variant="h5" sx={{fontWeight: 600 }}>
              {post.Post.title}
            </Typography>

            {/* Author */}
            <Typography variant="body2" color="text.secondary">
              Author: {post.Post.owner.email}
            </Typography>

            {/* Subscribers */}
            <Typography variant="body2" color="text.secondary">
              Subscribers: {post.subscribers}
            </Typography>

            {/* Actions */}
            <Box 
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  mt: 1,
                }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => subscribe(post)}
                sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
              >
                Subscribe
              </Button>

              <Button
                component={Link}
                to={`/posts/${post.Post.id}`}
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
              >
                View Post
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PostCard