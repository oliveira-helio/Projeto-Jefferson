'use client'
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import apiAdress from "@/utils/api";
import axios from "axios";
import { useAuth } from "@/Contexts/AuthContext";
import Button from "@/components/MicroComponents/Button";

type SalesData = {
  date: string;
  total: number;
};

export default function DashboardHome() {
  const { accessToken } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  const firstDay = firstDayOfMonth.toISOString().split("T")[0];
  const [data, setData] = useState({ products: 0, orders: 0, sales: 0, salesData: [], categoryDistribution: [] });
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
      });
      setData(response.data);
      console.log('Data:', response.data);

    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (!accessToken || !accessToken.length) return;

    fetchData();    
  }, [accessToken]);

  const exportToCSV = () => {
    const csvData = [
      ["Data", "Total de Vendas"],
      ...data.salesData.map((item: SalesData) => [item.date, item.total]),
    ].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "relatorio_vendas.csv");
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {/* 📅 Filtro de Data Inicial */}
          <div>
            <label className="block text-sm font-medium">Data Inicial</label>
            <input
              type="date"
              className="p-2 border rounded w-full"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>

          {/* 📅 Filtro de Data Final */}
          <div>
            <label className="block text-sm font-medium">Data Final</label>
            <input
              type="date"
              className="p-2 border rounded w-full"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>

          {/* 🏷️ Filtro de Categoria */}
          <div>
            <label className="block text-sm font-medium">Categoria</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              placeholder="Digite a categoria"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
          </div>

          {/* 📦 Filtro de Status */}
          <div>
            <label className="block text-sm font-medium">Status do Pedido</label>
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
      </div>

      <button onClick={exportToCSV} className="mt-4 p-2 bg-blue-600 text-white rounded w-full">
        Exportar Dados para CSV
      </button>
    </div>
  );
}
