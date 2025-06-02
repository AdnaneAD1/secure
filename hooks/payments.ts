import { useState, useEffect } from "react";
import { db } from "@/firebase/ClientApp";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";

export type PaymentStatus = "validé" | "en_attente";
export interface ProjectPayment {
  id: string;
  projectId: string;
  title: string;
  date: string;
  description: string;
  status: PaymentStatus;
  amount: number;
  images: string[];
}

export async function injectMockPayments(projectId: string) {
  const mockPayments = [
    {
      projectId,
      title: "Premier acompte",
      date: "2025-02-10",
      description: "Début des travaux de la salle de bain",
      status: "validé" as const,
      amount: 2500,
      images: [
        "/photos/photo1.jpg",
        "/photos/photo2.jpg",
        "/photos/photo3.jpg",
        "/photos/plan1.jpg"
      ],
    },
    {
      projectId,
      title: "Deuxième acompte",
      date: "2025-02-20",
      description: "Avancement des travaux – 50% réalisé",
      status: "en_attente" as const,
      amount: 3000,
      images: [
        "/photos/photo4.jpg",
        "/photos/photo1.jpg"
      ],
    },
    {
      projectId,
      title: "Solde final",
      date: "2025-03-15",
      description: "Solde à régler à la fin des travaux",
      status: "en_attente" as const,
      amount: 1500,
      images: [
        "/photos/photo2.jpg"
      ],
    },
  ];
  for (const payment of mockPayments) {
    await addDoc(collection(db, "payments"), payment);
  }
}

// Récupère tous les acomptes liés aux projets du client connecté
export async function getAllClientPayments(userId: string): Promise<ProjectPayment[]> {
  const { getFirestore, collection, getDocs, query, where } = await import("firebase/firestore");
  const db = getFirestore();
  // 1. Trouver les projets du client
  const projectsRef = collection(db, "projects");
  const projectsQuery = query(projectsRef, where("client_id", "==", userId));
  const projectsSnap = await getDocs(projectsQuery);
  const projectList = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const projectIds = projectList.map(p => p.id);
  if (projectIds.length === 0) return [];
  // Crée une map id -> nom
  const projectNameMap = Object.fromEntries(
    projectList.map(p => [p.id, (p as any).name ?? "Projet sans nom"])
  );
  // 2. Récupérer tous les acomptes liés à ces projets
  const paymentsRef = collection(db, "payments");
  const paymentsSnap = await getDocs(paymentsRef);
  // 3. Filtrer côté client pour éviter les doublons et injecter le nom du projet
  const allPayments = paymentsSnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter((p: any) => projectIds.includes(p.projectId))
    .map((p: any) => ({
      ...p,
      project: projectNameMap[p.projectId] || "Projet inconnu"
    }));
  // 4. Supprimer les doublons potentiels (par id)
  const uniquePayments = Array.from(new Map(allPayments.map(p => [p.id, p])).values());
  return uniquePayments as ProjectPayment[];
}

export function usePayments(projectId: string) {
  const [payments, setPayments] = useState<ProjectPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    const fetchPayments = async () => {
      try {
        const paymentsRef = collection(db, "payments");
        const q = query(
          paymentsRef,
          where("projectId", "==", projectId),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const paymentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProjectPayment[];
        setPayments(paymentsList);
      } catch (e) {
        setError("Erreur lors du chargement des acomptes");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [projectId]);

  return { payments, loading, error };
}
