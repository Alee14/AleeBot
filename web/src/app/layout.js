import { Exo_2, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/middleware";

const exoSans = Exo_2({
  variable: "--font-exo-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AleeBot",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${exoSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
