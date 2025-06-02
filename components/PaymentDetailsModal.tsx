"use client";
import React from "react";
import type { ProjectPayment } from "@/hooks/payments";

interface PaymentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  payment: ProjectPayment | null;
}

const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({ open, onClose, payment }) => {
  if (!open || !payment) return null;

  const handleDownloadInvoice = () => {
    // TODO: Remplacer ce code par la logique réelle de téléchargement de facture
    alert("Téléchargement de la facture pour le paiement " + payment.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-4">Détail de l'acompte</h3>
        <div className="space-y-2 mb-4">
          <div>
            <span className="font-medium text-gray-700">Projet : </span>
            <span className="text-gray-900">{(payment as any).project || payment.projectId}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Montant : </span>
            <span className="text-gray-900">{payment.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Date : </span>
            <span className="text-gray-900">{payment.date}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Statut : </span>
            <span className={
              payment.status === "validé"
                ? "text-emerald-600 font-semibold"
                : payment.status === "en_attente"
                ? "text-amber-600 font-semibold"
                : "text-red-600 font-semibold"
            }>
              {payment.status}
            </span>
          </div>
          {payment.description && (
            <div>
              <span className="font-medium text-gray-700">Description : </span>
              <span className="text-gray-900">{payment.description}</span>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
            onClick={onClose}
          >
            Fermer
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-[#dd7109] text-white hover:bg-[#b95c07] font-medium disabled:opacity-50"
            onClick={handleDownloadInvoice}
            disabled={payment.status !== "validé"}
            title={payment.status !== "validé" ? "La facture n'est disponible qu'après validation du paiement." : ""}
          >
            Obtenir la facture
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
