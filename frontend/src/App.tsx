import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import Admin from "./pages/admin";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
      <Routes>
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/chat" />} />
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/chat" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/chat" />} />
        <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
        {/* <Route path="/admin" element={  user?.role === "admin" ? <Admin /> : <Navigate to="/chat" /> } /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}
