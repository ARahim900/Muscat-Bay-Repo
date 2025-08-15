
import React, { useState } from 'react';
import type { ZoneAnalysisData } from '../../../types';

interface ZoneAnalysisProps {
    data: ZoneAnalysisData;
}

export const ZoneAnalysis: React.FC<ZoneAnalysisProps> = ({ data }) => {
    const [selectedZone, setSelectedZone] = useState(data.zones[2]);
    const zoneDetails = data.zoneData[selectedZone];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1">Select Month</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D8D4] focus:border-[#A8D8D4]">
                            <option>July 2025</option>
                            <option>June 2025</option>
                            <option>May 2025</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1">Filter by Zone</label>
                        <select value={selectedZone} onChange={e => setSelectedZone(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D8D4] focus:border-[#A8D8D4]">
                            {data.zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Reset Filters</button>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedZone} Analysis for Jul-25</h3>
                <p className="text-gray-500 mb-6">{zoneDetails?.description || 'No data available for this zone.'}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div><p className="text-sm text-gray-500">Consumption</p><p className="text-2xl font-bold text-[#4E4456]">{zoneDetails?.consumption}</p></div>
                    <div><p className="text-sm text-gray-500">Water Loss</p><p className="text-2xl font-bold text-red-500">{zoneDetails?.loss}</p></div>
                    <div><p className="text-sm text-gray-500">Avg. Pressure</p><p className="text-2xl font-bold text-[#4E4456]">{zoneDetails?.pressure}</p></div>
                </div>
            </div>
        </div>
    );
};
