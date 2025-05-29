"use client";

import { useEffect, useState } from "react";
import { useProjects, getUserProfileById, getDevisByProjectId } from "@/hooks/project";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Users } from "lucide-react";

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const { projects, fetchProjects } = useProjects(user?.uid ?? "");
  const [project, setProject] = useState<any>(null);
  const [clientProfile, setClientProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [devis, setDevis] = useState<any[]>([]);
  const [devisLoading, setDevisLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) fetchProjects();
  }, [user?.uid, fetchProjects]);

  useEffect(() => {
    if (projects && params.id) {
      const foundProject = projects.find((p: any) => p.id === params.id);
      setProject(foundProject);
    }
  }, [projects, params.id]);

  useEffect(() => {
    if (project && project.client_id) {
      setProfileLoading(true);
      getUserProfileById(project.client_id).then(profile => {
        setClientProfile(profile);
        setProfileLoading(false);
      });
    } else {
      setClientProfile(null);
    }
  }, [project?.client_id]);

  useEffect(() => {
    if (project && project.id) {
      setDevisLoading(true);
      getDevisByProjectId(project.id).then(list => {
        setDevis(list);
        setDevisLoading(false);
      });
    } else {
      setDevis([]);
    }
  }, [project?.id]);

  // const [injecting, setInjecting] = useState<{events: boolean, media: boolean}>({events: false, media: false});
  // const [injectMsg, setInjectMsg] = useState<string>("");

  if (!project) {
    return <div className="p-8 text-center text-gray-500">Chargement du projet...</div>;
  }
  if (profileLoading) {
    return <div className="p-8 text-center text-gray-500">Chargement du profil utilisateur...</div>;
  }

  // async function handleInjectEvents() {
  //   setInjecting(s => ({...s, events: true}));
  //   setInjectMsg("");
  //   try {
  //     const { injectMockEvents } = await import("@/hooks/events");
  //     await injectMockEvents(project.id);
  //     setInjectMsg("3 événements injectés !");
  //   } catch (e) {
  //     setInjectMsg("Erreur lors de l'injection des événements");
  //   }
  //   setInjecting(s => ({...s, events: false}));
  // }
  // async function handleInjectMedia() {
  //   setInjecting(s => ({...s, media: true}));
  //   setInjectMsg("");
  //   try {
  //     const { injectMockMedia } = await import("@/hooks/media");
  //     await injectMockMedia(project.id);
  //     setInjectMsg("3 médias injectés !");
  //   } catch (e) {
  //     setInjectMsg("Erreur lors de l'injection des médias");
  //   }
  //   setInjecting(s => ({...s, media: false}));
  // }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      {/* {process.env.NODE_ENV === "development" && (
        <div className="flex gap-4 mb-6">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60"
            onClick={handleInjectEvents}
            disabled={injecting.events}
          >
            {injecting.events ? "Injection..." : "Injecter 3 événements"}
          </button>
          <button
            className="px-4 py-2 rounded bg-amber-600 text-white font-semibold shadow hover:bg-amber-700 disabled:opacity-60"
            onClick={handleInjectMedia}
            disabled={injecting.media}
          >
            {injecting.media ? "Injection..." : "Injecter 3 médias"}
          </button>
          {injectMsg && <span className="ml-4 text-green-700 font-semibold">{injectMsg}</span>}
        </div>
      )} */}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Image src={project.image || "/avatar.png"} alt="avatar" width={56} height={56} className="rounded-full border" />
          <div>
            <div className="font-semibold text-lg text-gray-900">{project.name}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{project.type} - {project.location}</div>
            <div className="text-sm text-emerald-700 font-bold mt-1">{project.budget?.toLocaleString()} €</div>
            <div className="mt-1">
              <span className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${project.status === "Terminé" ? "bg-emerald-100 text-emerald-700" : project.status === "Annulé" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-700"}`}>{project.status}</span>
            </div>
          </div>
        </div>
        <button className="text-xs text-red-400 px-3 py-1 border border-red-200 rounded hover:bg-red-50">Clôturer ce projet</button>
      </div>

      {/* Barre d'onglets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-gray-200">
        <Link href={`/dashboard/client/projects/${project.id}/notes`} legacyBehavior>
          <button className="flex items-center gap-1 px-4 py-2 rounded-t-lg text-gray-600 hover:text-[#dd7109] hover:bg-orange-50 transition">
            {/* Note icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 10h8M8 14h6" /></svg>
            Notes
            <span className="ml-2 bg-gray-100 text-xs rounded px-2 py-0.5"></span>
          </button>
        </Link>
        <Link href={`/dashboard/client/projects/${project.id}/events`} legacyBehavior>
          <button className="flex items-center gap-1 px-4 py-2 rounded-t-lg text-gray-600 hover:text-[#dd7109] hover:bg-orange-50 transition">
            {/* Calendar/Event icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 9h18" /></svg>
            Événements
            <span className="ml-2 bg-gray-100 text-xs rounded px-2 py-0.5"></span>
          </button>
        </Link>
        <Link href={`/dashboard/client/projects/${project.id}/media`} legacyBehavior>
          <button className="flex items-center gap-1 px-4 py-2 rounded-t-lg text-gray-600 hover:text-[#dd7109] hover:bg-orange-50 transition">
            {/* Camera/Photo icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><circle cx="12" cy="14" r="3" /></svg>
            Photos RT, chantier, etc.
            <span className="ml-2 bg-gray-100 text-xs rounded px-2 py-0.5"></span>
          </button>
        </Link>
        <button className="flex items-center gap-1 px-4 py-2 rounded-t-lg text-gray-600 hover:text-[#dd7109] hover:bg-orange-50 transition">
          {/* Plan/Blueprint icon */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          Plans
          <span className="ml-2 bg-gray-100 text-xs rounded px-2 py-0.5"></span>
        </button>

        <button className="flex items-center gap-1 px-4 py-2 rounded-t-lg text-gray-600 hover:text-[#dd7109] hover:bg-orange-50 transition">
          {/* Plan/Blueprint icon */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          Plans
          <span className="ml-2 bg-gray-100 text-xs rounded px-2 py-0.5"></span>
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-t-lg text-gray-600 hover:text-[#dd7109] hover:bg-orange-50 transition">
          {/* Folder/Document icon */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h3.17a2 2 0 0 1 1.41.59l2.83 2.83A2 2 0 0 0 14.83 9H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>
          Documents
          <span className="ml-2 bg-gray-100 text-xs rounded px-2 py-0.5"></span>
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-t-lg text-gray-600 hover:text-[#dd7109] hover:bg-orange-50 transition">
          {/* Payments icon */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><circle cx="8" cy="15" r="2" /><circle cx="16" cy="15" r="2" /></svg>
          Mes acomptes
          <span className="ml-2 bg-gray-100 text-xs rounded px-2 py-0.5"></span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Informations client */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="font-semibold text-gray-700 mb-2">Informations client</div>
          {clientProfile ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Image src={clientProfile.photoURL || "/avatar.png"} alt="avatar" width={32} height={32} className="rounded-full" />
                <div>
                  <div className="font-medium text-gray-800 text-sm">{clientProfile.firstName} {clientProfile.lastName}</div>
                  <div className="text-xs text-gray-500">{clientProfile.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1"><Phone className="w-4 h-4" /> {clientProfile.phone || "N/A"}</div>
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1"><Mail className="w-4 h-4" /> {clientProfile.email}</div>
              <div className="flex items-center gap-2 text-gray-500 text-xs"><MapPin className="w-4 h-4" /> {clientProfile.address || "Adresse non renseignée"}</div>
            </>
          ) : (
            <div className="text-xs text-gray-400">Profil utilisateur non trouvé.</div>
          )}
        </div>
        {/* Acteurs du projet */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="font-semibold text-gray-700 mb-2">Acteurs du projet</div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">Pilote</span>
            <span className="ml-2 text-xs text-gray-500">{project.broker?.name}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">Client</span>
            <span className="ml-2 text-xs text-gray-500">John Misu</span>
          </div>
        </div>
      </div>

      {/* Devis */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="font-semibold text-gray-700 mb-4">Devis</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Titre</th>
                <th className="py-2">Type</th>
                <th className="py-2">Statut</th>
                <th className="py-2">Montant</th>
                <th className="py-2">Historique</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devisLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-400">Chargement des devis...</td>
                </tr>
              ) : devis.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-400">Aucun devis trouvé pour ce projet.</td>
                </tr>
              ) : (
                devis.map((d, idx) => (
                  <tr key={d.id || idx}>
                    <td className="py-2">{d.titre || d.title || 'Sans titre'}</td>
                    <td>{d.type || 'Devis'}</td>
                    <td>
                      {d.statut === 'Validé' ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Validé</span>
                      ) : d.statut === 'En attente' ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">En attente</span>
                      ) : d.statut === 'Refusé' ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Refusé</span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{d.statut || 'Inconnu'}</span>
                      )}
                    </td>
                    <td>{d.montant ? `${Number(d.montant).toLocaleString()} €` : '-'}</td>
                    <td>{d.historique || '-'}</td>
                    <td>{d.pdfUrl ? (
                      <a href={d.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">Voir PDF</a>
                    ) : (
                      <span className="text-gray-400 text-xs">Aucun PDF</span>
                    )}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
