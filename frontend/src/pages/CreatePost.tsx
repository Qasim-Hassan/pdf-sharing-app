import { useState } from "react"
import {API} from "../api/api"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"


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
      <Navbar/>

      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0])
            }
          }}
        />

        <br />

        <button>Create</button>

      </form>

    </div>
  )
}

export default CreatePost