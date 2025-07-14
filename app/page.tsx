"use client";
import { useState, useEffect } from "react";
import { 
  Wallet, 
  Building2, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Shield,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Trophy,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


// En haut de votre fichier
<style jsx global>{`
  html, body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
`}</style>

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo dynamique responsive */}
            <div className="flex-shrink-0">
              <Link href="/" aria-label="Accueil">
                <Image
                  src={isScrolled ? "/img/logo_noir_secureacc.svg" : "/img/logo blanc sf.svg"}
                  alt="Logo Secure Acompte"
                  width={500}
                  height={120}
                  className="transition-all duration-300 h-12 sm:h-14 md:h-16 w-auto"
                  priority
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-[#dd7109]' : 'text-white'}`}>
                ACCUEIL
              </Link>
              <Link href="https://app.secureacomptetravaux.com/auth/login" className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-[#dd7109]' : 'text-gray-300 hover:text-white'}`}>
                CONNEXION
              </Link>
              <Link href="https://app.secureacomptetravaux.com/auth/login" className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-[#dd7109]' : 'text-gray-300 hover:text-white'}`}>
                INSCRIPTION
              </Link>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileMenu(true)}
                className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-[#dd7109] hover:bg-[#dd7109]/10' : 'text-white hover:bg-white/10'}`}
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white lg:hidden transition-transform duration-300 ease-in-out ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            
            {/* Header */}
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

            {/* Menu Items */}
            <div className="flex flex-col p-6 space-y-1">
              {[
                { href: "/", label: "ACCUEIL", delay: 0 },
                { href: "https://app.secureacomptetravaux.com/auth/login", label: "CONNEXION", delay: 50 },
                { href: "https://app.secureacomptetravaux.com/auth/login", label: "INSCRIPTION", delay: 100 }
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-lg font-semibold text-[#dd7109] py-3 transition-all duration-300 relative group"
                  style={{
                    transitionDelay: `${item.delay}ms`,
                    opacity: 1,
                    transform: "translateX(0)"
                  }}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#dd7109] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Contact Info */}
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

              {/* Socials */}
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

      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#1a1a1a] overflow-hidden pt-24 lg:pt-32 pb-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#dd7109]/20 to-transparent" />

          <div className="absolute bottom-40 right-[10%] w-48 h-48 border border-white/5 rounded-full animate-circle-float" />
          <div className="absolute top-40 right-[30%] w-24 h-24 border border-white/5 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow opacity-30" />
          <div 
            className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] border border-[#dd7109]/10 rounded-full animate-spin-slow opacity-20"
            style={{ animationDirection: 'reverse' }}
          />
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-500" />
          <div className="absolute top-[30%] right-[40%] w-16 h-16 border border-[#dd7109]/20 rounded-full animate-circle-float" />
          <div className="absolute bottom-[20%] left-[35%] w-20 h-20 border border-white/10 rounded-full animate-pulse-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-160px)] gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 rounded-full bg-[#dd7109]/10 text-[#dd7109] font-medium animate-fade-in">
                GESTION DES ACOMPTES SIMPLIFIÉE
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight animate-slide-up">
                Sécurisez vos acomptes de travaux en toute confiance
              </h1>
              <p className="text-gray-400 text-base lg:text-lg max-w-xl mx-auto lg:mx-0 animate-slide-up">
                Gérez efficacement vos acomptes clients, automatisez la répartition des commissions et suivez vos paiements en temps réel.
              </p>
              <div className="space-y-6">
              <Link href="https://app.secureacomptetravaux.com/auth/login" passHref>
      <button 
        className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#dd7109] text-white font-semibold rounded-full hover:bg-[#dd7109]/90 transition-all duration-300 animate-fade-in"
        aria-label="Commencer maintenant"
      >
        Commencer maintenant
        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </Link>
                <div className="relative w-fit mx-auto lg:mx-0 animate-slide-up">
                  <div className="relative bg-[#262626]/40 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-white text-sm">Acomptes sécurisés</span>
                      <span className="text-[#dd7109] font-bold text-sm">+250</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full lg:w-[40%] flex justify-center lg:justify-end">
  <div className="relative w-full max-w-md sm:max-w-sm md:max-w-md lg:w-[400px] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-white/10 animate-fade-in">
    <Image
      src="/img/hero.png"
      alt="Professionnelle souriante"
      fill
      className="object-cover object-top"
      priority
    />
  </div>
  

  {/* Carte stats */}
  <div className="absolute bottom-0 left-0 translate-y-1/2 bg-white rounded-2xl p-4 shadow-lg w-64 animate-float hidden sm:block">
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-1">Satisfaction client</p>
        <p className="text-[#dd7109] text-2xl font-bold">98%</p>
      </div>
      <div className="text-center border-l border-gray-200">
        <p className="text-gray-600 text-sm mb-1">Transactions</p>
        <p className="text-[#dd7109] text-2xl font-bold">€1M+</p>
      </div>
    </div>
  </div>
</div>



          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -left-4 bottom-20 bg-[#dd7109] text-white p-6 rounded-2xl shadow-xl animate-float z-20">
                <div className="text-center">
                  <div className="text-4xl font-bold">€1M</div>
                  <p className="mt-2 text-sm opacity-90">Acomptes sécurisés pour plus de 40 entreprises</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[2px] border-[#dd7109]/10 rounded-full">
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 bg-[#dd7109]/30 rounded-full animate-circle-1" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border-[2px] border-[#dd7109]/20 rounded-full">
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-[#dd7109]/40 rounded-full animate-circle-2" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[2px] border-[#dd7109]/30 rounded-full">
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-[#dd7109]/50 rounded-full animate-circle-3" />
                  </div>
                </div>
                <Image
                  src="https://wordpress.zozothemes.com/seoinux/wp-content/uploads/sites/33/2025/01/about-image.png"
                  alt="Professional with laptop"
                  width={600}
                  height={600}
                  className="relative z-10"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd7109]/10 text-[#dd7109] font-medium">
                <Building2 className="w-4 h-4" />
                À PROPOS DE NOUS
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Votre partenaire de confiance pour la gestion des acomptes
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Au cœur de notre mission se trouve l'engagement de sécuriser et simplifier la gestion des acomptes pour les professionnels. <br></br>Notre expertise et notre passion nous permettent d'offrir une solution innovante qui répond aux besoins spécifiques de chaque entreprise.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#dd7109]/10 flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 rounded-full bg-[#dd7109] animate-glow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gestion professionnelle</h3>
                    <p className="text-gray-600 mt-1">Solution complète pour la gestion des acomptes et le suivi des paiements</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#dd7109]/10 flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 rounded-full bg-[#dd7109] animate-glow" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Croissance garantie</h3>
                    <p className="text-gray-600 mt-1">Optimisation de votre trésorerie et automatisation des processus</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#dd7109]/10 flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 rounded-full bg-[#dd7109] animate-glow" style={{ animationDelay: '1s' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Résultats mesurables</h3>
                    <p className="text-gray-600 mt-1">Suivi en temps réel et rapports détaillés de vos performances</p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <a href="mailto:contact@secureacomptetravaux.com" className="inline-flex items-center gap-2 text-[#dd7109] hover:text-[#dd7109]/90 font-medium">
                  <Mail className="w-5 h-5" />
                  Discuter avec un expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-[#FDF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd7109]/10 text-[#dd7109] font-medium mb-4">
              <Wallet className="w-4 h-4 animate-bounce" />
              COMMENT ÇA MARCHE
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
              Gérez vos acomptes en toute simplicité
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 relative">
            {[
              {
                icon: CheckCircle,
                title: "Création du contrat",
                description: "Définissez les termes et montants des acomptes",
                number: "01",
                delay: 0
              },
              {
                icon: Wallet,
                title: "Sécurisation des fonds",
                description: "Encaissement et protection des acomptes",
                number: "02",
                delay: 0.2
              },
              {
                icon: Building2,
                title: "Suivi des travaux",
                description: "Validation des étapes et déblocage progressif",
                number: "03",
                delay: 0.4
              },
              {
                icon: CheckCircle,
                title: "Gestion financière",
                description: "Rapports détaillés et comptabilité simplifiée",
                number: "04",
                delay: 0.6
              }
            ].map((step, index) => (
<div
  key={index}
  className={`text-center group ${index < 3 ? 'step-item' : ''}`}
>
  <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative transition-transform group-hover:scale-110 duration-300">
    <div
      className="absolute inset-0 bg-[#dd7109]/5 rounded-full animate-pulse"
      style={{ animationDelay: `${step.delay}s` }}
    />
    <step.icon
      className="w-8 h-8 text-[#dd7109] animate-process-icon"
      style={{ animationDelay: `${step.delay}s` }}
    />
  </div>

  {/* Points visibles uniquement à partir de md */}
  <div className="hidden md:block process-dot process-dot-start" />
  {index < 3 && <div className="hidden md:block process-dot process-dot-end" />}

  <div className="text-[#dd7109] text-6xl font-bold opacity-20 mb-4 group-hover:opacity-30 transition-opacity">
    {step.number}
  </div>
  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
  <p className="text-gray-600">{step.description}</p>
</div>





            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#dd7109]/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#dd7109]/5 to-transparent" />
          <div className="absolute left-10 top-10 w-64 h-64 border border-[#dd7109]/10 rounded-full animate-spin-slow" />
          <div 
            className="absolute right-10 bottom-10 w-48 h-48 border border-[#dd7109]/5 rounded-full animate-spin-slow"
            style={{ animationDirection: 'reverse' }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px)',
              backgroundSize: '50px 50px',
              opacity: 0.1
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd7109]/10 text-[#dd7109] font-medium mb-4">
              <Shield className="w-4 h-4 animate-bounce" />
              NOS SERVICES
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">
              Solutions complètes pour la gestion de vos acomptes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
            {[
              {
                icon: CheckCircle,
                title: "Gestion des Contrats",
                description: "Création et suivi automatisé des contrats d'acompte avec signatures électroniques sécurisées."
              },
              {
                icon: Shield,
                title: "Sécurisation des Paiements",
                description: "Protection des fonds et système de déblocage progressif selon l'avancement des travaux."
              },
              {
                icon: Building2,
                title: "Reporting Financier",
                description: "Tableaux de bord détaillés et exports comptables automatisés pour un suivi optimal."
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#dd7109]/20 to-transparent rounded-2xl blur-xl group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#dd7109]/30 transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#dd7109]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-[#dd7109]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 text-lg">{service.description}</p>
                  <div className="mt-auto pt-6">
                    <div className="w-12 h-1 bg-[#dd7109]/30 rounded-full group-hover:w-full transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-20">
            <div className="w-32 h-32 mx-auto bg-[#dd7109] rounded-full flex items-center justify-center animate-pulse-slow">
              <Wallet className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#FDF8F4] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dd7109]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#dd7109]/5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd7109]/10 text-[#dd7109] font-medium">
                <Trophy className="w-4 h-4 animate-bounce" />
                POURQUOI NOUS CHOISIR
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                L'expertise au service de résultats exceptionnels
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Notre expertise guide l'innovation tandis que notre passion alimente la performance. <br></br>Nous apportons une connaissance approfondie et un dévouement inégalé à chaque projet, délivrant des résultats qui dépassent les attentes.
              </p>
              <ul className="space-y-4">
                {[
                  "Plus de 40 clients satisfaits",
                  "98% de taux de satisfaction",
                  "Support client 24/7"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle 
                      className="w-5 h-5 text-[#dd7109] animate-pulse"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:contact@secureacomptetravaux.com" className="inline-flex items-center px-6 py-3 bg-[#dd7109] text-white font-semibold rounded-full hover:bg-[#dd7109]/90 transition-colors">
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            <div className="relative">
              <div className="timeline-line" />
              <div className="space-y-16">
                {[
                  {
                    icon: Building2,
                    title: "Expertise éprouvée",
                    description: "Notre expertise démontre fiabilité, savoir-faire et succès à travers de nombreux projets et défis."
                  },
                  {
                    icon: Shield,
                    title: "Transparence et communication",
                    description: "La transparence assure que l'information est partagée ouvertement, créant un climat de confiance et d'inclusion."
                  },
                  {
                    icon: CheckCircle,
                    title: "Résultats garantis",
                    description: "Notre engagement envers l'excellence assure des résultats concrets et mesurables pour votre entreprise."
                  }
                ].map((item, index) => (
                  <div key={index} className="relative pl-20 group">
                    <div 
                      className="timeline-dot"
                      style={{
                        left: '1.85rem',
                        top: '2rem',
                        animationDelay: `${index * 0.3}s`
                      }}
                    />
                    <div 
                      className="absolute left-6 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#dd7109] flex items-center justify-center text-[#dd7109] font-bold feature-number"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex gap-6 items-start">
                      <div 
                        className="w-16 h-16 rounded-full bg-[#dd7109]/10 flex items-center justify-center flex-shrink-0 feature-icon"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <item.icon className="w-8 h-8 text-[#dd7109]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#dd7109]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#dd7109]/5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd7109]/10 text-[#dd7109] font-medium mb-4">
              <Shield className="w-4 h-4 animate-bounce" />
              FAQ
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
              Questions fréquemment posées
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Nous avons des experts professionnels à votre disposition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              {[
                {
                  icon: Shield,
                  question: "Comment fonctionne la sécurisation des acomptes ?",
                  answer: "Notre système de sécurisation des acomptes utilise une technologie de pointe pour protéger vos fonds. Les paiements sont conservés dans un compte séquestre et libérés progressivement selon les étapes validées du projet."
                },
                {
                  icon: CheckCircle,
                  question: "Quels types de contrats gérez-vous ?",
                  answer: "Nous gérons tous types de contrats liés aux acomptes : contrats de construction, de rénovation, de prestations de services, etc. Notre système s'adapte à vos besoins spécifiques."
                }
              ].map((faq, index) => (
                <div key={index} className="group">
                  <div className="border border-gray-200 rounded-2xl hover:border-[#dd7109]/30 transition-colors">
                    <button className="flex items-center justify-between w-full p-6 text-left" aria-expanded="false" aria-controls={`faq-${index}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#dd7109]/10 flex items-center justify-center flex-shrink-0">
                          <faq.icon className="w-5 h-5 text-[#dd7109]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#dd7109] group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                    <div id={`faq-${index}`} className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Wallet,
                  question: "Quels sont les frais de service ?",
                  answer: "Nos frais sont transparents et basés sur un pourcentage du montant des acomptes gérés. Contactez-nous pour obtenir une tarification personnalisée adaptée à votre volume d'activité."
                },
                {
                  icon: Mail,
                  question: "Quel support proposez-vous ?",
                  answer: "Notre équipe de support est disponible 24/7 pour répondre à vos questions. Nous proposons une assistance par chat, email et téléphone, ainsi qu'une documentation complète en ligne."
                }
              ].map((faq, index) => (
                <div key={index} className="group">
                  <div className="border border-gray-200 rounded-2xl hover:border-[#dd7109]/30 transition-colors">
                    <button className="flex items-center justify-between w-full p-6 text-left" aria-expanded="false" aria-controls={`faq-${index+2}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#dd7109]/10 flex items-center justify-center flex-shrink-0">
                          <faq.icon className="w-5 h-5 text-[#dd7109]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#dd7109] group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                    <div id={`faq-${index+2}`} className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
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
                  "Accueil",
                  "À propos",
                  "Connexion",
                  "Politique de confidentialité"
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