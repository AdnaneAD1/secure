import { useState } from "react";
import { db } from "@/firebase/ClientApp";
import { collection, doc, getDocs, getDoc, updateDoc, query, where, addDoc } from "firebase/firestore";

// Fonction utilitaire pour dashboard : récupère tous les projets d'un client
export async function getAllClientProjects(client_id: string) {
  const q = query(collection(db, "projects"), where("client_id", "==", client_id));
  const snap = await getDocs(q);
  return snap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })) as Project[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  paidAmount: number;
  startDate: string;
  estimatedEndDate: string;
  status: "En cours" | "En attente" | "Terminé" | "Annulé";
  broker: any;
  progress: number;
  type: string;
  location: string;
  client_id: string;
}

// Interface pour les devis uniforme
export interface UnifiedDevis {
  id: string;
  titre?: string;
  title?: string;
  type?: string;
  status?: string;
  statut?: string;
  montant?: number;
  pdfUrl?: string;
  numero?: string;
  selectedItems?: any[];
  url?: string;
  attribution?: {
    artisanName?: string;
    artisanId?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  // Métadonnées ajoutées par notre fonction
  _collection: string;
  _type: 'devis'; // Seulement devis maintenant
  _originalStatus?: string; // Statut original avant mapping côté client
}

// Configuration des collections de devis
export const DEVIS_COLLECTIONS = [
  { name: "devis", projectField: "id_projet", type: "devis" as const },
  { name: "devisConfig", projectField: "projectId", type: "devis" as const }
] as const;

// Fonction pour mapper les statuts côté client (masquer certains statuts)
export function mapStatusForClient(status: string): string {
  // Mapper "Envoyé au client" vers "En attente" pour le côté client
  if (status === "Envoyé au client") {
    return "En attente";
  }
  return status;
}

// Fonction pour normaliser les devis de différentes collections
export function normalizeDevis(devis: any, collectionName: string, isClientSide: boolean = false): UnifiedDevis {
  const originalStatus = devis.status || devis.statut;
  const mappedStatus = isClientSide ? mapStatusForClient(originalStatus) : originalStatus;
  
  return {
    ...devis,
    id: devis.id,
    titre: devis.titre || devis.title,
    status: mappedStatus,
    _originalStatus: originalStatus,
    _collection: collectionName,
    _type: "devis" // Toujours devis maintenant
  };
}

// Fonction pour filtrer les devis par type
export function filterDevisByType(devisList: UnifiedDevis[], type?: 'devis'): UnifiedDevis[] {
  if (!type) return devisList;
  return devisList.filter(devis => devis._type === type);
}

// Fonction pour filtrer les devis par statut
export function filterDevisByStatus(devisList: UnifiedDevis[], status?: string): UnifiedDevis[] {
  if (!status) return devisList;
  return devisList.filter(devis => devis.status === status);
}

// Fonction pour grouper les devis par type
export function groupDevisByType(devisList: UnifiedDevis[]): { devis: UnifiedDevis[] } {
  return {
    devis: devisList.filter(d => d._type === 'devis')
  };
}

// Fonction pour grouper les devis par collection
export function groupDevisByCollection(devisList: UnifiedDevis[]): Record<string, UnifiedDevis[]> {
  return devisList.reduce((acc, devis) => {
    if (!acc[devis._collection]) {
      acc[devis._collection] = [];
    }
    acc[devis._collection].push(devis);
    return acc;
  }, {} as Record<string, UnifiedDevis[]>);
}

// Fonction pour obtenir les statistiques des devis
export function getDevisStatistics(devisList: UnifiedDevis[]) {
  const stats = {
    total: devisList.length,
    byType: {
      devis: devisList.filter(d => d._type === 'devis').length
    },
    byStatus: {} as Record<string, number>,
    byCollection: {} as Record<string, number>,
    totalAmount: 0
  };

  devisList.forEach(devis => {
    // Compter par statut
    const status = devis.status || 'Non défini';
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

    // Compter par collection
    stats.byCollection[devis._collection] = (stats.byCollection[devis._collection] || 0) + 1;

    // Calculer le montant total
    if (devis.montant) {
      stats.totalAmount += devis.montant;
    }
  });

  return stats;
}

// Fonction pour rechercher dans les devis
export function searchDevis(devisList: UnifiedDevis[], searchTerm: string): UnifiedDevis[] {
  if (!searchTerm.trim()) return devisList;
  
  const term = searchTerm.toLowerCase();
  return devisList.filter(devis => 
    (devis.titre || '').toLowerCase().includes(term) ||
    (devis.numero || '').toLowerCase().includes(term) ||
    (devis.status || '').toLowerCase().includes(term) ||
    devis._collection.toLowerCase().includes(term)
  );
}

export async function seedDevisForProjects(projectIds: string[]) {
  const devisTemplates = [
    {
      titre: "Devis Cuisine Premium",
      type: "Devis",
      statut: "Validé",
      montant: 15000,
      pdfUrl: "https://example.com/devis-premium.pdf"
    },
    {
      titre: "Devis Salle de Bain",
      type: "Devis",
      statut: "En attente",
      montant: 8000,
      pdfUrl: "https://example.com/devis-sdb.pdf"
    }
  ];
  try {
    for (const id_projet of projectIds) {
      for (const devis of devisTemplates) {
        await addDoc(collection(db, "devis"), { ...devis, id_projet });
      }
    }
    return true;
  } catch (err) {
    console.error("Erreur lors de l'injection des devis:", err);
    return false;
  }
}

export async function getDevisByProjectId(projectId: string, isClientSide: boolean = false): Promise<UnifiedDevis[]> {
  try {
    const allDevis: UnifiedDevis[] = [];

    // Récupérer les devis de chaque collection configurée
    for (const collectionInfo of DEVIS_COLLECTIONS) {
      try {
        const devisRef = collection(db, collectionInfo.name);
        const q = query(devisRef, where(collectionInfo.projectField, "==", projectId));
        const querySnapshot = await getDocs(q);
        
        const devisFromCollection = querySnapshot.docs.map(doc => 
          normalizeDevis({ id: doc.id, ...doc.data() }, collectionInfo.name, isClientSide)
        );
        
        allDevis.push(...devisFromCollection);
        console.log(`✅ Récupéré ${devisFromCollection.length} documents de la collection ${collectionInfo.name}`);
      } catch (collectionError) {
        console.warn(`⚠️ Erreur lors de la récupération depuis ${collectionInfo.name}:`, collectionError);
        // Continue avec les autres collections même si une échoue
      }
    }

    // Trier par date de création (plus récent en premier) ou par titre
    allDevis.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (a.updatedAt && b.updatedAt) {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      return (a.titre || '').localeCompare(b.titre || '');
    });

    const logPrefix = isClientSide ? '👤 [CLIENT]' : '🔧 [ADMIN]';
    console.log(`📊 ${logPrefix} Total des devis récupérés pour le projet ${projectId}:`, {
      total: allDevis.length,
      devis: allDevis.filter(d => d._type === 'devis').length,
      parCollection: DEVIS_COLLECTIONS.reduce((acc, col) => {
        acc[col.name] = allDevis.filter(d => d._collection === col.name).length;
        return acc;
      }, {} as Record<string, number>),
      statusMapping: isClientSide ? 'Statuts mappés pour client' : 'Statuts originaux'
    });

    return allDevis;
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des devis:", err);
    return [];
  }
}
// Fonction pour mettre à jour le statut d'un devis côté client
export async function updateDevisStatus(devisId: string, collectionName: string, newStatus: string): Promise<boolean> {
  try {
    console.log(`Mise à jour du statut du devis ${devisId} vers ${newStatus}`);
    
    const devisRef = doc(db, collectionName, devisId);
    await updateDoc(devisRef, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      clientActionDate: new Date().toISOString()
    });
    
    console.log(`✅ Statut du devis ${devisId} mis à jour avec succès`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour du statut du devis ${devisId}:`, error);
    return false;
  }
}

export async function getDevisForClient(projectId: string): Promise<UnifiedDevis[]> {
  try {
    console.log(`🔍 [CLIENT] Récupération des devis pour le projet ${projectId}`);
    
    // Récupérer tous les devis du projet
    const allDevis = await getDevisByProjectId(projectId, true); // isClientSide = true pour le mapping des statuts
    
    console.log(`📊 [CLIENT] ${allDevis.length} devis trouvés au total`);
    
    // Filtrer pour ne garder que les devis "Envoyé au client" et "Validé" côté client
    const clientDevis = allDevis.filter(devis => {
      const shouldShow = devis._originalStatus === 'Envoyé au client' || devis._originalStatus === 'Validé';
      
      if (shouldShow) {
        console.log(`✅ [CLIENT] Devis ${devis.id} affiché (statut original: ${devis._originalStatus}, statut affiché: ${devis.status})`);
      } else {
        console.log(`❌ [CLIENT] Devis ${devis.id} masqué (statut: ${devis._originalStatus})`);
      }
      
      return shouldShow;
    });
    
    // Trier par date de création/mise à jour (plus récent en premier)
    clientDevis.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (a.updatedAt && b.updatedAt) {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      return (a.titre || '').localeCompare(b.titre || '');
    });
    
    console.log(`🎯 [CLIENT] ${clientDevis.length} devis filtrés pour affichage client`);
    
    // Log détaillé des montants pour debug
    clientDevis.forEach(devis => {
      const montantFields = ['montant', 'amount', 'prix', 'price', 'total', 'totalAmount', 'cost'];
      const foundMontant = montantFields.find(field => (devis as any)[field] !== undefined);
      console.log(`💰 [CLIENT] Devis ${devis.id}: montant = ${devis.montant} (trouvé via ${foundMontant || 'aucun champ'})`);
    });
    
    return clientDevis;
  } catch (error) {
    console.error(`❌ [CLIENT] Erreur lors de la récupération des devis pour le projet ${projectId}:`, error);
    return [];
  }
}

export async function getUserProfileById(client_id: string) {
  try {
    const docRef = doc(db, "users", client_id);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error("Erreur lors de la récupération du profil utilisateur:", err);
    return null;
  }
}

export function useProjects(client_id: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupère les projets de l'utilisateur
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), where("client_id", "==", client_id));
      const snap = await getDocs(q);
      const data = snap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }) as Project);
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Met à jour un projet
  const updateProject = async (projectId: string, data: Partial<Project>) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "projects", projectId), data);
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...data } : p));
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Injecte 4 projets de test pour l'utilisateur
  const injectSampleProjects = async (client_id: string) => {
    const sampleProjects = [
      {
        name: "Villa Moderne",
        description: "Construction d'une villa contemporaine de 200m²",
        budget: 450000,
        paidAmount: 135000,
        startDate: "2024-03-01",
        estimatedEndDate: "2024-12-31",
        status: "En cours" as const,
        broker: {
          id: 1,
          name: "Jean Dupont",
          company: "Dupont & Associés",
          rating: 4.8,
          projectsCount: 156,
          specialties: ["Résidentiel", "Commercial", "Rénovation"],
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
        },
        progress: 30,
        type: "Résidentiel",
        location: "Aix-en-Provence",
        client_id
      },
      {
        name: "Rénovation Appartement",
        description: "Rénovation complète d'un appartement haussmannien",
        budget: 180000,
        paidAmount: 54000,
        startDate: "2024-02-15",
        estimatedEndDate: "2024-08-15",
        status: "En cours" as const,
        broker: {
          id: 2,
          name: "Marie Lambert",
          company: "Lambert Courtage",
          rating: 4.9,
          projectsCount: 203,
          specialties: ["Luxe", "Résidentiel", "Éco-construction"],
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
        },
        progress: 45,
        type: "Rénovation",
        location: "Paris",
        client_id
      },
      {
        name: "Immeuble Bureaux",
        description: "Construction d'un immeuble de bureaux HQE",
        budget: 1200000,
        paidAmount: 400000,
        startDate: "2024-04-01",
        estimatedEndDate: "2025-10-01",
        status: "En attente" as const,
        broker: {
          id: 3,
          name: "Pierre Martin",
          company: "Martin Immobilier",
          rating: 4.7,
          projectsCount: 128,
          specialties: ["Commercial", "Industriel"],
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
        },
        progress: 0,
        type: "Commercial",
        location: "Lyon",
        client_id
      },
      {
        name: "Maison Écologique",
        description: "Construction d'une maison passive à ossature bois",
        budget: 320000,
        paidAmount: 80000,
        startDate: "2024-05-10",
        estimatedEndDate: "2025-02-20",
        status: "Terminé" as const,
        broker: {
          id: 2,
          name: "Marie Lambert",
          company: "Lambert Courtage",
          rating: 4.9,
          projectsCount: 203,
          specialties: ["Luxe", "Résidentiel", "Éco-construction"],
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
        },
        progress: 100,
        type: "Résidentiel",
        location: "Bordeaux",
        client_id
      }
    ];
    for (const project of sampleProjects) {
      await addDoc(collection(db, "projects"), project);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    updateProject,
    injectSampleProjects,
  };
}
