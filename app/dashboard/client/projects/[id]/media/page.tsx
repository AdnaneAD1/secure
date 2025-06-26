"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMedia } from "@/hooks/media";
import { addMediaComment } from "@/hooks/media.comments";
import { useAuth } from "@/hooks/auth";
import { useSettings } from "@/hooks/settings";
import MediaCard from "./MediaCard";

// Simple modal composant
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-[90vw] relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose} aria-label="Fermer">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ProjectMediaPage() {
  const [search, setSearch] = useState("");
  const params = useParams();
  // Correction robustesse : params peut être null ou ne pas contenir id
  let projectId = "";
  if (params && "id" in params && params.id) {
    projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  }
  const { media, loading, error } = useMedia(projectId);
  const filteredMedias = media.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.tag.toLowerCase().includes(search.toLowerCase())
  );

  // Pour le modal de commentaire
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [sending, setSending] = useState(false);
  const [notif, setNotif] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const { user } = useAuth();
  const { profile, fetchProfile } = useSettings(user?.uid ?? "");
  useEffect(() => {
    if (user?.uid) fetchProfile();
  }, [user?.uid, fetchProfile]);

  // Pour le modal d'affichage des commentaires
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [commentsMedia, setCommentsMedia] = useState<any>(null);

  const handleDoubleClick = (media: any) => {
    setSelectedMedia(media);
    setComment("");
    setCommentError("");
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMedia(null);
    setComment("");
    setCommentError("");
  };
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError("");
    if (!comment.trim()) {
      setCommentError("Le commentaire ne peut pas être vide.");
      return;
    }
    if (!selectedMedia?.id) {
      setCommentError("Aucun média sélectionné.");
      return;
    }
    if (!user) {
      setCommentError("Vous devez être connecté pour commenter.");
      return;
    }
    setSending(true);
    try {
      await addMediaComment(selectedMedia.id, {
        text: comment,
        author: user.displayName || `${profile.firstName} ${profile.lastName}` || user.email || "Anonyme",
      });
      setNotif({ type: "success", message: "Commentaire ajouté avec succès !" });
      setModalOpen(false);
    } catch (err) {
      setCommentError("Erreur lors de l'envoi du commentaire.");
      setNotif({ type: "error", message: "Erreur lors de l'envoi du commentaire." });
    } finally {
      setSending(false);
      setTimeout(() => setNotif(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#dd7109] to-amber-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={() => window.history.back()}
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Retour
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Médiathèque</h2>
      </div>
      <div className="flex items-center gap-2 mb-8">
        <input
          type="text"
          placeholder="Rechercher des médias..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 bg-white hover:bg-gray-100 transition text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          Filtrer
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-8">Chargement des médias...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 py-8">{error}</div>
        ) : filteredMedias.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-8">Aucun média trouvé pour ce projet.</div>
        ) : (
          filteredMedias.map(media => (
            <MediaCard key={media.id} media={media} onDoubleClick={handleDoubleClick} />
          ))
        )}
      </div>
      {/* Modal de commentaire */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-semibold mb-2">Commenter le média</h3>
        {selectedMedia && (
          <div className="mb-3 flex gap-3 items-center">
            <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
              <Image src={selectedMedia.url} alt={selectedMedia.title} fill className="object-cover" />
            </div>
            <div>
              <div className="font-medium text-gray-900 text-sm">{selectedMedia.title}</div>
              <div className="text-xs text-gray-500">{selectedMedia.date}</div>
            </div>
          </div>
        )}
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
          <textarea
            className="border border-amber-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#dd7109]/50 focus:border-[#dd7109] transition min-h-[60px]"
            placeholder="Écrire un commentaire..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={sending}
            required
          />
          {commentError && <div className="text-red-500 text-xs">{commentError}</div>}
          <div className="flex gap-2 justify-end mt-2">
            <button type="button" className="px-4 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={handleCloseModal} disabled={sending}>Annuler</button>
            <button type="submit" className="px-4 py-1 rounded bg-[#dd7109] text-white font-semibold hover:bg-amber-600 disabled:opacity-60" disabled={sending}>{sending ? "Envoi..." : "Commenter"}</button>
          </div>
        </form>
      </Modal>
      {notif && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white z-50 ${notif.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {notif.message}
        </div>
      )}
    </div>
  );
}