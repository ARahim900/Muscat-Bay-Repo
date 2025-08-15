import React from 'react';
import type { Stat } from '../types';

type StatCardProps = Stat & {
    layout?: 'vertical' | 'horizontal' | 'compact';
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, iconBgColor, subtitle, layout = 'vertical' }) => {
    const changeColor = {
        increase: 'text-red-500',
        decrease: 'text-green-500',
        neutral: 'text-slate-500',
    };
    const changeIcon = {
        increase: '▲',
        decrease: '▼',
        neutral: '',
    };
    
    // Layout for Electricity and STP Plant
    if (layout === 'horizontal') {
        return (
             <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {icon && <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgColor}`}>{icon}</div>}
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
                    <p className="text-2xl font-bold text-slate-800">{value}</p>
                    {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
                </div>
            </div>
        );
    }
    
    // Layout for Contractor Tracker and Firefighting
    if (layout === 'compact') {
         return (
             <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                <p className="text-4xl font-bold text-slate-800 mt-2">{value}</p>
                <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            </div>
        );
    }

    // Default vertical layout for main dashboard
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
            {change && <p className={`text-sm mt-2 flex items-center font-semibold ${changeColor[changeType]}`}>
                {changeIcon[changeType]} {change}
            </p>}
        </div>
    );
};