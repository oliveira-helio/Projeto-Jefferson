import Container from "../Container";
import Image from "next/image";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col bg-pink-300 mt-6">
      <Container>
        <div className="flex flex-col md:flex-row mt-6 items-top justify-between w-full md:px-6 xl:px-10">
          <div className="text-center h-full mb-4">
            <ul className="flex flex-col gap-2">
              <div>
                <li>
                  <ul>
                    <h2 className="font-semibold text-black">SOBRE NÓS</h2>
                    <li className="text-gray-800"><Link href={"/about-us"} className="text-gray-800">QUEM SOMOS</Link></li>
                    <li className="text-gray-800"><Link href={"/our-locations"} className="text-gray-800">ONDE ESTAMOS</Link></li>
                  </ul>
                </li>
              </div>

              <div>
                <li>
                  <ul className="flex flex-col gap-0.5">
                    <h2 className="font-semibold text-black">MINHA CONTA</h2>
                    <li><Link href={"/cart"} className="text-gray-800">MEU CARRINHO</Link></li>
                    <li><Link href={"/orders"} className="text-gray-800">MEUS PEDIDOS</Link></li>
                  </ul>
                </li>
              </div>
              <div>
                <li className="flex flex-col gap-0.5">
                  <h2 className="font-semibold text-black"><Link href={"/"}>AJUDA</Link></h2>
                </li>
              </div>
            </ul>
          </div>

          <div className="flex flex-col gap-6 text-center align-top h-full mb-4">
            <div className="text-center h-full">
              <h2 className="font-semibold text-black mb-0.5">CONTATO</h2>
              <ul className="flex flex-col gap-0.5 text-gray-800">
                <li><Link href={"tel:+5562995578640"} className="text-gray-800">TELEFONE: (62) 99557-8640</Link></li>
                <li><Link href={"mailto:atendimento@pincelepoesia.com"} className="text-gray-800">E-MAIL: atendimento@pincelepoesia.com</Link></li>
                <li><Link href={"https://wa.me/5562995578640"} className="text-gray-800">WHATSAPP: (62) 99557-8640</Link></li>
              </ul>
            </div>

            <div className="flex flex-row justify-center gap-4">
              <Link href={"https://wa.me/5562995578640"}><WhatsAppIcon fontSize="large" className="text-green-700"/></Link>
              <Link href={"https://www.instagram.com/pincelepoesiamakes/"} className=""><InstagramIcon fontSize="large" className="text-red-500"/></Link>
              <Link href={"https://www.facebook.com/seuPerfil"}><FacebookIcon fontSize="large" className="text-blue-600"/></Link>
            </div>
          </div>

          <div className="flex flex-col justify-center h-full text-center">
            <div>
              <h2 className="font-semibold text-black"> MEIOS DE PAGAMENTO</h2>
            </div>
            <div className="relative aspect-square overflow-visible max-h-32 w-full h-auto mt-4">
              <Image
                fill
                src={"/assets/img/pic-formas-pagamento-1.png"}
                alt={"Bandeiras de cartões de credito e pix"}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-center items-center text-center gap-2 mb-4">
            <span className="text-slate-900">Pincel & Poesia ™ 2025 - Todos os Direitos Reservados{"   "}</span>
            <span className="text-slate-900">{""}Idealizado e produzido por <Link href={"https://oliveira-helio.github.io/web-portifolio-1/"}>©Hélio Oliveira</Link></span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
