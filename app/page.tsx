"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Welcomme from "@/components/shop_component/welcome";
import Shop_produicts from "@/components/shop_component/shop_produicts";
import Footer from "@/components/shop_component/footer";
import Produict_detaille from "@/components/shop_component/Produict_detaille";

type Produit = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string;
};

function ProductModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("product");
  const [produit, setProduit] = useState<Produit | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      fetch(`/api/produicts/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setProduit(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setProduit(null);
    }
  }, [productId]);

  const handleClose = () => {
    setProduit(null);
    router.push("/");
  };

  if (!productId) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!produit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={handleClose}>
      <div className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <Produict_detaille produit={produit} autoOpen={true} onClose={handleClose} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <div>
        <ProductModal />
        <Welcomme />
        <Shop_produicts/>
        <Footer/>
      </div>
    </Suspense>
  );
}
