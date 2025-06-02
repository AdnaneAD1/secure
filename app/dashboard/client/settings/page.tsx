"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Building, Mail, Phone, Lock, Bell, CreditCard, Shield, ChevronRight } from "lucide-react";
import { useSettings } from "@/hooks/settings";
import { useAuth } from "@/hooks/auth";

export default function Settings() {
  const { user } = useAuth(); // On suppose que le hook d'auth expose l'utilisateur connecté
  const {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    updateEmail,
    updatePassword,
    fetchNotificationPreferences,
    updateNotificationPreferences
  } = useSettings(user?.uid ?? "");

  // Pour édition inline (version simple)
  const [editProfile, setEditProfile] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editNotif, setEditNotif] = useState(false);
  const [form, setForm] = useState<any>({});
  const [notifPrefs, setNotifPrefs] = useState<any>({});
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState<string|null>(null);

  useEffect(() => {
    if (user?.uid) fetchProfile();
  }, [user?.uid]);

  const handleProfileSave = async () => {
    await updateProfile(form);
    setEditProfile(false);
  };
  const handleEmailSave = async () => {
    await updateEmail(form.email);
    setEditEmail(false);
  };
  const handlePasswordSave = async () => {
    await updatePassword(form.password);
    setEditPassword(false);
  };
  const handleNotifLoad = useCallback(async () => {
    setNotifLoading(true);
    try {
      const prefs = await fetchNotificationPreferences();
      setNotifPrefs(prefs);
    } catch (e: any) {
      setNotifError(e.message);
    }
    setNotifLoading(false);
  }, [fetchNotificationPreferences]);
  const handleNotifSave = async () => {
    await updateNotificationPreferences(notifPrefs);
    setEditNotif(false);
  };

  useEffect(() => {
    if (editNotif) handleNotifLoad();
  }, [editNotif, handleNotifLoad]);

  const sections = [
    {
      title: "Profil",
      icon: User,
      items: [
        {
          title: "Informations personnelles",
          description: "Mettez à jour vos informations personnelles",
          link: "#"
        },
        {
          title: "Entreprise",
          description: "Gérez les informations de votre entreprise",
          link: "#"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900">Paramètres</h2>
        <p className="text-gray-500 mt-1">Gérez votre compte et vos préférences</p>
      </div>

      {/* Profile Overview dynamique */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        {loading && <div className="text-gray-500">Chargement…</div>}
        {error && <div className="text-red-500">{error}</div>}
        {profile && (
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#dd7109] to-[#ff9f4d] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-semibold text-white">
                {(profile.firstName?.[0]||'')}{(profile.lastName?.[0]||'')}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-gray-500">{profile.role}</p>
                </div>
                <button className="px-4 py-2 bg-[#dd7109] text-white rounded-lg hover:bg-[#dd7109]/90 transition-colors" onClick={() => {
                  setForm({
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    phone: profile.phone,
                    company: profile.company
                  });
                  setEditProfile(true);
                }}>
                  Modifier le profil
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-[#dd7109]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Entreprise</p>
                    <p className="font-medium text-gray-900">{profile.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#dd7109]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{profile.email}</p>
                    <button className="text-xs text-[#dd7109] underline ml-2" onClick={() => {
                      setForm({ email: profile.email });
                      setEditEmail(true);
                    }}>Modifier</button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#dd7109]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium text-gray-900">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#dd7109]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mot de passe</p>
                    <button className="text-xs text-[#dd7109] underline" onClick={() => setEditPassword(true)}>Modifier</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Formulaires d'édition inline (simples) */}
        {editProfile && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="mb-2">Modifier le profil</div>
            <input className="border rounded p-2 mb-2 w-full" placeholder="Prénom" value={form.firstName||''} onChange={e=>setForm((f: any)=>({...f,firstName:e.target.value}))}/>
            <input className="border rounded p-2 mb-2 w-full" placeholder="Nom" value={form.lastName||''} onChange={e=>setForm((f: any)=>({...f,lastName:e.target.value}))}/>
            <input className="border rounded p-2 mb-2 w-full" placeholder="Téléphone" value={form.phone||''} onChange={e=>setForm((f: any)=>({...f,phone:e.target.value}))}/>
            <input className="border rounded p-2 mb-2 w-full" placeholder="Entreprise" value={form.company||''} onChange={e=>setForm((f: any)=>({...f,company:e.target.value}))}/> 
            <button className="bg-[#dd7109] text-white px-4 py-2 rounded mr-2" onClick={handleProfileSave}>Enregistrer</button>
            <button className="text-gray-500" onClick={()=>setEditProfile(false)}>Annuler</button>
          </div>
        )}
        {editEmail && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="mb-2">Modifier l'email</div>
            <input className="border rounded p-2 mb-2 w-full" placeholder="Nouvel email" value={form.email||''} onChange={e=>setForm((f: any)=>({...f,email:e.target.value}))}/> 
            <button className="bg-[#dd7109] text-white px-4 py-2 rounded mr-2" onClick={handleEmailSave}>Enregistrer</button>
            <button className="text-gray-500" onClick={()=>setEditEmail(false)}>Annuler</button>
          </div>
        )}
        {editPassword && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="mb-2">Modifier le mot de passe</div>
            <input className="border rounded p-2 mb-2 w-full" placeholder="Nouveau mot de passe" type="password" value={form.password||''} onChange={e=>setForm((f: any)=>({...f,password:e.target.value}))}/> 
            <button className="bg-[#dd7109] text-white px-4 py-2 rounded mr-2" onClick={handlePasswordSave}>Enregistrer</button>
            <button className="text-gray-500" onClick={()=>setEditPassword(false)}>Annuler</button>
          </div>
        )}
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Les autres sections restent statiques ou à intégrer plus tard */}
        {/* {sections.filter(s=>s.title!=="Notifications").map((section, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-[#dd7109]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.link}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#dd7109] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}