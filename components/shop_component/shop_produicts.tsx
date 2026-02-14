"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Eye, Sparkles, Package, DollarSign } from "lucide-react";
import CardButton from "./Card_action";
import Produict_detaille from "./Produict_detaille";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Produit = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string;
};

const Shop_produicts = () => {
  const [dat, setData] = useState<Produit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [maxAvailablePrice, setMaxAvailablePrice] = useState<number>(10000);

  // Calculate max price from products on load
  useEffect(() => {
    if (dat.length > 0) {
      const max = Math.max(...dat.map(p => parseFloat(p.price) || 0));
      const roundedMax = Math.ceil(max / 100) * 100 + 500; // Round up to nearest 100 + buffer
      setMaxAvailablePrice(roundedMax > 0 ? roundedMax : 10000);
      setPriceRange([0, roundedMax > 0 ? roundedMax : 10000]);
    }
  }, [dat]);

  // Filter products by price
  const filteredProducts = dat.filter((produit) => {
    const price = parseFloat(produit.price);
    const min = priceRange[0];
    const max = priceRange[1];
    return price >= min && price <= max;
  });

  const session = authClient.useSession();

  useEffect(() => {
    fetch("/api/produicts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.data || []);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch :", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handle_redirict = () => {
    const confirm = window.confirm("Veuillez vous connecter avant de continuer");
    if (confirm) {
      router.push("/sign/sign-in");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Nos Produits
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de produits de qualité
          </p>
        </div>
      </div>

      {/* Price Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-700">Filtrer par prix</span>
          </div>
          
          {/* Range Slider */}
          <div className="px-2">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{priceRange[0]} MAD</span>
              <span className="font-medium text-blue-600">
                {priceRange[0]} - {priceRange[1]} MAD
              </span>
              <span>{priceRange[1]} MAD</span>
            </div>
            
            {/* Dual Range Slider */}
            <div className="relative h-2 bg-gray-200 rounded-lg">
              <div 
                className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"
                style={{
                  left: `${(priceRange[0] / maxAvailablePrice) * 100}%`,
                  right: `${100 - (priceRange[1] / maxAvailablePrice) * 100}%`
                }}
              />
              <input
                type="range"
                min={0}
                max={maxAvailablePrice}
                value={priceRange[0]}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val < priceRange[1]) {
                    setPriceRange([val, priceRange[1]]);
                  }
                }}
                className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
              />
              <input
                type="range"
                min={0}
                max={maxAvailablePrice}
                value={priceRange[1]}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val > priceRange[0]) {
                    setPriceRange([priceRange[0], val]);
                  }
                }}
                className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
              />
              {/* Thumb indicators */}
              <div 
                className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 shadow-md pointer-events-none"
                style={{ left: `calc(${(priceRange[0] / maxAvailablePrice) * 100}% - 8px)` }}
              />
              <div 
                className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 shadow-md pointer-events-none"
                style={{ left: `calc(${(priceRange[1] / maxAvailablePrice) * 100}% - 8px)` }}
              />
            </div>
          </div>

          {(priceRange[0] > 0 || priceRange[1] < maxAvailablePrice) && (
            <button
              onClick={() => setPriceRange([0, maxAvailablePrice])}
              className="mt-4 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Réinitialiser
            </button>
          )}
          {(priceRange[0] > 0 || priceRange[1] < maxAvailablePrice) && (
            <p className="text-sm text-gray-500 mt-3">
              Affichage de {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} sur {dat.length}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-72 bg-gradient-to-br from-gray-200 to-gray-300 skeleton"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 skeleton"></div>
                  <div className="h-4 bg-gray-200 rounded w-full skeleton"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 skeleton"></div>
                  <div className="flex space-x-2">
                    <div className="h-12 flex-1 bg-gray-200 rounded-xl skeleton"></div>
                    <div className="h-12 flex-1 bg-gray-200 rounded-xl skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-6 bg-gray-100 rounded-full mb-4">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun produit disponible
            </h3>
            <p className="text-gray-400">
              Revenez plus tard pour découvrir notre collection
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((produit, k) => (
              <div
                key={k}
                className="product-card bg-white shadow-md hover:shadow-xl"
              >
                {/* Image with badge */}
                <div className="relative img-zoom">
                  <img
                    src={produit.image_url}
                    alt={produit.name}
                    className="w-full h-72 object-cover"
                  />
                  {produit.stock > 0 && (
                    <span className="badge-product">
                      En stock
                    </span>
                  )}
                  {produit.stock === 0 && (
                    <span className="badge-product bg-red-500">
                      Rupture
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                    {produit.name}
                  </h2>
                  
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {produit.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="price-tag">
                      {produit.price} MAD
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {session.data?.user ? (
                      <>
                        <Produict_detaille produit={produit} />
                        <CardButton produit={produit} />
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handle_redirict}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Voir</span>
                        </button>
                        <button
                          onClick={handle_redirict}
                          className="flex-1 flex items-center justify-center space-x-2 btn-gradient py-3 rounded-xl font-medium"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Panier</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop_produicts;
