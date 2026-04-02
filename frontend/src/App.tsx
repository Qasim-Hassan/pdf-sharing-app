import { BrowserRouter, Routes, Route } from "react-router-dom"

import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PostDetail from "./pages/PostDetail"
import CreatePost from "./pages/CreatePost.tsx"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create/"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App