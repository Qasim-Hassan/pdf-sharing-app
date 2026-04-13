import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material";


const Navbar = () => {

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        px: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="text"
          onClick={() => navigate("/")}
        >
          Feed
        </Button>

        <Button
          variant="text"
          onClick={() => navigate("/create")}
        >
          Create Post
        </Button>
      </Box>

      <Button
        variant="outlined"
        color="error"
        onClick={logout}
      >
        Logout
      </Button>
    </Box>

  )
}

export default Navbar