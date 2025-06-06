import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type CustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value?: number;
  key?: string;
  index: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, key, index }: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.35; // Adjust label position
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${key}`}
    </text>
  );
};

const renderCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10, borderRadius: 5 }}>
        <p style={{ margin: 0 }}><strong>Categoria:</strong> {data.key}</p>
        <p style={{ margin: 0 }}><strong>Quantidade:</strong> {data.value}</p>
      </div>
    );
  }

  return null;
};


const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px' }}>
      {payload.map((entry: any, index: number) => (
        <p key={`item-${index}`} style={{ color: entry.color, marginBottom: 4 }}>

          {entry.payload.key} ({entry.payload.value})
        </p>
      ))}
    </div>
  );
};


export default function PieChartWithCustomizedLabel({ data }: { data: { key: string; value: number }[] }) {

  const outerRadius = () => {
    const width = window.innerWidth;

    if (width < 360) {
      return 40;
    } else if (width < 395) {
      return 50;
    } else if (width < 500) {
      return 60;
    } else if (width < 600) {
      return 80;
    } else if (width < 768) {
      return 80;
    } else if (width < 820) {
      return 45;
    } else if (width < 860) {
      return 55;
    } else if (width <= 1024) {
      return 70;
    } else {
      return 80;
    }
  }

  const aspectRatio = () => {
    const width = window.innerWidth;

    if (width < 768) {
      return 1.5;
    } else if (width < 1024) {
      return 1.2;
    } else {
      return 1.5;
    }
  }

  return (
    <ResponsiveContainer width="100%" maxHeight={300} aspect={aspectRatio()}>
      <PieChart
        width={400}
        height={400}
        style={{ backgroundColor: '#f5f5f5', borderRadius: '12px', padding: '5px' }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={outerRadius()}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.key}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={renderCustomTooltip} />
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );

}
