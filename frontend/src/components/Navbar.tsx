import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  return (

    <div style={{ marginBottom: 20 }}>

      <button onClick={() => navigate("/")}>
        Feed
      </button>

      <button onClick={() => navigate("/create")}>
        Create Post
      </button>

      <button onClick={logout}>
        Logout
      </button>

    </div>

  )
}

export default Navbar