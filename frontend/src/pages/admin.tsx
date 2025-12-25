import api from "../services/api";

export default function Admin() {
  const logout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
