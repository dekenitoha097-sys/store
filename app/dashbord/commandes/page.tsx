'use client';

import { useEffect, useState } from "react";

type Commande = {
  id: number;
  nom_complet: string;
  email: string;
  detaille: string;
  localisation: string;
  telephone: string;
  created_at: string;
};

const ListeCommandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCommandes() {
      try {
        const res = await fetch("/api/command");
        if (!res.ok) throw new Error("Erreur lors de la récupération");
        const data = await res.json();
        setCommandes(data.commandes);
      } catch (err) {
            alert(err)
      } finally {
        setLoading(false);
      }
    }
    fetchCommandes();
  }, []);

  if (loading) return <p>Chargement des commandes...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (commandes.length === 0) return <p>Aucune commande trouvée.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Liste des commandes</h2>
      {commandes.map((commande) => (
        <div
          key={commande.id}
          className="border rounded-lg p-4 mb-4 shadow-md bg-white"
        >
          <p>
            <strong>Nom :</strong> {commande.nom_complet}
          </p>
          <p>
            <strong>Email :</strong> {commande.email}
          </p>
          <p>
            <strong>Détails :</strong>
            <pre className="whitespace-pre-wrap">{commande.detaille}</pre>
          </p>
          <p>
            <strong>Localisation :</strong> {commande.localisation}
          </p>
          <p>
            <strong>Téléphone :</strong> {commande.telephone}
          </p>
          <p className="text-sm text-gray-500">
            Commande passée le : {new Date(commande.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListeCommandes;
