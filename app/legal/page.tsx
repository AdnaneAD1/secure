"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Shield, FileText,  Menu, X, Facebook, Instagram, Linkedin, Trophy, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LegalPage() {
      const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
{/* Navigation */}
<nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-20">
      
      {/* Logo toujours noir */}
      <div className="flex-shrink-0">
        <Link href="/" aria-label="Accueil">
          <Image
            src="/img/logo_noir_secureacc.svg"
            alt="Logo Secure Acompte"
            width={500}
            height={120}
            className="transition-all duration-300 h-12 sm:h-14 md:h-16 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Menu horizontal visible à partir de md, texte foncé fixe */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-sm font-medium text-[#dd7109] transition-colors duration-300 hover:text-[#bb6508]">
          ACCUEIL
        </Link>
        <Link href="https://app.secureacomptetravaux.com/auth/login" className="text-sm font-medium text-gray-700 hover:text-[#dd7109] transition-colors duration-300">
          CONNEXION
        </Link>
        <Link href="https://app.secureacomptetravaux.com/auth/login" className="text-sm font-medium text-gray-700 hover:text-[#dd7109] transition-colors duration-300">
          INSCRIPTION
        </Link>
      </div>

      {/* Bouton hamburger visible sous md */}
      <div className="md:hidden">
        <button
          onClick={() => setShowMobileMenu(true)}
          className="p-2 rounded-lg text-[#dd7109] hover:bg-[#dd7109]/10 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>

  {/* Menu mobile */}
  <div className={`fixed top-0 right-0 h-full bg-white w-4/5 max-w-xs md:hidden shadow-lg transition-transform duration-300 ease-in-out ${showMobileMenu ? "translate-x-0" : "translate-x-full"}`}>
    <div className="flex flex-col h-full">

      {/* Header du menu mobile */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Link href="/" className="flex-shrink-0" onClick={() => setShowMobileMenu(false)} aria-label="Accueil">
          <Image
            src="/img/logo_noir_secureacc.svg"
            alt="Logo Secure Acompte"
            width={500}
            height={120}
            className="h-12 sm:h-14 md:h-16 w-auto"
            priority
          />
        </Link>
        <button
          onClick={() => setShowMobileMenu(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Fermer le menu"
        >
          <X className="h-6 w-6 text-[#1a1a1a]" />
        </button>
      </div>

      {/* Items du menu mobile */}
      <div className="flex flex-col p-6 space-y-1">
        {[
          { href: "/", label: "ACCUEIL", delay: 0 },
          { href: "https://app.secureacomptetravaux.com/auth/login", label: "CONNEXION", delay: 50 },
          { href: "https://app.secureacomptetravaux.com/auth/login", label: "INSCRIPTION", delay: 100 },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-lg font-semibold text-[#dd7109] py-3 transition-all duration-300 relative group"
            style={{
              transitionDelay: `${item.delay}ms`,
              opacity: 1,
              transform: "translateX(0)",
            }}
            onClick={() => setShowMobileMenu(false)}
          >
            {item.label}
            <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#dd7109] group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-auto p-6 bg-gray-50">
        <h3 className="text-[#dd7109] font-semibold mb-4">CONTACTEZ-NOUS</h3>
        <div className="space-y-4">
          <a href="tel:+33123456789" className="flex items-center space-x-3 text-[#1a1a1a] hover:text-[#dd7109] transition-colors">
            <Phone className="h-5 w-5" />
            <span className="text-sm">+33 1 23 45 67 89</span>
          </a>
          <a href="mailto:contact@secureacomptetravaux.com" className="flex items-center space-x-3 text-[#1a1a1a] hover:text-[#dd7109] transition-colors">
            <Mail className="h-5 w-5" />
            <span className="text-sm">contact@secureacomptetravaux.com</span>
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-[#1a1a1a] hover:text-[#dd7109] transition-colors">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">123 Avenue des Champs-Élysées, Paris</span>
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex items-center space-x-4 mt-6">
          <a href="#" className="text-[#1a1a1a] hover:text-[#dd7109] transition-colors" aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="text-[#1a1a1a] hover:text-[#dd7109] transition-colors" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="text-[#1a1a1a] hover:text-[#dd7109] transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>




      {/* Contenu principal */}
      <section className="pt-40 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#dd7109]/10 text-[#dd7109] rounded-full mb-4">
              <FileText className="w-5 h-5 mr-2" />
              INFORMATIONS LÉGALES
            </div>
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Mentions Légales
            </h1>
          </div>

          <div className="space-y-12">
            {/* Section Éditeur */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#dd7109] flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Éditeur du site
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p><strong>Dénomination sociale :</strong> AXIMOTRAVO</p>
                  <p><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p>
                  <p><strong>Capital social :</strong> 5 000 €</p>
                  <p><strong>Siège social :</strong> 1 PLACE DU VILLAGE, 65240 ASPIN-AURE France</p>
                </div>
                <div>
                  <p><strong>RCS :</strong> Tarbes B 815247812</p>
                  <p><strong>TVA intracommunautaire :</strong> FR 95815247812</p>
                  <p><strong>Email :</strong> contact@aximotravo.com</p>
                  <p><strong>Téléphone :</strong> +33 811 38 65 65</p>
                </div>
              </div>
            </div>

            {/* Section Hébergement */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#dd7109]">
                Hébergement
              </h2>
              <p className="text-gray-700">Le site est hébergé par :</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p><strong>Nom :</strong> LWS (Ligne Web Services)</p>
                  <p><strong>Adresse :</strong> 10, RUE PENTHIEVRE 75008 PARIS FRANCE</p>
                  <p><strong>Téléphone :</strong> +33 177 62 30 03</p>
                </div>
                <div>
                  <p><strong>Site web :</strong> https://www.lws.fr</p>
                  <p><strong>SIRET :</strong> 85199368300024</p>
                  <p><strong>Code APE :</strong> 6311Z</p>
                </div>
              </div>
            </div>

            {/* Section Propriété intellectuelle */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#dd7109]">
                Propriété intellectuelle
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>L'ensemble des éléments constituant le site (textes, images, vidéos, logos, etc.) sont la propriété exclusive d'AXIMOTRAVO ou font l'objet d'une autorisation d'utilisation.</p>
                <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'AXIMOTRAVO.</p>
              </div>
            </div>

            {/* Section Responsabilité */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#dd7109]">
                Responsabilité
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>AXIMOTRAVO ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site.</p>
                <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes ou des omissions.</p>
              </div>
            </div>

            {/* Section CNIL */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#dd7109]">
                Conformité RGPD
              </h2>
              <p className="text-gray-700">Conformément au Règlement Général sur la Protection des Données (RGPD 2016/679) :</p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#dd7109]">•</span>
                  <span>Délai de conservation des données : 3 ans pour les données de prospect, 10 ans pour les données comptables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#dd7109]">•</span>
                  <span>Droit d'accès, de rectification et d'opposition : contact@aximotravo.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#dd7109]">•</span>
                  <span>Délégué à la protection des données : service-dpo@aximotravo.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#dd7109]">•</span>
                  <span>Numéro de déclaration CNIL : 1234567</span>
                </li>
              </ul>
            </div>

            {/* Section Contact */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#dd7109]">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#dd7109] mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:contact@aximotravo.com" className="hover:underline">
                      contact@aximotravo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#dd7109] mt-1" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a href="tel:+33123456789" className="hover:underline">
                     +33 811 38 65 65
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#dd7109] mt-1" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p>1 PLACE DU VILLAGE<br />65240 ASPIN-AURE France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex-shrink-0" onClick={() => setShowMobileMenu(false)} aria-label="Accueil">
                <Image
                  src="/img/logo blanc sf.svg"
                  alt="Logo Secure Acompte Travaux"
                  width={500}
                  height={120}
                  className="h-12 sm:h-14 md:h-16 w-auto"
                  priority
                />
              </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#dd7109]" />
                  <span>+(33) 01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#dd7109]" />
                  <span>contact@secure<br></br>acomptetravaux.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#dd7109]/20 transition-colors"
                    aria-label={index === 0 ? "Facebook" : index === 1 ? "Instagram" : "LinkedIn"}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Liens rapides</h3>
              <ul className="space-y-4">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "Mentions légales", href: "/legal" },
                  { label: "Politique de confidentialité", href: "/privacy" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="hover:text-[#dd7109] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Nos services</h3>
              <ul className="space-y-4">
                {[
                  "Gestion des acomptes",
                  "Sécurisation des paiements",
                  "Reporting financier",
                  "Support client"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-[#dd7109] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Inscrivez-vous pour recevoir nos dernières actualités. Pas de spam, uniquement des informations pertinentes.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 focus:outline-none focus:border-[#dd7109] transition-colors"
                  aria-label="Votre email"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#dd7109] rounded-full flex items-center justify-center hover:bg-[#dd7109]/90 transition-colors" aria-label="Envoyer">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#dd7109]" />
                <span className="text-sm">Meilleure agence 2024</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>© {new Date().getFullYear()} SecureAcompteTravaux. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}