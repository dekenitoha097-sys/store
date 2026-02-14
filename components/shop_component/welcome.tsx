'use client';

import { authClient } from "@/lib/auth-client";
import { Sparkles, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";

const Welcomme = () => {
  const session = authClient.useSession();

  if (!session.data?.user) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl mb-8 animate-float">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Bienvenue sur F&A Boutique
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Votre destination购物 de confiance pour des produits de qualité. 
            Connectez-vous pour découvrir notre collection exclusive.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign/sign-in"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              Se connecter
            </Link>
            <Link
              href="/sign/sign-up"
              className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Avatar with glow effect */}
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-1 rounded-full">
                <div className="bg-white p-1 rounded-full">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-700">
                      {session.data.user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome message */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
            Bon retour, {session.data.user.name} !
          </h1>

          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-6">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="text-gray-600 font-medium">
              Heureux de vous revoir 👋
            </span>
          </div>

          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10">
            Explorez notre nouvelle collection et trouvez les produits parfaits pour vous.
          </p>

          {/* Quick actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/panier"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Voir le panier</span>
            </Link>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all">
              <Heart className="h-5 w-5 text-pink-500" />
              <span>Favoris</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcomme;
