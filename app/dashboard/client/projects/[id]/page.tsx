"use client";

import { useEffect, useState, useCallback } from "react";
import { useProjects, getUserProfileById, getDevisForClient, updateDevisStatus } from "@/hooks/project";
import { useAcceptedArtisans } from "@/hooks/acceptedArtisans";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  MoreVertical, 
  Check, 
  Edit, 
  Download, 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  // Hook pour artisans acceptés
  const { artisans, loading, error } = useAcceptedArtisans(params.id);
  const { user } = useAuth();
  const { projects, fetchProjects } = useProjects(user?.uid ?? "");
  const [project, setProject] = useState<any>(null);
  const [clientProfile, setClientProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [devis, setDevis] = useState<any[]>([]);
  const [devisLoading, setDevisLoading] = useState(false);
  // Suppression de l'état openMenuId car Radix UI gère cela automatiquement

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
    };
  }, [project?.client_id]);

  // Fonction pour charger les devis
  const loadDevis = useCallback(async () => {
    if (project && project.id) {
      setDevisLoading(true);
      try {
        const list = await getDevisForClient(project.id);
        setDevis(list);
        console.log('👤 Devis chargés côté client (statuts mappés):', list);
      } catch (error) {
        console.error('Erreur lors du chargement des devis:', error);
      } finally {
        setDevisLoading(false);
      }
    } else {
      setDevis([]);
    }
  }, [project?.id]);

  // Chargement initial des devis
  useEffect(() => {
    loadDevis();
  }, [loadDevis]);

  // Rafraîchissement automatique toutes les 30 secondes
  useEffect(() => {
    if (!project?.id) return;
    
    const interval = setInterval(() => {
      console.log('🔄 [AUTO-REFRESH] Rafraîchissement automatique des devis...');
      loadDevis();
    }, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, [project?.id, loadDevis]);

  // Rafraîchissement quand la page reprend le focus
  useEffect(() => {
    const handleFocus = () => {
      console.log('🔄 [FOCUS-REFRESH] Page en focus, rafraîchissement des devis...');
      loadDevis();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        handleFocus();
      }
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [loadDevis]);

  // Fonction pour gérer les actions client sur les devis
  const handleDevisAction = async (devisId: string, collectionName: string, action: 'Validé' | 'À modifier') => {
    try {
      setDevisLoading(true);
      const success = await updateDevisStatus(devisId, collectionName, action);
      
      if (success) {
        console.log(`🎉 [CLIENT-SUCCESS] Devis ${action.toLowerCase()} avec succès`);
        // Recharger les devis pour voir les changements
        await loadDevis();
      } else {
        console.error(`❌ [CLIENT-ERROR] Échec de l'action ${action}`);
        alert(`Erreur lors de la ${action.toLowerCase()} du devis. Veuillez réessayer.`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'action sur le devis:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setDevisLoading(false);
    }
  };

  if (!project) {
    return <div className="p-8 text-center text-gray-500">Chargement du projet...</div>;
  }
  if (profileLoading) {
    return <div className="p-8 text-center text-gray-500">Chargement du profil utilisateur...</div>;
  }

  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-1 bg-orange-100 inline-block shadow-sm">
            <Image
              src={project.image || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"}
              alt="avatar"
              width={120}
              height={120}
              className="w-[120px] h-[120px] rounded-full object-cover border-2 border-orange-200"
            />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-orange-700">{project.name}</h1>
            <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">{project.type} • {project.location}</div>
            <div className="flex flex-wrap gap-3 items-center mb-2">
              <span className="flex items-center gap-1 text-sm text-gray-600">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 9h18" />
                </svg>
                Début : {project.startDate ? new Date(project.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non renseignée'}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 9h18" />
                </svg>
                Fin : {project.estimatedEndDate ? new Date(project.estimatedEndDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non renseignée'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-gray-800">{project.budget?.toLocaleString()} €</div>
              <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold
                ${project.status === "Terminé" ? "bg-green-100 text-green-800"
                  : project.status === "Annulé" ? "bg-red-100 text-red-800"
                    : project.status === "En attente" ? "bg-yellow-100 text-yellow-800"
                      : project.status === "En cours" ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barre d'onglets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-gray-200">
        <Link href={`/dashboard/client/projects/${project.id}/notes`} legacyBehavior>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 10h8M8 14h6" />
            </svg>
            Notes
          </button>
        </Link>
        <Link href={`/dashboard/client/projects/${project.id}/events`} legacyBehavior>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 9h18" />
            </svg>
            Événements
          </button>
        </Link>
        <Link href={`/dashboard/client/projects/${project.id}/media`} legacyBehavior>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="15" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <circle cx="12" cy="14" r="3" />
            </svg>
            Photos
          </button>
        </Link>
        <Link href={`/dashboard/client/projects/${project.id}/plans`} legacyBehavior>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            Plans
          </button>
        </Link>
        <Link href={`/dashboard/client/projects/${project.id}/documents`} legacyBehavior>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M3 7a2 2 0 0 1 2-2h3.17a2 2 0 0 1 1.41.59l2.83 2.83A2 2 0 0 0 14.83 9H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
            </svg>
            Documents
          </button>
        </Link>
        <Link href={`/dashboard/client/projects/${project.id}/payments`} legacyBehavior>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
              <circle cx="8" cy="15" r="2" />
              <circle cx="16" cy="15" r="2" />
            </svg>
            Acomptes
          </button>
        </Link>
      </div>

      {/* Section Informations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Carte Informations client */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-orange-50 px-6 py-4 border-b border-orange-100">
            <h2 className="font-semibold text-lg text-orange-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informations client
            </h2>
          </div>
          <div className="p-6">
            {clientProfile ? (
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  {clientProfile.photoURL ? (
                    <Image
                      src={clientProfile.photoURL}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full object-cover border-2 border-orange-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-white">
                        {(clientProfile.firstName?.[0] || '') + (clientProfile.lastName?.[0] || '')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{clientProfile.firstName} {clientProfile.lastName}</h3>
                    {clientProfile.company && (
                      <p className="text-sm text-gray-600">{clientProfile.company}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-orange-500" />
                      <span>{clientProfile.phone || "Non renseigné"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-orange-500" />
                      <span>{clientProfile.email}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                      <span>{project.location || "Adresse non renseignée"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">Profil utilisateur non trouvé.</div>
            )}
          </div>
        </div>

        {/* Carte Acteurs du projet */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 className="font-semibold text-lg text-blue-700 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Acteurs du projet
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Pilote du projet
              </h3>
              {project.broker?.name ? (
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{project.broker.name}</p>
                    <p className="text-xs text-gray-500">Responsable du projet</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 ml-6">Aucun pilote désigné</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Artisans acceptés
              </h3>
              {loading ? (
                <div className="flex justify-center py-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500"></div>
                </div>
              ) : error ? (
                <p className="text-sm text-red-500 ml-6">Erreur lors du chargement des artisans</p>
              ) : artisans.length === 0 ? (
                <p className="text-sm text-gray-500 ml-6">Aucun artisan accepté sur ce projet</p>
              ) : (
                <div className="space-y-3">
                  {artisans.map(a => (
                    <div key={a.artisanId} className="flex items-center gap-3 bg-amber-50 rounded-lg p-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{a.displayName}</p>
                        <p className="text-xs text-gray-500">{a.specialite || 'Artisan'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Devis */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
        <div className="bg-green-50 px-6 py-4 border-b border-green-100">
          <h2 className="font-semibold text-lg text-green-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Devis
          </h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devisLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Chargement des devis...
                    </td>
                  </tr>
                ) : devis.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Aucun devis trouvé pour ce projet
                    </td>
                  </tr>
                ) : (
                  devis.map((d, idx) => (
                    <tr key={d.id || idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {d.titre || d.title || 'Sans titre'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {d.type || 'Devis'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {d.status === 'Validé' ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Validé
                          </span>
                        ) : d.status === 'En attente' ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            En attente
                          </span>
                        ) : d.status === 'Refusé' ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Refusé
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            {d.status || 'Inconnu'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {d.montant ? `€ ${Number(d.montant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                disabled={devisLoading}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:text-gray-300 transition-colors rounded-md hover:bg-gray-100"
                                title="Actions"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-48">
                              {/* Option Télécharger PDF */}
                              {d.pdfUrl && (
                                <>
                                  <DropdownMenuItem asChild>
                                    <a
                                      href={d.pdfUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <Download className="w-4 h-4 text-blue-600" />
                                      Télécharger le PDF
                                    </a>
                                  </DropdownMenuItem>
                                  {d.status === 'En attente' && <DropdownMenuSeparator />}
                                </>
                              )}
                              
                              {/* Options pour les devis en attente */}
                              {d.status === 'En attente' && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => handleDevisAction(d.id, d._collection, 'Validé')}
                                    disabled={devisLoading}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <Check className="w-4 h-4 text-green-600" />
                                    Valider le devis
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDevisAction(d.id, d._collection, 'À modifier')}
                                    disabled={devisLoading}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <Edit className="w-4 h-4 text-orange-600" />
                                    Demander des modifications
                                  </DropdownMenuItem>
                                </>
                              )}
                              
                              {/* Message pour les devis déjà traités */}
                              {d.status !== 'En attente' && !d.pdfUrl && (
                                <DropdownMenuItem disabled className="text-xs text-gray-400 italic justify-center">
                                  {d.status === 'Validé' ? 'Devis validé' : 
                                   d.status === 'À modifier' ? 'Modifications demandées' : 
                                   'Traité'}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}