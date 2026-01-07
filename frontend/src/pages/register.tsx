import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await api.post("/auth/register", { email, password });
    navigate("/login");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <button onClick={handleRegister}>Register</button>
        <label>Already have an account? </label><a href="/login">Login</a>
      </div>
    </div>
  );
}
