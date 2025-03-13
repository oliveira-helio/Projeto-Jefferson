import Link from "next/link";

export default function NossosEnderecos() {
  const lojas = [
    {
      nome: "Loja Centro",
      endereco: "Rua das Flores, 123 - Centro, Goiânia - GO",
      telefone: '📞(62) 98877-6655 / 📞(62) 98877-6655',
      horario: "Seg-Sex: 9h às 18h / Sab: 9h às 13h",
      linkMapa: "https://www.google.com/maps?q=-16.6799,-49.255",
    },
    {
      nome: "Loja Shopping X",
      endereco: "Av. das Américas, 456 - Setor Sul, Goiânia - GO",
      telefone: '📞(62) 98877-6655 / 📞(62) 98877-6655',
      horario: "Seg-Sáb: 9h às 18h",
      linkMapa: "https://www.google.com/maps?q=-16.6805,-49.256",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Nossos Endereços</h1>

      <p className="text-gray-800 max-w-2xl mb-6">
        Escolha a loja mais próxima e venha conhecer nossos produtos! 💄✨
      </p>


      {/* Lista de Endereços */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-4">

        <div className="grid grid-cols-2 gap-4 md:flex  md:flex-col justify-evenly">
          {lojas.map((loja, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 max-w-3xl shadow-md shadow-pink-300">
              <h2 className="text-lg font-semibold text-gray-800">{loja.nome}</h2>
              <p className="text-gray-700">{loja.endereco}</p>
              <p className="text-gray-700">{loja.telefone}</p>
              <p className="text-gray-700">{loja.horario}</p>
              <a
                href={loja.linkMapa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                Ver no mapa
              </a>
            </div>
          ))}
        </div>



        {/* Mapa Interativo */}
        <div className="flex justify-center items-center w-full">
          <iframe
            className="w-full aspect-video rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d122297.04737289976!2d-49.40739695284596!3d-16.68775241283275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sescola%20do%20futuro%20de%20goi%C3%A1s!5e0!3m2!1spt-BR!2sbr!4v1741637480925!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>


      </div>
      {/* Botão para abrir Google Maps */}
      <div className="mt-4 flex justify-center w-full">
        <Link
          href="https://www.google.com/maps/dir/?api=1&destination=-23.550519,-46.633309"
          target="_blank"
          className="bg-pink-400 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-pink-500"
        >
          📍 Como chegar até nós
        </Link>
      </div>
    </div>
  );
}
