
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DoughnutChartData } from '../../types';

interface DoughnutChartCardProps {
    data: DoughnutChartData;
    title: string;
}

const formatChartData = (chartData: DoughnutChartData) => {
    const { labels, datasets } = chartData;
    if (!datasets[0]) return [];
    return labels.map((label, index) => ({
        name: label,
        value: datasets[0].data[index],
    }));
};

export const DoughnutChartCard: React.FC<DoughnutChartCardProps> = ({ data, title }) => {
    const chartData = formatChartData(data);
    const colors = data.datasets[0]?.backgroundColor || ['#8884d8', '#82ca9d', '#ffc658'];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
