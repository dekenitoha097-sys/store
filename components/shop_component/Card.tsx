'use client';

import { useEffect, useState } from "react";
import { Trash2, ShoppingBag, Plus, Minus, Loader2 } from "lucide-react";
import Command from "./command";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/toast";
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

const Cards = () => {
  const [card, setCard] = useState<Produit[]>([]);
  const [allTotal, setAlltotal] = useState<TotalCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const { showToast } = useToast();
  const { confirm, modalProps: clearCartModalProps } = useConfirmModal();
  const { confirm: confirmDelete, modalProps: deleteItemModalProps } = useConfirmModal();

  // Fetch cart data on mount
  useEffect(() => {
    fetch("/api/card")
      .then((res) => res.json())
      .then((data: PanierResponse) => {
        setCard(data.data || []);
        setAlltotal(data.total || []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleDeleteCard = () => {
    confirm({
      title: "Vider le panier ?",
      message: "Êtes-vous sûr de vouloir supprimer tous les produits du panier ?",
      type: "danger",
      onConfirm: async () => {
        setIsClearing(true);
        try {
          const res = await fetch("/api/card", {
            method: "DELETE",
          });

          const data = await res.json();
          showToast(data.message || "Panier vidé avec succès", "success");

          setCard([]);
          setAlltotal([]);
        } catch (error) {
          showToast("Une erreur est survenue lors de la suppression.", "error");
        } finally {
          setIsClearing(false);
        }
      }
    });
  };

  const handleDeleteItem = (name: string) => {
    confirmDelete({
      title: "Supprimer le produit ?",
      message: `Voulez-vous vraiment supprimer "${name}" du panier ?`,
      type: "danger",
      onConfirm: async () => {
        setDeletingId(name);
        try {
          const res = await fetch("/api/card/onDelete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });

          const data = await res.json();
          showToast(data.message || "Produit supprimé du panier", "success");

          setCard((prev) => prev.filter((p) => p.product_name !== name));
        } catch (error) {
          showToast("Une erreur est survenue lors de la suppression.", "error");
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  // Calculate total price
  const totalPrice = card.reduce((sum, item, index) => {
    const quantity = allTotal[index] ? allTotal[index]["COUNT(*)"] : 1;
    const price = parseFloat(item.product_price) || 0;
    return sum + (price * quantity);
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex gap-6">
                <div className="w-32 h-32 bg-gray-200 rounded-xl skeleton"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3 skeleton"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 skeleton"></div>
                  <div className="h-10 bg-gray-200 rounded w-32 skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Mon Panier
          </h1>
          <p className="text-gray-500 mt-2">
            {card.length} {card.length === 1 ? 'article' : 'articles'} dans votre panier
          </p>
        </div>

        {card.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="inline-flex items-center justify-center p-6 bg-gray-100 rounded-full mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Votre panier est vide
            </h3>
            <p className="text-gray-400 mb-6">
              Ajoutez des produits pour commencer vos achats
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              Découvrir nos produits
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {card.map((c, k) => (
              <div
                key={k}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 md:gap-6 items-center"
              >
                {/* Image */}
                <div className="relative flex-shrink-0">
                  <img
                    src={c.product_image}
                    alt={c.product_name}
                    className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-xl"
                  />
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {allTotal[k] ? allTotal[k]["COUNT(*)"] : 1}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">
                    {c.product_name}
                  </h2>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                    {c.product_price} MAD
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantité: {allTotal[k] ? allTotal[k]["COUNT(*)"] : 1}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDeleteItem(c.product_name)}
                    disabled={deletingId === c.product_name}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                    title="Supprimer"
                  >
                    {deletingId === c.product_name ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                  {totalPrice.toFixed(2)} MAD
                </span>
              </div>

              <Command produit={card} prix={allTotal} />

              <Button
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition-all disabled:opacity-50"
                onClick={handleDeleteCard}
                disabled={isClearing}
              >
                {isClearing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5 mr-2" />
                    Vider le panier
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        {...clearCartModalProps}
        confirmText="Vider"
        cancelText="Annuler"
      />
      <ConfirmModal
        {...deleteItemModalProps}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
};

export default Cards;
