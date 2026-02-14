"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Store, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import SearchBar from "./shop_component/SearchBar";
import { ConfirmModal, useConfirmModal } from "@/components/ui/confirm-modal";

type Produit = {
  id: number;
  user_id: string;
  product_name: string;
  product_price: string;
  product_image: string;
};

type TotalCount = {
  "COUNT(*)": number;
};

type PanierResponse = {
  data: Produit[];
  total: TotalCount[];
};

const ShopNavbar = () => {
  const session = authClient.useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { confirm, modalProps: loginModalProps } = useConfirmModal();
  const { confirm: confirmLogout, modalProps: logoutModalProps } = useConfirmModal();

  useEffect(() => {
    const fetchCartCount = () => {
      fetch("/api/card")
        .then((res) => res.json())
        .then((data: PanierResponse) => {
          if (data.total && data.total.length > 0) {
            const count = data.total.reduce((sum: number, item: TotalCount) => sum + (item["COUNT(*)"] || 0), 0);
            setCartCount(count);
          } else {
            setCartCount(0);
          }
        })
        .catch(() => setCartCount(0));
    };

    fetchCartCount();
    
    const interval = setInterval(fetchCartCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const handle_redirect = () => {
    confirm({
      title: "Connexion requise",
      message: "Veuillez vous connecter avant de continuer",
      type: "info",
      onConfirm: () => router.push("/sign/sign-in")
    });
  };

  return (
    <>
      <nav className="navbar-glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl group-hover:scale-110 transition-transform">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  F&A Boutique
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6 flex-1 justify-center px-8">
              <div className="w-full max-w-md">
                <SearchBar />
              </div>

              <div className="relative">
                <button
                  onMouseEnter={() => setIsCartOpen(true)}
                  className="p-2 rounded-full hover:bg-blue-50 transition-colors relative"
                >
                  <ShoppingBag className="h-6 w-6 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-4 animate-fade-in-up"
                    onMouseLeave={() => setIsCartOpen(false)}
                  >
                    <div className="px-4">
                      <h3 className="font-bold text-gray-800 mb-3">Votre Panier</h3>
                      {!session.data?.user ? (
                        <button
                          onClick={handle_redirect}
                          className="w-full btn-gradient py-2 rounded-lg text-sm"
                        >
                          Voir le panier
                        </button>
                      ) : (
                        <Link
                          href="/panier"
                          className="w-full btn-gradient py-2 rounded-lg text-sm block text-center"
                        >
                          Voir le panier
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {!session.data?.user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/sign/sign-in"
                    className="px-4 py-2 text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/sign/sign-up"
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Inscription
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-full">
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {session.data.user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      confirmLogout({
                        title: "Déconnexion",
                        message: "Êtes-vous sûr de vouloir vous déconnecter ?",
                        type: "warning",
                        onConfirm: async () => {
                          await authClient.signOut();
                          router.push("/");
                        }
                      });
                    }}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Déconnexion"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-up">
            <div className="px-4 py-4 space-y-3">
              <div className="mb-4">
                <SearchBar />
              </div>

              <Link
                href="/panier"
                className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl"
              >
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Panier</span>
              </Link>

              {!session.data?.user ? (
                <>
                  <Link
                    href="/sign/sign-in"
                    className="flex items-center space-x-3 px-4 py-3 text-blue-700"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Connexion</span>
                  </Link>
                  <Link
                    href="/sign/sign-up"
                    className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl"
                  >
                    Inscription
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    confirmLogout({
                      title: "Déconnexion",
                      message: "Êtes-vous sûr de vouloir vous déconnecter ?",
                      type: "warning",
                      onConfirm: async () => {
                        await authClient.signOut();
                        router.push("/");
                      }
                    });
                  }}
                  className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Déconnexion</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <ConfirmModal
        {...loginModalProps}
        confirmText="Se connecter"
        cancelText="Plus tard"
      />
      <ConfirmModal
        {...logoutModalProps}
        confirmText="Se déconnecter"
        cancelText="Annuler"
      />
    </>
  );
};

export default ShopNavbar;
