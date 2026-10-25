import { JetBrains_Mono, Literata, Playfair_Display } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
