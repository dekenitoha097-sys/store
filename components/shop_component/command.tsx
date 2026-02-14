'use client';
import { ShoppingCart, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/toast";

type Produit = {
  id: number;
  user_id: string;
  product_name: string;
  product_price: string;
  product_image: string;
};

type CountItem = {
  "COUNT(*)": number;
};

type Props = {
  produit: Produit[];
  prix: CountItem[];
};

const Command = ({ produit, prix }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const session = authClient.useSession();

  const [localisation, setLocalisation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);

  const detailleText = produit
    .map(
      (p, k) =>
        `${p.product_name}\tPrix (unitaire) : ${p.product_price} Total: ${
          Number(p.product_price) * prix[k]["COUNT(*)"]
        }`
    )
    .join("\n");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session.data) {
      showToast("Vous devez être connecté pour passer une commande.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom_complet: session.data.user.name,
          email: session.data.user.email,
          detaille: detailleText,
          localisation,
          telephone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(data.message || "Commande enregistrée avec succès !", "success");
        // Après succès de fetch, on soumet vraiment le formulaire à formsubmit.co
        formRef.current?.submit();

        modalRef.current?.close();

        setLocalisation("");
        setTelephone("");
      } else {
        showToast(data.erreur || "Erreur lors de la commande.", "error");
      }
    } catch (error) {
      showToast("Erreur réseau, veuillez réessayer.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="btn btn-primary w-full" onClick={openModal}>
        <ShoppingCart />
        Commander
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box space-y-4">
          <h1>Passer votre commande</h1>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            action="https://formsubmit.co/fonaoyode75@gmail.com"
            method="POST"
            className="space-y-4"
          >
            <Input
              name="nom_complet"
              value={session.data?.user.name || ""}
              readOnly
            />
            <Input
              name="email"
              type="email"
              value={session.data?.user.email || ""}
              readOnly
            />
            <Textarea
              className="h-40"
              name="detaille"
              value={detailleText}
              readOnly
            />
            <label htmlFor="localisation">
              Votre localisation
              <Input
                required
                type="text"
                name="localisation"
                id="localisation"
                placeholder="Ex : Paris, France"
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
              />
            </label>

            <label htmlFor="telephone">
              Votre numéro de téléphone
              <Input
                required
                type="tel"
                name="telephone"
                id="telephone"
                placeholder="Ex : +33 6 12 34 56 78"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </label>

            <Button
              className="w-full text-white cursor-pointer mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Commander"
              )}
            </Button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-secondary">Fermer</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Command;
