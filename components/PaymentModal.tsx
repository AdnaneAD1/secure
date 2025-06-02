"use client";
import { useState } from "react";
import type { ProjectPayment } from "@/hooks/payments";


interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  payment: ProjectPayment | null;
}

export default function PaymentModal({ open, onClose, payment }: PaymentModalProps) {
  const [ibanCopied, setIbanCopied] = useState(false);
  const IBAN = "FR76 3000 4000 0100 0001 2345 678";
  const BIC = "BNPAFRPPXXX";
  const HOLDER = "ACME Solutions SAS";
  const BANK = "BNP Paribas";

  if (!open || !payment) return null;

  const handleCopyIban = () => {
    navigator.clipboard.writeText(IBAN);
    setIbanCopied(true);
    setTimeout(() => setIbanCopied(false), 2000);
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
        <h3 className="text-lg font-semibold mb-2">Payer l'acompte</h3>
        <div className="mb-4">
          <div className="text-base font-medium text-gray-900 mb-1">{payment.title}</div>
          <div className="text-sm text-gray-500 mb-1">{payment.date}</div>
          <div className="text-sm text-gray-700 mb-1">{payment.description}</div>
          <div className="text-xl font-bold text-gray-900 mt-2">{payment.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Instructions de paiement</label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 text-sm">
              Merci d'effectuer un virement bancaire du montant indiqué sur le compte suivant&nbsp;:<br /><br />
              <span className="font-semibold">Titulaire&nbsp;:</span> {HOLDER}<br />
              <span className="font-semibold">IBAN&nbsp;:</span> <span className="select-all" style={{letterSpacing: '1px'}}>{IBAN}</span>
              <button
                type="button"
                className="ml-2 px-2 py-0.5 text-xs bg-[#dd7109] text-white rounded hover:bg-[#b95c07] transition"
                onClick={handleCopyIban}
              >
                {ibanCopied ? "Copié !" : "Copier"}
              </button>
              <br />
              <span className="font-semibold">BIC&nbsp;:</span> {BIC}<br />
              <span className="font-semibold">Banque&nbsp;:</span> {BANK}<br /><br />
              Merci d'indiquer le nom du projet ou la référence de la facture dans le motif du virement.<br />
              <span className="italic text-xs text-gray-500">Une fois le virement reçu, votre paiement sera validé sous 1 à 2 jours ouvrés.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
