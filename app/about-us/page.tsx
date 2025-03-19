export default function QuemSomos() {
  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h1 className="text-[36px] font-bold text-pink-600 mb-6">Sobre Nós</h1>

      <div className="flex bg-cover bg-center shadow-md text-white aspect-video w-full lg:w-[80%] items-center" style={{ backgroundImage: "url('/assets/img/background-images/makeupFace4.JPG')" }}>
        <div className="flex flex-col bg-black bg-opacity-50 px-4 pb-6 pt-8 shadow-md text-white w-full items-center h-full justify-center">
          <h2 className="text-3xl font-bold text-pink-600">💖 Quem Somos</h2>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl p-4">
            Bem-vindo à <strong  className="text-xl text-pink-400">Pincel & Poesia</strong>, sua loja de maquiagens e perfumes!
            Aqui, acreditamos que a arte e a beleza andam juntas. Nossa loja nasceu do desejo de oferecer produtos que inspirem criatividade, autoexpressão e confiança. Cada item do nosso catálogo é cuidadosamente selecionado para trazer qualidade, inovação e um toque especial ao seu dia a dia. Mais do que uma loja, somos uma comunidade apaixonada por cores, texturas e histórias.
          </p>
        </div>
      </div>

      {/* Missão, Visão e Valores */}

      <div className="flex bg-cover bg-center shadow-md text-white aspect-video w-full lg:w-[80%] items-center" style={{ backgroundImage: "url('/assets/img/background-images/makeupFace3.JPG')" }}>
        <div className="flex flex-col bg-black bg-opacity-50 px-4 pb-6 pt-8 shadow-md text-white w-full items-center h-full justify-center">
          <h2 className="text-3xl font-bold text-pink-600">💖 Nossa Missão</h2>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl p-4">Nossa missão é transformar cada compra em uma experiência única, oferecendo produtos de alta qualidade que realcem a beleza e incentivem a criatividade. Queremos proporcionar um atendimento excepcional e uma jornada de compra intuitiva, segura e encantadora para todos os nossos clientes.
          </p>
        </div>  
      </div>

      <div className="flex bg-cover bg-center shadow-md text-white aspect-video w-full lg:w-[80%] items-center" style={{ backgroundImage: "url('/assets/img/background-images/makeupFace2.JPG')" }}>
        <div className="flex flex-col bg-black bg-opacity-50 px-4 pb-6 pt-8 shadow-md text-white w-full items-center h-full justify-center">
          <h2 className="text-3xl font-bold text-pink-600">✨ Nossa Visão</h2>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl p-4">Ser referência no mercado de beleza e arte, conectando pessoas através de produtos que despertam emoções e contam histórias. Buscamos inovar constantemente, trazendo as últimas tendências e criando um espaço onde cada pessoa possa se expressar livremente e com autenticidade.</p>
        </div>
      </div>

      <div className="flex bg-cover bg-center shadow-md text-white aspect-video w-full lg:w-[80%] items-center" style={{ backgroundImage: "url('/assets/img/background-images/makeupFace1.JPG')" }}>
        <div className="flex flex-col bg-black bg-opacity-50 px-4 pb-6 pt-8 shadow-md text-white w-full items-center h-full justify-center">
          <h2 className="text-3xl font-bold text-pink-600">🌟 Nossos Valores</h2>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl pt-4">💖 Paixão pelo que fazemos – Cada produto que escolhemos reflete nosso amor pela arte e beleza.</p>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl p-1">🎨 Criatividade e inovação – Buscamos sempre novidades para inspirar nossos clientes.</p>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl p-1">⭐ Qualidade e excelência – Trabalhamos para oferecer os melhores produtos e serviços.</p>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl p-1">🤝 Respeito e inclusão – Acreditamos na diversidade e na beleza única de cada pessoa.</p>
          <p className="text-white max-w-3xl text-base md:text-lg lg:text-xl pb-4">🌍 Sustentabilidade – Valorizamos práticas responsáveis para um futuro melhor.</p>
        </div>
      </div>

    </div>
  );
}
