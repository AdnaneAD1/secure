"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useEvents } from "@/hooks/events";

export default function ProjectEventsPage() {
  const [search, setSearch] = useState("");
  const params = useParams();
  // Correction robustesse : params peut être null ou ne pas contenir id
  let projectId = "";
  if (params && "id" in params && params.id) {
    projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  }
  const { events, loading, error } = useEvents(projectId);
  const filteredEvents = events.filter(ev =>
    ev.name.toLowerCase().includes(search.toLowerCase()) ||
    ev.type.toLowerCase().includes(search.toLowerCase())
  );

  // Pour le bouton retour
  const { back } = require('next/navigation');

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <button
        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#dd7109] to-amber-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
        onClick={() => window.history.back()}
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Retour
      </button>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Événements du Projet</h2>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Chercher les événements..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-200 transition text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          Filtrer
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white shadow border border-gray-100">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Chargement des événements...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Aucun événement trouvé pour ce projet.</div>
        ) : (
          <>
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left font-medium">DATE DE DÉBUT</th>
                  <th className="px-4 py-3 text-left font-medium">DATE DE FIN</th>
                  <th className="px-4 py-3 text-left font-medium">TYPE</th>
                  <th className="px-4 py-3 text-left font-medium">NOM DE L&apos;ÉVÉNEMENT</th>
                  <th className="px-4 py-3 text-left font-medium">ADRESSE</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(ev => (
                  <tr key={ev.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">{ev.start}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{ev.end}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${ev.typeColor || "bg-gray-100 text-gray-700 border-gray-200"}`}>{ev.type}</span>
                    </td>
                    <td className="px-4 py-3">{ev.name}</td>
                    <td className="px-4 py-3">{ev.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500">
              <span>Affichage de 1 à {filteredEvents.length} sur {events.length} événements</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 rounded border bg-gray-100 text-gray-400 cursor-not-allowed">Précédent</button>
                <span className="px-2 py-1 rounded border bg-red-500 text-white">1</span>
                <button className="px-2 py-1 rounded border bg-gray-100 text-gray-400 cursor-not-allowed">Suivant</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
