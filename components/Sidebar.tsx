import React from 'react';
import { NAV_ITEMS, Icons } from '../constants';
import type { ViewKey } from '../types';

interface SidebarProps {
    activeView: ViewKey;
    setActiveView: (view: ViewKey) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isSidebarOpen, setSidebarOpen }) => {
    const CloseIcon = Icons.close;

    return (
        <>
            <aside className={`fixed top-0 left-0 z-50 w-64 h-screen bg-[#4E4456] text-white transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold">Muscat Bay</h1>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-[#A8D8D4]">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-6">
                    <ul className="px-4">
                        {NAV_ITEMS.map(item => (
                            <li key={item.id}>
                                <a 
                                    href="#" 
                                    onClick={(e) => { 
                                        e.preventDefault(); 
                                        setActiveView(item.id); 
                                        setSidebarOpen(false); 
                                    }} 
                                    className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 relative ${
                                        activeView === item.id 
                                            ? 'bg-white/10 font-semibold' 
                                            : 'hover:bg-white/5'
                                    }`}
                                >
                                    {activeView === item.id && <span className="absolute left-0 top-1 bottom-1 w-1 bg-[#A8D8D4] rounded-r-full"></span>}
                                    <item.icon className="w-5 h-5 mr-3" />
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden"></div>}
        </>
    );
};