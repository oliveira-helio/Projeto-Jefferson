
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import CartProvider from "@/providers/CartProvider";
import { AuthProvider } from '@/Contexts/AuthContext';
import { Toaster } from "react-hot-toast";
import ClientWrapper from "@/components/ClientWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pincel e Poesia",
  description: "Created by Hélio Oliveira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br">
      <body className={`${poppins.className} text-slate-700 bg-[#fafafa]`}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <AuthProvider>
            <ClientWrapper>{children}</ClientWrapper>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
