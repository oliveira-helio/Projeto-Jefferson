import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Container from "./components/Container";
import WhatsAppButon from "./components/MicroComponents/WhatsappButon";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

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
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <Container>
              <main className="flex-grow">{children}</main>
            </Container>
            <WhatsAppButon />
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
