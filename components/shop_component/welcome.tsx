'use client';

import { authClient } from "@/lib/auth-client";

const Welcomme = () => {
  const session = authClient.useSession();

  if (!session.data?.user) {
    return (
      <div className="flex items-center justify-center h-64">
        <h1 className="text-3xl font-semibold text-gray-500">
          Vous nêtes pas connecté.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg rounded-lg">
      <h1 className="text-6xl md:text-7xl font-extrabold text-primary drop-shadow-lg animate-fade-in">
        Bienvenue, {session.data.user.name} !
      </h1>
      <p className="mt-4 text-xl text-gray-700">
        Heureux de vous revoir 👋
      </p>
    </div>
  );
};

export default Welcomme;
