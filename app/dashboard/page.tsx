'use client'
import { useState, useEffect } from "react";
import apiAdress from "@/utils/variables/api";
import axios from "axios";
import { useAuth } from "@/hooks/UseAuth/useAuth";
import Button from "@/components/MicroComponents/Default/Button";
import SalesChart from "@/components/Dashboard/charts/SalesSumary";
import keysCounter from "@/utils/functions/keyCounter";
import PieChartWithCustomizedLabel from "@/components/Dashboard/charts/PizzaChart";

type SalesData = {
  key: string;
  value: number;
};

type orderData = {
  orderId: number;
  orderStatus: string;
  orderTotal: number;
  paymentStatus: string;
  installments: number;
  mpFee: number;
  installmentFee: number;
  paymentType: string;
  liquidAmount: number;
  createdAt: Date;
  products?: {
    color: string;
    price: number;
    ratting: number;
    category: string;
    productId: number;
    productName: string;
    productType: string;
    recommended: boolean;
    subCategory: string;
    quantitySold: number;
    rattingQuantity: number;
  }[];
  shipments?: {
    carrier: string;
    ShipmentStatus: string;
  }[]
}

const SalesSummary = ({ data }: { data: orderData[] }) => {

  const totalOrders = data?.length || 0;
  const totalAmount = data?.reduce((acc, order) => acc + order.orderTotal, 0);
  const totalLiquidAmount = data?.reduce((acc, order) => acc + order.liquidAmount, 0);
  const totalInstallments = data?.reduce((acc, order) => acc + order.installments, 0);
  const approvalRate = (data?.filter(order => order.paymentStatus === "approved").length / totalOrders) * 100;
  console.log('totalAmount:', totalAmount);

  return data?.length > 0 ? (
    <div className="sales-summary">

      <div className="summary-item">Número de Pedidos: {totalOrders}</div>
      <div className="summary-item">Valor Total Bruto: R$ {totalAmount.toFixed(2)}</div>
      <div className="summary-item">Valor Total Líquido: R$ {totalLiquidAmount.toFixed(2)}</div>
      <div className="summary-item">Taxa de Aprovação de pedidos: {approvalRate}%</div>
      <div className="summary-item">Parcelamento Médio dos pedidos: {totalInstallments / totalOrders}</div>

    </div>
  )
    : (null);
};

