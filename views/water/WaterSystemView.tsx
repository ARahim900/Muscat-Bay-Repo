import React, { useState, useCallback, useMemo } from 'react';
import type { WaterSystemData } from '../../types';
import { WaterOverview } from './components/WaterOverview';
import { WaterLossAnalysis } from './components/WaterLossAnalysis';
import { ZoneAnalysis } from './components/ZoneAnalysis';
import { ConsumptionByType } from './components/ConsumptionByType';
import { MainDatabase } from './components/MainDatabase';
import { Icons } from '../../constants';
import { Modal } from '../../components/Modal';
import { Spinner } from '../../components/Spinner';
import { getWaterSystemAnalysis } from '../../services/geminiService';

interface WaterSystemViewProps {
    data: WaterSystemData;
}

type WaterTab = 'overview' | 'lossAnalysis' | 'zoneAnalysis' | 'consumptionType' | 'database';

const parseMarkdown = (text: string) => {
    return text
        .split('\n')
        .map((line, index) => {
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-bold text-slate-800 mt-4 mb-2">{line.substring(3)}</h2>;
            }
            if (line.startsWith('* ')) {
                return <li key={index} className="ml-5 list-disc text-slate-600">{line.substring(2)}</li>;
            }
            if (line.trim() === '') {
                return <br key={index}/>;
            }
            return <p key={index} className="text-slate-600 mb-2">{line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>;
        });
};


export const WaterSystemView: React.FC<WaterSystemViewProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<WaterTab>('overview');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const tabs: { id: WaterTab; label: string; component: React.ReactNode }[] = useMemo(() => [
        { id: 'overview', label: 'Overview', component: <WaterOverview data={data.overview} /> },
        { id: 'lossAnalysis', label: 'Water Loss Analysis', component: <WaterLossAnalysis data={data.lossAnalysis} /> },
        { id: 'zoneAnalysis', label: 'Zone Analysis', component: <ZoneAnalysis data={data.zoneAnalysis} /> },
        { id: 'consumptionType', label: 'Consumption by Type', component: <ConsumptionByType data={data.consumptionType} /> },
        { id: 'database', label: 'Main Database', component: <MainDatabase data={data.database} /> },
    ], [data]);

    const handleAiAnalysis = useCallback(async () => {
        setIsModalOpen(true);
        setIsLoading(true);
        setAnalysisResult(null);
        const result = await getWaterSystemAnalysis(data);
        setAnalysisResult(result);
        setIsLoading(false);
    }, [data]);

    const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-y-4">
                <div className="bg-slate-100 p-1 rounded-full shadow-sm border flex-wrap">
                    <nav className="flex items-center gap-2" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id)} 
                                className={`whitespace-nowrap px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                                    activeTab === tab.id 
                                        ? 'bg-white shadow text-[#4E4456]' 
                                        : 'text-slate-600 hover:bg-white/60'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <button 
                    onClick={handleAiAnalysis}
                    className="flex items-center gap-2 bg-[#A8D8D4] text-[#4E4456] font-bold py-2 px-4 rounded-lg shadow-md hover:bg-opacity-90 transition-all"
                >
                    <Icons.ai className="w-5 h-5" />
                    <span>AI Analysis</span>
                </button>
            </div>
            
            {activeComponent}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="AI Water System Analysis">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <Spinner className="w-12 h-12" />
                        <p className="mt-4 text-slate-600">Analyzing data...</p>
                    </div>
                )}
                {analysisResult && (
                    <div className="prose max-w-none">
                        {parseMarkdown(analysisResult)}
                    </div>
                )}
            </Modal>
        </div>
    );
};