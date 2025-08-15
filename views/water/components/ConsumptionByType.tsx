import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ConsumptionByTypeData, BarChartData } from '../../../types';

interface ConsumptionByTypeProps {
    data: ConsumptionByTypeData;
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

export const ConsumptionByType: React.FC<ConsumptionByTypeProps> = ({ data }) => {
    const [activeType, setActiveType] = useState('Residential');
    const chartData = formatChartData(data.consumptionData);

    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Usage Type</h3>
                <div className="flex flex-wrap gap-2">
                    {data.types.map(type => (
                        <button 
                            key={type} 
                            onClick={() => setActiveType(type)} 
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeType === type ? 'bg-[#4E4456] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md h-96">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Consumption Analysis</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip />
                        <Legend />
                        {data.consumptionData.datasets.map(dataset => (
                            <Bar
                                key={dataset.label}
                                dataKey={dataset.label}
                                stackId="a"
                                fill={dataset.backgroundColor}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};