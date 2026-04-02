import { useEffect, useState } from "react"
import {API} from "../api/api"
import type { PostFeed } from "../types/types"
import Navbar from "../components/Navbar"
import PostCard from "../components/PostCard"

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
    <br/>
    <input
      type="text"
      width="100%"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <button onClick={fetchPosts}>Search</button>
    
    <h1>Feed</h1>

    {posts.length > 0? posts.map((p) => (
        <PostCard key={p.Post.id} post={p} />
    )): <p>No notes found</p>}

    </div>
  )
}

export default Feed