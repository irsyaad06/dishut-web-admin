import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Jan', lahan: 15 },
  { name: 'Feb', lahan: 35 },
  { name: 'Mar', lahan: 50 },
  { name: 'Apr', lahan: 65 },
  { name: 'Mei', lahan: 85 },
];

const GrowthChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-6">Pertumbuhan Lahan Hijau (Hektar)</h3>
      <div className="w-full h-48 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="lahan"
              stroke="#009262"
              strokeWidth={4}
              dot={{ r: 5, fill: "white", stroke: "#009262", strokeWidth: 3 }}
              activeDot={{ r: 7, fill: "#009262", stroke: "white" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthChart;