"use client";

import { useState } from "react";
import { Search, Filter, Download, FileText, ChevronRight, Calendar, ArrowUpRight, Plus } from "lucide-react";

interface Invoice {
  id: number;
  number: string;
  project: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "Payée" | "En attente";
  paymentMethod?: string;
}

const invoicesData: Invoice[] = [
  {
    id: 1,
    number: "FAC-2023-001",
    project: "Villa Moderne",
    date: "2023-09-01",
    dueDate: "2023-09-15",
    amount: 12500,
    status: "Payée",
    paymentMethod: "Virement bancaire"
  },
  {
    id: 2,
    number: "FAC-2023-002",
    project: "Rénovation Appartement",
    date: "2023-10-01",
    dueDate: "2023-10-15",
    amount: 8500,
    status: "En attente"
  },
  {
    id: 3,
    number: "FAC-2024-001",
    project: "Extension Maison",
    date: "2024-03-01",
    dueDate: "2024-03-10",
    amount: 22000,
    status: "Payée",
    paymentMethod: "Stripe"
  },
  {
    id: 4,
    number: "FAC-2024-002",
    project: "Piscine Luxe",
    date: "2024-01-10",
    dueDate: "2024-01-25",
    amount: 18000,
    status: "En attente"
  },
  {
    id: 5,
    number: "FAC-2024-003",
    project: "Terrasse Bois",
    date: "2024-02-15",
    dueDate: "2024-03-01",
    amount: 9500,
    status: "Payée",
    paymentMethod: "PayPal"
  },
  {
    id: 6,
    number: "FAC-2024-004",
    project: "Villa Moderne",
    date: "2024-04-05",
    dueDate: "2024-04-20",
    amount: 15000,
    status: "Payée",
    paymentMethod: "Carte de crédit"
  },
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"Payée" | "En attente" | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"7j" | "30j" | "3mois" | "6mois" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  const uniqueProjects = Array.from(new Set(invoicesData.map((inv) => inv.project)));

  const filteredInvoices = invoicesData.filter((inv) => {
    const matchesSearch = inv.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inv.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject ? inv.project === selectedProject : true;
    const matchesStatus = selectedStatus ? inv.status === selectedStatus : true;

    const now = new Date();
    const invoiceDate = new Date(inv.date);
    let matchesPeriod = true;

    if (selectedPeriod === "7j") {
      const d = new Date();
      d.setDate(now.getDate() - 7);
      matchesPeriod = invoiceDate >= d;
    } else if (selectedPeriod === "30j") {
      const d = new Date();
      d.setDate(now.getDate() - 30);
      matchesPeriod = invoiceDate >= d;
    } else if (selectedPeriod === "3mois") {
      const d = new Date();
      d.setMonth(now.getMonth() - 3);
      matchesPeriod = invoiceDate >= d;
    } else if (selectedPeriod === "6mois") {
      const d = new Date();
      d.setMonth(now.getMonth() - 6);
      matchesPeriod = invoiceDate >= d;
    }

    return matchesSearch && matchesProject && matchesStatus && matchesPeriod;
  });

  // Pagination logic
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Stats
  const total = filteredInvoices.length;
  const payees = filteredInvoices.filter((i) => i.status === "Payée").length;
  const enAttente = filteredInvoices.filter((i) => i.status === "En attente").length;
  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  const handleDownload = (invoiceNumber: string) => {
    console.log(`Téléchargement de la facture ${invoiceNumber}`);
    alert(`Téléchargement de la facture ${invoiceNumber} en cours...`);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header avec bandeau coloré */}
      <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 px-6 py-8 rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Factures</h1>
              <p className="text-amber-100 mt-1">Gérez et suivez toutes vos factures</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                  showFilters 
                    ? 'bg-white text-[#dd7109] shadow-md' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total des factures</h3>
                <p className="text-2xl font-bold text-gray-900">{total}</p>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-gradient-to-r from-[#dd7109]/30 to-amber-300 rounded-full"></div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Factures payées</h3>
                <p className="text-2xl font-bold text-emerald-600">{payees}</p>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-gradient-to-r from-emerald-100 to-emerald-300 rounded-full"></div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">En attente</h3>
                <p className="text-2xl font-bold text-amber-600">{enAttente}</p>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-gradient-to-r from-amber-100 to-amber-300 rounded-full"></div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Montant total</h3>
                <p className="text-2xl font-bold text-blue-600">{totalAmount.toLocaleString()} €</p>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-gradient-to-r from-blue-100 to-blue-300 rounded-full"></div>
          </div>
        </div>

        {/* Recherche et filtres */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher par numéro ou projet..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    setSelectedPeriod("30j");
                    setSelectedProject(null);
                    setSelectedStatus(null);
                  }}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    selectedPeriod === "30j" && !selectedProject && !selectedStatus
                      ? 'bg-[#dd7109] text-white shadow-xs' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  30 derniers jours
                </button>
                <button 
                  onClick={() => {
                    setSelectedStatus("Payée");
                    setSelectedPeriod(null);
                  }}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    selectedStatus === "Payée" && !selectedPeriod
                      ? 'bg-[#dd7109] text-white shadow-xs' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Payées
                </button>
                <button 
                  onClick={() => {
                    setSelectedStatus("En attente");
                    setSelectedPeriod(null);
                  }}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    selectedStatus === "En attente" && !selectedPeriod
                      ? 'bg-[#dd7109] text-white shadow-xs' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  En attente
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100/50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Projet</label>
                  <select
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all"
                    value={selectedProject || ""}
                    onChange={(e) => setSelectedProject(e.target.value || null)}
                  >
                    <option value="">Tous les projets</option>
                    {uniqueProjects.map((proj) => (
                      <option key={proj} value={proj}>
                        {proj}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all"
                    value={selectedStatus || ""}
                    onChange={(e) =>
                      setSelectedStatus(e.target.value ? (e.target.value as "Payée" | "En attente") : null)
                    }
                  >
                    <option value="">Tous</option>
                    <option value="Payée">Payée</option>
                    <option value="En attente">En attente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                  <select
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all"
                    value={selectedPeriod || ""}
                    onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  >
                    <option value="">Toutes les dates</option>
                    <option value="7j">7 derniers jours</option>
                    <option value="30j">30 derniers jours</option>
                    <option value="3mois">3 derniers mois</option>
                    <option value="6mois">6 derniers mois</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Liste des factures */}
        {filteredInvoices.length > 0 ? (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden mb-4">
              <div className="grid grid-cols-12 bg-gray-50/50 p-4 border-b border-gray-100/50">
                <div className="col-span-2 font-medium text-sm text-gray-500">Numéro</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Projet</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Date</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Échéance</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Montant</div>
                <div className="col-span-1 font-medium text-sm text-gray-500">Statut</div>
                <div className="col-span-1"></div>
              </div>
              
              {currentInvoices.map((invoice) => (
                <div 
                  key={invoice.id} 
                  className="grid grid-cols-12 p-4 border-b border-gray-100/50 hover:bg-gray-50/30 transition-colors items-center"
                >
                  <div className="col-span-2 font-medium text-gray-900">
                    {invoice.number}
                  </div>
                  <div className="col-span-2 text-gray-700">
                    {invoice.project}
                  </div>
                  <div className="col-span-2 text-gray-700 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(invoice.date).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 text-gray-700 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 font-medium text-gray-900">
                    {invoice.amount.toLocaleString()} €
                  </div>
                  <div className="col-span-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "Payée"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {invoice.status}
                    </span>
                    {invoice.paymentMethod && invoice.status === "Payée" && (
                      <p className="text-xs text-gray-500 mt-1">{invoice.paymentMethod}</p>
                    )}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button 
                      onClick={() => handleDownload(invoice.number)}
                      className="text-[#dd7109] hover:text-[#dd7109]/80 transition-colors"
                      title="Télécharger la facture"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100/50">
              <div className="text-sm text-gray-500">
                Affichage de {indexOfFirstInvoice + 1} à {Math.min(indexOfLastInvoice, filteredInvoices.length)} sur {filteredInvoices.length} factures
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === number 
                        ? 'bg-[#dd7109] text-white border-[#dd7109]' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Suivant
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-100/50">
            <div className="mx-auto max-w-md">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-[#dd7109]">Aucune facture trouvée</h3>
              <p className="mt-1 text-gray-500">
                Essayez de modifier vos critères de recherche ou créez une nouvelle facture.
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#dd7109] hover:bg-[#dd7109]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dd7109]">
                  Créer une facture
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}