"use client";

import { useState } from "react";
import { Search, Filter, Download, FileText, ChevronRight, Calendar, ArrowUpRight, CreditCard, CheckCircle, Clock, XCircle, Plus } from "lucide-react";

export default function PaymentTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    project: "",
    amount: "",
    reference: "Paiement acompte"
  });

  // Liste des projets disponibles
  const projects = [
    "Villa Moderne",
    "Rénovation Appartement",
    "Extension Maison",
    "Piscine Luxe",
    "Terrasse Bois"
  ];

  const paymentsPerPage = 5;
  const [payments] = useState([
    {
      id: 1,
      project: "Villa Moderne",
      date: "2024-04-15",
      amount: 12500,
      reference: "Paiement acompte",
      status: "Complété",
      method: "Virement bancaire",
      invoiceRef: "FAC-2024-015"
    },
    {
      id: 2,
      project: "Rénovation Appartement",
      date: "2024-04-10",
      amount: 8500,
      reference: "Solde final",
      status: "En attente",
      method: "Carte de crédit",
      invoiceRef: "FAC-2024-012"
    },
    {
      id: 3,
      project: "Extension Maison",
      date: "2024-04-05",
      amount: 22000,
      reference: "Paiement intermédiaire",
      status: "Complété",
      method: "Chèque",
      invoiceRef: "FAC-2024-008"
    },
    {
      id: 4,
      project: "Piscine Luxe",
      date: "2024-04-01",
      amount: 18000,
      reference: "Paiement acompte",
      status: "Rejeté",
      method: "Virement bancaire",
      invoiceRef: "FAC-2024-005",
      rejectionReason: "Fonds insuffisants"
    },
    {
      id: 5,
      project: "Terrasse Bois",
      date: "2024-03-28",
      amount: 9500,
      reference: "Paiement final",
      status: "Complété",
      method: "PayPal",
      invoiceRef: "FAC-2024-003"
    },
    {
      id: 6,
      project: "Villa Moderne",
      date: "2024-03-25",
      amount: 15000,
      reference: "Paiement intermédiaire",
      status: "Complété",
      method: "Stripe",
      invoiceRef: "FAC-2024-002"
    },
  ]);

  const stats = [
    {
      title: "Total des paiements",
      value: "85 500 €",
      trend: "+18.5%",
      description: "vs. mois dernier",
      iconColor: "bg-[#dd7109]/10 text-[#dd7109]"
    },
    {
      title: "Paiements complétés",
      value: "58 000 €",
      trend: "+12.2%",
      description: "vs. mois dernier",
      iconColor: "bg-emerald-100/50 text-emerald-600"
    },
    {
      title: "En attente",
      value: "8 500 €",
      trend: "+5.3%",
      description: "vs. mois dernier",
      iconColor: "bg-amber-100/50 text-amber-600"
    }
  ];

  const handleExport = () => {
    const data = payments.map(payment => ({
      ...payment,
      date: new Date(payment.date).toLocaleDateString(),
      amount: `${payment.amount.toLocaleString()} €`
    }));
    
    console.log("Exporting payment data:", data);
    alert("Export des paiements en cours...");
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "completed") return matchesSearch && payment.status === "Complété";
    if (activeFilter === "pending") return matchesSearch && payment.status === "En attente";
    if (activeFilter === "rejected") return matchesSearch && payment.status === "Rejeté";
    if (activeFilter === "recent") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return matchesSearch && new Date(payment.date) >= thirtyDaysAgo;
    }
    return matchesSearch;
  });

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusIcon = (status) => {
    switch(status) {
      case "Complété":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "En attente":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "Rejeté":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getMethodIcon = (method) => {
    switch(method) {
      case "Stripe":
        return (
          <svg className="w-5 h-5 text-[#635bff]" viewBox="0 0 28 28" fill="currentColor">
            <path d="M13.714 12.375c0-1.313.656-1.969 1.969-1.969h4.594c.656 0 1.313.656 1.313 1.313v1.313c0 .656-.657 1.312-1.313 1.312h-3.281v1.969h3.281c.656 0 1.313.656 1.313 1.312v1.313c0 .656-.657 1.312-1.313 1.312h-4.594c-1.313 0-1.969-.656-1.969-1.969v-5.156zm-2.625 0v5.156c0 1.313-.656 1.969-1.969 1.969H4.53c-.657 0-1.313-.656-1.313-1.312v-1.313c0-.656.656-1.312 1.313-1.312h3.281v-1.969H4.53c-.657 0-1.313-.656-1.313-1.312V11.72c0-.656.656-1.312 1.313-1.312h4.594c1.313 0 1.969.656 1.969 1.969v1.969z"/>
          </svg>
        );
      case "PayPal":
        return (
          <svg className="w-5 h-5 text-[#003087]" viewBox="0 0 28 28" fill="currentColor">
            <path d="M10.13 7.72c0 1.566-.984 2.423-2.367 2.423H5.67v-4.86h2.092c1.383 0 2.367.857 2.367 2.437zm.492 6.328c0 1.566-.984 2.424-2.367 2.424H5.67v-4.86h2.092c1.383 0 2.367.858 2.367 2.437zm10.703-4.328c-1.383 0-2.367.857-2.367 2.437 0 1.566.984 2.423 2.367 2.423 1.382 0 2.366-.857 2.366-2.423 0-1.58-.984-2.437-2.366-2.437zm-5.86 1.828h1.312v-1.312h-1.312v1.312zm0 5.156h1.312v-4.594h-1.312v4.594zm-5.86-6.563H5.67v8.75h2.092c1.848 0 3.047-1.047 3.047-2.79v-.492c0-1.312-.738-1.988-1.793-2.196 1.055-.164 1.793-.82 1.793-2.132v-.492c0-1.727-1.2-2.758-3.047-2.758zm10.703-.984c-1.848 0-3.047 1.031-3.047 2.758v.492c0 1.313.738 1.969 1.793 2.133-1.055.207-1.793.883-1.793 2.195v.492c0 1.743 1.2 2.79 3.047 2.79h2.092v-8.75h-2.092z"/>
          </svg>
        );
      case "Virement bancaire":
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      case "Carte de crédit":
        return <CreditCard className="w-5 h-5 text-purple-500" />;
      case "Chèque":
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <CreditCard className="w-5 h-5 text-[#dd7109]" />;
    }
  };

  const handleNewPaymentSubmit = (e) => {
    e.preventDefault();
    if (!newPayment.project || !newPayment.amount) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setShowNewPaymentModal(false);
    setShowPaymentMethodModal(true);
  };

  const handlePaymentMethodSelect = (method) => {
    // Ici vous intégreriez le SDK de paiement correspondant
    console.log(`Paiement de ${newPayment.amount}€ pour ${newPayment.project} via ${method}`);
    
    // Simulation de succès
    alert(`Paiement de ${newPayment.amount}€ pour le projet "${newPayment.project}" initié via ${method}`);
    
    setShowPaymentMethodModal(false);
    setNewPayment({ project: "", amount: "", reference: "Paiement acompte" });
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header avec bandeau coloré */}
      <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 px-6 py-8 rounded-b-2xl shadow-md bg-opacity-90">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Suivi des Paiements</h1>
              <p className="text-amber-100 mt-1">Gérez les paiements associés à vos projets</p>
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
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
              <button 
                onClick={() => setShowNewPaymentModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau paiement</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.trend}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                </div>
              </div>
              <div className={`mt-3 h-1 w-full bg-gradient-to-r from-[#dd7109]/30 to-amber-300 rounded-full`}></div>
            </div>
          ))}
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
                  placeholder="Rechercher par projet, référence ou facture..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveFilter("recent")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "recent" 
                      ? 'bg-[#dd7109] text-white shadow-xs' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Récent
                </button>
                <button 
                  onClick={() => setActiveFilter("completed")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "completed" 
                      ? 'bg-[#dd7109] text-white shadow-xs' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Complété
                </button>
                <button 
                  onClick={() => setActiveFilter("pending")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "pending" 
                      ? 'bg-[#dd7109] text-white shadow-xs' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  En attente
                </button>
                <button 
                  onClick={() => setActiveFilter("rejected")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "rejected" 
                      ? 'bg-[#dd7109] text-white shadow-xs' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Rejeté
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100/50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all">
                    <option>Toutes</option>
                    <option>Cette semaine</option>
                    <option>Ce mois</option>
                    <option>Ce trimestre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Montant</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all">
                    <option>Tous</option>
                    <option>0 - 5 000 €</option>
                    <option>5 000 - 15 000 €</option>
                    <option>15 000+ €</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Méthode</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all">
                    <option>Toutes</option>
                    <option>Virement bancaire</option>
                    <option>Carte de crédit</option>
                    <option>Chèque</option>
                    <option>PayPal</option>
                    <option>Stripe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Projet</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all">
                    <option>Tous</option>
                    {projects.map(project => (
                      <option key={project}>{project}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Liste des paiements */}
        {filteredPayments.length > 0 ? (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden mb-4">
              <div className="grid grid-cols-12 bg-gray-50/50 p-4 border-b border-gray-100/50">
                <div className="col-span-3 font-medium text-sm text-gray-500">Projet</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Référence</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Montant</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Méthode</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Statut</div>
                <div className="col-span-1"></div>
              </div>
              
              {currentPayments.map((payment) => (
                <div 
                  key={payment.id} 
                  className="grid grid-cols-12 p-4 border-b border-gray-100/50 hover:bg-gray-50/30 transition-colors items-center"
                >
                  <div className="col-span-3">
                    <div className="font-medium text-gray-900">{payment.project}</div>
                    <div className="text-xs text-[#dd7109] mt-1">{payment.invoiceRef}</div>
                  </div>
                  <div className="col-span-2 text-gray-700">
                    {payment.reference}
                  </div>
                  <div className="col-span-2 font-medium text-gray-900">
                    {payment.amount.toLocaleString()} €
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    {getMethodIcon(payment.method)}
                    <span className="text-gray-700">{payment.method}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <span className={`text-sm font-medium ${
                        payment.status === "Complété" ? "text-emerald-600" :
                        payment.status === "En attente" ? "text-amber-600" :
                        "text-red-600"
                      }`}>
                        {payment.status}
                      </span>
                      {payment.status === "Rejeté" && (
                        <span className="text-xs text-red-500">({payment.rejectionReason})</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-[#dd7109] hover:text-[#dd7109]/80 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100/50">
              <div className="text-sm text-gray-500">
                Affichage de {indexOfFirstPayment + 1} à {Math.min(indexOfLastPayment, filteredPayments.length)} sur {filteredPayments.length} paiements
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
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-[#dd7109]">Aucun paiement trouvé</h3>
              <p className="mt-1 text-gray-500">
                Essayez de modifier vos critères de recherche ou enregistrez un nouveau paiement.
              </p>
              <div className="mt-6">
                <button 
                  onClick={() => setShowNewPaymentModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#dd7109] hover:bg-[#dd7109]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dd7109]"
                >
                  Enregistrer un paiement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Nouveau Paiement */}
      {showNewPaymentModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Nouveau Paiement</h2>
              <p className="text-amber-100 text-sm mt-1">Renseignez les détails du paiement</p>
            </div>
            
            <form onSubmit={handleNewPaymentSubmit} className="p-6">
              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Projet <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      required
                      value={newPayment.project}
                      onChange={(e) => setNewPayment({...newPayment, project: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all appearance-none"
                    >
                      <option value="">Sélectionnez un projet</option>
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montant (€) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all"
                      placeholder="0.00"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Référence</label>
                  <div className="relative">
                    <select
                      value={newPayment.reference}
                      onChange={(e) => setNewPayment({...newPayment, reference: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all appearance-none"
                    >
                      <option value="Paiement acompte">Paiement acompte</option>
                      <option value="Paiement intermédiaire">Paiement intermédiaire</option>
                      <option value="Solde final">Solde final</option>
                      <option value="Paiement exceptionnel">Paiement exceptionnel</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewPaymentModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Continuer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Méthode de Paiement */}
      {showPaymentMethodModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Méthode de Paiement</h2>
              <p className="text-amber-100 text-sm mt-1">Choisissez votre mode de règlement</p>
            </div>

            <div className="p-6">
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  Paiement de <span className="font-bold text-[#dd7109]">{newPayment.amount}€</span> pour<br />
                  le projet <span className="font-medium">{newPayment.project}</span>
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handlePaymentMethodSelect("Stripe")}
                  className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#dd7109] hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#635bff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#635bff]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#635bff]" viewBox="0 0 28 28" fill="currentColor">
                          <path d="M13.714 12.375c0-1.313.656-1.969 1.969-1.969h4.594c.656 0 1.313.656 1.313 1.313v1.313c0 .656-.657 1.312-1.313 1.312h-3.281v1.969h3.281c.656 0 1.313.656 1.313 1.312v1.313c0 .656-.657 1.312-1.313 1.312h-4.594c-1.313 0-1.969-.656-1.969-1.969v-5.156zm-2.625 0v5.156c0 1.313-.656 1.969-1.969 1.969H4.53c-.657 0-1.313-.656-1.313-1.312v-1.313c0-.656.656-1.312 1.313-1.312h3.281v-1.969H4.53c-.657 0-1.313-.656-1.313-1.312V11.72c0-.656.656-1.312 1.313-1.312h4.594c1.313 0 1.969.656 1.969 1.969v1.969z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">Stripe</h3>
                        <p className="text-sm text-gray-500">Carte de crédit, Apple Pay, etc.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#dd7109] transition-colors" />
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentMethodSelect("PayPal")}
                  className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#dd7109] hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#003087]/10 rounded-lg flex items-center justify-center group-hover:bg-[#003087]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#003087]" viewBox="0 0 28 28" fill="currentColor">
                          <path d="M10.13 7.72c0 1.566-.984 2.423-2.367 2.423H5.67v-4.86h2.092c1.383 0 2.367.857 2.367 2.437zm.492 6.328c0 1.566-.984 2.424-2.367 2.424H5.67v-4.86h2.092c1.383 0 2.367.858 2.367 2.437zm10.703-4.328c-1.383 0-2.367.857-2.367 2.437 0 1.566.984 2.423 2.367 2.423 1.382 0 2.366-.857 2.366-2.423 0-1.58-.984-2.437-2.366-2.437zm-5.86 1.828h1.312v-1.312h-1.312v1.312zm0 5.156h1.312v-4.594h-1.312v4.594zm-5.86-6.563H5.67v8.75h2.092c1.848 0 3.047-1.047 3.047-2.79v-.492c0-1.312-.738-1.988-1.793-2.196 1.055-.164 1.793-.82 1.793-2.132v-.492c0-1.727-1.2-2.758-3.047-2.758zm10.703-.984c-1.848 0-3.047 1.031-3.047 2.758v.492c0 1.313.738 1.969 1.793 2.133-1.055.207-1.793.883-1.793 2.195v.492c0 1.743 1.2 2.79 3.047 2.79h2.092v-8.75h-2.092z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">PayPal</h3>
                        <p className="text-sm text-gray-500">Paiement sécurisé en ligne</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#dd7109] transition-colors" />
                  </div>
                </button>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100">
                <button
                  onClick={() => setShowPaymentMethodModal(false)}
                  className="w-full px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}