
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BarChartData } from '../../types';

interface BarChartCardProps {
    data: BarChartData;
    title: string;
}

const formatChartData = (chartData: BarChartData) => {
    const { labels, datasets } = chartData;
    return labels.map((label, index) => {
        const dataPoint: { name: string; [key: string]: string | number } = { name: label };
        datasets.forEach(dataset => {
            dataPoint[dataset.label] = dataset.data[index];
        });
        return dataPoint;
    });
};

export const BarChartCard: React.FC<BarChartCardProps> = ({ data, title }) => {
    const chartData = formatChartData(data);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    {data.datasets.map(dataset => (
                        <Bar
                            key={dataset.label}
                            dataKey={dataset.label}
                            fill={dataset.backgroundColor}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
