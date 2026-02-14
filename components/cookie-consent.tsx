"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already made a choice
    const cookieConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="));
    
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie for 1 year
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `cookie_consent=accepted; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Set cookie for 1 year
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `cookie_consent=declined; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    setShowBanner(false);
  };

  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 text-center sm:text-left">
          <p className="font-medium">Nous utilisons des cookies</p>
          <p className="text-gray-500">
            Ce site utilise des cookies pour améliorer votre expérience. 
            <a href="#" className="underline ml-1 hover:text-gray-700">En savoir plus</a>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Refuser
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
