import Container from "@/components/Container";

const NossosEnderecos = () => {
  const lojas = [
    {
      nome: "Loja Centro",
      endereco: "Rua das Flores, 123 - Centro, Goiânia - GO",
      linkMapa: "https://www.google.com/maps?q=-16.6799,-49.255",
    },
    {
      nome: "Loja Shopping X",
      endereco: "Av. das Américas, 456 - Setor Sul, Goiânia - GO",
      linkMapa: "https://www.google.com/maps?q=-16.6805,-49.256",
    },
  ];

  return (
    <Container>
      <div className="flex flex-col items-center text-center py-10 px-4">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Nossos Endereços</h1>
        <p className="text-gray-700 max-w-2xl mb-6">
          Venha nos visitar em uma de nossas lojas físicas. Confira os endereços abaixo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {lojas.map((loja, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold text-gray-800">{loja.nome}</h2>
              <p className="text-gray-600">{loja.endereco}</p>
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
      </div>
    </Container>
  );
};

export default NossosEnderecos;
