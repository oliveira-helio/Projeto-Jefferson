import Container from "../Container";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col bg-pink-500 mt-6">
      <Container>
        <div className="flex flex-col md:flex-row mt-6 items-top justify-between w-full md:px-6 xl:px-10">
          <div className="text-center h-full mb-4">
            <ul className="flex flex-col gap-2">
              <div>
                <li>
                  <ul>
                    <h2 className="font-semibold text-black">SOBRE NÓS</h2>
                    <li>QUEM SOMOS</li>
                    <li>NOSSO ENDEREÇOS</li>
                  </ul>
                </li>
              </div>

              <div>
                <li>
                  <ul className="flex flex-col gap-0.5">
                    <h2 className="font-semibold text-black">MINHA CONTA</h2>
                    <li>MEU CARRINHO</li>
                    <li>MEUS PEDIDOS</li>
                  </ul>
                </li>
              </div>
              <div>
                <li className="flex flex-col gap-0.5">
                  <h2 className="font-semibold text-black">AJUDA</h2>
                </li>
              </div>
            </ul>
          </div>

          <div className="flex flex-col gap-6 text-center align-top h-full mb-4">
            <div className="text-center h-full">
              <h2 className="font-semibold text-black mb-0.5">CONTATO</h2>
              <ul className="flex flex-col gap-0.5">
                <li>TELEFONE: (62) 98877-6655</li>
                <li>E-MAIL: contato@empresa.com</li>
                <li>WHATSAPP: (62) 98877-6655</li>
              </ul>
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

        <div className="flex flex-row justify-evenly items-center text-center">
          <div>
            <h2 className="text-black">redes sociais</h2>
            <div className="text-slate-900">redes</div>
          </div>

          <div>sasa</div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
