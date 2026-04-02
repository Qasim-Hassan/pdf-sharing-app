import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {API, backendURL} from "../api/api"
import { jwtDecode } from "jwt-decode"
import Navbar from "../components/Navbar"
import type { PostDetail as PostType } from "../types/types"

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

        <h1>{post.Post.title}</h1>
        <div onContextMenu={(e)=> e.preventDefault()} style={{userSelect: "none"}}>
            <iframe
            src={`${backendURL}/${post.Post.content}`}
            width="100%"
            height="600px"
          />
        
        </div>

        <p>Author: {post.Post.owner.email}</p>

        <p>Subscribers: {post.subscribers}</p>

        <button onClick={unsubscribe}>
          Unsubscribe
        </button>
        <br />
        <br/>
        {currentUserId === post.Post.owner.id && (

          <div>

            {!editMode && (
              <button onClick={() => setEditMode(true)}>
                Edit
              </button>
            )}

            <button onClick={handleDelete}>
              Delete
            </button>

          </div>

        )}

      </div>
      )}

      {editMode && (
        <div>
          <Navbar />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button onClick={handleUpdate}>
            Save
          </button>

        </div>
      )}
    </>
  )
}

export default PostDetail