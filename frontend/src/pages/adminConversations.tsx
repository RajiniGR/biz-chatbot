import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminConversations(){
  const [convos, setConvos] = useState<any[]>([]);
  const [active, setActive] = useState<any | null>(null);

  useEffect(()=>{ fetchConvos(); },[]);

  async function fetchConvos(){
    const { data } = await api.get('/admin/conversations');
    setConvos(data);
  }

  async function open(id:string){
    const { data } = await api.get(`/admin/conversations/${id}`);
    setActive(data);
  }

  return (
    <div className="page">
      <header className="header">
        <h3>Conversations</h3>
        <div>
          <button onClick={()=>window.history.back()}>Back</button>
        </div>
      </header>

      <main style={{display:'flex', gap:20, padding:20}}>
        <aside style={{width:320}}>
          <h4>All</h4>
          {convos.map(c=> (
            <div key={c._id} className="card" style={{marginBottom:10, cursor:'pointer'}} onClick={()=>open(c._id)}>
              <div><strong>{c.user?.email || 'Unknown'}</strong></div>
              <div><small>{new Date(c.createdAt).toLocaleString()}</small></div>
            </div>
          ))}
        </aside>

        <section style={{flex:1}}>
          {active ? (
            <div>
              <h4>Conversation with {active.user?.email}</h4>
              {active.messages.map((m:any, i:number)=> (
                <div key={i} className={"card msg " + m.from} style={{marginBottom:8}}>
                  <div><strong>{m.from}</strong></div>
                  <div>{m.text}</div>
                  <div><small>{new Date(m.createdAt).toLocaleString()}</small></div>
                </div>
              ))}
            </div>
          ) : (
            <div>Select a conversation to view messages</div>
          )}
        </section>
      </main>
    </div>
  )
}