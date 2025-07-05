"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEvents } from "@/hooks/events";
import { ChevronLeft } from "lucide-react";

export default function ProjectEventsPage() {
  const [search, setSearch] = useState("");
  const params = useParams();
  const router = useRouter();
  
  const projectId = params?.id 
    ? Array.isArray(params.id) 
      ? params.id[0] 
      : params.id
    : "";

  const { events, loading, error } = useEvents(projectId);
  
  const filteredEvents = events.filter(ev =>
    ev.name.toLowerCase().includes(search.toLowerCase()) ||
    ev.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
      <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Événements du Projet</h1>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher des événements..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg 
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-200 transition text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtrer
        </button>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                  <th className="px-4 py-3 text-left font-medium">NOM DE L'ÉVÉNEMENT</th>
                  <th className="px-4 py-3 text-left font-medium">ADRESSE</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(ev => (
                  <tr key={ev.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">{ev.start}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{ev.end}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${ev.typeColor || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                        {ev.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{ev.name}</td>
                    <td className="px-4 py-3">{ev.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500 border-t border-gray-100">
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