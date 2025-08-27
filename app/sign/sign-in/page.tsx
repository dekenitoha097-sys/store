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
import Image from "next/image";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsloading(true);
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
        rememberMe: false,
      });

      if (error) {
        alert("Échec de la connexion : " + error.message);
      } else {
        alert("Connexion réussie");
        // Ici tu peux rediriger si besoin, ex: router.push("/")
      }
    } catch (err) {
      alert("Erreur inattendue : ");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96 m-4 border-none shadow-md">
        <CardHeader className="border-b flex justify-between items-center">
          <Label className="text-xl font-black">Connexion</Label>
          <img src="/habit.jpg" alt="" className="w-10 h-10" />
        </CardHeader>

        <CardContent className="space-y-4">
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
            onClick={handleSignIn}
            className="w-full cursor-pointer text-white"
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </Button>
        </CardContent>

        <CardFooter className="w-full flex justify-center">
          <p className="text-sm text-gray-600 mt-4 text-center">
            Pas encore de compte ?{" "}
            <a
              href="/sign/sign-up"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 "
            >
              Inscrivez-vous ici
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
