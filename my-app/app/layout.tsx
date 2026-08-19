import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Main Font: Sugo Pro Display (Family with multiple weights/styles)
// const sugoProDisplay = localFont({
//   src: [
//     { path: "../public/fonts/Sugo-Pro-Display-Thin-trial.ttf", weight: "100", style: "normal" },
//     { path: "../public/fonts/Sugo-Pro-Display-Thin-Italic-trial.ttf", weight: "100", style: "italic" },
//     { path: "../public/fonts/Sugo-Pro-Display-ExtraLight-trial.ttf", weight: "200", style: "normal" },
//     { path: "../public/fonts/Sugo-Pro-Display-ExtraLight-Italic-trial.ttf", weight: "200", style: "italic" },
//     { path: "../public/fonts/Sugo-Pro-Display-Light-trial.ttf", weight: "300", style: "normal" },
//     { path: "../public/fonts/Sugo-Pro-Display-Light-Italic-trial.ttf", weight: "300", style: "italic" },
//     { path: "../public/fonts/Sugo-Pro-Display-Regular-trial.ttf", weight: "400", style: "normal" },
//     { path: "../public/fonts/Sugo-Pro-Display-Italic-trial.ttf", weight: "400", style: "italic" },
//     { path: "../public/fonts/Sugo-Pro-Display-Bold-trial.ttf", weight: "700", style: "normal" },
//     { path: "../public/fonts/Sugo-Pro-Display-Bold-Italic-trial.ttf", weight: "700", style: "italic" },
//   ],
//   variable: "--font-sugo-display",
//   display: "swap",
// });

const sugoProDisplay = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-sugo-display",
  display: "swap",
});

// Subheading Font: Louiseville
const louisville = localFont({
  src: "../public/fonts/Louiseville.ttf",
  variable: "--font-louisville",
  display: "swap",
});

// Paragraph Font: Calps Regular
const calps = localFont({
  src: "../public/fonts/calps-regular.ttf",
  variable: "--font-calps",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HackRPI 2026: In the Clouds",
  description: "Rensselaer Polytechnic Institute's 13th Annual Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/HackRPI_Favicon.png"></link>
      </head>
      <body
        className={`${sugoProDisplay.variable} ${louisville.variable} ${calps.variable} bg-gBlack antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
