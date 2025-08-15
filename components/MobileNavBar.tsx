import React from 'react';
import { NAV_ITEMS } from '../constants';
import type { ViewKey } from '../types';

interface MobileNavBarProps {
    activeView: ViewKey;
    setActiveView: (view: ViewKey) => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ activeView, setActiveView }) => {
    return (
        <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-t-md z-40">
            <nav className="flex justify-around items-center h-16">
                {NAV_ITEMS.map(item => (
                    <a
                        key={item.id}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveView(item.id);
                        }}
                        className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
                            activeView === item.id 
                                ? 'text-[#4E4456]' 
                                : 'text-slate-500 hover:text-[#4E4456]'
                        }`}
                        aria-current={activeView === item.id ? 'page' : undefined}
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">{item.shortLabel || item.label}</span>
                    </a>
                ))}
            </nav>
        </footer>
    );
};
