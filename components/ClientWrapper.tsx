'use client'

import { usePathname } from "next/navigation";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Container from "../components/Container";
import WhatsAppButon from "../components/MicroComponents/WhatsappButon";


export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <NavBar />} {/* Mostra NavBar apenas fora do dashboard */}
      <div className="flex-1">
        <Container>
          <main>{children}</main>
        </Container>
      </div>
      {!isDashboard && <WhatsAppButon />} {/* Mostra botão WhatsApp fora do dashboard */}
      {!isDashboard && <Footer />} {/* Mostra Footer apenas fora do dashboard */}
    </div>

  );
}