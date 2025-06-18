"use client";
import { useParams } from "next/navigation";
import { Download } from "lucide-react";
import { useDocuments } from "@/hooks/documents";

export default function ProjectDocumentsPage() {
  const params = useParams();
  // Correction robustesse : params peut être null ou ne pas contenir id
  let projectId = "";
  if (params && "id" in params && params.id) {
    projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  }
  const { documents, loading, error } = useDocuments(projectId);

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
        <h2 className="text-lg font-semibold text-gray-900">Documents du projet</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading && (
          <div className="text-center text-gray-400 py-12">Chargement des documents...</div>
        )}
        {error && (
          <div className="text-center text-red-500 py-12">{error}</div>
        )}
        {!loading && !error && documents.length === 0 && (
          <div className="text-center text-gray-400 py-12">Aucun document disponible actuellement</div>
        )}
        {documents.length > 0 && (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-4">DOCUMENT</th>
                <th className="py-3 px-4">CATÉGORIE</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">TAILLE</th>
                <th className="py-3 px-4">STATUT</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h6M8 16h4" /></svg>
                    {doc.name}
                  </td>
                  <td className="py-3 px-4">{doc.category}</td>
                  <td className="py-3 px-4">{doc.date}</td>
                  <td className="py-3 px-4">{doc.size}</td>
                  <td className="py-3 px-4">
                    {doc.status === "signé" ? (
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700">Signé</span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-50 text-yellow-700">En attente</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[#dd7109] hover:text-amber-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
