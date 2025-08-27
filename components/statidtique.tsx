'use client';

import { useEffect, useState } from "react";

type StatistiquesType = {
  nbr_users: number;
  nbr_commande: number;
  nbr_produicts: number;
  [key: string]: number; // permet d'ajouter plus tard d'autres stats dynamiques
};

const Statistiques = () => {
  const [stats, setStats] = useState<StatistiquesType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/statistiques")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement des statistiques...</p>;

  if (!stats) return <p className="text-center text-red-500 mt-10">Erreur lors du chargement</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-lg font-semibold capitalize mb-2">
              {formatKey(key)}
            </h2>
            <p className="text-3xl font-bold text-blue-600">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Fonction pour afficher proprement les clés en français
function formatKey(key: string) {
  const map: Record<string, string> = {
    nbr_users: "Nombre d'utilisateurs",
    nbr_commande: "Nombre de commandes",
    nbr_produicts: "Nombre de produits",
  };

  return map[key] || key.replace(/_/g, ' ');
}

export default Statistiques;
