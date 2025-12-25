import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function submit(e:React.FormEvent){
    e.preventDefault();
    try{
      await api.post("/auth/register",{ email, password });
      alert("Registered. Now login.");
      navigate("/login");
    }catch(err:any){ alert(err.response?.data?.message || "Register failed"); }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Register</h2>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Register</button>
    </form>
  );
}