export default function DashboardHome() {
  const { accessToken, isAdmin } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  const firstDay = firstDayOfMonth.toISOString().split("T")[0];
  const [salesData, setSalesData] = useState<any>(null);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [data, setData] = useState<{
    products: number;
    orders: number;
    salesTotal: number;
    deliveryStatus: SalesData[];
    categoryDistribution: any[];
    fullOrders: orderData[];
  }>({
    products: 0,
    orders: 0,
    salesTotal: 0,
    deliveryStatus: [],
    categoryDistribution: [],
    fullOrders: [],
  });
  const [filters, setFilters] = useState({
    startDate: firstDay,
    endDate: today,
    category: "",
    status: "",
  });

  // useEffect(() => {
  //   fetch(`${apiAdress}/api/orders/dashboard`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       accessToken: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       console.log(data);

  //   });
  // }, [filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiAdress}/api/orders/dashboard`, {
        params: {
          startDate: filters.startDate,
          endDate: filters.endDate,
          category: filters.category,
          status: filters.status,
        },
        headers: {
          "Content-Type": "application/json",
          accessToken: `Bearer ${accessToken}`,
        },
        withCredentials: true
      });

      let orders = response.data.length;

      const keysCounterData = response.data.flatMap((order: any) =>
        order.products?.map((product: any) => product.category) || []
      );
      const deliveriesCounterData = response.data.flatMap((item: any) =>
        item.shipments?.map((delivery: any) => delivery.shipmentStatus
        ));
      const categories = keysCounter(keysCounterData);
      const deliveries = keysCounter(deliveriesCounterData)

      setData({
        products: response.data.reduce((acc: number, order: any) => acc + (order.products?.length || 0), 0),
        orders: orders,
        salesTotal: response.data.reduce((acc: number, order: any) => acc + order.orderTotal, 0),
        categoryDistribution: categories,
        deliveryStatus: deliveries,
        fullOrders: response.data || []
      });
      console.log("Dados atualizados:", data);


    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
    }
  };

  const updateDataChart = (data: orderData[] | null) => {
    const salesData = data?.map((item: orderData) => ({
      status: item.orderStatus,
      mpFee: item.mpFee,
      instalmentFee: item.installmentFee,
      liquidAmount: item.liquidAmount,
      total: item.orderTotal,
      category: item.products?.map((product) => product.category).join(", "),
    }));
    return salesData;
  }

  useEffect(() => {
    if (!accessToken || !accessToken.length) return;
    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const newSalesData = updateDataChart(data.fullOrders);
    setSalesData(newSalesData);
    const newTotalSales = data.fullOrders
      .filter((pedido: orderData) => pedido.orderStatus !== 'pending' && pedido.orderStatus !== 'cancelled')
      .reduce((acc, pedido) => acc + pedido.orderTotal,0)
    setTotalSales(newTotalSales);
    const newTotalProfit = data.fullOrders
      .filter((pedido: orderData) => pedido.orderStatus !== 'pending' && pedido.orderStatus !== 'cancelled')
      .reduce((acc, pedido) => acc + pedido.liquidAmount, 0);
    setTotalProfit(newTotalProfit);
  }, [data]);

  // const exportToCSV = () => {
  //   const csvData = [
  //     ["Data", "Total de Vendas"],
  //     ...data?.salesData.map((item: SalesData) => [item.date, item.total]),
  //   ].map((row) => row.join(",")).join("\n");

  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   saveAs(blob, "relatorio_vendas.csv");
  // };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h1>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Filtros</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          <div>
            <label className="block text-sm font-medium">📅 Data Inicial</label>
            <input
              type="date"
              className="p-2 border rounded w-full"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">📅 Data Final</label>
            <input
              type="date"
              className="p-2 border rounded w-full"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">🏷️ Categoria</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              placeholder="Digite a categoria"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">📦 Status do Pedido</label>
            <select
              className="p-2 border rounded w-full"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Todos</option>
              <option value="pending">Pendente</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={fetchData}
            custom="my-3 p-2 bg-blue-600 text-white rounded w-fit my-4"
            label="Atualizar Dados"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">

          <div className="py-2 px-4 bg-white  rounded-xl w-full shadow  shadow-pink-400 hover:shadow-pink-500 hover:scale-[1.01] transition-shadow duration-300">
            <h2 className="md:text-lg font-bold">Pedidos concluídos</h2>
            <p className="text-xl">
              {data.fullOrders.filter(
                (pedido: orderData) => pedido.orderStatus !== 'pending' && pedido.orderStatus !== 'cancelled'
              ).length}
            </p>
          </div>

          <div className="py-2 px-4 bg-white  rounded-xl w-full shadow  shadow-pink-400 hover:shadow-pink-500 hover:scale-[1.01] transition-shadow duration-300">
            <h2 className="md:text-lg font-bold">Pedidos Totais</h2>
            <p className="text-xl">{data.fullOrders.length}</p>
          </div>

          <div className="py-2 px-4 bg-white  rounded-xl w-full shadow  shadow-pink-400 hover:shadow-pink-500 hover:scale-[1.01] transition-shadow duration-300">
            <h2 className="text-nowrap md:text-lg font-bold">Total Previsto</h2>
            <p className="text-xl">R$ {data.salesTotal.toFixed(2)}</p>
          </div>

          <div className="py-2 px-4 bg-white  rounded-xl w-full shadow  shadow-pink-400 hover:shadow-pink-500 hover:scale-[1.01] transition-shadow duration-300">
            <h2 className="md:text-lg font-bold">Lucro Previsto</h2>
            <p className="text-xl">R$ {data.salesTotal.toFixed(2)}</p>
          </div>

          <div className="py-2 px-4 bg-white  rounded-xl w-full shadow  shadow-pink-400 hover:shadow-pink-500 hover:scale-[1.01] transition-shadow duration-300">
            <h2 className="text-nowrap md:text-lg font-bold">Total Faturado</h2>
            <p className="text-xl">{totalSales.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
          </div>

          <div className="py-2 px-4 bg-white  rounded-xl w-full shadow  shadow-pink-400 hover:shadow-pink-500 hover:scale-[1.01] transition-shadow duration-300">
            <h2 className="md:text-lg font-bold">Lucro Liquido</h2>
            <p className="text-xl">{totalProfit.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 p-4 rounded-xl w-full shadow shadow-pink-400 hover:shadow-pink-500 hover:scale-[1.01] transition-shadow duration-300 gap-8">

          <SalesChart
            data={data}
            statuses={['shipped', 'delivered', 'completed', 'processing', 'approved', 'pending']}
          />
          <PieChartWithCustomizedLabel
            data={data.categoryDistribution}
          />
        </div>
      </div>
    </div>
  );
}
