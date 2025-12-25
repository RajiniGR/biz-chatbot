import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import Admin from "./pages/admin";
import AdminFAQ from "./pages/adminFaq";
import AdminConversations from "./pages/adminConversations";
import "./styles.css";

function AppRoutes() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} />

        <Route path="/admin" element={token ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/admin/faqs" element={token ? <AdminFAQ /> : <Navigate to="/login" />} />
        <Route path="/admin/conversations" element={token ? <AdminConversations /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to={token ? "/chat" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(<AppRoutes />);