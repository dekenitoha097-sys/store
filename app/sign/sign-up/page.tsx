"use client";

import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [nameError, setNameError] = useState("");
  const { showToast } = useToast();

  const handleSignUp = async () => {
    // Validation du champ nom
    if (!name.trim()) {
      setNameError("Le nom est obligatoire");
      return;
    }
    setNameError("");
    
    console.log("ca marche");
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          setIsloading(true);
        },
        onSuccess: (ctx) => {
          showToast("Inscription réussie !", "success");
          setIsloading(false);
        },
        onError: (ctx) => {
          showToast("Échec de l'inscription : " + ctx.error.message, "error");
          setIsloading(false);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96 m-4 border-none shadow-md">
        <CardHeader className="border-b flex justify-between items-center">
          <Label className="text-xl font-black">Inscription</Label>
          <img src="/habit.jpg" alt="" className="w-10 h-10" />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nom complet <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Votre nom complet"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              className={nameError ? "border-red-500" : ""}
            />
            {nameError && (
              <p className="text-sm text-red-500">{nameError}</p>
            )}
          </div>
          <Input
            placeholder="Adresse e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleSignUp}
            className="w-full cursor-pointer text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Création en cours...
              </>
            ) : (
              "Créer un compte"
            )}
          </Button>
        </CardContent>

        <CardFooter className="w-full flex justify-center">
          <p className="text-sm text-gray-600 mt-4 text-center">
            Vous avez déjà un compte ?{" "}
            <a
              href="/sign/sign-in"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Connectez-vous ici
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
