import { Link } from "react-router-dom"
import type { PostFeed } from "../types/types"
import {API} from "../api/api"

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
    <div style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
      <h3>{post.Post.title}</h3>

      <p>Author: {post.Post.owner.email}</p>

      <p>Subscribers: {post.subscribers}</p>

      <button onClick={()=>subscribe(post)}>Subscribe</button>
      <Link to={`/posts/${post.Post.id}`}>View Post</Link>
    </div>
  )
}

export default PostCard