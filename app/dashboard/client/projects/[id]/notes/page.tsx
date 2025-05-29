"use client";
import { useState } from "react";
import { Plus, CheckCircle, XCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useNotes } from "@/hooks/notes";
import { useAuth } from "@/hooks/auth";


export default function ProjectNotesPage() {
  const [showForm, setShowForm] = useState(false);
  type NoteForm = {
    title: string;
    content: string;
    recipients: string[];
    attachments: any[];
    emails: string[];
  };
  const [form, setForm] = useState<NoteForm>({ title: "", content: "", recipients: [], attachments: [], emails: [""] });
  const [sending, setSending] = useState(false);
  const [notif, setNotif] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const router = useRouter();
  // Next.js 13+ params
  const params = useParams();
  const projectId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { notes, loading, error, addNote } = useNotes(projectId ?? "");
  const { user } = useAuth();

  // Gestion du formulaire d'ajout
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(f => ({ ...f, recipients: checked ? [...f.recipients, value] : f.recipients.filter((r: string) => r !== value) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  // Gestion des emails dynamiques
  const handleEmailChange = (idx: number, value: string) => {
    setForm(f => {
      const emails = [...f.emails];
      emails[idx] = value;
      return { ...f, emails };
    });
  };
  const addEmailField = () => setForm(f => ({ ...f, emails: [...f.emails, ""] }));
  const removeEmailField = (idx: number) => setForm(f => ({ ...f, emails: f.emails.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    try {
      // Fusionne rôles cochés et emails saisis dans recipients
      const allRecipients = [
        ...form.recipients,
        ...form.emails.filter(e => e.trim() !== "")
      ];
      // Upload fichiers si présents
      let uploadedFiles: string[] = [];
      if (form.attachments && form.attachments.length > 0) {
        const data = new FormData();
        form.attachments.forEach(file => data.append("files", file));
        const res = await fetch("/api/notes-upload", { method: "POST", body: data });
        const result = await res.json();
        uploadedFiles = result.files || [];
      }
      await addNote({
        projectId,
        title: form.title,
        content: form.content,
        author: user?.email || user?.displayName || "Utilisateur",
        recipients: allRecipients,
        attachments: uploadedFiles,
      });
      setNotif({ type: "success", message: "Note ajoutée avec succès !" });
      setShowForm(false);
      setForm({ title: "", content: "", recipients: [], attachments: [], emails: [""] });
    } catch (err) {
      setNotif({ type: "error", message: "Erreur lors de l'ajout de la note." });
    } finally {
      setSending(false);
      setTimeout(() => setNotif(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
  <div className="flex items-center gap-2">
    <button
      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#dd7109] to-amber-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
      onClick={() => window.history.back()}
      type="button"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Retour
    </button>
    <h2 className="text-xl font-semibold text-gray-900 ml-2">Notes du projet</h2>
  </div>
  <button
    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#dd7109] to-amber-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
    onClick={() => setShowForm(true)}
  >
    <Plus className="w-4 h-4" /> Ajouter une note
  </button>
</div>
      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 text-sm flex items-start gap-2">
        <span className="mt-1">ℹ️</span>
        <div>
          <div>- type "fil d'actualité", le plus récent est en haut</div>
          <div>- permet de comprendre l'historique d'un projet</div>
        </div>
      </div>
      <div className="space-y-8">
        {loading && <div className="text-center text-gray-400">Chargement des notes...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && notes.length === 0 && <div className="text-center text-gray-400">Aucune note pour ce projet.</div>}
        {notes.map(note => (
          <div key={note.id} className="relative group border-b border-gray-100 pb-6">
            <div className="text-gray-400 text-xs mb-1">{note.date}</div>
            <div className="font-semibold text-gray-900 mb-1">{note.title || <span className='italic text-gray-400'>Sans titre</span>}</div>
            <div className="mb-1 text-gray-800 whitespace-pre-line">{note.content}</div>
            {note.attachments && note.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {note.attachments.map((file: string, idx: number) => (
                  <a
                    key={idx}
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-2 py-1 bg-amber-100 text-[#dd7109] rounded text-xs hover:underline"
                  >
                    Pièce jointe {idx + 1}
                  </a>
                ))}
              </div>
            )}
            <div className="text-xs text-gray-500">Envoyé par mail à {note.author}</div>
            <div className="absolute right-0 top-2 text-gray-300 group-hover:text-gray-400 cursor-pointer">•••</div>
          </div>
        ))}
      </div>
      {/* Drawer/Formulaire d'ajout de note */}
      {showForm && (
  <div className="fixed inset-0 z-40 flex justify-end bg-black/30" onClick={() => setShowForm(false)}>
    <div
      className="bg-white shadow-2xl w-full max-w-md h-full p-0 flex flex-col relative animate-slideInRight md:rounded-l-2xl"
      onClick={e => e.stopPropagation()}
    >
      {/* Bandeau haut avec bouton retour */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#dd7109] to-amber-500 rounded-tl-2xl md:rounded-tr-none">
        <button
          className="flex items-center gap-2 text-white font-semibold hover:underline"
          type="button"
          onClick={() => setShowForm(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Retour
        </button>
        <span className="text-white text-lg font-bold">Ajouter une note</span>
        <span></span>
      </div>
      {/* Notifications */}
      {notif && (
        <div className={`flex items-center gap-2 mb-4 px-4 py-3 rounded-lg font-medium text-sm shadow ${notif.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {notif.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
          {notif.message}
        </div>
      )}
      <form className="flex flex-col gap-5 flex-1 overflow-y-auto px-4 py-6" style={{minHeight:0}} onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-amber-700 font-medium mb-1">Titre de la note (facultatif)</label>
          <input
            className="w-full border border-amber-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#dd7109]/50 focus:border-[#dd7109] transition"
            placeholder="Titre = objet du mail"
            name="title"
            value={form.title}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm text-amber-700 font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-amber-200 rounded-lg px-3 py-2 min-h-[90px] resize-none focus:ring-2 focus:ring-[#dd7109]/50 focus:border-[#dd7109] transition"
            placeholder="Corps du texte de la note"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        {/* Pièces jointes (à brancher plus tard) */}
        <div>
          <label className="block text-sm text-amber-700 font-medium mb-1">Ajouter des pièces jointes</label>
          <input
            type="file"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#dd7109]/90 file:text-white hover:file:bg-[#dd7109]"
            multiple
            onChange={e => setForm(f => ({ ...f, attachments: e.target.files ? Array.from(e.target.files) : [] }))}
          />
        </div>
        <div>
          <label className="block text-sm text-amber-700 font-medium mb-1">Envoyer cette note par mail</label>
          <div className="flex flex-wrap gap-3 mb-2">
            <label className="flex items-center gap-1 text-gray-700"><input type="checkbox" className="accent-[#dd7109]" name="recipients" value="Artisan" checked={form.recipients.includes("Artisan")} onChange={handleChange} /> Artisan</label>
            <label className="flex items-center gap-1 text-gray-700"><input type="checkbox" className="accent-[#dd7109]" name="recipients" value="Pilote" checked={form.recipients.includes("Pilote")} onChange={handleChange} /> Pilote</label>
            <label className="flex items-center gap-1 text-gray-700"><input type="checkbox" className="accent-[#dd7109]" name="recipients" value="Vendeur" checked={form.recipients.includes("Vendeur")} onChange={handleChange} /> Vendeur</label>
          </div>
          <div className="flex flex-col gap-2">
            {form.emails.map((email, idx) => (
              <div className="flex gap-2 items-center" key={idx}>
                <input
                  className="flex-1 border border-amber-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#dd7109]/50 focus:border-[#dd7109] transition"
                  placeholder="Ajouter un email"
                  name={`email-${idx}`}
                  value={email}
                  onChange={e => handleEmailChange(idx, e.target.value)}
                  type="email"
                />
                {form.emails.length > 1 && (
                  <button type="button" className="text-red-500 px-2 py-1 rounded hover:bg-red-50" onClick={() => removeEmailField(idx)}>-</button>
                )}
                {idx === form.emails.length - 1 && (
                  <button type="button" className="text-[#dd7109] px-2 py-1 rounded hover:bg-amber-100" onClick={addEmailField}>+</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" disabled={sending} className="mt-4 w-full bg-gradient-to-r from-[#dd7109] to-amber-500 text-white py-2.5 rounded-lg font-semibold text-base shadow hover:opacity-90 transition flex items-center justify-center">
          {sending ? <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : null}
          Ajouter la note
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
}
