import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface SalesData {
  data: any; // TODO: Define a more specific type for the data structure
  statuses: string[];
}

export default function SalesChart( salesData : SalesData) {
  const acceptedStatuses = salesData.statuses || ['shipped', 'delivered', 'completed', 'processing', 'approved'];
  const montlyResume: Record<string, {
    totalSold: number;
    profit: number;
    orders: number;
  }> = {};

  salesData.data.fullOrders?.forEach((order: any) => {
    if (!acceptedStatuses.includes(order.orderStatus)) return;

    const orderDate = new Date(order.createdAt);
    const monthYear = `${String(orderDate.getMonth() + 1).padStart(2, '0')}/${orderDate.getFullYear().toString().slice(-2)}`;

    if (!montlyResume[monthYear]) {
      montlyResume[monthYear] = {
        totalSold: 0,
        profit: 0,
        orders: 0
      };
    }

    montlyResume[monthYear].totalSold += order.orderTotal;
    montlyResume[monthYear].profit += order.liquidAmount;
    montlyResume[monthYear].orders += 1;
  });

  const chartData: {
    month: string,
    totalSold: number,
    profit: number,
    quantity: number
  }[] = Object.entries(montlyResume).map(([month, values]) => ({
    month,
    totalSold: values.totalSold,
    profit: values.profit,
    quantity: values.orders
  })).sort((a, b) => {
    const [monthA, yearA] = a.month.split('/');
    const [monthB, yearB] = b.month.split('/');
    return new Date(`20${yearA}-${monthA}-01`).getTime() - new Date(`20${yearB}-${monthB}-01`).getTime();
  });  

  return (
      <ResponsiveContainer width="49%" height={300} aspect={1.5}>
        <ComposedChart
          width={400}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 5,
          }}
          style={{ backgroundColor: '#f5f5f5', borderRadius: '12px', padding: '5px' }}
        >
          <CartesianGrid stroke="#f5f5f5"  />
          <XAxis dataKey="month" scale="band" />
          <YAxis />
          <Tooltip />
          <Area name="Total em vendas" type="monotone" dataKey="totalSold" fill="#8884d8" stroke="#8884d8" />
          <Bar  name="Lucro" dataKey="profit" barSize={20} fill="#413ea0" />
          <Line name="Pedidos" type="monotone" dataKey="quantity" stroke="#ff7300" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
          <Legend wrapperStyle={{ paddingBottom: 0 }} />
        </ComposedChart>
      </ResponsiveContainer>
  );

}
