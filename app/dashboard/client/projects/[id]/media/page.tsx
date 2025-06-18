"use client";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useMedia } from "@/hooks/media";

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
            <div key={media.id} className="bg-white rounded-xl shadow border border-gray-100 p-3 flex flex-col">
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                <Image src={media.url} alt={media.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm mb-1">{media.title}</div>
                <div className="text-xs text-gray-500 mb-1">{media.date}</div>
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">{media.tag}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
