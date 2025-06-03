'use client'
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import apiAdress from "@/utils/variables/api";
import axios from "axios";
import { useAuth } from "@/hooks/UseAuth/useAuth";
import Button from "@/components/MicroComponents/Default/Button";
import { log } from "console";
import SalesChart from "@/components/Dashboard/charts/SalesSumary";
import keysCounter from "@/utils/functions/keyCounter";
import PieChartWithCustomizedLabel from "@/components/Dashboard/charts/PizzaChart";

type SalesData = {
  date: string;
  total: number;
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

  // data?.map((order => {
  //   console.log('order.orderTotal:', order.orderTotal);
  //   console.log('order.liquidAmount:', order.liquidAmount);
  //   console.log('order.installments:', order.installments);
  // }
  // ));


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
  const [data, setData] = useState<{
    products: number;
    orders: number;
    sales: number;
    deliveryStatus: SalesData[];
    categoryDistribution: any[];
    fullOrders: orderData[];
  }>({
    products: 0,
    orders: 0,
    sales: 0,
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


      let sales = [];
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
        ...response.data,
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

  const fetchData2 = async () => {
    try {
      const response = await axios.get(`${apiAdress}/api/orders/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: `Bearer ${accessToken}`,
        },
        withCredentials: true
      },
      );
      console.log('fetchData2:', response.data);

      setData(response.data);
    } catch (error: any) {
      console.error("Erro no teste:", error);
      console.log({ status: error.status, data: error.response.data.message });
    } finally {
    }
  };

  useEffect(() => {
    if (!accessToken || !accessToken.length) return;
    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const newSalesData = updateDataChart(data.fullOrders);
    setSalesData(newSalesData);

  }, [data]);

  // const exportToCSV = () => {
  //   const csvData = [
  //     ["Data", "Total de Vendas"],
  //     ...data?.salesData.map((item: SalesData) => [item.date, item.total]),
  //   ].map((row) => row.join(",")).join("\n");

  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   saveAs(blob, "relatorio_vendas.csv");
  // };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Total de Produtos</h2>
          <p className="text-2xl">{data.products}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Pedidos em Aberto</h2>
          <p className="text-2xl">{data.orders}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Vendas Este Mês</h2>
          <p className="text-2xl">R$ {Number(data.sales).toFixed(2)}</p>
        </div>
      </div> */}

        <div className="flex gap-2">

      <SalesChart
        data={data}
        statuses={['shipped', 'delivered', 'completed', 'processing', 'approved', 'pending']}
        />
      <PieChartWithCustomizedLabel 
        data={data.categoryDistribution}
        />
        </div>

    

      <div className="mt-6">
        <h2 className="text-xl font-bold">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">         
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

        <Button
          onClick={fetchData}
          custom="mt-4 p-2 bg-blue-600 text-white rounded w-full"
          label="Atualizar Dados"
        />

        <Button
          onClick={fetchData2}
          custom="mt-4 p-2 bg-blue-600 text-white rounded w-full"
          label="teste"
        />
      </div>

      {/* <button onClick={exportToCSV} className="mt-4 p-2 bg-blue-600 text-white rounded w-full">
        Exportar Dados para CSV
      </button> */}
    </div>
  );
}
