"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer-gradient text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">F&A Boutique</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Votre destination de confiance pour des produits de qualité. 
              Nous nous engageons à vous offrir la meilleure expérience d'achat en ligne.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/sisbyyy?igsh=d25lajduaGJ4djNt&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-white/10 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 rounded-full transition-all hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@sis_by0?_t=ZM-8zG3lVFyIx3&_r=1"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-white/10 hover:bg-black rounded-full transition-all hover:scale-110"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Navigation
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/panier"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  <span>Panier</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sign/sign-in"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Connexion</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sign/sign-up"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Inscription</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-400" />
                <span className="text-sm">Maroc, Casablanca</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-sm">contact@faboutique.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-purple-400" />
                <span className="text-sm">+212 6XX XXXXXX</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Inscrivez-vous pour recevoir nos dernières offres et nouveautés.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-r-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} F&A Boutique. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">
                Politique de confidentialité
              </span>
              <span className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">
                Conditions d'utilisation
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
