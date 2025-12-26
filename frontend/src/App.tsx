import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import Admin from "./pages/admin";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <Admin /> : <Navigate to="/chat" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
