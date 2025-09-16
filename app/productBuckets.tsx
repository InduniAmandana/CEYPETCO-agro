"use client";
import React from "react";

/* =========================
   DATA
   ========================= */
export const productBuckets = [
  {
    title: "Insecticides",
    icon: <Bug className="h-5 w-5" />,
    items: [
      "Profenophos 50% EC",
      "B.P.M.C. 50% EC",
      "Fipronil 0.3% G",
      "Fipronil 50 g/L SC",
      "Imidacloprid 200 g/L SC",
      "Bio‑Insecticide: Flipper",
    ],
  },
  {
    title: "Weedicides",
    icon: <Wheat className="h-5 w-5" />,
    items: ["Diuron 80% WP", "Pretilachlor 30% EC", "Glyphosate 36% SL (Restricted)"]
  },
  {
    title: "Fungicides",
    icon: <FlaskConical className="h-5 w-5" />,
    items: ["Tebuconazole 25% EW", "Mancozeb 80% WP", "Captan 50% WP", "Sulphur 80% WG"]
  },
];
