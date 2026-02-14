"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";

type Produit = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Produit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Produit[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/produicts");
        const data = await res.json();
        setAllProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.slice(0, 6)); // Limit to 6 results
    setIsLoading(false);
  }, [query, allProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input Container */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.trim() !== "" && setIsOpen(true)}
          placeholder="Rechercher un produit..."
          className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
          {results.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/?product=${product.id}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center p-3 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.description.substring(0, 40)}...
                      </p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <span className="text-sm font-semibold text-blue-600">
                        {product.price} MAD
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              
              {results.length >= 6 && (
                <li className="border-t border-gray-100">
                  <Link
                    href={`/?search=${encodeURIComponent(query)}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="block px-4 py-3 text-center text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                  >
                    Voir tous les résultats ({results.length}+)
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 text-sm">
                Aucun produit trouvé pour &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
