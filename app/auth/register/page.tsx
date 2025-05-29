"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { Wallet, Mail, Lock, User, Building, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, error, loading, user } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
      router.push("/dashboard/client");
    } catch (err) {
      // L'erreur est gérée par le hook
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white">
            <Wallet className="w-8 h-8 text-[#dd7109]" />
            <span className="text-2xl font-bold">SecureAcompteTravaux</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Créer un compte</h2>
            <p className="text-gray-400">
              Rejoignez-nous pour sécuriser vos acomptes
            </p>
          </div>

          {error && (
  <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
    {error}
  </div>
)}
<form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de l'entreprise"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le mot de passe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#dd7109] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#dd7109]/90 transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Création...
                </>
              ) : (
                <>
                  Créer un compte
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-gray-400">
              Déjà un compte?{" "}
              <Link
                href="/auth/login"
                className="text-[#dd7109] hover:text-[#dd7109]/90 transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#dd7109]/20 to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&q=80"
          alt="Office interior"
          fill
          className="object-cover"
          priority
        />
        {/* Floating Card */}
        <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 z-20 animate-float">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#dd7109] flex items-center justify-center flex-shrink-0">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Rejoignez notre communauté
              </h3>
              <p className="text-white/80">
                Plus de 4000 entreprises nous font confiance pour la gestion de
                leurs acomptes. Soyez les prochains à bénéficier de notre
                expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}