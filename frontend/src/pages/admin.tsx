import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
