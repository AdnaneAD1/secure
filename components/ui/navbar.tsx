"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "CONNEXION", href: "https://app.secureacomptetravaux.com/auth/login" },
  { label: "INSCRIPTION", href: "https://app.secureacomptetravaux.com/auth/login" },
];

const contactInfo = [
  { icon: Phone, label: "+33 1 23 45 67 89", href: "tel:+33123456789" },
  { icon: Mail, label: "contact@secureacomptetravaux.com", href: "mailto:contact@secureacomptetravaux.com" },
  { 
    icon: MapPin, 
    label: "123 Avenue des Champs-Élysées, Paris", 
    href: "https://maps.google.com/?q=123+Avenue+des+Champs-Élysées,Paris" 
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Accueil - Retour à la page d'accueil">
              <Image
                src={scrolled ? "/img/secureacomptetravaux-vn.jpg" : "/img/logo-blanc-sf.svg"}
                alt="Logo Secure Acompte"
                width={160}
                height={40}
                className="transition-all duration-300 h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  scrolled
                    ? pathname === item.href
                      ? "text-[#dd7109]"
                      : "text-gray-800 hover:text-[#dd7109]"
                    : pathname === item.href
                      ? "text-[#dd7109]"
                      : "text-gray-300 hover:text-white"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
        <button
          onClick={() => setShowMobileMenu(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Fermer le menu"
        >
          <X className="h-6 w-6 text-[#1a1a1a]" />
        </button>





          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 bg-[#1a1a1a] lg:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" onClick={() => setIsOpen(false)} aria-label="Accueil - Retour à la page d'accueil">
              <Image
                src="/img/secureacomptetravaux-vn.jpg"
                alt="Logo Secure Acompte"
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col p-6 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-lg py-3 transition-all duration-300 relative group",
                  pathname === item.href
                    ? "text-[#dd7109]"
                    : "text-white/90 hover:text-[#dd7109]"
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(20px)",
                }}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#dd7109] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-auto p-6 bg-white/5">
            <h3 className="text-[#dd7109] font-semibold mb-4">CONTACTEZ-NOUS</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 text-white/80 hover:text-[#dd7109] transition-colors"
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-white/80 hover:text-[#dd7109] transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}