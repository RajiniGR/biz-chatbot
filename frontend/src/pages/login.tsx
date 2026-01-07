import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {      
      await api.post("/auth/login", { email, password }, { withCredentials: true }); // Login → sets HTTPOnly cookie      
      await login(email, password); // Verify session → /auth/me      
      navigate("/", { replace: true }); // Navigate only after auth confirmed
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4" >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded"> Login </button>
      </form>
    </div>
  );
}
