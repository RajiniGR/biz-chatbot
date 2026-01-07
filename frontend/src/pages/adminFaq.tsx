import React, { useEffect, useState } from "react";
import api from "../services/api";

type FAQ = { _id?: string; question: string; answer: string; tags?: string[] };

export default function AdminFAQ(){
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [form, setForm] = useState<FAQ>({ question: '', answer: '', tags: [] });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(()=>{ fetchFaqs(); },[]);

  async function fetchFaqs(){
    const { data } = await api.get('/admin/faqs');
    setFaqs(data);
  }

  async function submit(e?:React.FormEvent){
    e?.preventDefault();
    if(editingId){
      await api.put(`/admin/faqs/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post('/admin/faqs', form);
    }
    setForm({ question: '', answer: '', tags: [] });
    fetchFaqs();
  }

  async function edit(f:FAQ){ setForm(f); setEditingId(f._id || null); }
  async function remove(id?:string){ if(!id) return; await api.delete(`/admin/faqs/${id}`); fetchFaqs(); }

  return (
    <div className="page">
      <header className="header">
        <h3>Manage FAQs</h3>
        <div>
          <button onClick={()=>window.history.back()}>Back </button>
        </div>
      </header>

      <main style={{padding:20}}>
        <form onSubmit={submit} className="card">
          <h4>{editingId ? 'Edit FAQ' : 'Create FAQ'}</h4>
          <input placeholder="Question" value={form.question} onChange={e=>setForm({...form, question: e.target.value})} />
          <textarea placeholder="Answer" value={form.answer} onChange={e=>setForm({...form, answer: e.target.value})} />
          <input placeholder="Tags (comma separated)" value={(form.tags||[]).join(',')} onChange={e=>setForm({...form, tags: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
          <button>{editingId ? 'Update' : 'Create'}</button>
        </form>

        <section style={{marginTop:20}}>
          <h4>Existing FAQs</h4>
          {faqs.map(f=> (
            <div key={f._id} className="card" style={{marginBottom:10}}>
              <strong>{f.question}</strong>
              <p>{f.answer}</p>
              <p><small>{(f.tags||[]).join(', ')}</small></p>
              <button onClick={()=>edit(f)}>Edit</button>
              <button onClick={()=>remove(f._id)}>Delete</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}