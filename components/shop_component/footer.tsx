"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si"; // TikTok n'est pas dans lucide-react, on prend react-icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold mb-4 text-blue-800">F&A Boutique</h2>
          <p className="max-w-sm text-base leading-relaxed">
            Des produits de qualité pour tous vos besoins. Merci pour votre confiance ❤️
          </p>
        </div>

        <div className="flex-1 flex flex-col space-y-2">
          <h3 className="footer-title text-lg font-semibold text-blue-700 mb-4">Navigation</h3>
          <Link href="/" className="link link-hover text-blue-600 hover:text-blue-800 transition-colors">Accueil</Link>
          <Link href="/panier" className="link link-hover text-blue-600 hover:text-blue-800 transition-colors">Panier</Link>
        </div>

        <div className="flex-1">
          <h3 className="footer-title text-lg font-semibold text-blue-700 mb-4">Suivez-nous</h3>
          <div className="flex space-x-6">
            <Link href="https://www.instagram.com/sisbyyy?igsh=d25lajduaGJ4djNt&utm_source=qr" target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
              <Instagram size={32} />
            </Link>
            <Link href="https://www.tiktok.com/@sis_by0?_t=ZM-8zG3lVFyIx3&_r=1" target="_blank" rel="noreferrer" className="text-black hover:text-gray-800 transition-colors">
              <SiTiktok size={30} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-300 text-center text-sm text-blue-700 py-4">
        © {new Date().getFullYear()} F&A Boutique. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
