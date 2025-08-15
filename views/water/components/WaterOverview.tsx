
import React from 'react';
import type { WaterOverviewData } from '../../../types';
import { StatCard } from '../../../components/StatCard';
import { LineChartCard } from '../../../components/charts/LineChartCard';
import { DoughnutChartCard } from '../../../components/charts/DoughnutChartCard';

interface WaterOverviewProps {
    data: WaterOverviewData;
}

export const WaterOverview: React.FC<WaterOverviewProps> = ({ data }) => {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.stats.map(stat => <StatCard key={stat.id} {...stat} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <LineChartCard data={data.lineChart} title="Weekly Water Consumption" />
                </div>
                <div>
                    <DoughnutChartCard data={data.doughnutChart} title="Consumption by Area" />
                </div>
            </div>
        </div>
    );
};
