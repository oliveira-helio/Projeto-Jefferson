'use client'
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { saveAs } from "file-saver";
import apiAdress from "@/utils/api";
import axios from "axios";
import { set } from "react-hook-form";
import { useAuth } from "@/Contexts/AuthContext";
import Button from "@/components/MicroComponents/Button";

type SalesData = {
  date: string;
  total: number;
};

export default function DashboardHome() {
  const [data, setData] = useState({ products: 0, orders: 0, sales: 0, salesData: [], categoryDistribution: [] });
  const [filters, setFilters] = useState({ period: "month", category: "", status: "" });
  const { accessToken } = useAuth();

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
      const response = await axios.get(`${apiAdress}/api/orders/dashboard?period=${filters.period}&category=${filters.category}&status=${filters.status}`, {
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
    if (!accessToken
      || !accessToken.length) {
      return;
    }
    
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
      <div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <select
            className="p-2 border rounded"
            value={filters.period}
            onChange={(e) => setFilters({ ...filters, period: e.target.value })}
          >
            <option value="day">Hoje</option>
            <option value="week">Última semana</option>
            <option value="month">Último mês</option>
          </select>
          
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Categoria"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          />
          
          <select
            className="p-2 border rounded"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="pending">Pendente</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregue</option>
          </select>
        </div>
        <Button
          onClick={fetchData}
          custom="mt-4 p-2 bg-blue-600 text-white rounded"
          label='Atualizar Dados'
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Gráficos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gráfico de Barras */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.salesData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Gráfico de Pizza */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.categoryDistribution} dataKey="value" nameKey="category" outerRadius={100} label>
                {data.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Linha */}
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.salesData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <button onClick={exportToCSV} className="mt-4 p-2 bg-blue-600 text-white rounded">
        Exportar Dados para CSV
      </button>
    </div>
  );
}
