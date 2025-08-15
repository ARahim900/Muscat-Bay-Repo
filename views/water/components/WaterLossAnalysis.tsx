import React from 'react';
import type { WaterLossAnalysisData } from '../../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Icons } from '../../../constants';

interface WaterLossAnalysisProps {
    data: WaterLossAnalysisData;
}

const formatChartData = (chartData) => {
    const { labels, datasets } = chartData;
    const formattedData = labels.map((label, index) => {
        const dataPoint: { name: string; [key: string]: string | number } = { name: label };
        datasets.forEach(dataset => {
            dataPoint[dataset.label] = dataset.data[index];
        });
        return dataPoint;
    });
    return formattedData;
};


const DistributionCard = ({ icon, value, subtitle, color }) => (
    <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-4 border border-slate-200">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
    </div>
);

const LossCard = ({ title, value, percentage, color, icon }) => (
     <div className="bg-white p-6 rounded-2xl shadow-sm border text-center flex flex-col justify-center items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${color.bg}`}>
            {icon}
        </div>
        <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
        <p className={`text-base font-bold mt-1 ${color.text}`}>{percentage}</p>
    </div>
);


export const WaterLossAnalysis: React.FC<WaterLossAnalysisProps> = ({ data }) => {
    const consumptionChartData = formatChartData(data.consumptionTrend);
    const lossChartData = formatChartData(data.lossTrend);

    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                 <h3 className="text-lg font-semibold text-slate-700 mb-4">4-Level Water Distribution Totals for Jan-25 to Jul-25</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DistributionCard icon={<p className="font-bold text-sky-800 text-lg">A1</p>} value={data.distributionTotals.a1.value} subtitle={data.distributionTotals.a1.subtitle} color="bg-sky-100" />
                    <DistributionCard icon={<p className="font-bold text-cyan-800 text-lg">A2</p>} value={data.distributionTotals.a2.value} subtitle={data.distributionTotals.a2.subtitle} color="bg-cyan-100" />
                    <DistributionCard icon={<p className="font-bold text-teal-800 text-lg">A3</p>} value={data.distributionTotals.a3.value} subtitle={data.distributionTotals.a3.subtitle} color="bg-teal-100" />
                    <DistributionCard icon={<p className="font-bold text-emerald-800 text-lg">A4</p>} value={data.distributionTotals.a4.value} subtitle={data.distributionTotals.a4.subtitle} color="bg-emerald-100" />
                 </div>
            </div>
             
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <LossCard title="STAGE 1 LOSS (A1-A2)" value={data.lossTotals.stage1.value} percentage={data.lossTotals.stage1.percentage} color={{bg: 'bg-red-100', text: 'text-red-600'}} icon={<Icons.water className="w-6 h-6 text-red-600"/>} />
                <LossCard title="STAGE 2 LOSS (L2+L3)" value={data.lossTotals.stage2.value} percentage={data.lossTotals.stage2.percentage} color={{bg: 'bg-orange-100', text: 'text-orange-600'}} icon={<Icons.water className="w-6 h-6 text-orange-600"/>}/>
                <LossCard title="STAGE 3 LOSS (L3-L4)" value={data.lossTotals.stage3.value} percentage={data.lossTotals.stage3.percentage} color={{bg: 'bg-amber-100', text: 'text-amber-600'}} icon={<Icons.water className="w-6 h-6 text-amber-600"/>}/>
                <LossCard title="TOTAL SYSTEM LOSS" value={data.lossTotals.total.value} percentage={data.lossTotals.total.percentage} color={{bg: 'bg-slate-200', text: 'text-slate-600'}} icon={<Icons.water className="w-6 h-6 text-slate-600"/>}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 h-96">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Monthly Consumption Trend <span className="text-sm font-normal text-slate-500">L1 Supply vs. L2 & L3 Meter Totals</span></h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={consumptionChartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                            <YAxis stroke="#6b7280" fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="L1 - Main Source" stroke="#0369a1" strokeWidth={2} dot={false} />
                            <Line dataKey="L2 - Zone Bulk Meters" stroke="#0284c7" strokeWidth={2} dot={false} />
                            <Line dataKey="L3 - Building/Villa Meters" stroke="#38bdf8" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 h-96">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Monthly Water Loss Trend <span className="text-sm font-normal text-slate-500">Comparing loss at different stages of distribution</span></h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={lossChartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                            <YAxis stroke="#6b7280" fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="Stage 1 Loss" stroke="#ef4444" strokeWidth={2} dot={false} />
                            <Line dataKey="Stage 2 Loss" stroke="#f97316" strokeWidth={2} dot={false} />
                            <Line dataKey="Stage 3 Loss" stroke="#f59e0b" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};