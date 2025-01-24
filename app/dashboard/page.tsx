export default function DashboardHome() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold">Total de Produtos</h2>
            <p className="text-2xl">120</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold">Pedidos em Aberto</h2>
            <p className="text-2xl">15</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold">Vendas Este Mês</h2>
            <p className="text-2xl">R$ 3.500,00</p>
          </div>
        </div>
      </div>
    );
  }
  