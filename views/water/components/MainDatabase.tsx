
import React from 'react';
import type { WaterDatabaseData } from '../../../types';

interface MainDatabaseProps {
    data: WaterDatabaseData;
}

export const MainDatabase: React.FC<MainDatabaseProps> = ({ data }) => (
    <div className="animate-fade-in bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Meter Inventory Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Meters</p>
                <p className="text-4xl font-bold text-[#4E4456]">{data.totalMeters}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-700">L1 Meters (Main Source)</p>
                <p className="text-4xl font-bold text-blue-900">{data.l1Meters}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
                <p className="text-sm text-green-700">L2 Meters (Zone Bulk)</p>
                <p className="text-4xl font-bold text-green-900">{data.l2Meters}</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg text-center">
                <p className="text-sm text-indigo-700">L3 Meters (Building/Villa)</p>
                <p className="text-4xl font-bold text-indigo-900">{data.l3Meters}</p>
            </div>
        </div>
    </div>
);
