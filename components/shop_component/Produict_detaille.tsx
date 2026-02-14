import { ShoppingCart, Eye, X } from "lucide-react";
import { useRef } from "react";
import CardButton from "./Card_action";

type Produit = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string;
};

type Props = {
  produit: Produit;
};

const Produict_detaille = ({ produit }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
      >
        <Eye className="h-4 w-4" />
        <span>Voir</span>
      </button>

      <dialog ref={modalRef} className="modal modal-modern">
        <div className="modal-box max-w-2xl p-0 overflow-hidden">
          {/* Header gradient */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"></div>
          
          {/* Close button */}
          <div className="absolute top-4 right-4 z-10">
            <form method="dialog">
              <button className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors">
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </form>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={produit.image_url}
                alt={produit.name}
                className="w-full h-80 md:h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {produit.name}
              </h2>
              
              {/* Stock badge */}
              <div className="mb-4">
                {produit.stock > 0 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    En stock ({produit.stock} unités)
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Rupture de stock
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {produit.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                  {produit.price} MAD
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <CardButton produit={produit} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop bg-black/50">
          <button>Fermer</button>
        </form>
      </dialog>
    </>
  );
};

export default Produict_detaille;
