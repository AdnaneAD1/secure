"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  Building2,
  FileCheck,
  TrendingUp,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Users,
  Bell,
  Filter,
  ChevronRight
} from "lucide-react";

const areaChartData = [
  { name: "Jan", Acomptes: 4000, Paiements: 2400 },
  { name: "Fév", Acomptes: 3000, Paiements: 1398 },
  { name: "Mar", Acomptes: 2000, Paiements: 9800 },
  { name: "Avr", Acomptes: 2780, Paiements: 3908 },
  { name: "Mai", Acomptes: 1890, Paiements: 4800 },
  { name: "Jun", Acomptes: 2390, Paiements: 3800 },
];

const barChartData = [
  { name: "Lun", value: 20 },
  { name: "Mar", value: 45 },
  { name: "Mer", value: 35 },
  { name: "Jeu", value: 50 },
  { name: "Ven", value: 30 },
  { name: "Sam", value: 20 },
  { name: "Dim", value: 15 },
];

const pieChartData = [
  { name: "Payé", value: 30, color: "#10B981" },
  { name: "En attente", value: 45, color: "#F59E0B" },
  { name: "Non payé", value: 25, color: "#EF4444" },
];

export default function ClientDashboard() {
  const [projects] = useState([
    {
      id: 1,
      name: "Villa Moderne",
      budget: 150000,
      paid: 45000,
      progress: 30,
      status: "En cours",
      dueDate: "2024-06-15",
      region: "Île-de-France",
      image: "/modern-house.jpg"
    },
    {
      id: 2,
      name: "Rénovation Appartement",
      budget: 75000,
      paid: 22500,
      progress: 30,
      status: "En attente",
      dueDate: "2024-05-20",
      region: "Provence-Alpes-Côte d'Azur",
      image: "/apartment.jpg"
    },
  ]);

  const stats = [
    {
      title: "Projets actifs",
      value: "2",
      icon: Building2,
      trend: "+50%",
      trendUp: true,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Budget total",
      value: "225 000 €",
      icon: TrendingUp,
      trend: "+25%",
      trendUp: true,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Acomptes versés",
      value: "67 500 €",
      icon: FileCheck,
      trend: "+15%",
      trendUp: true,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Reste à payer",
      value: "157 500 €",
      icon: Clock,
      trend: "-10%",
      trendUp: false,
      color: "bg-rose-100 text-rose-600"
    },
  ];

  return (
    <div className="space-y-6 p-6  min-h-screen bg-white">
      {/* Header with Quick Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4" >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Bienvenue, voici un aperçu de vos projets</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md border border-gray-200">
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all shadow-md hover:from-orange-600 hover:to-amber-600">
            <Plus className="w-4 h-4" />
            <span>Nouveau projet</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden relative"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color.split(' ')[0]} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className={`text-sm font-medium ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.trend}
              </span>
              <span className="text-xs text-gray-400 ml-1">vs mois dernier</span>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 w-full ${stat.color.split(' ')[0].replace('bg-', 'bg-gradient-to-r from-')}-500 to-${stat.color.split(' ')[0].replace('bg-', '')}-300`}></div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Area Chart */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Suivi des paiements</h2>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button className="px-3 py-1 text-sm rounded-md bg-white text-gray-900 shadow-sm">Mois</button>
              <button className="px-3 py-1 text-sm rounded-md text-gray-500 hover:text-gray-900">Année</button>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcomptes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPaiements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Acomptes"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAcomptes)"
                  activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="Paiements"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPaiements)"
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Activité hebdomadaire</h2>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-sm text-gray-600">Cette semaine</span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#barGradient)" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={2000}
                >
                  {barChartData.map((entry, index) => (
                    <defs key={`gradient-${index}`}>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#F97316" />
                      </linearGradient>
                    </defs>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Projects and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Projects List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Projets en cours</h2>
              <button className="flex items-center gap-1 text-amber-600 text-sm font-medium hover:text-amber-700 group">
                <span>Voir tout</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="p-5 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">{project.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{project.region}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(project.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "En cours"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Budget total</span>
                        <span className="font-medium text-gray-900">{project.budget.toLocaleString()} €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Acompte versé</span>
                        <span className="font-medium text-gray-900">{project.paid.toLocaleString()} €</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-500">Progression</span>
                          <span className="font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Statut des paiements</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={500}
                  animationDuration={1500}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {pieChartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}