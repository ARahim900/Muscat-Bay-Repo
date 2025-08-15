import React from 'react';
import type { WaterLossAnalysisData } from '../../../types';
import { LineChartCard } from '../../../components/charts/LineChartCard';
import { Icons } from '../../../constants';

interface WaterLossAnalysisProps {
    data: WaterLossAnalysisData;
}

const DistributionCard = ({ icon, value, subtitle, color }) => (
    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    </div>
);

const LossCard = ({ icon, title, value, percentage, color }) => (
    <div className="bg-white p-4 rounded-xl shadow-md border flex flex-col items-center justify-center text-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${color}`}>
           {icon}
        </div>
        <p className="text-xs text-gray-500 font-semibold">{title}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
        <p className="text-sm font-semibold" style={{color: color.split(' ')[0].replace('bg-', '') + '-600'}}>{percentage}</p>
    </div>
);


export const WaterLossAnalysis: React.FC<WaterLossAnalysisProps> = ({ data }) => {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
                 <h3 className="text-lg font-semibold text-gray-700 mb-4">4-Level Water Distribution Totals for Jan-25 to Jul-25</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DistributionCard icon={<p className="font-bold text-blue-800">A1</p>} value={data.distributionTotals.a1.value} subtitle={data.distributionTotals.a1.subtitle} color="bg-blue-200" />
                    <DistributionCard icon={<p className="font-bold text-green-800">A2</p>} value={data.distributionTotals.a2.value} subtitle={data.distributionTotals.a2.subtitle} color="bg-green-200" />
                    <DistributionCard icon={<p className="font-bold text-yellow-800">A3</p>} value={data.distributionTotals.a3.value} subtitle={data.distributionTotals.a3.subtitle} color="bg-yellow-200" />
                    <DistributionCard icon={<p className="font-bold text-indigo-800">A4</p>} value={data.distributionTotals.a4.value} subtitle={data.distributionTotals.a4.subtitle} color="bg-indigo-200" />
                 </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-md">
                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Multi-Stage Water Loss Totals for Jan-25 to Jul-25</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     <LossCard icon={<Icons.water className="w-5 h-5 text-red-800"/>} title="STAGE 1 LOSS (A1+A2)" value={data.lossTotals.stage1.value} percentage={data.lossTotals.stage1.percentage} color="bg-red-200"/>
                     <LossCard icon={<Icons.water className="w-5 h-5 text-orange-800"/>} title="STAGE 2 LOSS (L2+L3)" value={data.lossTotals.stage2.value} percentage={data.lossTotals.stage2.percentage} color="bg-orange-200"/>
                     <LossCard icon={<Icons.water className="w-5 h-5 text-yellow-800"/>} title="STAGE 3 LOSS (L3+L4)" value={data.lossTotals.stage3.value} percentage={data.lossTotals.stage3.percentage} color="bg-yellow-200"/>
                     <LossCard icon={<Icons.water className="w-5 h-5 text-gray-800"/>} title="TOTAL SYSTEM LOSS" value={data.lossTotals.total.value} percentage={data.lossTotals.total.percentage} color="bg-gray-200"/>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChartCard data={data.consumptionTrend} title="Monthly Consumption Trend" />
                <LineChartCard data={data.lossTrend} title="Monthly Water Loss Trend" />
            </div>
        </div>
    );
};
