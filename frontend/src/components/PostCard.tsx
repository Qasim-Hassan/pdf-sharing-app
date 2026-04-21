import { Link } from "react-router-dom"
import type { PostFeed } from "../types/types"
import {API} from "../api/api"
import { Card, CardContent, Typography, Button, Box, Stack } from "@mui/material";

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
    <Card
      sx={{
        maxWidth: 500,
        margin: 2,
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          {/* Title */}
          <Typography variant="h6" fontWeight={600}>
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
          <Box sx={{
            display: "flex",
            mt: 1,
            gap: 2,
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => subscribe(post)}
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Subscribe
            </Button>

            <Button
              component={Link}
              to={`/posts/${post.Post.id}`}
              variant="outlined"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              View Post
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PostCard