import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNavBar } from './components/MobileNavBar';
import { mockData, VIEW_TITLES } from './constants';
import { DashboardView } from './views/dashboard/DashboardView';
import { WaterSystemView } from './views/water/WaterSystemView';
import { ElectricitySystemView } from './views/electricity/ElectricitySystemView';
import { HvacSystemView } from './views/hvac/HvacSystemView';
import { FirefightingView } from './views/firefighting/FirefightingView';
import { ContractorTrackerView } from './views/contractor/ContractorTrackerView';
import { StpPlantView } from './views/stp/StpPlantView';
import type { ViewKey } from './types';

const MainContent: React.FC<{ activeView: ViewKey }> = ({ activeView }) => {
    const viewComponent = useMemo(() => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView data={mockData.dashboard} />;
            case 'water':
                return <WaterSystemView data={mockData.water} />;
            case 'electricity':
                 return <ElectricitySystemView data={mockData.electricity} />;
            case 'hvac':
                 return <HvacSystemView data={mockData.hvac} />;
            case 'firefighting':
                 return <FirefightingView data={mockData.firefighting} />;
            case 'contractor':
                 return <ContractorTrackerView data={mockData.contractor} />;
             case 'stp':
                 return <StpPlantView data={mockData.stp} />;
            default:
                // Default to 'water' view if the activeView is somehow invalid
                return <WaterSystemView data={mockData.water} />;
        }
    }, [activeView]);

    return <main>{viewComponent}</main>;
};

export default function App() {
    const [activeView, setActiveView] = useState<ViewKey>('water');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    return (
        <div className="bg-slate-50 min-h-screen">
            <style>{`
                /* Responsive Table Styles */
                @media (max-width: 767px) {
                    .responsive-table thead {
                        display: none;
                    }
                    .responsive-table tr {
                        display: block;
                        margin-bottom: 1rem;
                        border: 1px solid #e2e8f0;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
                    }
                    .responsive-table td {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0.5rem 0;
                        border-bottom: 1px solid #f1f5f9;
                    }
                     .responsive-table td:last-child {
                        border-bottom: none;
                    }
                    .responsive-table td::before {
                        content: attr(data-label);
                        font-weight: 600;
                        margin-right: 0.5rem;
                        color: #475569;
                    }
                }
                
                /* Range Slider Styles */
                .thumb {
                    pointer-events: none;
                    position: absolute;
                    height: 0;
                    width: 100%;
                    outline: none;
                    -webkit-appearance: none;
                    background: transparent; /* Hide original track */
                }
                .thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    -webkit-tap-highlight-color: transparent;
                    pointer-events: all;
                    position: relative;
                    height: 18px;
                    width: 18px;
                    background-color: white;
                    border: 4px solid #14b8a6; /* teal-500 */
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 3;
                    box-shadow: 0 0 5px rgba(0,0,0,0.2);
                }
                .thumb::-moz-range-thumb {
                    pointer-events: all;
                    position: relative;
                    height: 18px;
                    width: 18px;
                    background-color: white;
                    border: 4px solid #14b8a6; /* teal-500 */
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 3;
                     box-shadow: 0 0 5px rgba(0,0,0,0.2);
                }
            `}</style>
            <Sidebar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                isSidebarOpen={isSidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
            />
            <div className="lg:ml-64 transition-all duration-300 ease-in-out">
                {/* Add padding-bottom to account for the mobile nav bar */}
                <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
                    <Header title={VIEW_TITLES[activeView]} setSidebarOpen={setSidebarOpen} />
                    <MainContent activeView={activeView} />
                </div>
            </div>
            <MobileNavBar activeView={activeView} setActiveView={setActiveView} />
        </div>
    );
}