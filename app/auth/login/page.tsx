"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { Wallet, Mail, Lock, ArrowRight } from "lucide-react";
import ImportCourtiersButton from "./ImportCourtiersButton";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { login, error, loading, user, forgotPassword } = useAuth();

  // État pour mot de passe oublié
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  // Traduit les erreurs Firebase en messages utilisateur
  function getFriendlyErrorMessage(error: string | null) {
    if (!error) return null;
    if (error.includes("auth/invalid-credential"))
      return "Email ou mot de passe incorrect.";
    if (error.includes("auth/user-not-found"))
      return "Aucun compte trouvé avec cet email.";
    if (error.includes("auth/wrong-password")) return "Mot de passe incorrect.";
    if (error.includes("auth/invalid-email"))
      return "L'adresse email est invalide.";
    if (error.includes("auth/too-many-requests"))
      return "Trop de tentatives. Réessayez plus tard.";
    if (error.includes("auth/network-request-failed"))
      return "Problème de connexion réseau. Vérifiez votre connexion internet.";
    if (error.includes("auth/account-disabled"))
      return "Le compte est désactivé.";
    return "Erreur : " + error;
  }
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
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
          <div className="flex">
            <Image
              src="/logo-blanc-sf.svg" // Chemin vers ton logo dans /public
              alt="Logo SecureAcompte"
              width={350}
              height={40}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Bon retour!</h2>
            <p className="text-gray-400">
              Connectez-vous à votre compte pour continuer
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {getFriendlyErrorMessage(error)}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#dd7109] focus:ring-[#dd7109] focus:ring-offset-0"
                />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Se souvenir de moi
                </span>
              </label>

              <button
                type="button"
                className="text-[#dd7109] hover:text-[#dd7109]/90 transition-colors underline focus:outline-none"
                onClick={() => {
                  setShowForgot((v) => !v);
                  setForgotSuccess(null);
                  setForgotError(null);
                  setForgotEmail(email);
                }}
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#dd7109] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#dd7109]/90 transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          {/* <ImportCourtiersButton /> */}

          {/* Bloc mot de passe oublié */}
          {showForgot && (
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 mt-4 animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-2">
                Réinitialiser le mot de passe
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Saisis ton adresse email pour recevoir un lien de
                réinitialisation.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setForgotLoading(true);
                  setForgotSuccess(null);
                  setForgotError(null);
                  try {
                    await forgotPassword(forgotEmail);
                    setForgotSuccess(
                      "Un email de réinitialisation a été envoyé si l'adresse existe dans notre base."
                    );
                  } catch (err: any) {
                    setForgotError(
                      "Erreur lors de l'envoi de l'email : " +
                        (err.message || err)
                    );
                  } finally {
                    setForgotLoading(false);
                  }
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Ton adresse email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                  disabled={forgotLoading}
                />
                <button
                  type="submit"
                  className="w-full bg-[#dd7109] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#dd7109]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={forgotLoading}
                >
                  {forgotLoading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    <>Recevoir le lien</>
                  )}
                </button>
                {forgotSuccess && (
                  <div className="text-green-400 text-sm mt-2">
                    {forgotSuccess}
                  </div>
                )}
                {forgotError && (
                  <div className="text-red-400 text-sm mt-2">{forgotError}</div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen">
        <div className="absolute w-full inset-0 bg-gradient-to-br from-[#dd7109]/20 to-transparent z-10" />
        <Image
          src="/IMG_3821.png"
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
                Sécurisez vos acomptes
              </h3>
              <p className="text-white/80">
                Rejoignez plus de 40 entreprises qui font confiance à notre
                solution pour la gestion de leurs acomptes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
